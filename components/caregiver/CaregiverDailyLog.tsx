"use client";

import React, { useState } from "react";
import { PROFILES, useUser } from "@/components/UserProvider";
import { useSWRConfig } from "swr";
import {
  ClipboardList,
  Save,
  Activity,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

export function CaregiverDailyLog() {
  const { activeProfile } = useUser();
  const { mutate } = useSWRConfig();
  const assignedPatients = activeProfile.assignedPatientIds || [];

  const [selectedPatient, setSelectedPatient] = useState(
    assignedPatients[0] || ""
  );
  const [logType, setLogType] = useState<"vital" | "symptom">("vital");

  // Vital form
  const [vitalType, setVitalType] = useState("blood_sugar");
  const [vitalValue, setVitalValue] = useState("");

  // Symptom form
  const [symptomText, setSymptomText] = useState("");
  const [symptomSeverity, setSymptomSeverity] = useState(1);

  const [success, setSuccess] = useState(false);

  const selectedProfile = PROFILES.find((p) => p.id === selectedPatient);

  const handleLogVital = async (e: React.FormEvent) => {
    e.preventDefault();
    let unit = "mg/dL";
    if (vitalType === "blood_pressure") unit = "mmHg";
    if (vitalType === "oxygen_saturation") unit = "%";
    if (vitalType === "heart_rate") unit = "BPM";

    await fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: selectedPatient,
        type: vitalType,
        value: parseFloat(vitalValue),
        unit,
      }),
    });
    setVitalValue("");
    mutate(`/api/vitals?patientId=${selectedPatient}`);
    mutate(`/api/patients/${selectedPatient}`);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleLogSymptom = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: selectedPatient,
        symptoms: [symptomText],
        severity: symptomSeverity,
        rawText: symptomText,
      }),
    });
    setSymptomText("");
    mutate(`/api/symptoms?patientId=${selectedPatient}`);
    mutate(`/api/patients/${selectedPatient}`);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-cyan-600" />
          Daily Log
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Log vitals and symptoms for your patients.
        </p>
      </div>

      {/* Success Toast */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <p className="text-sm font-bold text-emerald-800">
            Log saved successfully!
          </p>
        </div>
      )}

      {/* Patient Selector */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Select Patient
        </label>
        <div className="flex flex-wrap gap-3">
          {assignedPatients.map((pid) => {
            const prof = PROFILES.find((p) => p.id === pid);
            if (!prof) return null;
            return (
              <button
                key={pid}
                onClick={() => setSelectedPatient(pid)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border ${
                  selectedPatient === pid
                    ? "bg-cyan-50 border-cyan-300 shadow-sm"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={prof.avatar}
                    alt={prof.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {prof.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Log Type Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setLogType("vital")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-colors ${
            logType === "vital"
              ? "bg-cyan-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Activity className="w-4 h-4" />
          Log Vital
        </button>
        <button
          onClick={() => setLogType("symptom")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-colors ${
            logType === "symptom"
              ? "bg-cyan-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          Log Symptom
        </button>
      </div>

      {/* Form */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
        {selectedProfile && (
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
              <Image
                src={selectedProfile.avatar}
                alt=""
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-slate-800">
                {selectedProfile.name}
              </p>
              <p className="text-xs text-slate-500">
                Logging {logType === "vital" ? "vital reading" : "symptom"} for
                this patient
              </p>
            </div>
          </div>
        )}

        {logType === "vital" ? (
          <form onSubmit={handleLogVital} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Vital Type
              </label>
              <select
                value={vitalType}
                onChange={(e) => setVitalType(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              >
                <option value="blood_sugar">Blood Glucose (mg/dL)</option>
                <option value="blood_pressure">Blood Pressure (mmHg)</option>
                <option value="oxygen_saturation">SpO2 (%)</option>
                <option value="heart_rate">Heart Rate (BPM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Measured Value
              </label>
              <input
                type="number"
                required
                value={vitalValue}
                onChange={(e) => setVitalValue(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="e.g., 120"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Vital
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogSymptom} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Symptoms Observed
              </label>
              <textarea
                required
                rows={4}
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                placeholder="Describe the observed symptoms..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Severity (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSymptomSeverity(num)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-colors ${
                      symptomSeverity === num
                        ? num > 3
                          ? "bg-rose-600 text-white border-rose-600"
                          : "bg-cyan-600 text-white border-cyan-600"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Symptom Log
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
