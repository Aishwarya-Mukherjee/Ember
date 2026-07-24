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

    // Fetch patient data from database
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        medications: true,
        vitals: {
          orderBy: { timestamp: 'desc' },
          take: 5
        },
        alerts: {
          orderBy: { triggeredAt: 'desc' },
          take: 5
        },
        symptoms: {
          orderBy: { timestamp: 'desc' },
          take: 5
        },
        checkIns: {
          orderBy: { date: 'desc' },
          take: 10
        },
        reminders: true,
        medicationLogs: {
          orderBy: { takenAt: 'desc' }
        },
      }
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('[PATIENT_API_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
  }
}
