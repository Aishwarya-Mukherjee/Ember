import prisma from '@/lib/prisma';

export async function processMedicationAdherence(patientId: string) {
  try {
    // Fetch recent medication logs for the patient, ordered by time
    const recentLogs = await prisma.medicationLog.findMany({
      where: { patientId },
      orderBy: { takenAt: 'desc' },
      take: 5
    });

    if (recentLogs.length < 2) return;

    // Rule: 2 consecutive missed doses -> Medium Alert
    const [latest, previous] = recentLogs;
    if (latest.status === 'missed' && previous.status === 'missed') {
      
      const existingAlert = await prisma.riskAlert.findFirst({
        where: {
          patientId,
          rule: 'consecutive_missed_doses',
          dismissed: false,
        }
      });

      if (!existingAlert) {
        await prisma.riskAlert.create({
          data: {
            patientId,
            rule: 'consecutive_missed_doses',
            severity: 'warning',
            insight: "You have missed 2 consecutive medication doses. Please ensure you are taking your prescribed medications to avoid health complications.",
            triggeredAt: new Date(),
            dismissed: false,
          }
        });
        console.log(`[AdherenceEngine] Created warning alert 'consecutive_missed_doses' for patient ${patientId}`);
        
        // TODO: Caregiver notification hook (e.g. Twilio SMS / Web Push) goes here
      }
    }
  } catch (error) {
    console.error(`[AdherenceEngine] Failed to process adherence for patient ${patientId}:`, error);
  }
}
