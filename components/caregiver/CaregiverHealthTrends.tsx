"use client";

import React, { useEffect, useState } from "react";
import { PROFILES, useUser } from "@/components/UserProvider";
import { AppData, VitalsEntry } from "@/lib/types";
import { TrendingUp, Activity, Heart, Droplet, Pill } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function PatientVitalsCard({ patientId }: { patientId: string }) {
  const profile = PROFILES.find((p) => p.id === patientId);
  const [data, setData] = useState<AppData | null>(null);
  const [vitals, setVitals] = useState<VitalsEntry[]>([]);

  useEffect(() => {
    fetch(`/api/patients/${patientId}`)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);

    fetch(`/api/vitals?patientId=${patientId}`)
      .then((r) => r.json())
      .then(setVitals)
      .catch(console.error);
  }, [patientId]);

  if (!profile) return null;

  // Group vitals by type
  const vitalsByType: Record<string, VitalsEntry[]> = {};
  vitals.forEach((v) => {
    if (!vitalsByType[v.type]) vitalsByType[v.type] = [];
    vitalsByType[v.type].push(v);
  });

  // Medication adherence
  const totalMeds = data?.medications?.length || 0;
  const takenLogs =
    data?.medicationLogs?.filter((l) => l.status === "taken").length || 0;
  const totalLogs = data?.medicationLogs?.length || 1;
  const adherencePercent = Math.round((takenLogs / Math.max(totalLogs, 1)) * 100);

  const conditionLabel = data?.condition?.replace(/_/g, " ") || "Loading...";

  return (
    <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
      {/* Patient Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-lg">{profile.name}</h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                (data?.alerts?.filter((a) => a.severity === "critical" && !a.dismissed).length || 0) > 0
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {(data?.alerts?.filter((a) => a.severity === "critical" && !a.dismissed).length || 0) > 0
                ? "Elevated Risk"
                : "Stable"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ID: {patientId.toUpperCase()} • Age: {data?.age || "—"} •{" "}
            <span className="capitalize">{conditionLabel}</span>
          </p>
        </div>
      </div>

      {/* Vitals Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {Object.entries(vitalsByType)
          .slice(0, 4)
          .map(([type, entries]) => {
            const latest = entries[0];
            return (
              <div
                key={type}
                className="bg-slate-50 border border-slate-100 rounded-xl p-3"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider capitalize mb-1">
                  {type.replace(/_/g, " ")}
                </p>
                <p className="text-lg font-black text-slate-800">
                  {latest.value}
                  <span className="text-xs font-medium text-slate-400 ml-1">
                    {latest.unit}
                  </span>
                </p>
              </div>
            );
          })}
      </div>

      {/* Med Adherence Bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500">Med Adherence</span>
          <span className="text-xs font-bold text-slate-800">{adherencePercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              adherencePercent >= 80
                ? "bg-emerald-500"
                : adherencePercent >= 50
                ? "bg-amber-500"
                : "bg-rose-500"
            }`}
            style={{ width: `${adherencePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function CaregiverHealthTrends() {
  const { activeProfile } = useUser();
  const assignedPatients = activeProfile.assignedPatientIds || [];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-cyan-600" />
          Health Trends
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Detailed biometric tracking and adherence analysis across your patients.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {assignedPatients.map((pid) => (
          <PatientVitalsCard key={pid} patientId={pid} />
        ))}
      </div>
    </div>
  );
}
