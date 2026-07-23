import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const vital = await prisma.vitalsEntry.findUnique({
      where: { id },
    });

    if (!vital) {
      return NextResponse.json({ error: 'Vital entry not found' }, { status: 404 });
    }

    return NextResponse.json(vital);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vital entry' }, { status: 500 });
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

    const vital = await prisma.vitalsEntry.update({
      where: { id },
      data,
    });

    return NextResponse.json(vital);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vital entry' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.vitalsEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete vital entry' }, { status: 500 });
  }
}
