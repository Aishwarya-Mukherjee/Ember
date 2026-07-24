import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { id, status, scheduledAt, medicationId, notes, missedReason } = await req.json();

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

    // If a medication reminder was marked as done or missed, log it
    if (updatedReminder.type === 'medication' && (status === 'done' || status === 'missed' || status === 'skipped')) {
      let targetMedicationId = medicationId;
      if (!targetMedicationId) {
        // Fallback: try to find the medication by matching the label
        const med = await prisma.medication.findFirst({
          where: { 
            patientId: updatedReminder.patientId, 
            name: { equals: updatedReminder.label, mode: 'insensitive' } 
          }
        });
        if (med) targetMedicationId = med.id;
      }
      
      if (targetMedicationId) {
        await prisma.medicationLog.create({
          data: {
            patientId: updatedReminder.patientId,
            medicationId: targetMedicationId,
            status: status === 'done' ? 'taken' : status,
            takenAt: new Date(),
            notes: notes || 'Logged via Smart Reminder',
            missedReason: status === 'missed' ? missedReason : undefined,
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
