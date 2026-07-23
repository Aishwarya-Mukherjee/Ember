import prisma from '@/lib/prisma';

function calculateTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' | 'unknown' {
  if (values.length < 2) return 'unknown';
  const mid = Math.floor(values.length / 2);
  const firstHalf = values.slice(0, mid);
  const secondHalf = values.slice(mid);
  
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

  // We are assuming chronological order when passed, so secondHalf is MORE RECENT than firstHalf.
  // Wait, if it's descending order from DB, then firstHalf is NEWER. 
  // Let's assume values passed are chronologically oldest -> newest.
  
  if (avgSecond > avgFirst * 1.05) return 'increasing';
  if (avgSecond < avgFirst * 0.95) return 'decreasing';
  return 'stable';
}

export async function generatePatientReport(patientId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const patient = await prisma.patient.findUnique({
    where: { id: patientId }
  });

  if (!patient) {
    throw new Error('Patient not found');
  }

  // Fetch all related data in parallel for the time window
  const [vitals, symptoms, medLogs, alerts, checkIns] = await Promise.all([
    prisma.vitalsEntry.findMany({
      where: { patientId, timestamp: { gte: startDate } },
      orderBy: { timestamp: 'asc' } // chronological for trend calculations
    }),
    prisma.symptomLog.findMany({
      where: { patientId, timestamp: { gte: startDate } },
      orderBy: { timestamp: 'asc' }
    }),
    prisma.medicationLog.findMany({
      where: { patientId, takenAt: { gte: startDate } },
      orderBy: { takenAt: 'asc' }
    }),
    prisma.riskAlert.findMany({
      where: { patientId, triggeredAt: { gte: startDate } },
      orderBy: { triggeredAt: 'desc' }
    }),
    prisma.checkIn.findMany({
      where: { patientId, date: { gte: startDate } },
      orderBy: { date: 'desc' }
    })
  ]);

  // --- Process Vitals ---
  const bloodSugarVitals = vitals.filter(v => v.type === 'blood_sugar');
  const bloodPressureVitals = vitals.filter(v => v.type === 'blood_pressure');
  const weightVitals = vitals.filter(v => v.type === 'weight');

  const processVitalMetric = (vs: typeof vitals) => {
    if (vs.length === 0) return null;
    const values = vs.map(v => v.value);
    return {
      latest: values[values.length - 1],
      average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
      min: Math.min(...values),
      max: Math.max(...values),
      trend: calculateTrend(values)
    };
  };

  const vitalsSummary = {
    bloodSugar: processVitalMetric(bloodSugarVitals),
    bloodPressure: processVitalMetric(bloodPressureVitals),
    weight: processVitalMetric(weightVitals)
  };

  // --- Process Symptoms ---
  const allSymptomNames = symptoms.flatMap(s => s.symptoms);
  const symptomCounts: Record<string, number> = {};
  allSymptomNames.forEach(s => symptomCounts[s] = (symptomCounts[s] || 0) + 1);
  const mostCommonSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(e => e[0]);

  // --- Process Medications ---
  const taken = medLogs.filter(m => m.status === 'taken').length;
  const missed = medLogs.filter(m => m.status === 'missed').length;
  const totalDoses = taken + missed;
  const adherence = totalDoses > 0 ? Math.round((taken / totalDoses) * 100) : null;

  // --- Process Alerts & Risk ---
  const activeAlerts = alerts.filter(a => !a.dismissed);
  const resolvedAlerts = alerts.filter(a => a.dismissed);
  let riskLevel = 'Low';
  if (activeAlerts.some(a => a.severity === 'critical')) {
    riskLevel = 'High';
  } else if (activeAlerts.some(a => a.severity === 'warning')) {
    riskLevel = 'Medium';
  }

  // --- Build JSON ---
  const reportData = {
    patient: {
      id: patient.id,
      name: patient.name,
      condition: patient.condition,
      age: patient.age
    },
    period: {
      startDate: startDate.toISOString(),
      endDate: new Date().toISOString(),
      days
    },
    summary: {
      riskLevel,
      overallAdherence: adherence
    },
    vitals: vitalsSummary,
    symptoms: {
      totalReports: symptoms.length,
      mostCommon: mostCommonSymptoms,
    },
    medications: {
      dosesTaken: taken,
      dosesMissed: missed,
      adherencePercentage: adherence,
    },
    alerts: {
      total: alerts.length,
      active: activeAlerts.length,
      resolved: resolvedAlerts.length,
      severityBreakdown: {
        critical: alerts.filter(a => a.severity === 'critical').length,
        warning: alerts.filter(a => a.severity === 'warning').length
      }
    },
    checkIns: {
      totalCompleted: checkIns.length,
      lastCheckIn: checkIns.length > 0 ? checkIns[0].date.toISOString() : null
    },
    recommendations: activeAlerts.slice(0, 3).map(a => a.insight)
  };

  // TODO: Future PDF Generation Hook
  // If a PDF is requested, pass `reportData` to @react-pdf/renderer here.
  // const pdfBuffer = await renderToBuffer(<PatientReportPDF data={reportData} />);

  return reportData;
}
