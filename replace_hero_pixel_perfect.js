const fs = require('fs');

const code = `"use client";

import { CircleUserRound, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, ShieldCheck, Star, Users, TrendingUp, BellRing, Droplet, Moon, Footprints, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handlePortalTransition = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f0f8ff] overflow-hidden font-sans selection:bg-cyan-100">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Very subtle light blooms */}
        <div className="absolute w-[800px] h-[800px] bg-white rounded-full blur-[100px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-[80px] top-[10%] right-[10%]" />
        <div className="absolute w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] bottom-[-20%] left-[20%]" />
        
        {/* Grid / Network pattern from top right */}
        <svg className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10" viewBox="0 0 600 600">
           <path d="M100,0 L600,500 M200,0 L600,400 M300,0 L600,300 M400,0 L600,200 M500,0 L600,100" stroke="#0ea5e9" strokeWidth="1" />
           <path d="M0,100 L500,600 M0,200 L400,600 M0,300 L300,600 M0,400 L200,600 M0,500 L100,600" stroke="#0ea5e9" strokeWidth="1" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-12 sm:pt-8 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-semibold text-slate-800">Meera</span>
        </div>
        <div className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-white shadow-sm">
          <Link href="/" className="text-sm font-medium text-slate-800 hover:text-cyan-600">Home</Link>
          <button className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors">Our Approach</button>
          <button className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors">Healing Methods</button>
        </div>
        <button className="hidden md:flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
            <CircleUserRound className="w-5 h-5 text-slate-600" />
          </div>
        </button>
      </nav>

      {/* Main Hero Content */}
      <main className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 pt-12 pb-24 flex flex-col xl:flex-row items-center justify-between min-h-[calc(100vh-100px)]">
        
        {/* LEFT COLUMN */}
        <div className="w-full xl:w-[45%] flex flex-col pt-10 xl:pt-0 z-20 shrink-0">
          
          {/* Avatar Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-2 py-1.5 pr-5 mb-8 shadow-sm border border-white w-max"
          >
            <div className="flex -space-x-2">
              <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Our path to natural wellness
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-[80px] font-medium leading-[1.05] text-[#0f172a] tracking-tight"
          >
            Heal Your Body<br/>
            <span className="text-[#0891b2]">Naturally</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed font-light"
          >
            Experience care loop's continuous, intelligent health companion. Bridging the gap between doctor visits with personalized daily wellness.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button 
              onClick={handlePortalTransition}
              className="group rounded-full bg-[#0891b2] hover:bg-[#0e7490] px-8 py-4 text-base font-medium text-white flex items-center gap-2 transition-all shadow-[0_8px_20px_rgba(8,145,178,0.3)] hover:shadow-[0_12px_25px_rgba(8,145,178,0.4)] hover:-translate-y-0.5"
            >
              Begin Your Journey
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Bottom Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-8 mt-20"
          >
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">Secure & Private</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Your data is 100%<br/>encrypted and safe.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                <Star className="w-5 h-5 text-cyan-600 fill-cyan-600/20" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">AI-Powered Insights</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Personalized insights<br/>for a healthier you.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                <Users className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">Doctor & Family</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Everyone connected.<br/>Everyone informed.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Hologram Ecosystem */}
        <div className="w-full xl:w-[55%] relative h-[800px] flex items-center justify-center mt-16 xl:mt-0">
          
          {/* Base Platform (The glowing oval floor) */}
          <div className="absolute bottom-10 w-[700px] h-[200px] rounded-[100%] border-4 border-white/40 shadow-[0_0_80px_rgba(34,211,238,0.4)] bg-gradient-to-t from-cyan-100/30 to-transparent transform perspective-1000 rotateX-75 z-0" />
          <div className="absolute bottom-14 w-[500px] h-[150px] rounded-[100%] border border-cyan-200/50 bg-cyan-300/10 transform perspective-1000 rotateX-75 z-0" />

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.3))' }}>
            <defs>
              <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* From Center (Health Score) to Cards */}
            {/* Center is roughly 50% X, 60% Y */}
            
            {/* Left Lines */}
            {/* To Heart Health */}
            <path d="M 50% 60% L 35% 30% L 25% 30%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="25%" cy="30%" r="3" fill="#06b6d4" />
            
            {/* To Blood Pressure */}
            <path d="M 50% 60% L 35% 45% L 25% 45%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="25%" cy="45%" r="3" fill="#06b6d4" />
            
            {/* To Sleep Quality */}
            <path d="M 50% 60% L 40% 65% L 30% 65%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="30%" cy="65%" r="3" fill="#06b6d4" />
            
            {/* To Daily Activity */}
            <path d="M 50% 60% L 45% 80% L 35% 80%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="35%" cy="80%" r="3" fill="#06b6d4" />

            {/* Right Lines */}
            {/* To Mental Wellness */}
            <path d="M 50% 60% L 65% 35% L 75% 35%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="75%" cy="35%" r="3" fill="#06b6d4" />
            
            {/* To Medication */}
            <path d="M 50% 60% L 70% 50% L 80% 50%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="80%" cy="50%" r="3" fill="#06b6d4" />

            {/* To Hydration */}
            <path d="M 50% 60% L 65% 70% L 75% 70%" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="opacity-60" />
            <circle cx="75%" cy="70%" r="3" fill="#06b6d4" />
          </svg>

          {/* Holographic Silhouette */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative z-15 w-[320px] h-[700px] flex items-center justify-center"
          >
            {/* Fallback SVG for the body if an image is not available */}
            <svg className="w-full h-full opacity-70 filter drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]" viewBox="0 0 200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bodyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cffafe" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <motion.path 
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                d="M100 30 C88 30 78 45 78 60 C78 75 88 85 96 90 L104 90 C112 85 122 75 122 60 C122 45 112 30 100 30 Z" fill="url(#bodyGrad2)" />
              <motion.path 
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                d="M96 98 L104 98 C115 98 135 110 145 125 C155 140 160 160 155 180 C150 200 140 230 135 250 C130 270 135 290 145 320 C155 350 150 380 140 420 L130 460 L120 580 L102 580 L102 440 C102 430 98 430 98 440 L98 580 L80 580 L70 460 L60 420 C50 380 45 350 55 320 C65 290 70 270 65 250 C60 230 50 200 45 180 C40 160 45 140 55 125 C65 110 85 98 96 98 Z" fill="url(#bodyGrad2)" />
            </svg>

            {/* Glowing Heart in Chest */}
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 text-rose-400 fill-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.9)]" />
              </motion.div>
            </div>
            
            {/* Central Health Score over Belly */}
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-32 h-32 bg-teal-400 rounded-full blur-[25px] absolute"
              />
              <div className="w-28 h-28 bg-gradient-to-br from-[#14b8a6] to-[#047857] rounded-full flex flex-col items-center justify-center relative z-10 border-4 border-white/20 shadow-[0_0_30px_rgba(20,184,166,0.6)]">
                <span className="text-[9px] text-teal-100 font-medium mb-1 tracking-wide">Health Score</span>
                <span className="text-4xl text-white font-bold leading-none shadow-sm">92</span>
                <span className="text-[10px] text-teal-100 font-medium mt-1">Excellent</span>
              </div>
            </div>
          </motion.div>

          {/* OVERLAY CARDS (Exactly matched to reference) */}
          
          {/* Left Side Cards */}
          {/* 1. Heart Health */}
          <motion.div 
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.1 }}
            className="absolute top-[20%] left-[-15%] xl:left-[-10%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[180px]">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-inner">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Heart Health</span>
                  <span className="text-[10px] text-slate-500 font-medium">Stable</span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <span className="text-lg font-bold text-teal-500 leading-none">72 <span className="text-[10px] font-medium text-teal-500/70">BPM</span></span>
                <svg className="w-14 h-5" viewBox="0 0 50 15">
                  <path d="M0,8 L10,8 L13,2 L17,14 L20,8 L50,8" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* 2. Blood Pressure */}
          <motion.div 
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[40%] left-[-20%] xl:left-[-15%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[180px]">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-inner">
                  <Droplet className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Blood Pressure</span>
                  <span className="text-[10px] text-slate-500 font-medium">Normal</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-teal-600 leading-none">118 <span className="text-sm font-medium text-slate-400">/ 76</span></span>
                <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-teal-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Sleep Quality */}
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.2 }}
            className="absolute top-[60%] left-[-15%] xl:left-[-10%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[180px]">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shadow-inner">
                  <Moon className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Sleep Quality</span>
                  <span className="text-[10px] text-slate-500 font-medium">Excellent</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-indigo-600 leading-none">7h 45m</span>
                <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-indigo-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Daily Activity */}
          <motion.div 
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-[80%] left-[-5%] xl:left-[0%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[200px]">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-inner">
                  <Footprints className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Daily Activity</span>
                  <span className="text-[10px] text-slate-500 font-medium">On Track</span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <span className="text-sm font-bold text-blue-600 leading-none">7,800 <span className="text-[10px] font-normal text-slate-500">Steps</span></span>
                <span className="text-[10px] font-bold text-slate-400">78% Goal</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="w-[78%] h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Cards */}
          {/* 1. Mental Wellness */}
          <motion.div 
            animate={{ y: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.3 }}
            className="absolute top-[25%] right-[-10%] xl:right-[-5%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[180px]">
              <div className="flex gap-3 items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-inner">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Mental Wellness</span>
                  <span className="text-[10px] text-slate-500 font-medium">Calm</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <span className="text-xs font-semibold text-purple-500">Low Stress</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Medication */}
          <motion.div 
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.9 }}
            className="absolute top-[45%] right-[-15%] xl:right-[-10%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[180px]">
              <div className="flex gap-3 items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-inner">
                  <Pill className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Medication</span>
                  <span className="text-[10px] text-slate-500 font-medium">On Track</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-emerald-500">Morning Done</span>
                <span className="text-[10px] font-medium text-slate-500">Next: 8:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* 3. Hydration */}
          <motion.div 
            animate={{ y: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 1.4 }}
            className="absolute top-[65%] right-[-10%] xl:right-[-5%] z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/50 w-[150px]">
              <div className="flex gap-3 items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-inner">
                  <Droplet className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Hydration</span>
                  <span className="text-[10px] text-slate-500 font-medium">Good</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-blue-500 leading-none">85%</span>
                <span className="text-[10px] font-medium text-slate-400">Keep it up!</span>
              </div>
            </div>
          </motion.div>

        </div>

      </main>

      {/* BOTTOM GLASS PANELS (Floating over the base) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="w-full max-w-[1200px] mx-auto absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-50 flex justify-center gap-6"
      >
        {/* Panel 1 */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-5 border border-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] w-[260px] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">Today's Insight</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Your health is improving consistently. Continue your current routine.
          </p>
          <div className="mt-auto pt-3 flex justify-end">
             <TrendingUp className="w-4 h-4 text-slate-300" />
          </div>
        </div>

        {/* Panel 2 */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-5 border border-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] w-[260px] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center">
              <BellRing className="w-3.5 h-3.5 text-cyan-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">Medication Reminder</h4>
          </div>
          <p className="text-[11px] text-slate-600 mb-2 font-medium">Evening Medicine</p>
          <div className="mt-auto flex justify-between items-end">
             <span className="text-base font-bold text-cyan-600">8:00 PM</span>
             <Clock className="w-4 h-4 text-slate-300" />
          </div>
        </div>

        {/* Panel 3 */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-5 border border-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] w-[260px] flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">Weekly Progress</h4>
          </div>
          <p className="text-[11px] text-slate-600 font-medium relative z-10">Health Score Improved</p>
          <div className="mt-auto flex justify-between items-end relative z-10">
             <span className="text-3xl font-bold text-emerald-500 tracking-tighter leading-none">+6%</span>
             <div className="flex flex-col items-end">
               <span className="text-[10px] text-slate-400 font-medium">This Week</span>
               <TrendingUp className="w-4 h-4 text-emerald-400 mt-1" />
             </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
`;
fs.writeFileSync('app/page.tsx', code, 'utf-8');
console.log('Replaced successfully');
