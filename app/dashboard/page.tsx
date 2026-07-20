"use client";

import { mockAppData } from "@/data/seed";
import { motion } from "framer-motion";
import { Activity, Bell, BrainCircuit, CheckCircle2, Droplet, Flame, Search, Pill, Stethoscope, AlertTriangle, MessageSquare, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import DoctorCanvas from "@/components/DoctorCanvas";

// Shared Glass Panel Component
const GlassPanel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/50 backdrop-blur-3xl border border-white/60 rounded-[32px] p-6 shadow-[0_8px_32px_rgba(139,92,246,0.1)] ${className}`}>
    {children}
  </div>
);

export default function DashboardPage() {
  const data = mockAppData;
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-[1000px] h-full relative overflow-hidden bg-[#f0f2f9]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/90 text-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* --- Holographic Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <Image src="/dna-bg.png" alt="DNA Background" fill className="object-cover opacity-30 mix-blend-color-burn" />
         {/* Glowing Orbs */}
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full h-full p-8 flex flex-col">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-start mb-8 w-full max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Good morning, {data.patient.name} <span className="text-2xl">👋</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Here&apos;s your health overview for today</p>
          </div>
          
          <div className="flex items-center gap-4">
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
               <div className="absolute top-0 right-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">3</div>
             </div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="flex-1 grid grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
          
          {/* LEFT COLUMN */}
          <div className="col-span-3 flex flex-col gap-6">
            
            {/* Health Score */}
            <GlassPanel className="flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-800">Health Score</h3>
              </div>
              <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 251 }}
                      animate={{ strokeDashoffset: 251 - (251 * 82) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="50" cy="50" r="40" 
                      stroke="#8b5cf6" 
                      strokeWidth="10" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeDasharray="251" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-slate-800">82<span className="text-sm font-medium text-slate-500">/100</span></span>
                  </div>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
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
              <div className="h-12 w-full bg-slate-100 rounded-xl relative overflow-hidden">
                 <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path d="M0,20 Q10,30 20,15 T40,10 T60,25 T80,10 T100,5 L100,30 L0,30 Z" fill="#ede9fe" />
                    <path d="M0,20 Q10,30 20,15 T40,10 T60,25 T80,10 T100,5" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                    <circle cx="80" cy="10" r="2" fill="#8b5cf6" />
                 </svg>
              </div>
            </GlassPanel>

            {/* Today's Progress */}
            <GlassPanel className="flex-1">
              <h3 className="font-bold text-slate-800 mb-4">Today&apos;s Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                    <span className="font-medium text-slate-700">Medications</span>
                  </div>
                  <span className="text-slate-500 font-bold">2/3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
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
          <div className="col-span-6 relative flex flex-col items-center justify-end pb-8 min-h-[500px]">

            <DoctorCanvas onSelectAction={(act) => setActiveModal(act)} />

            {/* Arc Buttons */}
            <div className="absolute bottom-[24px] flex gap-6 z-40">
               <button onClick={() => setActiveModal("Check-in")} className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Check-in</span>
               </button>
               <button onClick={() => setActiveModal("Log Vitals")} className="flex flex-col items-center gap-2 group translate-y-4">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <Activity className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Log Vitals</span>
               </button>
               <button onClick={() => setActiveModal("Symptoms")} className="flex flex-col items-center gap-2 group translate-y-4">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Symptoms</span>
               </button>
               <button onClick={() => setActiveModal("Ask AI")} className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <BrainCircuit className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Ask AI</span>
               </button>
            </div>
            
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-3 flex flex-col gap-6">
            
            {/* Vitals Overview */}
            <GlassPanel>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Vitals Overview</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live</div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-2xl p-3 border border-white/60">
                     <div className="flex justify-between">
                       <span className="text-xs font-bold text-slate-500">BP</span>
                       <Activity className="w-3 h-3 text-red-500" />
                     </div>
                     <p className="text-xl font-black text-slate-800 mt-1">120/80</p>
                     <p className="text-[10px] text-slate-400">mmHg</p>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-3 border border-white/60">
                     <div className="flex justify-between">
                       <span className="text-xs font-bold text-slate-500">Heart Rate</span>
                       <Heart className="w-3 h-3 text-red-500" />
                     </div>
                     <p className="text-xl font-black text-slate-800 mt-1">72</p>
                     <p className="text-[10px] text-slate-400">bpm</p>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-3 border border-white/60">
                     <div className="flex justify-between">
                       <span className="text-xs font-bold text-slate-500">Blood Sugar</span>
                       <Droplet className="w-3 h-3 text-purple-500" />
                     </div>
                     <p className="text-xl font-black text-slate-800 mt-1">98</p>
                     <p className="text-[10px] text-slate-400">mg/dL</p>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-3 border border-white/60">
                     <div className="flex justify-between">
                       <span className="text-xs font-bold text-slate-500">Weight</span>
                       <span className="text-[10px]">⚖️</span>
                     </div>
                     <p className="text-xl font-black text-slate-800 mt-1">68</p>
                     <p className="text-[10px] text-slate-400">kg</p>
                  </div>
               </div>
            </GlassPanel>

            {/* AI Insight */}
            <GlassPanel className="relative overflow-hidden">
               <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                 <BrainCircuit className="w-4 h-4 text-purple-500" /> AI Insight
               </h3>
               <p className="text-sm text-slate-600 font-medium leading-relaxed pr-16 relative z-10">
                 Your blood pressure is stable and within normal range. Great job maintaining your health!
               </p>
               <button 
                 onClick={() => setActiveModal("AI Detailed Summary")}
                 className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md z-10 relative hover:shadow-lg transition-shadow"
               >
                 View Details
               </button>
               {/* Decorative 3D brain icon mock (colored orb) */}
               <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-24 h-24 bg-purple-400/30 blur-xl rounded-full" />
            </GlassPanel>

            {/* Recent Alerts */}
            <GlassPanel className="flex-1">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Recent Alerts</h3>
                  <span onClick={() => setActiveModal("All Alerts")} className="text-xs font-bold text-purple-600 cursor-pointer hover:underline">View all</span>
               </div>
               <div className="space-y-3">
                  <div className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60 cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setActiveModal("Alert: High BP")}>
                     <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                       <AlertTriangle className="w-4 h-4 text-red-500" />
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-slate-800">High BP Reading</p>
                       <p className="text-[10px] text-slate-500">Today, 7:45 AM</p>
                     </div>
                     <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">New</span>
                  </div>
                  <div className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60 cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setActiveModal("Alert: Missed Medication")}>
                     <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                       <Pill className="w-4 h-4 text-orange-500" />
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-slate-800">Missed Medication</p>
                       <p className="text-[10px] text-slate-500">Yesterday, 9:00 PM</p>
                     </div>
                  </div>
               </div>
            </GlassPanel>

          </div>
        </div>
      </div>

      {/* --- Interactive Modal Backdrop & Content --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">{activeModal}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            {activeModal === "Check-in" && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Daily conversational check-in with Ember AI:</p>
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-purple-900 text-sm">
                  &ldquo;Hi Meera, how are you feeling overall today? Any headache, dizziness, or fatigue?&rdquo;
                </div>
                <textarea 
                  placeholder="Type your response here..." 
                  className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
                <button 
                  onClick={() => { setActiveModal(null); showToast("Check-in response saved!"); }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/20"
                >
                  Submit Check-in
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
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/20"
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
                    <button key={sym} className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-50">
                      + {sym}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => { setActiveModal(null); showToast("Symptom log updated!"); }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/20 mt-2"
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
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/20"
                >
                  Ask Ember
                </button>
              </div>
            )}

            {(activeModal === "AI Detailed Summary" || activeModal === "All Alerts" || activeModal?.startsWith("Alert:")) && (
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
                  <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">💊 Scheduled dose: Metformin 500mg (8:00 AM)</div>
                  <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100">⚠️ Missed dose flag: Lisinopril 10mg</div>
                  <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">📅 Doctor Appointment with Dr. Anya in 2 days</div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold text-xs mt-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

