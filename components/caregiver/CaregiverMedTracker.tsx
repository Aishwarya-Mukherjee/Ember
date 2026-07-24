"use client";

import React, { useEffect, useState } from "react";
import { PROFILES, useUser } from "@/components/UserProvider";
import { AppData } from "@/lib/types";
import { Pill, CheckCircle2, XCircle, Clock } from "lucide-react";
import Image from "next/image";

interface MedWithPatient {
  patientId: string;
  patientName: string;
  patientAvatar: string;
  medId: string;
  medName: string;
  logs: { status: string; takenAt: string }[];
}

export function CaregiverMedTracker() {
  const { activeProfile } = useUser();
  const assignedPatients = activeProfile.assignedPatientIds || [];
  const [meds, setMeds] = useState<MedWithPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      assignedPatients.map((pid) =>
        fetch(`/api/patients/${pid}`)
          .then((r) => r.json())
          .then((data: AppData) => {
            const profile = PROFILES.find((p) => p.id === pid);
            return (data.medications || []).map((med) => ({
              patientId: pid,
              patientName: profile?.name || pid,
              patientAvatar: profile?.avatar || "/avatars/avatar_meera.png",
              medId: med.id,
              medName: med.name,
              logs: (data.medicationLogs || [])
                .filter((l) => l.medicationId === med.id)
                .slice(0, 7)
                .map((l) => ({ status: l.status, takenAt: l.takenAt })),
            }));
          })
          .catch(() => [])
      )
    ).then((results) => {
      setMeds(results.flat());
      setLoading(false);
    });
  }, [assignedPatients.join(",")]);

  // Group by patient
  const byPatient: Record<string, MedWithPatient[]> = {};
  meds.forEach((m) => {
    if (!byPatient[m.patientId]) byPatient[m.patientId] = [];
    byPatient[m.patientId].push(m);
  });

  const totalMeds = meds.length;
  const totalTaken = meds.reduce(
    (sum, m) => sum + m.logs.filter((l) => l.status === "taken").length,
    0
  );
  const totalMissed = meds.reduce(
    (sum, m) => sum + m.logs.filter((l) => l.status === "missed").length,
    0
  );

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Pill className="w-6 h-6 text-cyan-600" />
          Medication Tracker
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Track medication adherence across all your patients.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900">{totalMeds}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
            Active Meds
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm text-center">
          <p className="text-2xl font-black text-emerald-600">{totalTaken}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
            Doses Taken
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm text-center">
          <p className="text-2xl font-black text-rose-600">{totalMissed}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
            Doses Missed
          </p>
        </div>
      </div>

      {/* Per-Patient Medication Cards */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-[24px] p-12 shadow-sm flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        Object.entries(byPatient).map(([pid, patientMeds]) => {
          const first = patientMeds[0];
          return (
            <div
              key={pid}
              className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={first.patientAvatar}
                    alt=""
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-slate-800">
                  {first.patientName}
                </h3>
              </div>

              <div className="space-y-3">
                {patientMeds.map((med, i) => {
                  const taken = med.logs.filter(
                    (l) => l.status === "taken"
                  ).length;
                  const total = med.logs.length;
                  const adherence =
                    total > 0 ? Math.round((taken / total) * 100) : 0;

                  return (
                    <div
                      key={med.medId}
                      className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                        <Pill className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {i + 1}. {med.medName}
                        </p>
                      </div>
                      <div className="flex gap-1 mr-3">
                        {med.logs.length > 0
                          ? med.logs.map((l, j) => (
                              <div
                                key={j}
                                className={`w-4 h-4 rounded-sm ${
                                  l.status === "taken"
                                    ? "bg-emerald-500"
                                    : l.status === "missed"
                                    ? "bg-rose-500"
                                    : "bg-amber-400"
                                }`}
                                title={`${l.status} - ${new Date(l.takenAt).toLocaleDateString()}`}
                              />
                            ))
                          : [0, 1, 2, 3, 4, 5, 6].map((j) => (
                              <div
                                key={j}
                                className="w-4 h-4 rounded-sm bg-slate-200"
                              />
                            ))}
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          adherence >= 80
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : adherence >= 50
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : total === 0
                            ? "bg-slate-50 text-slate-500 border border-slate-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {total > 0 ? `${adherence}%` : "N/A"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />{" "}
                  Taken
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />{" "}
                  Missed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />{" "}
                  Skipped
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" /> No
                  data
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
