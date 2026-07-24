import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAdaptiveSchedule } from "@/lib/server/ai";

export async function POST(req: Request) {
  try {
    const { patientId } = await req.json();
    if (!patientId) {
      return NextResponse.json({ error: "Missing patientId" }, { status: 400 });
    }

    // 1. Fetch patient's medications and recent medication logs
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        medications: true,
        medicationLogs: {
          orderBy: { takenAt: 'desc' },
          take: 50
        }
      }
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // 2. Format data for the AI
    const medsList = patient.medications.map(m => m.name).join(", ");
    const logsText = patient.medicationLogs.map(l => 
      `${l.medicationId} (${l.status}) at ${l.takenAt.toISOString()}`
    ).join("\n");

    const prompt = `
You are a medical scheduling assistant. The patient ${patient.name} takes these medications: ${medsList}.
Here are their recent medication logs (when they actually took them, or missed them):
${logsText || "No past logs available. Assume standard morning/evening times."}

Generate an optimal schedule for tomorrow. The goal is to maximize adherence by scheduling reminders around the times they historically actually take their medication, rather than rigid morning times if they are a late sleeper.

Output exactly a JSON array of objects with this schema, and nothing else:
[
  {
    "type": "medication",
    "label": "Take [Medication Name]",
    "scheduledTime": "YYYY-MM-DDTHH:mm:ssZ" // Must be a valid ISO string for tomorrow.
  }
]
    `;

    let suggestedSchedule = [];
    try {
      suggestedSchedule = await generateAdaptiveSchedule(prompt);
    } catch (err) {
      console.error("Failed to generate adaptive schedule via AI:", err);
      return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 });
    }

    // 3. Save the new reminders to the DB
    const createdReminders = await Promise.all(
      suggestedSchedule.map(async (sch: any) => {
        return await prisma.reminder.create({
          data: {
            patientId,
            type: sch.type,
            label: sch.label,
            scheduledAt: new Date(sch.scheduledTime),
            status: "pending"
          }
        });
      })
    );

    return NextResponse.json({
      message: "Adaptive schedule generated successfully",
      reminders: createdReminders
    });

  } catch (error: any) {
    console.error("[POST /api/reminders/generate]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
