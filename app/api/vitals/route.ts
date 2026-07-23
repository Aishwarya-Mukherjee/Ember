import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { evaluateVitalsRisk } from '@/lib/server/riskEngine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');

  try {
    const vitals = await prisma.vitalsEntry.findMany({
      where: patientId ? { patientId } : undefined,
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(vitals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vitals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const vital = await prisma.vitalsEntry.create({
      data: {
        patientId: data.patientId,
        type: data.type,
        value: data.value,
        unit: data.unit,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      },
    });
    
    // Evaluate risk rules synchronously before returning response
    await evaluateVitalsRisk(data.patientId);

    return NextResponse.json(vital, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vital entry' }, { status: 500 });
  }
}
