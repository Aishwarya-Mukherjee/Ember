import { NextResponse } from 'next/server';
import { mockAppData } from '@/data/seed';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }

    // Return the mocked data from seed.ts so the dashboard works without a database
    return NextResponse.json({
      ...mockAppData.patient,
      vitals: mockAppData.vitals,
      medications: mockAppData.patient.medications.map((m, i) => ({ id: `med_${i}`, name: m })),
      alerts: mockAppData.alerts,
      symptoms: mockAppData.symptoms,
      checkIns: mockAppData.checkIns,
      reminders: mockAppData.reminders,
      medicationLogs: mockAppData.medicationLogs,
    });
  } catch (error) {
    console.error('[PATIENT_API_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch patient data' }, { status: 500 });
  }
}
