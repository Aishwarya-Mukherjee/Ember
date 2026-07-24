"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PROFILES, useUser } from "@/components/UserProvider";
import Image from "next/image";
import {
  AlertTriangle,
  ChevronRight,
  Activity,
  Clock,
  Bell,
  User,
  Users,
  Heart,
  Pill,
  Calendar,
  ChevronLeft,
  TrendingUp,
  Shield,
} from "lucide-react";
import { AppData } from "@/lib/types";

// Mini Calendar Component
function MiniCalendar() {
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
        <span className="font-bold text-sm text-slate-800">
          {monthNames[month]} {year}
        </span>
        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((d) => (
          <div key={d} className="text-[10px] font-bold text-slate-400 py-1">
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={`text-xs font-medium py-1.5 rounded-lg transition-colors ${
              day === today
                ? "bg-cyan-600 text-white font-bold"
                : day
                ? "text-slate-600 hover:bg-slate-100 cursor-pointer"
                : ""
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// Timeline Event
function TimelineEvent({
  icon: Icon,
  iconBg,
  title,
  subtitle,
  time,
}: {
  icon: any;
  iconBg: string;
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate">{title}</p>
        <p className="text-xs text-slate-500 truncate">{subtitle}</p>
      </div>
      <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap mt-0.5">
        {time}
      </span>
    </div>
  );
}

// Patient row in the patient list
export function PatientRow({
  patientId,
  onSelect,
}: {
  patientId: string;
  onSelect: () => void;
}) {
  const profile = PROFILES.find((p) => p.id === patientId);
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    fetch(`/api/patients/${patientId}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error);
  }, [patientId]);

  if (!profile) return null;

  const criticalCount =
    data?.alerts?.filter((a) => a.severity === "critical" && !a.dismissed)
      .length || 0;
  const riskScore = criticalCount > 0 ? Math.min(50 + criticalCount * 15, 95) : 25;
  const conditionLabel = data?.condition
    ? data.condition.replace(/_/g, " ")
    : "Loading...";

  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-cyan-200 transition-all cursor-pointer group"
    >
      <div className="w-11 h-11 bg-slate-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={44}
          height={44}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 group-hover:text-cyan-700 transition-colors truncate">
          {profile.name}
        </p>
        <p className="text-xs text-slate-500 capitalize truncate">
          {conditionLabel}
        </p>
      </div>
      {criticalCount > 0 && (
        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full whitespace-nowrap">
          {criticalCount} Alert{criticalCount > 1 ? "s" : ""}
        </span>
      )}
      <div className="flex items-center gap-2">
        <span
          className={`text-xs font-bold px-3 py-1.5 rounded-full ${
            riskScore >= 60
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : riskScore >= 40
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          Risk {riskScore}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-600 transition-colors" />
      </div>
    </div>
  );
}

export function CaregiverDashboard() {
  const router = useRouter();
  const { activeProfile, setActivePatientId } = useUser();
  const assignedPatients = activeProfile.assignedPatientIds || [];

  // Fetch all patient data for summary cards
  const [allPatientsData, setAllPatientsData] = useState<AppData[]>([]);
  useEffect(() => {
    Promise.all(
      assignedPatients.map((pid) =>
        fetch(`/api/patients/${pid}`)
          .then((r) => r.json())
          .catch(() => null)
      )
    ).then((results) =>
      setAllPatientsData(results.filter((r): r is AppData => r !== null))
    );
  }, [assignedPatients.join(",")]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Compute summary metrics
  const totalPatients = assignedPatients.length;
  const criticalPatients = allPatientsData.filter(
    (p) => p.alerts?.some((a) => a.severity === "critical" && !a.dismissed)
  ).length;
  const stablePatients = totalPatients - criticalPatients;

  const totalAlerts = allPatientsData.reduce(
    (sum, p) =>
      sum + (p.alerts?.filter((a) => !a.dismissed).length || 0),
    0
  );
  const criticalAlerts = allPatientsData.reduce(
    (sum, p) =>
      sum +
      (p.alerts?.filter((a) => a.severity === "critical" && !a.dismissed)
        .length || 0),
    0
  );

  // Build timeline events from all patients
  const upcomingReminders = allPatientsData
    .flatMap((p) =>
      (p.reminders || []).map((r) => ({
        ...r,
        patientName: PROFILES.find((pr) => pr.id === p.id)?.name || p.id,
      }))
    )
    .filter((r) => r.status === "pending")
    .slice(0, 5);

  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 h-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-2 mb-1">
            Caregiver Overview
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              ONLINE
            </span>
          </p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {getGreeting()}, {activeProfile.name.split(" ")[0]}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {totalPatients} patient{totalPatients !== 1 ? "s" : ""} in your care
            today.{" "}
            {criticalAlerts > 0
              ? `${criticalAlerts} critical alert${criticalAlerts > 1 ? "s" : ""} require attention.`
              : "All patients are stable."}
          </p>
        </div>
      </div>

      {/* Main Grid: Left content + Right sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT: Summary + Patient List */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Patients Card */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500">Patients</h3>
                <Users className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="flex items-end gap-6">
                <div>
                  <span className="text-3xl font-black text-slate-900">
                    {totalPatients}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Total
                  </p>
                </div>
                <div>
                  <span className="text-2xl font-black text-rose-600">
                    {criticalPatients}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Critical
                  </p>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-600">
                    {stablePatients}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Stable
                  </p>
                </div>
              </div>
            </div>

            {/* Alerts Card */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500">
                  Alerts Today
                </h3>
                <Bell className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="flex items-end gap-6">
                <div>
                  <span className="text-3xl font-black text-slate-900">
                    {totalAlerts}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Active
                  </p>
                </div>
                <div>
                  <span className="text-2xl font-black text-rose-600">
                    {criticalAlerts}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Critical
                  </p>
                </div>
              </div>
            </div>

            {/* Condition Breakdown Card */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500">
                  By Condition
                </h3>
                <Shield className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="space-y-2">
                {(() => {
                  const condMap: Record<string, number> = {};
                  allPatientsData.forEach((p) => {
                    const c = p.condition
                      ? p.condition.replace(/_/g, " ")
                      : "unknown";
                    condMap[c] = (condMap[c] || 0) + 1;
                  });
                  return Object.entries(condMap).map(([cond, count]) => (
                    <div
                      key={cond}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-slate-600 capitalize">
                        {cond}
                      </span>
                      <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </div>
                  ));
                })()}
                {allPatientsData.length === 0 && (
                  <p className="text-xs text-slate-400 font-medium">
                    Loading...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                Patient&apos;s List
              </h2>
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                Today
              </span>
            </div>
            {assignedPatients.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-[24px] p-12 text-center shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  No Patients Assigned
                </h3>
                <p className="text-slate-500 mt-2 max-w-sm text-sm">
                  Contact an administrator to add patients to your care circle.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {assignedPatients.map((pid) => (
                  <PatientRow
                    key={pid}
                    patientId={pid}
                    onSelect={() => {
                      setActivePatientId(pid);
                      router.push("/dashboard");
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Calendar + Timeline */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Calendar */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <MiniCalendar />
            <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors">
              Add Event
            </button>
          </div>

          {/* Today's Timeline */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800">{todayStr}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Today&apos;s Timeline
                </p>
              </div>
              <span className="text-xs font-medium text-cyan-600 cursor-pointer hover:underline">
                All
              </span>
            </div>

            {upcomingReminders.length > 0 ? (
              <div>
                {upcomingReminders.map((r) => (
                  <TimelineEvent
                    key={r.id}
                    icon={
                      r.type === "medication"
                        ? Pill
                        : r.type === "appointment"
                        ? Calendar
                        : Bell
                    }
                    iconBg={
                      r.type === "medication"
                        ? "bg-cyan-100 text-cyan-600"
                        : r.type === "appointment"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-amber-100 text-amber-600"
                    }
                    title={r.label || "Reminder"}
                    subtitle={r.patientName}
                    time={new Date(r.scheduledAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-slate-400 font-medium">
                  No upcoming events today
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
