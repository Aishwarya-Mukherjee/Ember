import { NextResponse } from 'next/server';
import { generatePatientReport } from '@/lib/server/reportService';
import { requireAuth, requireDoctor, requireOwnership, UnauthorizedError, ForbiddenError } from '@/lib/server/auth';

export async function GET(
  request: Request,
  context: { params: Promise<{ patientId: string }> }
) {
  try {
    const user = await requireAuth();
    const { patientId } = await context.params;
    
    // Either a doctor or the patient themselves can view the report
    if (user.role === 'PATIENT') {
      await requireOwnership(patientId);
    } else {
      await requireDoctor(); // Just for verbosity/future-proofing
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    
    let days = 30; // default
    if (daysParam) {
      const parsedDays = parseInt(daysParam, 10);
      if (isNaN(parsedDays) || parsedDays <= 0) {
        return NextResponse.json({ error: 'days must be a positive integer' }, { status: 400 });
      }
      if (parsedDays > 365) {
        return NextResponse.json({ error: 'maximum date range is 365 days' }, { status: 400 });
      }
      days = parsedDays;
    }

    // Await the report service
    const reportData = await generatePatientReport(patientId, days);

    return NextResponse.json(reportData, { status: 200 });
  } catch (error: any) {
    if (error instanceof UnauthorizedError) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (error instanceof ForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    
    console.error("[API/Reports] Failed to generate report:", error);
    
    if (error.message === 'Patient not found') {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
