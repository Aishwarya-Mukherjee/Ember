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


export const rajesh: Patient = {
  id: "patient_002",
  name: "Rajesh Kumar",
  age: 70,
  condition: "hypertension",
  medications: [
    { id: "med-3", name: "Amlodipine 5mg" }
  ],
};

export const sarah: Patient = {
  id: "patient_003",
  name: "Sarah Jenkins",
  age: 35,
  condition: "asthma",
  medications: [
    { id: "med-4", name: "Albuterol Inhaler" }
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


// Rajesh Mock Data
export const rajeshSymptoms: SymptomLog[] = [
  { id: "sym_raj_1", patientId: "patient_002", timestamp: getPastDate(3), symptoms: ["headache"], severity: 3, rawText: "Strong headache in the morning." },
  { id: "sym_raj_2", patientId: "patient_002", timestamp: getPastDate(1), symptoms: ["blurry vision"], severity: 2, rawText: "Vision felt a bit blurry." },
];

export const rajeshVitals: VitalsEntry[] = [
  { id: "vit_raj_1", patientId: "patient_002", timestamp: getPastDate(5), type: "blood_pressure", value: 145, unit: "mmHg" },
  { id: "vit_raj_2", patientId: "patient_002", timestamp: getPastDate(2), type: "blood_pressure", value: 150, unit: "mmHg" },
  { id: "vit_raj_3", patientId: "patient_002", timestamp: getPastDate(0), type: "blood_pressure", value: 155, unit: "mmHg" },
];

export const rajeshReminders: Reminder[] = [
  { id: "rem_raj_1", patientId: "patient_002", type: "medication", label: "Amlodipine 5mg", scheduledAt: getPastDate(1), status: "missed", missedCount: 1 },
  { id: "rem_raj_2", patientId: "patient_002", type: "medication", label: "Amlodipine 5mg", scheduledAt: getPastDate(0), status: "missed", missedCount: 2 },
];

export const rajeshAlerts: RiskAlert[] = [
  { id: "alert_raj_1", patientId: "patient_002", triggeredAt: getPastDate(0), rule: "bp_high", severity: "critical", insight: "Blood pressure is trending high (155 mmHg). Missed medication.", dismissed: false }
];

export const rajeshCheckIns = [
  { id: "chk_raj_1", patientId: "patient_002", timestamp: getPastDate(1), type: "daily", text: "Felt okay but skipped meds.", aiSummary: "Skipped medication." }
];

// Sarah Mock Data
export const sarahSymptoms: SymptomLog[] = [
  { id: "sym_sar_1", patientId: "patient_003", timestamp: getPastDate(2), symptoms: ["wheezing", "shortness of breath"], severity: 4, rawText: "Hard to breathe after walking up stairs." }
];

export const sarahVitals: VitalsEntry[] = [
  { id: "vit_sar_1", patientId: "patient_003", timestamp: getPastDate(2), type: "oxygen_saturation", value: 94, unit: "%" },
  { id: "vit_sar_2", patientId: "patient_003", timestamp: getPastDate(1), type: "oxygen_saturation", value: 96, unit: "%" }
];

export const sarahReminders: Reminder[] = [
  { id: "rem_sar_1", patientId: "patient_003", type: "medication", label: "Albuterol Inhaler", scheduledAt: getPastDate(0), status: "done", missedCount: 0 }
];

export const sarahAlerts: RiskAlert[] = [
  { id: "alert_sar_1", patientId: "patient_003", triggeredAt: getPastDate(2), rule: "low_spo2", severity: "warning", insight: "Oxygen saturation dropped to 94%.", dismissed: false }
];

export const sarahCheckIns = [
  { id: "chk_sar_1", patientId: "patient_003", timestamp: getPastDate(2), type: "daily", text: "Had an asthma attack.", aiSummary: "Reported asthma attack." }
];

export const mockAppData: AppData = {
  ...meera,
  symptoms: seedSymptoms,
  vitals: seedVitals,
  reminders: seedReminders,
  alerts: seedAlerts,
  medicationLogs: [],
  checkIns: [],
};
