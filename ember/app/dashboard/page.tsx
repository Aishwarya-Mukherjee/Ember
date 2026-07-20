"use client";

import { mockAppData } from "@/data/seed";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Activity, Bell, BrainCircuit, CheckCircle2, Droplet, Flame, Search, Mic, Pill, Stethoscope, AlertTriangle, MessageSquare, Heart } from "lucide-react";
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
  const today = new Date();

  return (
    <div className="min-h-[1000px] h-full relative overflow-hidden bg-[#f0f2f9]">
      
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
            <p className="text-slate-500 font-medium mt-1">Here's your health overview for today</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-sm cursor-pointer hover:bg-white transition-colors">
               <Search className="w-5 h-5 text-slate-600" />
             </div>
             <div className="w-12 h-12 bg-white/70 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-sm cursor-pointer hover:bg-white transition-colors relative">
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
              <h3 className="font-bold text-slate-800 mb-4">Today's Progress</h3>
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

            <DoctorCanvas />

            {/* Arc Buttons */}
            <div className="absolute bottom-[24px] flex gap-6 z-40">
               <button className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Check-in</span>
               </button>
               <button className="flex flex-col items-center gap-2 group translate-y-4">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <Activity className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Log Vitals</span>
               </button>
               <button className="flex flex-col items-center gap-2 group translate-y-4">
                 <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Symptoms</span>
               </button>
               <button className="flex flex-col items-center gap-2 group">
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
               <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md z-10 relative hover:shadow-lg transition-shadow">
                 View Details
               </button>
               {/* Decorative 3D brain icon mock (colored orb) */}
               <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-24 h-24 bg-purple-400/30 blur-xl rounded-full" />
            </GlassPanel>

            {/* Recent Alerts */}
            <GlassPanel className="flex-1">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Recent Alerts</h3>
                  <span className="text-xs font-bold text-purple-600 cursor-pointer">View all</span>
               </div>
               <div className="space-y-3">
                  <div className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60">
                     <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                       <AlertTriangle className="w-4 h-4 text-red-500" />
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-slate-800">High BP Reading</p>
                       <p className="text-[10px] text-slate-500">Today, 7:45 AM</p>
                     </div>
                     <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">New</span>
                  </div>
                  <div className="flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-white/60">
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
    </div>
  );
}
