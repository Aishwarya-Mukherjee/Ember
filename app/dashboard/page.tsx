"use client";

import { AppData, VitalsEntry } from "@/lib/types";
import { mockAppData } from "@/data/seed"; // Still using mock for patient/reminders/alerts
import { motion } from "framer-motion";
import { Activity, Bell, BrainCircuit, CheckCircle2, Droplet, Flame, Search, Pill, Stethoscope, AlertTriangle, MessageSquare, Heart, Scale, Calendar, FileDown } from "lucide-react";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import DoctorCanvas from "@/components/DoctorCanvas";

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
  const [data, setData] = useState<AppData>(mockAppData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    async function loadData() {
      try {
        const [vitalsRes, symptomsRes] = await Promise.all([
          fetch('/api/vitals?patientId=patient_001'),
          fetch('/api/symptoms?patientId=patient_001')
        ]);
        
        const vitals = await vitalsRes.json();
        const symptoms = await symptomsRes.json();
        
        setData(prev => ({
          ...prev,
          vitals: vitals.length > 0 ? vitals : prev.vitals,
          symptoms: symptoms.length > 0 ? symptoms : prev.symptoms,
        }));
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
              Good morning, {data.patient.name}
            </h1>
            <p className="text-slate-500 font-medium mt-1">Here&apos;s your health overview for today</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => showToast("Generating PDF Summary...")}
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">BP</span>
                      <Activity className="w-3 h-3 text-red-500" />
                    </div>
                    <p className="text-xl font-black text-slate-800 mt-1">120/80</p>
                    <p className="text-xs text-slate-500">mmHg</p>
                    <Sparkline data={[118, 122, 119, 120, 121, 120]} color="#ef4444" />
                  </div>
                  <div className="bg-white/50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">Heart Rate</span>
                      <Heart className="w-3 h-3 text-red-500" />
                    </div>
                    <p className="text-xl font-black text-slate-800 mt-1">72</p>
                    <p className="text-xs text-slate-500">bpm</p>
                    <Sparkline data={[75, 74, 71, 72, 72, 73]} color="#ef4444" />
                  </div>
                  <div className="bg-white/50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">Blood Sugar</span>
                      <Droplet className="w-3 h-3 text-cyan-500" />
                    </div>
                    <p className="text-xl font-black text-slate-800 mt-1">98</p>
                    <p className="text-xs text-slate-500">mg/dL</p>
                    <Sparkline data={[102, 100, 99, 98, 97, 98]} color="#06b6d4" />
                  </div>
                  <div className="bg-white/50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">Weight</span>
                      <Scale className="w-3 h-3 text-slate-500" />
                    </div>
                    <p className="text-xl font-black text-slate-800 mt-1">68</p>
                    <p className="text-xs text-slate-500">kg</p>
                    <Sparkline data={[68.5, 68.3, 68.2, 68.1, 68.0, 68.0]} color="#64748b" />
                  </div>
                </div>
              </GlassPanel>

              {/* AI Insight */}
              <GlassPanel className="relative overflow-hidden">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <BrainCircuit className="w-4 h-4 text-cyan-500" /> AI Insight
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10 font-medium">
                  Your blood pressure is stable and within normal range. Great job maintaining your health!
              </p>
              <button onClick={() => setActiveModal("Insights")}
                  className="mt-4 px-4 py-2 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md z-10 relative hover:shadow-lg hover:bg-cyan-700 transition-all"
              >
                  View Details
              </button>
              
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
                <div className="space-y-3">
                  <div className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60 cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setActiveModal("Alert: High BP")}>
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">High BP Reading</p>
                      <p className="text-xs text-slate-500">Today, 7:45 AM</p>
                    </div>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">New</span>
                  </div>
                  <div className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60 cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setActiveModal("Alert: Missed Medication")}>
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Pill className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">Missed Medication</p>
                      <p className="text-xs text-slate-500">Yesterday, 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>

            </div>
          </div>
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
                className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={4}
                placeholder="Type your symptoms here..."
              ></textarea>
              
              <button onClick={() => { setActiveModal(null); showToast("Check-in saved!"); }}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md"
              >
                Log Check-in
              </button>
            </div>
          )}

          {activeModal === "Log Vitals" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Blood Pressure (mmHg)</label>
                <input type="text" defaultValue="120/80" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Blood Sugar (mg/dL)</label>
                <input type="number" defaultValue="98" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Heart Rate (bpm)</label>
                <input type="number" defaultValue="72" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm" />
              </div>
              <button
                onClick={() => { setActiveModal(null); showToast("Vitals logged successfully!"); }}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md"
              >
                Save Vitals Log
              </button>
            </div>
          )}

          {activeModal === "Symptoms" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">Select any symptoms experienced today:</p>
              <div className="flex flex-wrap gap-2">
                {["Dizziness", "Fatigue", "Headache", "Nausea", "Shortness of Breath"].map((sym) => (
                  <button key={sym} className="px-3 py-1.5 rounded-xl border border-cyan-200 text-cyan-700 text-xs font-semibold hover:bg-cyan-50">
                    + {sym}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setActiveModal(null); showToast("Symptom log updated!"); }}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-bold text-sm shadow-md mt-2"
              >
                Confirm Symptoms
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
