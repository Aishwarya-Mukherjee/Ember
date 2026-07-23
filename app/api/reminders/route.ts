import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { id, status, scheduledAt, medicationId, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing reminder ID" }, { status: 400 });
    }

    // Prepare update data
    const updateData: any = {};
    if (status) updateData.status = status;
    if (scheduledAt) updateData.scheduledAt = new Date(scheduledAt);

    // If status is 'missed', increment missedCount
    if (status === 'missed') {
      updateData.missedCount = { increment: 1 };
    }

    // Perform the update
    const updatedReminder = await prisma.reminder.update({
      where: { id },
      data: updateData,
    });

    // If a medication reminder was marked as done or missed, and we have medicationId, log it
    if (updatedReminder.type === 'medication' && (status === 'done' || status === 'missed' || status === 'skipped')) {
      // Need to find the medicationId if not passed explicitly? 
      // For MVP, we assume the frontend passes medicationId, or we try to extract it from the label if possible.
      // Better yet, if medicationId is provided:
      if (medicationId) {
        await prisma.medicationLog.create({
          data: {
            patientId: updatedReminder.patientId,
            medicationId,
            status: status === 'done' ? 'taken' : status,
            takenAt: new Date(),
            notes: notes || 'Logged via Smart Reminder',
          }
        });
      }
    }

    return NextResponse.json(updatedReminder);
  } catch (error: any) {
    console.error("[PUT /api/reminders]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patientId, type, label, scheduledAt } = body;

    if (!patientId || !type || !label || !scheduledAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newReminder = await prisma.reminder.create({
      data: {
        patientId,
        type,
        label,
        scheduledAt: new Date(scheduledAt),
        status: "pending",
      }
    });

    return NextResponse.json(newReminder);
  } catch (error: any) {
    console.error("[POST /api/reminders]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
