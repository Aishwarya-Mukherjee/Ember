import prisma from '@/lib/prisma';

/**
 * Ensures an alert is only created if there isn't an active one of the same rule for this patient.
 */
async function createAlert(patientId: string, rule: string, severity: 'warning' | 'critical', insight: string) {
  const existingAlert = await prisma.riskAlert.findFirst({
    where: {
      patientId,
      rule,
      dismissed: false,
    }
  });

  if (!existingAlert) {
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
 * Rule: Dizziness reported 3 times within 7 days -> Medium Risk alert
 */
async function processSymptoms(patientId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentDizziness = await prisma.symptomLog.count({
    where: {
      patientId,
      timestamp: { gte: sevenDaysAgo },
      symptoms: { hasSome: ['dizziness', 'dizzy', 'lightheaded'] },
    }
  });

  if (recentDizziness >= 3) {
    await createAlert(
      patientId,
      'dizziness_3x_week',
      'warning',
      "You've reported feeling dizzy 3 times in the last week. Please take care when standing up and consider contacting your doctor."
    );
  }
}

/**
 * Rule: Blood sugar consistently >200 mg/dL for 14 days -> High Risk alert
 * Rule: Blood pressure repeatedly above threshold (e.g. > 140 systolic on last 3 readings) -> Alert
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
      "Your blood sugar has been consistently over 200 mg/dL for the past 14 days. This requires medical attention."
    );
  }

  // Blood pressure check (systolic > 140 on last 3 readings)
  const recentBPs = await prisma.vitalsEntry.findMany({
    where: { patientId, type: 'blood_pressure' },
    orderBy: { timestamp: 'desc' },
    take: 3
  });

  if (recentBPs.length === 3 && recentBPs.every(bp => bp.value > 140)) {
    await createAlert(
      patientId,
      'bp_high_repeated',
      'warning',
      "Your systolic blood pressure has been over 140 for your last 3 readings. Please monitor closely."
    );
  }
}

/**
 * Main orchestrator to evaluate all risks for a patient
 */
export async function evaluatePatientRisk(patientId: string) {
  try {
    await processSymptoms(patientId);
    await processVitals(patientId);
  } catch (error) {
    console.error(`[RiskEngine] Failed to evaluate risks for patient ${patientId}:`, error);
  }
}
