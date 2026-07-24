"use client";

import React, { useState } from "react";
import { useSWRConfig } from "swr";
import useSWR from "swr";
import { PROFILES, useUser } from "@/components/UserProvider";
import { AppData, VitalsEntry, SymptomLog } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import {
  ArrowLeft,
  Activity,
  Stethoscope,
  AlertTriangle,
  Pill,
  Heart,
  Droplet,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Shield,
  Save,
  TrendingUp,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Mini sparkline
const Sparkline = ({ data, color }: { data: number[]; color: string }) => (
  <div className="h-10 mt-1 -mx-1">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((val, i) => ({ val, i }))}>
        <Line
          type="monotone"
          dataKey="val"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Circular progress ring
function RiskRing({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-slate-800">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-bold text-slate-500 text-center">
        {label}
      </span>
    </div>
  );
}

export function CaregiverPatientDetail({
  patientData,
}: {
  patientData: AppData;
}) {
  const { setActivePatientId } = useUser();
  const { mutate } = useSWRConfig();
  const [showLogForm, setShowLogForm] = useState<
    "none" | "vital" | "symptom"
  >("none");

  const [vitalType, setVitalType] = useState("blood_sugar");
  const [vitalValue, setVitalValue] = useState("");
  const [symptomText, setSymptomText] = useState("");
  const [symptomSeverity, setSymptomSeverity] = useState(1);

  // Fetch vitals for sparklines
  const { data: vitalsData } = useSWR<VitalsEntry[]>(
    `/api/vitals?patientId=${patientData.id}`,
    fetcher
  );
  const { data: symptomsData } = useSWR<SymptomLog[]>(
    `/api/symptoms?patientId=${patientData.id}`,
    fetcher
  );

  const profile = PROFILES.find((p) => p.id === patientData.id);

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
        patientId: patientData.id,
        type: vitalType,
        value: parseFloat(vitalValue),
        unit,
      }),
    });
    setVitalValue("");
    mutate(`/api/vitals?patientId=${patientData.id}`);
    mutate(`/api/patients/${patientData.id}`);
    setShowLogForm("none");
  };

  const handleLogSymptom = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: patientData.id,
        symptoms: [symptomText],
        severity: symptomSeverity,
        rawText: symptomText,
      }),
    });
    setSymptomText("");
    mutate(`/api/symptoms?patientId=${patientData.id}`);
    mutate(`/api/patients/${patientData.id}`);
    setShowLogForm("none");
  };

  if (!profile) return null;

  // Compute derived data
  const criticalAlerts =
    patientData.alerts?.filter(
      (a) => a.severity === "critical" && !a.dismissed
    ) || [];
  const warningAlerts =
    patientData.alerts?.filter(
      (a) => a.severity === "warning" && !a.dismissed
    ) || [];
  const allAlerts = [...criticalAlerts, ...warningAlerts];

  const riskScore =
    criticalAlerts.length > 0
      ? Math.min(50 + criticalAlerts.length * 15, 95)
      : 25;

  // Build vitals by type for display
  const vitalsByType: Record<string, VitalsEntry[]> = {};
  (vitalsData || patientData.vitals || []).forEach((v) => {
    if (!vitalsByType[v.type]) vitalsByType[v.type] = [];
    vitalsByType[v.type].push(v);
  });

  const vitalTypeLabels: Record<string, { label: string; icon: any; color: string }> = {
    blood_sugar: { label: "Blood Sugar", icon: Droplet, color: "#06b6d4" },
    blood_pressure: { label: "Blood Pressure", icon: Heart, color: "#f43f5e" },
    heart_rate: { label: "Heart Rate", icon: Activity, color: "#8b5cf6" },
    oxygen_saturation: { label: "SpO2", icon: TrendingUp, color: "#10b981" },
    weight: { label: "Weight", icon: Activity, color: "#f59e0b" },
  };

  // Medication adherence: count taken vs missed from recent logs
  const medications = patientData.medications || [];
  const medLogs = patientData.medicationLogs || [];

  // AI care summary: pick from latest alerts/insights
  const latestInsight =
    patientData.alerts?.find((a) => a.insight)?.insight ||
    "Patient data is within normal ranges. Continue monitoring daily vitals and medication adherence.";

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 h-full pb-20">
      {/* Patient Header */}
      <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm">
        <button
          onClick={() => setActivePatientId(null)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </button>
        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900 truncate">
              {profile.name}
            </h2>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                riskScore >= 60
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : riskScore >= 40
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              Risk: {riskScore}
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Age: {patientData.age} • ID: {patientData.id.toUpperCase()} •{" "}
            <span className="capitalize">
              {patientData.condition?.replace(/_/g, " ")}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setShowLogForm(showLogForm === "vital" ? "none" : "vital")
            }
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
              showLogForm === "vital"
                ? "bg-cyan-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Log Vitals
          </button>
          <button
            onClick={() =>
              setShowLogForm(showLogForm === "symptom" ? "none" : "symptom")
            }
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
              showLogForm === "symptom"
                ? "bg-cyan-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Log Symptom
          </button>
        </div>
      </div>

      {/* Log Forms (collapsible) */}
      {showLogForm === "vital" && (
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm max-w-lg">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">
            Log Vital Reading
          </h3>
          <form onSubmit={handleLogVital} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Type
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
                Value
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
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Reading
            </button>
          </form>
        </div>
      )}

      {showLogForm === "symptom" && (
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm max-w-lg">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">
            Log Symptom Observation
          </h3>
          <form onSubmit={handleLogSymptom} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Symptoms
              </label>
              <textarea
                required
                rows={3}
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
                    className={`flex-1 py-2 rounded-xl font-bold text-sm border transition-colors ${
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
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Report
            </button>
          </form>
        </div>
      )}

      {/* AI Care Summary Banner */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-[24px] p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5 text-cyan-700" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-cyan-900">AI Care Summary</h3>
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">
                Generated {new Date().toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-cyan-800 leading-relaxed">
              {latestInsight}
            </p>
          </div>
        </div>
      </div>

      {/* 3-Column Grid: Vitals, Biometrics, Medications */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Key Vitals */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-600" />
            Key Vitals
          </h3>
          <div className="space-y-4">
            {Object.entries(vitalsByType).length > 0 ? (
              Object.entries(vitalsByType)
                .slice(0, 4)
                .map(([type, entries]) => {
                  const meta = vitalTypeLabels[type] || {
                    label: type.replace(/_/g, " "),
                    icon: Activity,
                    color: "#64748b",
                  };
                  const latest = entries[0];
                  const sparkData = entries
                    .slice(0, 6)
                    .reverse()
                    .map((v) => v.value);

                  return (
                    <div
                      key={type}
                      className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 capitalize">
                          {meta.label}
                        </span>
                        <span className="text-lg font-black text-slate-800">
                          {latest.value}
                          <span className="text-xs font-medium text-slate-500 ml-1">
                            {latest.unit}
                          </span>
                        </span>
                      </div>
                      {sparkData.length > 1 && (
                        <Sparkline data={sparkData} color={meta.color} />
                      )}
                    </div>
                  );
                })
            ) : (
              <p className="text-sm text-slate-400 font-medium text-center py-6">
                No vitals recorded yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Symptoms */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-600" />
            Recent Symptoms
          </h3>
          <div className="space-y-3">
            {(symptomsData || patientData.symptoms || [])
              .slice(0, 5)
              .map((s) => (
                <div
                  key={s.id}
                  className="py-3 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700 capitalize truncate">
                      {s.symptoms.join(", ")}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.severity > 3
                          ? "bg-rose-100 text-rose-700"
                          : s.severity > 1
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      Sev {s.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {new Date(s.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            {(symptomsData || patientData.symptoms || []).length === 0 && (
              <p className="text-sm text-slate-400 font-medium text-center py-6">
                No symptoms logged
              </p>
            )}
          </div>
        </div>

        {/* Current Medications with Adherence */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Pill className="w-5 h-5 text-cyan-600" />
            Current Regimen
          </h3>
          <div className="space-y-3">
            {medications.length > 0 ? (
              medications.map((med, i) => {
                // Get last 5 logs for this medication
                const logs = medLogs
                  .filter((l) => l.medicationId === med.id)
                  .slice(0, 5);

                return (
                  <div
                    key={med.id}
                    className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                      <Pill className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {i + 1}. {med.name}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {logs.length > 0
                        ? logs.map((l, j) => (
                            <div
                              key={j}
                              className={`w-3.5 h-3.5 rounded-sm ${
                                l.status === "taken"
                                  ? "bg-emerald-500"
                                  : l.status === "missed"
                                  ? "bg-rose-500"
                                  : "bg-amber-400"
                              }`}
                              title={`${l.status} - ${new Date(l.takenAt).toLocaleDateString()}`}
                            />
                          ))
                        : [0, 1, 2, 3, 4].map((j) => (
                            <div
                              key={j}
                              className="w-3.5 h-3.5 rounded-sm bg-slate-200"
                            />
                          ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400 font-medium text-center py-6">
                No medications recorded
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Taken
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Missed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" /> No data
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Risk Assessment + Care Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-600" />
            Risk Assessment
          </h3>
          <div className="flex justify-around items-center">
            <RiskRing
              value={riskScore}
              label="Overall Risk"
              color={
                riskScore >= 60
                  ? "#f43f5e"
                  : riskScore >= 40
                  ? "#f59e0b"
                  : "#10b981"
              }
            />
            <RiskRing
              value={Math.min(
                100,
                ((patientData.reminders?.filter((r) => r.status === "done")
                  .length || 0) /
                  Math.max(patientData.reminders?.length || 1, 1)) *
                  100
              )}
              label="Adherence"
              color="#06b6d4"
            />
          </div>
        </div>

        {/* Care Insights */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-600" />
            Care Insights
          </h3>
          <div className="space-y-3">
            {allAlerts.length > 0 ? (
              allAlerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      alert.severity === "critical"
                        ? "bg-rose-100"
                        : "bg-amber-100"
                    }`}
                  >
                    <AlertTriangle
                      className={`w-3.5 h-3.5 ${
                        alert.severity === "critical"
                          ? "text-rose-600"
                          : "text-amber-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 leading-snug">
                      {alert.insight || alert.rule.replace(/_/g, " ")}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {new Date(alert.triggeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 py-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <p className="text-sm font-medium text-emerald-700">
                  No active alerts. Patient is stable.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
