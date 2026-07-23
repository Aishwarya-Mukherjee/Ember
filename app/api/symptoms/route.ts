import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { evaluateSymptomRisk } from '@/lib/server/riskEngine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');

  try {
    const symptoms = await prisma.symptomLog.findMany({
      where: patientId ? { patientId } : undefined,
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(symptoms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch symptoms' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const symptom = await prisma.symptomLog.create({
      data: {
        patientId: data.patientId,
        symptoms: data.symptoms,
        severity: data.severity,
        rawText: data.rawText,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      },
    });

    // Evaluate risk rules synchronously before returning response
    await evaluateSymptomRisk(data.patientId);

    return NextResponse.json(symptom, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create symptom log' }, { status: 500 });
  }
}
