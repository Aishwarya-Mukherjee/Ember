import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');

  try {
    const medications = await prisma.medication.findMany({
      where: patientId ? { patientId } : undefined,
    });
    return NextResponse.json(medications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch medications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const medication = await prisma.medication.create({
      data: {
        patientId: data.patientId,
        name: data.name,
      },
    });
    return NextResponse.json(medication, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create medication' }, { status: 500 });
  }
}
