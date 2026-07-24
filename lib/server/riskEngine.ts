import prisma from '@/lib/prisma';
import { generateAlertInsight, generateWellnessTip } from '@/lib/server/ai';

/**
 * Ensures an alert is only created if there isn't an active one of the same rule for this patient.
 */
async function createAlert(patientId: string, rule: string, severity: 'warning' | 'critical', dataSummary: string) {
  const existingAlert = await prisma.riskAlert.findFirst({
    where: {
      patientId,
      rule,
      dismissed: false,
    }
  });

  if (!existingAlert) {
    const insight = await generateAlertInsight(rule, dataSummary);
    await prisma.riskAlert.create({
      data: {
        patientId,
        rule,
        severity,
        insight,
        triggeredAt: new Date(),
        dismissed: false,
      }
    });
    console.log(`[RiskEngine] Created ${severity} alert '${rule}' for patient ${patientId}`);
  }
}

/**
 * Rule: Flag if the same symptom is logged 3+ times in 7 days.
 */
async function processSymptoms(patientId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentLogs = await prisma.symptomLog.findMany({
    where: {
      patientId,
      timestamp: { gte: sevenDaysAgo },
    }
  });

  // Count occurrences of each symptom
  const symptomCounts: Record<string, number> = {};
  for (const log of recentLogs) {
    for (const sym of log.symptoms) {
      const lowerSym = sym.toLowerCase();
      symptomCounts[lowerSym] = (symptomCounts[lowerSym] || 0) + 1;
    }
  }

  for (const [symptom, count] of Object.entries(symptomCounts)) {
    if (count >= 3) {
      await createAlert(
        patientId,
        `recurrent_symptom_${symptom.replace(/\s+/g, '_')}`,
        'warning',
        `Patient reported '${symptom}' ${count} times in the last 7 days.`
      );
    }
  }
}

/**
 * Rule: Blood sugar consistently >200 mg/dL for 14 days -> High Risk alert
 * Rule: Blood pressure repeatedly above threshold (>140 sys OR >90 dia on last 3 readings) -> Alert
 */
async function processVitals(patientId: string) {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  // Blood sugar check
  const recentSugars = await prisma.vitalsEntry.findMany({
    where: { patientId, type: 'blood_sugar', timestamp: { gte: fourteenDaysAgo } },
    orderBy: { timestamp: 'desc' }
  });

  if (recentSugars.length >= 3 && recentSugars.every(s => s.value > 200)) {
    await createAlert(
      patientId,
      'sugar_high_14_days',
      'critical',
      `Blood sugar consistently over 200 mg/dL (latest: ${recentSugars[0].value}).`
    );
  }

  // Blood pressure check
  const recentSys = await prisma.vitalsEntry.findMany({
    where: { patientId, type: 'blood_pressure' },
    orderBy: { timestamp: 'desc' },
    take: 3
  });
  
  const recentDia = await prisma.vitalsEntry.findMany({
    where: { patientId, type: 'blood_pressure_diastolic' },
    orderBy: { timestamp: 'desc' },
    take: 3
  });

  const sysHigh = recentSys.length === 3 && recentSys.every(bp => bp.value > 140);
  const diaHigh = recentDia.length === 3 && recentDia.every(bp => bp.value > 90);

  if (sysHigh || diaHigh) {
    const sysVals = recentSys.map(bp => bp.value).join(', ');
    const diaVals = recentDia.map(bp => bp.value).join(', ');
    await createAlert(
      patientId,
      'bp_high_repeated',
      'warning',
      `Blood pressure elevated for 3 consecutive readings. Systolic: [${sysVals}], Diastolic: [${diaVals}].`
    );
  }
}

/**
 * Rule: Flag missed medication 2+ times in a row.
 */
async function processMedications(patientId: string) {
  // Get all medications for this patient
  const medications = await prisma.medication.findMany({
    where: { patientId },
    include: {
      medicationLogs: {
        orderBy: { takenAt: 'desc' },
        take: 2
      }
    }
  });

  for (const med of medications) {
    if (med.medicationLogs.length === 2 && med.medicationLogs.every(log => log.status === 'missed')) {
      await createAlert(
        patientId,
        `medication_missed_consecutively_${med.id}`,
        'warning',
        `Patient missed taking ${med.name} for 2 consecutive scheduled doses.`
      );
    }
  }
}

/**
 * Generate and store a daily wellness tip
 */
async function generateDailyWellnessTip(patientId: string) {
  const existingTip = await prisma.riskAlert.findFirst({
    where: {
      patientId,
      severity: 'wellness',
      triggeredAt: { gte: new Date(new Date().setHours(0,0,0,0)) } // Only 1 per day
    }
  });

  if (!existingTip) {
    // Collect brief context
    const recentVitals = await prisma.vitalsEntry.findMany({ where: { patientId }, orderBy: { timestamp: 'desc' }, take: 5 });
    const recentSymptoms = await prisma.symptomLog.findMany({ where: { patientId }, orderBy: { timestamp: 'desc' }, take: 3 });
    
    const context = `
Vitals: ${recentVitals.map(v => `${v.type}: ${v.value} ${v.unit}`).join(', ')}
Symptoms: ${recentSymptoms.map(s => s.symptoms.join(', ')).join(' | ')}
    `;

    const tip = await generateWellnessTip(context);
    
    // Clear out old wellness tips so we only have one at a time for UI cleanliness
    await prisma.riskAlert.deleteMany({
      where: { patientId, severity: 'wellness' }
    });

    await prisma.riskAlert.create({
      data: {
        patientId,
        rule: 'Daily Wellness Tip',
        severity: 'wellness',
        insight: tip,
        triggeredAt: new Date(),
        dismissed: false,
      }
    });
    console.log(`[RiskEngine] Created wellness tip for patient ${patientId}`);
  }
}

/**
 * Main orchestrator to evaluate all risks for a patient
 */
export async function evaluatePatientRisk(patientId: string) {
  try {
    await processSymptoms(patientId);
    await processVitals(patientId);
    await processMedications(patientId);
    await generateDailyWellnessTip(patientId);
  } catch (error) {
    console.error(`[RiskEngine] Failed to evaluate risks for patient ${patientId}:`, error);
  }
}
