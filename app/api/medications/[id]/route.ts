import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const medication = await prisma.medication.findUnique({
      where: { id },
    });

    if (!medication) {
      return NextResponse.json({ error: 'Medication not found' }, { status: 404 });
    }

    return NextResponse.json(medication);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch medication' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const data = await request.json();

    const medication = await prisma.medication.update({
      where: { id },
      data,
    });

    return NextResponse.json(medication);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update medication' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.medication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete medication' }, { status: 500 });
  }
}
