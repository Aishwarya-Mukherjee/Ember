import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { evaluatePatientRisk } from '@/lib/server/riskEngine';
import { VitalsSchema } from '@/lib/validations';
import { z } from 'zod';
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from '@/lib/server/auth';

export async function GET(request: Request) {
  try {
    await requireAuth();
    
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');
    
    if (patientId) {
      await requireOwnership(patientId);
    }

    const vitals = await prisma.vitalsEntry.findMany({
      where: patientId ? { patientId } : undefined,
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(vitals);
  } catch (error) {
    if (error instanceof UnauthorizedError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error instanceof ForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json({ error: 'Failed to fetch vitals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = await request.json();
    const data = VitalsSchema.parse(body);

    await requireOwnership(data.patientId);

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
    await evaluatePatientRisk(data.patientId);

    return NextResponse.json(vital, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create vital entry' }, { status: 500 });
  }
}
