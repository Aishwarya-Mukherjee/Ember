"use client";

import React, { useEffect, useState } from "react";
import { PROFILES, useUser } from "@/components/UserProvider";
import { AppData, RiskAlert } from "@/lib/types";
import { Bell, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

interface AlertWithPatient extends RiskAlert {
  patientName: string;
  patientAvatar: string;
}

export function CaregiverAlerts() {
  const { activeProfile } = useUser();
  const assignedPatients = activeProfile.assignedPatientIds || [];
  const [alerts, setAlerts] = useState<AlertWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "critical" | "warning">("all");

  useEffect(() => {
    setLoading(true);
    Promise.all(
      assignedPatients.map((pid) =>
        fetch(`/api/patients/${pid}`)
          .then((r) => r.json())
          .then((data: AppData) => {
            const profile = PROFILES.find((p) => p.id === pid);
            return (data.alerts || []).map((a) => ({
              ...a,
              patientName: profile?.name || pid,
              patientAvatar: profile?.avatar || "/avatars/avatar_meera.png",
            }));
          })
          .catch(() => [])
      )
    ).then((results) => {
      const all = results
        .flat()
        .filter((a) => !a.dismissed)
        .sort(
          (a, b) =>
            new Date(b.triggeredAt).getTime() -
            new Date(a.triggeredAt).getTime()
        );
      setAlerts(all);
      setLoading(false);
    });
  }, [assignedPatients.join(",")]);

  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter((a) => a.severity === filter);

  const criticalCount = alerts.filter((a) => a.severity === "critical").length;
  const warningCount = alerts.filter((a) => a.severity === "warning").length;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Bell className="w-6 h-6 text-cyan-600" />
          Alerts
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Risk notifications and health alerts across all your patients.
        </p>
      </div>

      {/* Summary + Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
            filter === "all"
              ? "bg-cyan-600 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setFilter("critical")}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
            filter === "critical"
              ? "bg-rose-600 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Critical ({criticalCount})
        </button>
        <button
          onClick={() => setFilter("warning")}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
            filter === "warning"
              ? "bg-amber-600 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Warning ({warningCount})
        </button>
      </div>

      {/* Alert List */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-[24px] p-12 shadow-sm flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[24px] p-12 text-center shadow-sm flex flex-col items-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">All Clear</h3>
          <p className="text-slate-500 text-sm mt-1">
            No {filter !== "all" ? filter : ""} alerts at this time.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white border rounded-[20px] p-5 shadow-sm flex items-start gap-4 transition-all hover:shadow-md ${
                alert.severity === "critical"
                  ? "border-rose-200"
                  : "border-amber-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  alert.severity === "critical"
                    ? "bg-rose-100"
                    : "bg-amber-100"
                }`}
              >
                <AlertTriangle
                  className={`w-5 h-5 ${
                    alert.severity === "critical"
                      ? "text-rose-600"
                      : "text-amber-600"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={alert.patientAvatar}
                      alt=""
                      width={20}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {alert.patientName}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      alert.severity === "critical"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 capitalize mb-1">
                  {alert.rule.replace(/_/g, " ")}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {alert.insight || "Rule triggered without additional context."}
                </p>
                <p className="text-[10px] text-slate-400 mt-2">
                  {new Date(alert.triggeredAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
