"use client";

import React, { useEffect, useState } from "react";
import { PROFILES, useUser } from "@/components/UserProvider";
import { AppData } from "@/lib/types";
import {
  Phone,
  AlertTriangle,
  Heart,
  Pill,
  User,
  Shield,
  FileText,
} from "lucide-react";
import Image from "next/image";

interface PatientEmergency {
  id: string;
  name: string;
  avatar: string;
  age: number;
  condition: string;
  medications: { id: string; name: string }[];
  criticalAlerts: number;
}

export function CaregiverEmergencyInfo() {
  const { activeProfile } = useUser();
  const assignedPatients = activeProfile.assignedPatientIds || [];
  const [patients, setPatients] = useState<PatientEmergency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      assignedPatients.map((pid) =>
        fetch(`/api/patients/${pid}`)
          .then((r) => r.json())
          .then((data: AppData) => {
            const profile = PROFILES.find((p) => p.id === pid);
            return {
              id: pid,
              name: profile?.name || pid,
              avatar: profile?.avatar || "/avatars/avatar_meera.png",
              age: data.age || 0,
              condition: data.condition?.replace(/_/g, " ") || "Unknown",
              medications: data.medications || [],
              criticalAlerts:
                data.alerts?.filter(
                  (a) => a.severity === "critical" && !a.dismissed
                ).length || 0,
            };
          })
          .catch(() => null)
      )
    ).then((results) => {
      setPatients(results.filter((r): r is PatientEmergency => r !== null));
      setLoading(false);
    });
  }, [assignedPatients.join(",")]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Phone className="w-6 h-6 text-cyan-600" />
          Emergency Information
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Quick reference for emergency contacts, conditions, and medications.
        </p>
      </div>

      {/* Emergency Call Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-[24px] p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6 text-rose-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-rose-900 text-lg mb-1">
              Emergency Services
            </h3>
            <p className="text-sm text-rose-700 mb-3">
              In case of a medical emergency, call emergency services immediately.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call 112
              </a>
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ambulance: 108
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Per-Patient Emergency Cards */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-[24px] p-12 shadow-sm flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm"
          >
            {/* Patient Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-white shadow-sm">
                <Image
                  src={patient.avatar}
                  alt={patient.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg">
                  {patient.name}
                </h3>
                <p className="text-sm text-slate-500">
                  Age: {patient.age} • ID: {patient.id.toUpperCase()}
                </p>
              </div>
              {patient.criticalAlerts > 0 && (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
                  {patient.criticalAlerts} Active Alert
                  {patient.criticalAlerts > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Condition */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Primary Condition
                </h4>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <p className="font-bold text-slate-800 capitalize text-lg">
                    {patient.condition}
                  </p>
                </div>
              </div>

              {/* Active Medications */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Pill className="w-3.5 h-3.5" />
                  Active Medications
                </h4>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  {patient.medications.length > 0 ? (
                    <ul className="space-y-1.5">
                      {patient.medications.map((med) => (
                        <li
                          key={med.id}
                          className="text-sm font-medium text-slate-700 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          {med.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">No medications listed</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Notes */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Emergency Notes
              </h4>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800 leading-relaxed">
                  {patient.condition.includes("diabetes")
                    ? "Keep glucose tablets accessible. If blood sugar drops below 70 mg/dL, administer fast-acting sugar immediately. If unconscious, do not give food/drink — call emergency services."
                    : patient.condition.includes("hypertension")
                    ? "Monitor for signs of stroke: sudden numbness, confusion, trouble speaking, severe headache. If blood pressure exceeds 180/120 mmHg, seek immediate medical attention."
                    : patient.condition.includes("heart")
                    ? "If chest pain occurs, have patient sit down and rest. Administer prescribed nitroglycerin if available. If pain persists beyond 5 minutes, call emergency services immediately."
                    : patient.condition.includes("asthma")
                    ? "Keep rescue inhaler accessible at all times. If breathing becomes severely labored and inhaler doesn't help within 15 minutes, call emergency services."
                    : "Follow care plan guidelines. Contact primary physician for non-emergency concerns. Call emergency services for any acute medical event."}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
