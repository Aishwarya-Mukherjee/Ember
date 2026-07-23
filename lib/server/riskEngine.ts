import prisma from '../prisma';

export async function evaluateSymptomRisk(patientId: string) {
  try {
    // Rule: dizziness_3x_week
    // Check if the patient has had 3 or more dizziness symptoms in the last 7 days.
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentDizzinessCount = await prisma.symptomLog.count({
      where: {
        patientId,
        timestamp: {
          gte: sevenDaysAgo,
        },
        symptoms: {
          has: 'dizziness',
        }
      }
    });

    if (recentDizzinessCount >= 3) {
      // Check if an alert already exists in the last 7 days to prevent spam
      const existingAlert = await prisma.riskAlert.findFirst({
        where: {
          patientId,
          rule: 'dizziness_3x_week',
          triggeredAt: {
            gte: sevenDaysAgo,
          }
        }
      });

      if (!existingAlert) {
        await prisma.riskAlert.create({
          data: {
            patientId,
            rule: 'dizziness_3x_week',
            severity: 'critical',
            insight: "You've reported feeling dizzy 3 times in the last week. This could be related to your blood pressure medication or blood sugar levels.",
            triggeredAt: new Date(),
            dismissed: false,
          }
        });
        console.log(`[RiskEngine] Alert created: dizziness_3x_week for patient ${patientId}`);
      }
    }
  } catch (error) {
    console.error("[RiskEngine] Failed to evaluate symptom risk:", error);
  }
}

export async function evaluateVitalsRisk(patientId: string) {
  try {
    // Rule: sugar_trending_up
    // Check if the latest blood sugar is > 200 mg/dL
    
    const latestSugar = await prisma.vitalsEntry.findFirst({
      where: {
        patientId,
        type: 'blood_sugar',
      },
      orderBy: {
        timestamp: 'desc',
      }
    });

    if (latestSugar && latestSugar.value > 200) {
      // Check if an alert already exists recently (e.g. last 3 days)
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const existingAlert = await prisma.riskAlert.findFirst({
        where: {
          patientId,
          rule: 'sugar_trending_up',
          triggeredAt: {
            gte: threeDaysAgo,
          }
        }
      });

      if (!existingAlert) {
        await prisma.riskAlert.create({
          data: {
            patientId,
            rule: 'sugar_trending_up',
            severity: 'warning',
            insight: "Your blood sugar crossed 200 mg/dL recently. Consider discussing your diet or medication with your doctor.",
            triggeredAt: new Date(),
            dismissed: false,
          }
        });
        console.log(`[RiskEngine] Alert created: sugar_trending_up for patient ${patientId}`);
      }
    }
  } catch (error) {
    console.error("[RiskEngine] Failed to evaluate vitals risk:", error);
  }
}
