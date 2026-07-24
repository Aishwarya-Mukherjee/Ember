import * as dotenv from 'dotenv';
dotenv.config();
import prisma from '../lib/prisma';

const getPastDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
};

async function main() {
  console.log('Start seeding...');

  // 1. Patient & Medications
  // We use upsert so the script can be re-run safely
  const patient = await prisma.patient.upsert({
    where: { id: "patient_001" },
    update: {},
    create: {
      id: "patient_001",
      name: "Meera",
      age: 58,
      condition: "diabetes",
      medications: {
        create: [
          { id: "med_1", name: "Metformin 500mg" },
          { id: "med_2", name: "Lisinopril 10mg" }
        ]
      }
    }
  });

  console.log(`Created/Ensured patient: ${patient.name}`);

  // 2. Symptoms
  await prisma.symptomLog.createMany({
    data: [
      {
        id: "sym_1",
        patientId: patient.id,
        timestamp: getPastDate(20),
        symptoms: ["fatigue"],
        severity: 2,
        rawText: "Feeling a bit tired today but otherwise fine.",
      },
      {
        id: "sym_2",
        patientId: patient.id,
        timestamp: getPastDate(7),
        symptoms: ["dizziness"],
        severity: 3,
        rawText: "I felt quite dizzy when I stood up this morning.",
      },
      {
        id: "sym_3",
        patientId: patient.id,
        timestamp: getPastDate(6),
        symptoms: ["dizziness"],
        severity: 2,
        rawText: "Still a little dizzy today.",
      },
      {
        id: "sym_4",
        patientId: patient.id,
        timestamp: getPastDate(5),
        symptoms: ["dizziness"],
        severity: 3,
        rawText: "Dizzy again after breakfast.",
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created symptoms`);

  // 3. Vitals
  await prisma.vitalsEntry.createMany({
    data: [
      {
        id: "vit_1",
        patientId: patient.id,
        timestamp: getPastDate(14),
        type: "blood_sugar",
        value: 110,
        unit: "mg/dL",
      },
      {
        id: "vit_2",
        patientId: patient.id,
        timestamp: getPastDate(10),
        type: "blood_sugar",
        value: 125,
        unit: "mg/dL",
      },
      {
        id: "vit_3",
        patientId: patient.id,
        timestamp: getPastDate(5),
        type: "blood_sugar",
        value: 180,
        unit: "mg/dL",
      },
      {
        id: "vit_4",
        patientId: patient.id,
        timestamp: getPastDate(2),
        type: "blood_sugar",
        value: 210,
        unit: "mg/dL",
      },
      {
        id: "vit_5",
        patientId: patient.id,
        timestamp: getPastDate(1),
        type: "blood_sugar",
        value: 205,
        unit: "mg/dL",
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created vitals`);

  // 4. Reminders
  await prisma.reminder.createMany({
    data: [
      {
        id: "rem_1",
        patientId: patient.id,
        type: "medication",
        label: "Metformin 500mg",
        scheduledAt: getPastDate(2),
        status: "done",
        missedCount: 0,
      },
      {
        id: "rem_2",
        patientId: patient.id,
        type: "medication",
        label: "Lisinopril 10mg",
        scheduledAt: getPastDate(1),
        status: "missed",
        missedCount: 1,
      },
      {
        id: "rem_3",
        patientId: patient.id,
        type: "medication",
        label: "Lisinopril 10mg",
        scheduledAt: getPastDate(0),
        status: "missed",
        missedCount: 2,
      },
      {
        id: "rem_4",
        patientId: patient.id,
        type: "appointment",
        label: "Checkup with Dr. Anya",
        scheduledAt: new Date(Date.now() + 86400000 * 2), // 2 days from now
        status: "pending",
        missedCount: 0,
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created reminders`);

  // 5. Alerts
  await prisma.riskAlert.createMany({
    data: [
      {
        id: "alert_1",
        patientId: patient.id,
        triggeredAt: getPastDate(5),
        rule: "dizziness_3x_week",
        severity: "critical",
        insight: "You've reported feeling dizzy 3 times in the last week. This could be related to your blood pressure medication or blood sugar levels.",
        dismissed: false,
      },
      {
        id: "alert_2",
        patientId: patient.id,
        triggeredAt: getPastDate(1),
        rule: "sugar_trending_up",
        severity: "warning",
        insight: "Your blood sugar has been trending higher over the last 14 days, crossing 200 mg/dL recently. Consider discussing your diet or medication with your doctor.",
        dismissed: false,
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created alerts`);

  // 6. Medication Logs
  await prisma.medicationLog.createMany({
    data: [
      {
        id: "medlog_1",
        patientId: patient.id,
        medicationId: "med_1",
        takenAt: getPastDate(1),
        status: "taken",
      },
      {
        id: "medlog_2",
        patientId: patient.id,
        medicationId: "med_2",
        takenAt: getPastDate(1),
        status: "missed",
        notes: "Forgot to take it with breakfast.",
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created medication logs`);

  // 7. Check-ins
  await prisma.checkIn.createMany({
    data: [
      {
        id: "checkin_1",
        patientId: patient.id,
        date: getPastDate(1),
        mood: "Okay",
        notes: "Feeling a bit sluggish.",
      },
      {
        id: "checkin_2",
        patientId: patient.id,
        date: getPastDate(0),
        mood: "Good",
        notes: "Slept well last night.",
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created check-ins`);
  
  // Patient 2
  const patient2 = await prisma.patient.upsert({
    where: { id: "patient_002" },
    update: {},
    create: {
      id: "patient_002",
      name: "Rajesh Kumar",
      age: 70,
      condition: "hypertension",
      medications: {
        create: [
          { id: "med_3", name: "Amlodipine 5mg" }
        ]
      }
    }
  });
  console.log('Created patient:', patient2.name);

  // Patient 3
  const patient3 = await prisma.patient.upsert({
    where: { id: "patient_003" },
    update: {},
    create: {
      id: "patient_003",
      name: "Sarah Jenkins",
      age: 35,
      condition: "asthma",
      medications: {
        create: [
          { id: "med_4", name: "Albuterol Inhaler" }
        ]
      }
    }
  });
  console.log('Created patient:', patient3.name);

  
  // Create vitals for Rajesh
  await prisma.vitalsEntry.createMany({
    data: [
      { patientId: "patient_002", timestamp: new Date(Date.now() - 5*86400000), type: "blood_pressure", value: 145, unit: "mmHg" },
      { patientId: "patient_002", timestamp: new Date(Date.now() - 2*86400000), type: "blood_pressure", value: 150, unit: "mmHg" },
      { patientId: "patient_002", timestamp: new Date(), type: "blood_pressure", value: 155, unit: "mmHg" }
    ]
  });

  await prisma.symptomLog.createMany({
    data: [
      { patientId: "patient_002", timestamp: new Date(Date.now() - 3*86400000), symptoms: ["headache"], severity: 3, rawText: "Strong headache in the morning." },
      { patientId: "patient_002", timestamp: new Date(Date.now() - 1*86400000), symptoms: ["blurry vision"], severity: 2, rawText: "Vision felt a bit blurry." }
    ]
  });
  
  await prisma.reminder.createMany({
    data: [
      { patientId: "patient_002", type: "medication", label: "Amlodipine 5mg", scheduledAt: new Date(Date.now() - 1*86400000), status: "missed", missedCount: 1 },
      { patientId: "patient_002", type: "medication", label: "Amlodipine 5mg", scheduledAt: new Date(), status: "missed", missedCount: 2 }
    ]
  });

  await prisma.riskAlert.createMany({
    data: [
      { patientId: "patient_002", triggeredAt: new Date(), rule: "bp_high", severity: "critical", insight: "Blood pressure is trending high (155 mmHg). Missed medication.", dismissed: false }
    ]
  });

  // Create data for Sarah
  await prisma.vitalsEntry.createMany({
    data: [
      { patientId: "patient_003", timestamp: new Date(Date.now() - 2*86400000), type: "oxygen_saturation", value: 94, unit: "%" },
      { patientId: "patient_003", timestamp: new Date(Date.now() - 1*86400000), type: "oxygen_saturation", value: 96, unit: "%" }
    ]
  });

  await prisma.symptomLog.createMany({
    data: [
      { patientId: "patient_003", timestamp: new Date(Date.now() - 2*86400000), symptoms: ["wheezing", "shortness of breath"], severity: 4, rawText: "Hard to breathe after walking up stairs." }
    ]
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
