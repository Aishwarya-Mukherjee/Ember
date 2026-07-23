import { z } from "zod";

export const VitalsSchema = z.object({
  patientId: z.string(),
  type: z.enum(["blood_pressure", "blood_pressure_diastolic", "blood_sugar", "weight", "heart_rate"]),
  value: z.number(),
  unit: z.string(),
  timestamp: z.string().datetime().optional(),
});

export const SymptomSchema = z.object({
  patientId: z.string(),
  symptoms: z.array(z.string()).min(1),
  severity: z.number().int().min(1).max(5),
  rawText: z.string(),
  timestamp: z.string().datetime().optional(),
});

export const MedicationSchema = z.object({
  patientId: z.string(),
  name: z.string().min(1),
});

export const MedicationLogSchema = z.object({
  patientId: z.string(),
  medicationId: z.string(),
  status: z.enum(["taken", "missed", "skipped"]),
  notes: z.string().optional(),
  takenAt: z.string().datetime().optional(),
});

export const LLMExtractionSchema = z.object({
  symptoms: z.array(z.object({
    name: z.string(),
    severity: z.enum(["Mild", "Moderate", "Severe", "Critical"])
  })).optional(),
  vitals: z.object({
    bloodSugar: z.number().optional(),
    bloodPressure: z.string().optional(),
    heartRate: z.number().optional(),
    weight: z.number().optional()
  }).optional(),
  medications: z.array(z.object({
    name: z.string(),
    taken: z.boolean()
  })).optional(),
  summary: z.string()
});
