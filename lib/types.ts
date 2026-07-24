export type Patient = {
  id: string;
  name: string;
  age: number;
  condition: "diabetes" | "hypertension" | "asthma" | "heart_disease";
  medications: { id: string; name: string }[];
  caregiverId?: string;
};

export type SymptomLog = {
  id: string;
  patientId: string;
  timestamp: string; // ISO string
  symptoms: string[];
  severity: 1 | 2 | 3 | 4 | 5;
  rawText: string;
};

export type VitalsEntry = {
  id: string;
  patientId: string;
  timestamp: string; // ISO string
  type: "blood_pressure" | "blood_sugar" | "weight" | "heart_rate";
  value: number;
  unit: string;
};

export type Reminder = {
  id: string;
  patientId: string;
  type: "medication" | "appointment";
  label: string;
  scheduledAt: string; // ISO string
  status: "pending" | "done" | "snoozed" | "missed";
  missedCount: number;
};

export type RiskAlert = {
  id: string;
  patientId: string;
  triggeredAt: string; // ISO string
  rule: string;
  severity: "warning" | "critical" | "wellness";
  insight: string;
  dismissed: boolean;
};

export type MedicationLog = {
  id: string;
  patientId: string;
  medicationId: string;
  takenAt: string; // ISO string
  status: "taken" | "missed" | "skipped";
  notes?: string;
};

export type CheckIn = {
  id: string;
  patientId: string;
  date: string; // ISO string
  notes?: string;
  mood?: string;
};

export type AppData = {
  patient: Patient;
  symptoms: SymptomLog[];
  vitals: VitalsEntry[];
  reminders: Reminder[];
  alerts: RiskAlert[];
  medicationLogs: MedicationLog[];
  checkIns: CheckIn[];
};
