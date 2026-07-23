"use client";

import { AppData, VitalsEntry, SymptomLog } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import { Activity, Bell, BrainCircuit, CheckCircle2, Droplet, Flame, Search, Pill, Stethoscope, AlertTriangle, MessageSquare, Heart, Scale, Calendar, FileDown } from "lucide-react";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import DoctorCanvas from "@/components/DoctorCanvas";
import { MedicationsTab } from "@/components/tabs/MedicationsTab";
import { VitalsTab } from "@/components/tabs/VitalsTab";
import { SymptomsTab } from "@/components/tabs/SymptomsTab";
import { InsightsTab } from "@/components/tabs/InsightsTab";
import { AppointmentsTab } from "@/components/tabs/AppointmentsTab";
import { CheckInTab } from "@/components/tabs/CheckInTab";
import { ReportsTab } from "@/components/tabs/ReportsTab";
import { CareCircleTab } from "@/components/tabs/CareCircleTab";

const Sparkline = ({ data, color }: { data: number[], color: string }) => (
  <div className="h-8 mt-2 -mx-1">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((val, i) => ({ val, i }))}>
        <Line type="monotone" dataKey="val" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Shared Panel Component
const GlassPanel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

function DashboardContent() {
  const { data: patientData, error: patientError, isLoading: patientLoading, mutate: mutatePatient } = useSWR<AppData>('/api/patients/patient_001', fetcher);
  const { data: vitalsData, error: vitalsError, isLoading: vitalsLoading, mutate: mutateVitals } = useSWR<VitalsEntry[]>('/api/vitals?patientId=patient_001', fetcher);
  const { data: symptomsData, error: symptomsError, isLoading: symptomsLoading, mutate: mutateSymptoms } = useSWR<SymptomLog[]>('/api/symptoms?patientId=patient_001', fetcher);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  // Form states
  const [checkInText, setCheckInText] = useState("");
  const [vitalBP, setVitalBP] = useState("");
  const [vitalSugar, setVitalSugar] = useState("");
  const [vitalHR, setVitalHR] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent crashes on initial load
  const safeData: AppData = patientData || ({} as AppData);
  const alerts = safeData.alerts || [];
  const topAlert = alerts.length > 0 ? alerts[0] : null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCheckIn = async () => {
    if (!checkInText.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: 'patient_001', text: checkInText }),
      });
      if (res.ok) {
        showToast("Check-in saved!");
        setActiveModal(null);
        setCheckInText("");
        mutatePatient();
        mutateVitals();
        mutateSymptoms();
      } else {
        showToast("Failed to save check-in");
      }
    } catch (e) {
      showToast("Error saving check-in");
    }
    setIsSubmitting(false);
  };

  const handleLogVitals = async () => {
    setIsSubmitting(true);
    try {
      const postVital = async (type: string, value: number, unit: string) => {
        return fetch('/api/vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patientId: 'patient_001', type, value, unit }),
        });
      };

      const promises = [];
      if (vitalBP) {
        const parts = vitalBP.split('/');
        const sys = parseFloat(parts[0]);
        const dia = parts.length > 1 ? parseFloat(parts[1]) : NaN;
        if (!isNaN(sys)) promises.push(postVital('blood_pressure', sys, 'mmHg'));
        if (!isNaN(dia)) promises.push(postVital('blood_pressure_diastolic', dia, 'mmHg'));
      }
      if (vitalSugar) {
        const val = parseFloat(vitalSugar);
        if (!isNaN(val)) promises.push(postVital('blood_sugar', val, 'mg/dL'));
      }
      if (vitalHR) {
        const val = parseFloat(vitalHR);
        if (!isNaN(val)) promises.push(postVital('heart_rate', val, 'bpm'));
      }
      
      if (promises.length > 0) {
        await Promise.all(promises);
        showToast("Vitals logged successfully!");
        setVitalBP(""); setVitalSugar(""); setVitalHR("");
      }
      setActiveModal(null);
      mutateVitals();
      mutatePatient();
    } catch (e) {
      showToast("Error saving vitals");
    }
    setIsSubmitting(false);
  };

  const handleLogSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patientId: 'patient_001', 
          symptoms: selectedSymptoms, 
          severity: 2, 
          rawText: "Logged from UI checkboxes" 
        }),
      });
      if (res.ok) {
        showToast("Symptom log updated!");
        setActiveModal(null);
        setSelectedSymptoms([]);
        mutateSymptoms();
        mutatePatient();
      } else {
        showToast("Failed to log symptoms");
      }
    } catch (e) {
      showToast("Error saving symptoms");
    }
    setIsSubmitting(false);
  };

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const renderVitalCard = (type: string, title: string, icon: React.ReactNode, color: string, defaultUnit: string) => {
    const data = vitalsData?.filter((v: VitalsEntry) => v.type === type) || [];
    if (data.length === 0) {
      return (
        <div className="bg-white/50 rounded-2xl p-3 border border-slate-100 opacity-50 flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-500">{title}</span>
            {icon}
          </div>
          <p className="text-sm font-black text-slate-400 mt-2 flex-1 flex items-center">No data</p>
        </div>
      );
    }
    const sparkline = data.slice(0, 6).reverse().map((v: VitalsEntry) => v.value);
    return (
      <div className="bg-white/50 rounded-2xl p-3 border border-slate-100">
        <div className="flex justify-between">
          <span className="text-xs font-bold text-slate-500">{title}</span>
          {icon}
        </div>
        <p className="text-xl font-black text-slate-800 mt-1">{data[0].value}</p>
        <p className="text-xs text-slate-500">{data[0].unit || defaultUnit}</p>
        <Sparkline data={sparkline} color={color} />
      </div>
    );
  };

  if (patientLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-bold">Loading your health dashboard...</p>
      </div>
    );
  }

  if (patientError || !patientData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <p className="font-bold text-slate-800 text-lg">Error loading data</p>
        <p className="text-sm">{(patientError as any)?.info?.error || "Please try again later."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-y-auto bg-slate-50 pb-12">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* --- Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full h-full p-4 md:p-8 flex flex-col">

        {/* Top Header Row */}
        <div className="hidden md:flex justify-between items-start mb-8 w-full max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Good morning, {safeData.patient?.name || 'Guest'}
            </h1>
            <p className="text-slate-500 font-medium mt-1">Here&apos;s your health overview for today</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open("/report/print", "_blank")}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Export Summary
            </button>
            <div
              onClick={() => setActiveModal("Search")}
              className="w-12 h-12 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-sm cursor-pointer hover:bg-white transition-colors"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </div>
            <div
              onClick={() => setActiveModal("Notifications")}
              className="w-12 h-12 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-sm cursor-pointer hover:bg-white transition-colors relative"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">3</div>
            </div>
          </div>
        </div>

        {/* 3-Column Layout */}
        {tab === "dashboard" ? (
          <div className="flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">

            {/* LEFT COLUMN */}
            <div className="w-full xl:col-span-3 flex flex-col gap-6">

              {/* Health Score */}
              <GlassPanel>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-emerald-500" /> Health Score
                </h3>
                <div className="relative w-32 h-32 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#0d9488" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="45.216" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-slate-800">82<span className="text-sm font-medium text-slate-500">/100</span></span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1">
                  ↑ 8 pts from last week
                </div>
              </GlassPanel>

              {/* Adherence Streak */}
              <GlassPanel>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-orange-500" /> Adherence Streak
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-extrabold text-slate-800">12</span>
                  <span className="text-sm font-medium text-slate-500">Days</span>
                </div>
                <div className="h-12 w-full bg-slate-50 rounded-xl relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path d="M0,20 Q12.5,30 25,15 T50,10 T75,25 T100,10 L100,30 L0,30 Z" fill="#ccfbf1" />
                    <path d="M0,20 Q12.5,30 25,15 T50,10 T75,25 T100,10" fill="none" stroke="#0d9488" strokeWidth="2" />
                    <circle cx="99" cy="11.5" r="2" fill="#0d9488" />
                  </svg>
                </div>
              </GlassPanel>

              {/* Today's Progress */}
              <GlassPanel className="flex-1">
                <h3 className="font-bold text-slate-800 mb-4">Today&apos;s Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                      <span className="font-medium text-slate-700">Medications</span>
                    </div>
                    <span className="text-slate-500 font-bold">2/3</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                      <span className="font-medium text-slate-700">Vitals Logged</span>
                    </div>
                    <span className="text-slate-500 font-bold">2/3</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                      <span className="font-medium text-slate-700">Symptoms</span>
                    </div>
                    <span className="text-slate-500 font-bold">1/1</span>
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* CENTER COLUMN */}
            <div className="w-full xl:col-span-6 flex flex-col items-center justify-start pt-32 xl:pt-48 min-h-[400px] xl:min-h-[500px]">
              <div className="relative w-full flex flex-col items-center">
                <DoctorCanvas onSelectAction={(act) => setActiveModal(act)} />

                {/* Arc Buttons */}
                <div className="relative mt-[-20px] flex gap-4 z-40">
                  <button onClick={() => setActiveModal("Check-in")} className="flex flex-col items-center gap-2 group p-2 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                      <MessageSquare className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Check-in</span>
                  </button>
                  <button onClick={() => setActiveModal("Log Vitals")} className="flex flex-col items-center gap-2 group translate-y-4 p-2 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                      <Activity className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Vitals</span>
                  </button>
                  <button onClick={() => setActiveModal("Symptoms")} className="flex flex-col items-center gap-2 group translate-y-4 p-2 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                      <Stethoscope className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Symptoms</span>
                  </button>
                  <button onClick={() => setActiveModal("Ask AI")} className="flex flex-col items-center gap-2 group p-2 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                      <BrainCircuit className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Ask AI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-full xl:col-span-3 flex flex-col gap-6 mt-12 xl:mt-0">

              {/* Vitals Overview */}
              <GlassPanel>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Vitals Overview</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live</div>
                </div>
                {vitalsLoading ? (
                  <div className="h-40 flex items-center justify-center text-slate-400 font-medium text-sm gap-2">
                    <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    Loading vitals...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {renderVitalCard('blood_pressure', 'BP', <Activity className="w-3 h-3 text-red-500" />, '#ef4444', 'mmHg')}
                    {renderVitalCard('heart_rate', 'Heart Rate', <Heart className="w-3 h-3 text-red-500" />, '#ef4444', 'bpm')}
                    {renderVitalCard('blood_sugar', 'Blood Sugar', <Droplet className="w-3 h-3 text-cyan-500" />, '#06b6d4', 'mg/dL')}
                    {renderVitalCard('weight', 'Weight', <Scale className="w-3 h-3 text-slate-500" />, '#64748b', 'kg')}
                  </div>
                )}
              </GlassPanel>

              {/* AI Insight */}
              <GlassPanel className="relative overflow-hidden">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                    <BrainCircuit className="w-4 h-4 text-cyan-500" /> AI Insight
                </h3>
                {patientLoading ? (
                  <div className="animate-pulse h-12 bg-slate-100 rounded-xl w-full"></div>
                ) : topAlert ? (
                  <p className="text-sm text-slate-600 leading-relaxed relative z-10 font-medium">
                      {topAlert.insight}
                  </p>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed relative z-10 font-medium opacity-70">
                      No new insights at this time.
                  </p>
                )}
                
                {topAlert && (
                  <button onClick={() => setActiveModal(`Alert: ${topAlert.rule}`)}
                      className="mt-4 px-4 py-2 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md z-10 relative hover:shadow-lg hover:bg-cyan-700 transition-all"
                  >
                      View Details
                  </button>
                )}
                
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                  AI insights are for informational purposes only. Consult your doctor.
                </div>
                
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-400/30 blur-xl rounded-full" />
              </GlassPanel>

              {/* Recent Alerts */}
              <GlassPanel className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Recent Alerts</h3>
                  <span onClick={() => setActiveModal("All Alerts")} className="text-xs font-bold text-cyan-600 cursor-pointer hover:underline">View all</span>
                </div>
                {patientLoading ? (
                  <div className="space-y-3">
                    <div className="animate-pulse h-12 bg-slate-100 rounded-xl w-full"></div>
                    <div className="animate-pulse h-12 bg-slate-100 rounded-xl w-full"></div>
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="h-20 flex items-center justify-center text-slate-400 font-medium text-sm">No recent alerts.</div>
                ) : (
                  <div className="space-y-3">
                    {alerts.slice(0, 3).map((alert: any) => (
                      <div key={alert.id} className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60 cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setActiveModal(`Alert: ${alert.rule}`)}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${alert.severity === 'critical' ? 'bg-red-100' : 'bg-orange-100'}`}>
                          <AlertTriangle className={`w-4 h-4 ${alert.severity === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800 capitalize">{alert.rule.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-slate-500">{new Date(alert.triggeredAt).toLocaleDateString()}</p>
                        </div>
                        {alert.severity === 'critical' && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">New</span>}
                      </div>
                    ))}
                  </div>
                )}
              </GlassPanel>

            </div>
          </div>
        ) : tab === "medications" ? (
          <MedicationsTab patientData={safeData} />
        ) : tab === "vitals" ? (
          <VitalsTab vitalsData={vitalsData || []} />
        ) : tab === "symptoms" ? (
          <SymptomsTab symptomsData={symptomsData || []} />
        ) : tab === "insights" ? (
          <InsightsTab patientData={safeData} />
        ) : tab === "appointments" ? (
          <AppointmentsTab patientData={safeData} />
        ) : tab === "check-in" ? (
          <CheckInTab patientData={safeData} />
        ) : tab === "reports" ? (
          <ReportsTab patientData={safeData} />
        ) : tab === "care-circle" ? (
          <CareCircleTab patientData={safeData} />
        ) : (
          <div className="flex-1 max-w-7xl mx-auto w-full flex items-center justify-center">
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-12 rounded-3xl text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-2 capitalize">{tab.replace("-", " ")}</h2>
              <p className="text-slate-500">Detailed view coming soon for the MVP.</p>
            </div>
          </div>
        )}
      </div>

      {/* --- Interactive Modal Backdrop & Content --- */}
      <Dialog open={!!activeModal} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200 rounded-3xl p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">{activeModal}</DialogTitle>
            <DialogDescription className="hidden">Modal content for {activeModal}</DialogDescription>
          </DialogHeader>

          {activeModal === "Check-in" && (
            <div className="space-y-4">
              <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100 text-cyan-900 text-sm">
                How are you feeling today? Any new symptoms to report?
              </div>
              
              <textarea 
                value={checkInText}
                onChange={(e) => setCheckInText(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={4}
                placeholder="Type your symptoms here..."
              ></textarea>
              
              <button 
                onClick={handleCheckIn}
                disabled={isSubmitting || !checkInText.trim()}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Log Check-in"}
              </button>
            </div>
          )}

          {activeModal === "Log Vitals" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Blood Pressure (mmHg)</label>
                <input type="text" value={vitalBP} onChange={(e) => setVitalBP(e.target.value)} placeholder="120/80" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Blood Sugar (mg/dL)</label>
                <input type="number" value={vitalSugar} onChange={(e) => setVitalSugar(e.target.value)} placeholder="98" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Heart Rate (bpm)</label>
                <input type="number" value={vitalHR} onChange={(e) => setVitalHR(e.target.value)} placeholder="72" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm" />
              </div>
              <button
                onClick={handleLogVitals}
                disabled={isSubmitting || (!vitalBP && !vitalSugar && !vitalHR)}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Vitals Log"}
              </button>
            </div>
          )}

          {activeModal === "Symptoms" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">Select any symptoms experienced today:</p>
              <div className="flex flex-wrap gap-2">
                {["Dizziness", "Fatigue", "Headache", "Nausea", "Shortness of Breath"].map((sym) => (
                  <button 
                    key={sym} 
                    onClick={() => toggleSymptom(sym)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${selectedSymptoms.includes(sym) ? 'bg-cyan-500 text-white border-cyan-500' : 'border-cyan-200 text-cyan-700 hover:bg-cyan-50'}`}
                  >
                    {selectedSymptoms.includes(sym) ? "✓ " : "+ "}{sym}
                  </button>
                ))}
              </div>
              <button
                onClick={handleLogSymptoms}
                disabled={isSubmitting || selectedSymptoms.length === 0}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Confirm Symptoms"}
              </button>
            </div>
          )}

          {activeModal === "Ask AI" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">Ask Ember AI any health or routine question:</p>
              <input type="text" placeholder="e.g., When should I take Lisinopril?" className="w-full border border-slate-200 rounded-xl p-3 text-sm" />
              <button
                onClick={() => { setActiveModal(null); showToast("Ember AI is generating your response..."); }}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md"
              >
                Ask Ember
              </button>
            </div>
          )}

          {(activeModal === "AI Detailed Summary" || activeModal === "Insights" || activeModal === "All Alerts" || activeModal?.startsWith("Alert:")) && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p><strong>Patient:</strong> Meera Sharma (Age 58)</p>
                <p><strong>Primary Condition:</strong> Type 2 Diabetes &amp; Mild Hypertension</p>
                <p><strong>Adherence:</strong> 12 days consecutive logging streak</p>
                <p><strong>Pattern Detected:</strong> Blood sugar trends elevated past 14 days; blood pressure steady at 120/80.</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold text-xs"
              >
                Close Summary
              </button>
            </div>
          )}

          {(activeModal === "Search" || activeModal === "Notifications") && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">3 Notifications active:</p>
              <div className="text-xs space-y-2">
                <div className="p-2.5 bg-cyan-50 rounded-xl border border-cyan-100 flex items-start gap-2">
                  <Pill className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <span>Scheduled dose: Metformin 500mg (8:00 AM)</span>
                </div>
                <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>Missed dose flag: Lisinopril 10mg</span>
                </div>
                <div className="p-2.5 bg-cyan-50 rounded-xl border border-cyan-100 flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <span>Doctor Appointment with Dr. Anya in 2 days</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold text-xs mt-2"
              >
                Done
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-[1000px] h-full flex items-center justify-center bg-[#f0f2f9]">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
