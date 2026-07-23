import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MedicationSchema } from '@/lib/validations';
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

    const medications = await prisma.medication.findMany({
      where: patientId ? { patientId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(medications);
  } catch (error) {
    if (error instanceof UnauthorizedError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error instanceof ForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json({ error: 'Failed to fetch medications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = await request.json();
    const data = MedicationSchema.parse(body);

    await requireOwnership(data.patientId);

    const medication = await prisma.medication.create({
      data: {
        patientId: data.patientId,
        name: data.name,
      },
    });
    return NextResponse.json(medication, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error instanceof ForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json({ error: 'Failed to add medication' }, { status: 500 });
  }
}
