import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { processMedicationAdherence } from '@/lib/server/adherence';
import { MedicationLogSchema } from '@/lib/validations';
import { z } from 'zod';
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = await request.json();
    const data = MedicationLogSchema.parse(body);

    await requireOwnership(data.patientId);

    const log = await prisma.medicationLog.create({
      data: {
        patientId: data.patientId,
        medicationId: data.medicationId,
        status: data.status,
        notes: data.notes,
        takenAt: data.takenAt ? new Date(data.takenAt) : new Date(),
      },
    });

    await processMedicationAdherence(data.patientId);

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error instanceof ForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json({ error: 'Failed to log medication' }, { status: 500 });
  }
}
