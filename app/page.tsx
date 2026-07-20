"use client";

import { CircleUserRound, Menu, X, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, AlertTriangle, Check, Hourglass, Droplet, Moon, Footprints, Smile, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handlePortalTransition = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Animation variants for staggered load-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans text-slate-900">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-60 mix-blend-multiply contrast-125 grayscale sepia hue-rotate-[190deg] saturate-200"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4"
      />
      
      {/* Dark overlay with custom radial glow behind the hero visual */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/85 via-slate-50/65 to-slate-50/20 z-0 pointer-events-none" />
      <div className="absolute right-[-10%] top-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] glow-orb-primary opacity-20 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="absolute right-[10%] bottom-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] glow-orb-secondary opacity-15 blur-[150px] rounded-full z-0 pointer-events-none" />

      {/* Loading Pulse Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-slate-50 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* Circular glow pulse */}
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl"
              />
              {/* Radial ring pulse */}
              <div className="absolute w-20 h-20 rounded-full border border-cyan-600/30 animate-ping" />
              
              <svg className="w-24 h-24 text-cyan-600 z-10" viewBox="0 0 100 40">
                <motion.path
                  d="M10,20 L35,20 L42,5 L50,35 L58,15 L63,20 L90,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.85, ease: "easeInOut" }}
                />
              </svg>
            </div>
            
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-semibold tracking-[0.25em] text-cyan-600 uppercase animate-pulse"
            >
              Connecting Health Loop
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation (Top) */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 md:px-16 lg:px-20"
      >
        
        {/* Left: Custom SVG Logo */}
        <div className="flex items-center">
          <svg className="w-8 h-8 md:w-9 md:h-9 fill-cyan-600" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
          </svg>
        </div>

        {/* Center: Desktop Nav Pill */}
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-800 transition-opacity hover:text-cyan-600 hover:opacity-80">Home</Link>
          <button onClick={handlePortalTransition} className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none">Our Approach</button>
          <button onClick={handlePortalTransition} className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none">Healing Methods</button>
        </div>

        {/* Right: Desktop Avatar */}
        <button onClick={handlePortalTransition} className="hidden md:flex liquid-glass h-10 w-10 rounded-full items-center justify-center cursor-pointer hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95 bg-transparent border-none outline-none">
          <CircleUserRound className="h-5 w-5 text-slate-600" strokeWidth={1.5} />
        </button>

        {/* Right: Mobile Menu Toggle */}
        <button 
          className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center relative z-50 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
           <Menu className={`absolute h-5 w-5 text-slate-800 transition-all duration-300 ${menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
           <X className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
        </button>

      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl md:hidden"
          >
              <div className="flex flex-col items-center gap-8">
                <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-slate-900">Home</Link>
                <button onClick={(e) => { setMenuOpen(false); handlePortalTransition(e); }} className="text-2xl font-medium text-slate-600 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">Our Approach</button>
                <button onClick={(e) => { setMenuOpen(false); handlePortalTransition(e); }} className="text-2xl font-medium text-slate-600 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">Healing Methods</button>
                
                <button onClick={(e) => { setMenuOpen(false); handlePortalTransition(e); }} className="flex flex-col items-center gap-2 mt-4 cursor-pointer bg-transparent border-none outline-none">
                  <div className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center">
                     <CircleUserRound className="h-6 w-6 text-slate-600" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-light text-slate-500">Account</span>
                </button>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      <main className="relative z-10 min-h-[calc(100vh-88px)] px-6 sm:px-8 md:px-16 lg:px-20 py-8 md:py-16 flex flex-col justify-between">
        
        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          
          {/* Left Column: Heading and Description */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Custom Pill Badge */}
            <motion.div 
              variants={itemVariants}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
              onMouseMove={handleMouseMove}
              className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 relative overflow-hidden cursor-pointer"
            >
              {/* Cursor Glow Overlay */}
              {avatarHovered && (
                <div 
                  className="absolute inset-0 pointer-events-none rounded-full animate-fade-in"
                  style={{
                    background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.18), transparent 80%)`,
                    mixBlendMode: "screen"
                  }}
                />
              )}
              
              <div className="flex -space-x-2 relative z-10">
                <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 1" width={24} height={24} unoptimized className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
                <Image src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 2" width={24} height={24} unoptimized className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
                <Image src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 3" width={24} height={24} unoptimized className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
              </div>
              <span className="text-xs sm:text-sm font-light text-slate-600 pr-1 flex items-center gap-1.5 relative z-10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                Our path to natural wellness
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-slate-900 tracking-[-0.05em]"
            >
              Heal Your Body<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600">Naturally</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg md:text-xl font-light text-slate-600 max-w-lg leading-relaxed"
            >
              Experience care loop’s continuous, intelligent health companion. Bridging the gap between doctor visits with personalized daily wellness.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
              <button 
                onClick={handlePortalTransition}
                className="group rounded-full bg-cyan-600 hover:bg-cyan-700 px-7 py-3.5 text-sm font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_8px_20px_rgba(6,182,212,0.25)] cursor-pointer outline-none border-none"
              >
                Begin Your Journey
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </motion.div>

          {/* Right Column: Premium Smartphone Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center h-[550px] sm:h-[650px] w-full lg:translate-x-8 mt-12 lg:mt-0"
          >
            {/* Premium Background Elements */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[100px]" />
              <div className="absolute w-[300px] h-[300px] bg-cyan-200/30 rounded-full blur-[80px] translate-x-20 translate-y-20" />
              <div className="absolute w-[250px] h-[250px] bg-emerald-100/40 rounded-full blur-[70px] -translate-x-20 -translate-y-20" />
            </div>

            {/* Floating Notification 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 0.5, duration: 0.8 }, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
              className="absolute top-[10%] left-[-15%] sm:left-[-5%] z-30 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[220px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Medication Completed</h4>
                  <p className="text-[10px] text-slate-500">Morning Dose Taken On Time</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Notification 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ opacity: { delay: 0.7, duration: 0.8 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
              className="absolute top-[45%] right-[-15%] sm:right-[-5%] z-30 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[180px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Heart Rate Stable</h4>
                  <p className="text-[10px] text-slate-500">72 BPM • Normal Range</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Notification 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ opacity: { delay: 0.9, duration: 0.8 }, y: { repeat: Infinity, duration: 7, ease: "easeInOut" } }}
              className="absolute bottom-[10%] left-[-10%] sm:left-[5%] z-30 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[210px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Weekly Progress</h4>
                  <p className="text-[10px] text-slate-500">Health Score +6% This Week</p>
                </div>
              </div>
            </motion.div>

            {/* The Smartphone Mockup */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative z-20 w-[300px] h-[600px] bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[8px] border-slate-100 overflow-hidden flex flex-col ring-1 ring-slate-200/50"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                <div className="w-28 h-6 bg-slate-100 rounded-b-2xl"></div>
              </div>

              {/* Phone Content Scrollable Area */}
              <div className="flex-1 w-full bg-slate-50 overflow-y-auto overflow-x-hidden scrollbar-hide pt-10 pb-6 px-4 flex flex-col gap-3 relative">
                
                {/* Greeting Section */}
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Good Morning, Meera 👋</h2>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Your health journey is on track today.</p>
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                    <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Meera" width={36} height={36} unoptimized className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Daily Insight Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-3 text-white shadow-md relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-8 -translate-y-8" />
                  <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-100" />
                    <span className="text-[10px] font-bold text-cyan-50 uppercase tracking-wider">Today's Insight</span>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed relative z-10">
                    You're maintaining a healthy routine. Stay hydrated and don't forget your evening medication.
                  </p>
                </motion.div>

                {/* Health Score & Heart Rate Row */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Health Score Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col items-center text-center relative"
                  >
                    <span className="text-[9px] font-bold text-slate-500 uppercase mb-2">Health Score</span>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <motion.circle 
                          cx="50" cy="50" r="42" fill="none" stroke="#0d9488" strokeWidth="8" 
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "264", strokeDashoffset: "264" }}
                          animate={{ strokeDashoffset: 264 - (264 * 0.92) }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-black text-slate-800">92</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-teal-600 mt-2 leading-tight">Excellent Progress<br/><span className="text-[7px] text-teal-500 opacity-80">+6% improvement this week</span></span>
                  </motion.div>

                  {/* Heart Rate Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Heart Rate</span>
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-xl font-black text-slate-800">72</span>
                      <span className="text-[9px] text-slate-500">BPM</span>
                    </div>
                    <span className="text-[8px] font-bold text-emerald-600 mb-2">Normal</span>
                    
                    {/* Animated ECG Waveform */}
                    <div className="absolute bottom-2 left-0 right-0 h-6 opacity-50 flex items-end px-2">
                       <svg className="w-full h-full text-rose-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                         <motion.path 
                           d="M0,15 L20,15 L25,5 L30,25 L35,15 L100,15" 
                           fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         />
                       </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Today's Medication Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Pill className="w-3.5 h-3.5 text-indigo-500" />
                    <h3 className="text-[10px] font-bold text-slate-800 uppercase">Today's Medication</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 line-through">Morning Medicine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Hourglass className="w-2.5 h-2.5 text-amber-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800">Afternoon Medicine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Clock className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">Evening Medicine at 8:00 PM</span>
                    </div>
                  </div>
                </motion.div>

                {/* Wellness Progress Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 mb-2"
                >
                  <h3 className="text-[10px] font-bold text-slate-800 uppercase mb-3">Wellness Progress</h3>
                  
                  <div className="flex flex-col gap-3">
                    {/* Water */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Droplet className="w-2.5 h-2.5 text-blue-500"/> Water Intake</div>
                        <span className="text-blue-600">85%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-blue-500 rounded-full" />
                      </div>
                    </div>

                    {/* Sleep */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Moon className="w-2.5 h-2.5 text-indigo-500"/> Sleep Quality</div>
                        <span className="text-indigo-600">92%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-indigo-500 rounded-full" />
                      </div>
                    </div>

                    {/* Walk */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Footprints className="w-2.5 h-2.5 text-teal-500"/> Daily Walk Goal</div>
                        <span className="text-teal-600">76%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '76%' }} transition={{ duration: 1, delay: 1.0 }} className="h-full bg-teal-500 rounded-full" />
                      </div>
                    </div>

                    {/* Medication */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Pill className="w-2.5 h-2.5 text-emerald-500"/> Medication Adherence</div>
                        <span className="text-emerald-600">100%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 1.1 }} className="h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    {/* Mood */}
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg mt-1 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700">
                        <Smile className="w-3.5 h-3.5 text-orange-500" />
                        Mood Check-in
                      </div>
                      <span className="text-[9px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Positive</span>
                    </div>

                  </div>
                </motion.div>

              </div>
              
              {/* Fake Home Indicator */}
              <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
                <div className="w-20 h-1 bg-slate-300 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Stats Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.5 }}
          className="flex flex-wrap items-end gap-10 sm:gap-16 md:gap-24 pt-10 border-t border-slate-200 pb-4 mt-8"
        >
          
          {/* Stat 1 */}
          <div className="flex flex-col gap-2">
            <div className="relative w-5 h-5 flex flex-wrap content-between justify-between mb-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-[2.5px] h-[2.5px] bg-cyan-600/40 ${i === 4 ? 'opacity-0' : ''}`} />
              ))}
            </div>
            <span className="text-2xl sm:text-3xl font-normal text-slate-800 tracking-tight">48 Hours</span>
            <span className="text-xs sm:text-sm font-light text-slate-500">Initial Consultation</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-[2px] w-5 h-5 mb-2">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className={`w-[4px] h-[4px] rounded-[1px] ${(i % 2 === 0) ? 'bg-cyan-600/40' : 'bg-white/0'}`} />
               ))}
            </div>
            <span className="text-2xl sm:text-3xl font-normal text-slate-800 tracking-tight">500+ Sessions</span>
            <span className="text-xs sm:text-sm font-light text-slate-500">Healing Sessions</span>
          </div>

        </motion.div>

      </main>

      {/* Problem Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-20 py-24 md:py-32 border-t border-slate-200">
        
        {/* Problem Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em]"
          >
            Why Patient Self-Care Fails
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-base sm:text-lg font-light text-slate-500 leading-relaxed"
          >
            Infrequent clinic visits fail to capture daily realities. Ember addresses the four critical points of patient self-care failure.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Pill,
              title: "Missed Medications",
              desc: "Patients struggle to manage complex daily regimens, leading to missed doses and critical adherence lapses.",
              color: "from-pink-500/20 to-rose-500/20",
              iconColor: "text-pink-600",
              delay: 0
            },
            {
              icon: Activity,
              title: "Untracked Symptoms",
              desc: "Daily symptom flares and vital trends go unrecorded, leaving doctors with incomplete patient histories.",
              color: "from-cyan-500/20 to-teal-500/20",
              iconColor: "text-cyan-600",
              delay: 0.15
            },
            {
              icon: BrainCircuit,
              title: "High Friction",
              desc: "Traditional health tracking is tedious and manual, causing patients to abandon logging in a few days.",
              color: "from-blue-500/20 to-indigo-500/20",
              iconColor: "text-blue-600",
              delay: 0.3
            },
            {
              icon: AlertTriangle,
              title: "Data Disconnect",
              desc: "A massive clinical care gap exists between daily home realities and infrequent monthly check-ins.",
              color: "from-emerald-500/20 to-teal-500/20",
              iconColor: "text-emerald-600",
              delay: 0.45
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: card.delay }}
                className="liquid-glass group rounded-3xl p-6 flex flex-col justify-between h-72 hover:border-cyan-200 hover:bg-white/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center ${card.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-slate-500">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Styled CSS overrides for variables & custom orbs */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg-base: #f8fafc;
          --glow-primary: #06b6d4;
          --glow-secondary: #0891b2;
        }
        
        .liquid-glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.05);
        }

        .glow-orb-primary {
          background: radial-gradient(circle, var(--glow-primary) 0%, rgba(6, 182, 212, 0) 70%);
        }

        .glow-orb-secondary {
          background: radial-gradient(circle, var(--glow-secondary) 0%, rgba(8, 145, 178, 0) 70%);
        }
      `}} />

    </div>
  );
}
