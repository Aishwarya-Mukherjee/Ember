import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const symptom = await prisma.symptomLog.findUnique({
      where: { id },
    });

    if (!symptom) {
      return NextResponse.json({ error: 'Symptom log not found' }, { status: 404 });
    }

    return NextResponse.json(symptom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch symptom log' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const data = await request.json();
    
    // Convert timestamp string to Date object if it exists in the payload
    if (data.timestamp) {
      data.timestamp = new Date(data.timestamp);
    }

    const symptom = await prisma.symptomLog.update({
      where: { id },
      data,
    });

    return NextResponse.json(symptom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update symptom log' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.symptomLog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete symptom log' }, { status: 500 });
  }
}
