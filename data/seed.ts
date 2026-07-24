import { AppData, Patient, SymptomLog, VitalsEntry, Reminder, RiskAlert } from "../lib/types";

// Generates an ISO string for 'daysAgo' from today
const getPastDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const meera: Patient = {
  id: "patient_001",
  name: "Meera",
  age: 58,
  condition: "diabetes",
  medications: [
    { id: "med-1", name: "Metformin 500mg" },
    { id: "med-2", name: "Lisinopril 10mg" }
  ],
};

export const seedSymptoms: SymptomLog[] = [
  {
    id: "sym_1",
    patientId: "patient_001",
    timestamp: getPastDate(20),
    symptoms: ["fatigue"],
    severity: 2,
    rawText: "Feeling a bit tired today but otherwise fine.",
  },
  {
    id: "sym_2",
    patientId: "patient_001",
    timestamp: getPastDate(7),
    symptoms: ["dizziness"],
    severity: 3,
    rawText: "I felt quite dizzy when I stood up this morning.",
  },
  {
    id: "sym_3",
    patientId: "patient_001",
    timestamp: getPastDate(6),
    symptoms: ["dizziness"],
    severity: 2,
    rawText: "Still a little dizzy today.",
  },
  {
    id: "sym_4",
    patientId: "patient_001",
    timestamp: getPastDate(5),
    symptoms: ["dizziness"],
    severity: 3,
    rawText: "Dizzy again after breakfast.",
  },
];

export const seedVitals: VitalsEntry[] = [
  {
    id: "vit_1",
    patientId: "patient_001",
    timestamp: getPastDate(14),
    type: "blood_sugar",
    value: 110,
    unit: "mg/dL",
  },
  {
    id: "vit_2",
    patientId: "patient_001",
    timestamp: getPastDate(10),
    type: "blood_sugar",
    value: 125,
    unit: "mg/dL",
  },
  {
    id: "vit_3",
    patientId: "patient_001",
    timestamp: getPastDate(5),
    type: "blood_sugar",
    value: 180,
    unit: "mg/dL",
  },
  {
    id: "vit_4",
    patientId: "patient_001",
    timestamp: getPastDate(2),
    type: "blood_sugar",
    value: 210,
    unit: "mg/dL",
  },
  {
    id: "vit_5",
    patientId: "patient_001",
    timestamp: getPastDate(1),
    type: "blood_sugar",
    value: 205,
    unit: "mg/dL",
  },
];

export const seedReminders: Reminder[] = [
  {
    id: "rem_1",
    patientId: "patient_001",
    type: "medication",
    label: "Metformin 500mg",
    scheduledAt: getPastDate(2),
    status: "done",
    missedCount: 0,
  },
  {
    id: "rem_2",
    patientId: "patient_001",
    type: "medication",
    label: "Lisinopril 10mg",
    scheduledAt: getPastDate(1),
    status: "missed",
    missedCount: 1,
  },
  {
    id: "rem_3",
    patientId: "patient_001",
    type: "medication",
    label: "Lisinopril 10mg",
    scheduledAt: getPastDate(0),
    status: "missed",
    missedCount: 2,
  },
  {
    id: "rem_4",
    patientId: "patient_001",
    type: "appointment",
    label: "Checkup with Dr. Anya",
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    status: "pending",
    missedCount: 0,
  }
];

export const seedAlerts: RiskAlert[] = [
  {
    id: "alert_1",
    patientId: "patient_001",
    triggeredAt: getPastDate(5),
    rule: "dizziness_3x_week",
    severity: "critical",
    insight: "You've reported feeling dizzy 3 times in the last week. This could be related to your blood pressure medication or blood sugar levels.",
    dismissed: false,
  },
  {
    id: "alert_2",
    patientId: "patient_001",
    triggeredAt: getPastDate(1),
    rule: "sugar_trending_up",
    severity: "warning",
    insight: "Your blood sugar has been trending higher over the last 14 days, crossing 200 mg/dL recently. Consider discussing your diet or medication with your doctor.",
    dismissed: false,
  }
];

export const mockAppData: AppData = {
  patient: meera,
  symptoms: seedSymptoms,
  vitals: seedVitals,
  reminders: seedReminders,
  alerts: seedAlerts,
  medicationLogs: [],
  checkIns: [],
};
