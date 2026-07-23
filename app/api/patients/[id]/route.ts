import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        vitals: {
          orderBy: { timestamp: 'desc' },
          take: 5,
        },
        medications: true,
        alerts: {
          where: { dismissed: false },
          orderBy: { triggeredAt: 'desc' },
        },
        symptoms: {
          orderBy: { timestamp: 'desc' },
          take: 5,
        },
        checkIns: {
          orderBy: { date: 'desc' },
          take: 5,
        },
        reminders: {
          orderBy: { scheduledAt: 'asc' },
        },
        medicationLogs: {
          orderBy: { takenAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
  }
}
