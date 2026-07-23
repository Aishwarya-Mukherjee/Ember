import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { extractHealthDataFromText } from '@/lib/server/anthropic';
import { evaluatePatientRisk } from '@/lib/server/riskEngine';
import { processMedicationAdherence } from '@/lib/server/adherence';
import { requireOwnership, UnauthorizedError, ForbiddenError } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const { text, patientId } = await request.json();

    if (!text || !patientId) {
      return NextResponse.json({ error: 'Missing text or patientId' }, { status: 400 });
    }

    // Verify authentication and authorization
    await requireOwnership(patientId);

    const start = Date.now();
    
    // 1. Extract structured data using Anthropic
    const extractedData = await extractHealthDataFromText(text);

    // 2. Persist Extracted Data inside a Prisma transaction
    await prisma.$transaction(async (tx) => {
      // 2a. Save CheckIn
      await tx.checkIn.create({
        data: {
          patientId,
          date: new Date(),
          notes: extractedData.summary,
        }
      });

      // 2b. Save Vitals
      if (extractedData.vitals) {
        if (extractedData.vitals.bloodSugar) {
          await tx.vitalsEntry.create({
            data: { patientId, type: 'blood_sugar', value: extractedData.vitals.bloodSugar, unit: 'mg/dL', timestamp: new Date() }
          });
        }
        if (extractedData.vitals.bloodPressure) {
          // split "120/80" -> store as systolic for MVP, or just store string? 
          // Our model says 'value' is Float. We can store systolic for simplicity, or handle it via a separate field. 
          // For now, parse systolic if available:
          const sys = parseFloat(extractedData.vitals.bloodPressure.split('/')[0]);
          if (!isNaN(sys)) {
            await tx.vitalsEntry.create({
              data: { patientId, type: 'blood_pressure', value: sys, unit: 'mmHg', timestamp: new Date() }
            });
          }
        }
        if (extractedData.vitals.heartRate) {
          await tx.vitalsEntry.create({
            data: { patientId, type: 'heart_rate', value: extractedData.vitals.heartRate, unit: 'bpm', timestamp: new Date() }
          });
        }
        if (extractedData.vitals.weight) {
          await tx.vitalsEntry.create({
            data: { patientId, type: 'weight', value: extractedData.vitals.weight, unit: 'kg', timestamp: new Date() }
          });
        }
      }

      // 2c. Save Symptoms
      if (extractedData.symptoms && extractedData.symptoms.length > 0) {
        // Map severity strings to 1-5
        const severityMap: Record<string, number> = { "Mild": 1, "Moderate": 3, "Severe": 4, "Critical": 5 };
        
        await tx.symptomLog.create({
          data: {
            patientId,
            symptoms: extractedData.symptoms.map(s => s.name),
            severity: Math.max(...extractedData.symptoms.map(s => severityMap[s.severity] || 2)),
            rawText: text,
            timestamp: new Date(),
          }
        });
      }

      // 2d. Save Medication Logs
      if (extractedData.medications && extractedData.medications.length > 0) {
        for (const med of extractedData.medications) {
          // Resolve medication name to an existing Medication ID
          const existingMed = await tx.medication.findFirst({
            where: { patientId, name: { contains: med.name, mode: 'insensitive' } }
          });

          if (existingMed) {
            await tx.medicationLog.create({
              data: {
                patientId,
                medicationId: existingMed.id,
                status: med.taken ? 'taken' : 'missed',
                takenAt: new Date(),
              }
            });
          }
        }
      }
    });

    // 3. Trigger Intelligence Engines (Risk + Adherence) out-of-band or sequentially
    await processMedicationAdherence(patientId);
    await evaluatePatientRisk(patientId);

    const duration = Date.now() - start;
    console.log(`[API/Chat] Successfully processed chat check-in for ${patientId} in ${duration}ms`);

    return NextResponse.json({ success: true, data: extractedData }, { status: 201 });
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error("[API/Chat] Processing failed:", error.message || error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
