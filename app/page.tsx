"use client";

import { CircleUserRound, Menu, X, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, AlertTriangle, Check, Hourglass, Droplet, Moon, Footprints, Smile, Clock, ShieldCheck, Star, Users, TrendingUp, BellRing } from "lucide-react";
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
      <main className="relative z-10 min-h-[calc(100vh-88px)] px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12 flex flex-col justify-center overflow-hidden">
        
        {/* Background Environment (Luxurious Healthcare) */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Radial Blooms */}
          <div className="absolute w-[800px] h-[800px] bg-cyan-50/40 rounded-full blur-[120px] top-[-20%] left-[-10%]" />
          <div className="absolute w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-[100px] bottom-[-10%] right-[-10%]" />
          <div className="absolute w-[500px] h-[500px] bg-emerald-50/40 rounded-full blur-[100px] top-[30%] right-[20%]" />
          <div className="absolute w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[90px] bottom-[20%] left-[20%]" />
          
          {/* Faint Neural Network / Wave Patterns */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500" fill="none" stroke="#2dd4bf" strokeWidth="0.5" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M0,700 C200,600 300,800 500,700 C700,600 800,800 1000,700" fill="none" stroke="#67e8f9" strokeWidth="0.3" strokeDasharray="2 4" />
          </svg>
        </div>

        {/* The overall grid container */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 w-full max-w-[1400px] mx-auto items-center relative z-20">
          
          {/* LEFT COLUMN */}
          <div className="xl:col-span-5 flex flex-col pt-8 xl:pt-0">
            {/* Avatar Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 relative overflow-hidden self-start"
            >
              <div className="flex -space-x-2 relative z-10">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 1" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/80 object-cover" />
                <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 2" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/80 object-cover" />
                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 3" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/80 object-cover" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 pr-2 flex items-center gap-1.5 relative z-10">
                <Sparkles className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
                Our path to natural wellness
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] text-slate-900 tracking-tight"
            >
              Heal Your Body<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600">Naturally</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg lg:text-xl font-light text-slate-600 max-w-md leading-relaxed"
            >
              Experience care loop’s continuous, intelligent health companion. Bridging the gap between doctor visits with personalized daily wellness.
            </motion.p>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10"
            >
              <button 
                onClick={handlePortalTransition}
                className="group rounded-full bg-cyan-600 hover:bg-cyan-700 px-8 py-4 text-sm sm:text-base font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg shadow-cyan-600/30 cursor-pointer"
              >
                Begin Your Journey
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Bottom Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-6 mt-16 xl:mt-24"
            >
              <div className="flex gap-3 items-start max-w-[140px]">
                <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Secure & Private</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Your data is 100% encrypted and safe.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start max-w-[140px]">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                  <Star className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">AI-Powered Insights</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Personalized insights for a healthier you.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start max-w-[140px]">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Doctor & Family</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Everyone connected. Everyone informed.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Holographic Digital Ecosystem */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="xl:col-span-7 relative h-[650px] sm:h-[750px] lg:h-[800px] w-full flex items-center justify-center mt-12 xl:mt-0 xl:translate-x-12"
          >
            {/* Glowing Floor Platform */}
            <div className="absolute bottom-[5%] w-[400px] sm:w-[600px] h-[100px] sm:h-[150px] bg-cyan-400/20 rounded-full blur-[40px] border border-cyan-300/30 transform perspective-[800px] rotateX-[75deg]" />

            {/* Connection Lines (SVG) - Placed behind cards but over background */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ filter: 'drop-shadow(0 0 6px rgba(20,184,166,0.3))' }}>
              <defs>
                <linearGradient id="lineGradL" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#99f6e4" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradR" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#99f6e4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Center point approx (50%, 55%) */}
              {/* Left Lines */}
              <path d="M 50% 55% Q 35% 20% 15% 15%" fill="none" stroke="url(#lineGradL)" strokeWidth="1.5" className="opacity-70" />
              <path d="M 50% 55% Q 30% 35% 15% 35%" fill="none" stroke="url(#lineGradL)" strokeWidth="1.5" className="opacity-70" />
              <path d="M 50% 55% Q 30% 60% 15% 55%" fill="none" stroke="url(#lineGradL)" strokeWidth="1.5" className="opacity-70" />
              <path d="M 50% 55% Q 35% 85% 15% 75%" fill="none" stroke="url(#lineGradL)" strokeWidth="1.5" className="opacity-70" />
              {/* Right Lines */}
              <path d="M 50% 55% Q 65% 20% 85% 20%" fill="none" stroke="url(#lineGradR)" strokeWidth="1.5" className="opacity-70" />
              <path d="M 50% 55% Q 70% 45% 85% 45%" fill="none" stroke="url(#lineGradR)" strokeWidth="1.5" className="opacity-70" />
              <path d="M 50% 55% Q 65% 80% 85% 70%" fill="none" stroke="url(#lineGradR)" strokeWidth="1.5" className="opacity-70" />
              
              {/* Animated pulses on lines */}
              <circle cx="0" cy="0" r="3" fill="#fff" className="animate-[pulse-along-path_3s_infinite]" style={{ offsetPath: "path('M 50% 55% Q 35% 20% 15% 15%')" }} />
              <circle cx="0" cy="0" r="3" fill="#fff" className="animate-[pulse-along-path_4s_infinite]" style={{ offsetPath: "path('M 50% 55% Q 65% 20% 85% 20%')" }} />
            </svg>

            {/* Holographic Silhouette */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-15 w-[220px] sm:w-[280px] h-[550px] sm:h-[650px] flex items-center justify-center"
            >
              {/* SVG Hologram */}
              <svg className="w-full h-full opacity-90 filter drop-shadow-[0_0_30px_rgba(45,212,191,0.5)]" viewBox="0 0 200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flowing particles inside body */}
                <motion.circle animate={{ cy: [600, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} cx="90" cy="600" r="1.5" fill="#fff" className="opacity-50" />
                <motion.circle animate={{ cy: [600, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "linear", delay: 2 }} cx="110" cy="600" r="1" fill="#fff" className="opacity-50" />
                <motion.circle animate={{ cy: [600, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "linear", delay: 4 }} cx="100" cy="600" r="2" fill="#fff" className="opacity-30" />
                
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e6fffa" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#99f6e4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                
                {/* Elegant abstract body path */}
                <motion.path 
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  d="M100 20 C85 20 75 35 75 55 C75 70 82 85 92 92 L108 92 C118 85 125 70 125 55 C125 35 115 20 100 20 Z" fill="url(#bodyGrad)" />
                <motion.path 
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                  d="M95 105 L105 105 C115 105 130 110 145 120 C155 128 160 140 155 160 C150 180 145 200 140 220 C135 240 135 250 135 270 C135 290 145 310 155 330 C165 350 165 370 155 400 L145 440 L135 600 L105 600 L105 450 C105 440 95 440 95 450 L95 600 L65 600 L55 440 L45 400 C35 370 35 350 45 330 C55 310 65 290 65 270 C65 250 60 240 55 220 C50 200 45 180 40 160 C35 140 40 128 50 120 C65 110 80 105 95 105 Z" fill="url(#bodyGrad)" />
              </svg>

              {/* Glowing Heart in Chest */}
              <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                >
                  <Heart className="w-8 h-8 text-rose-400 fill-rose-400/80 drop-shadow-[0_0_15px_rgba(251,113,133,0.8)]" />
                </motion.div>
              </div>
              
              {/* Central AI Core / Health Score over Belly */}
              <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center blur-lg absolute"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="w-20 h-20 border-[3px] border-teal-200 border-dashed rounded-full absolute"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="w-28 h-28 border-[1.5px] border-teal-300 border-solid rounded-full absolute opacity-50 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                />
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-400 backdrop-blur-2xl rounded-full shadow-[0_0_30px_rgba(20,184,166,0.8)] flex flex-col items-center justify-center relative z-10 border border-white/40">
                  <span className="text-[6px] text-white font-medium uppercase tracking-wider mb-0.5">Health Score</span>
                  <span className="text-xl text-white font-bold leading-none shadow-sm">92</span>
                  <span className="text-[6px] text-teal-100 font-medium uppercase mt-0.5">Excellent</span>
                </div>
              </div>
            </motion.div>

            {/* CARDS OVERLAY */}
            
            {/* LEFT SIDE CARDS */}
            {/* 1. Heart Health */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-[12%] left-[0%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[160px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-3">
                  <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Heart Health</span>
                    <span className="text-[9px] text-slate-500">Stable</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-teal-600">72 <span className="text-[9px] font-normal">BPM</span></span>
                  {/* ECG Line (Static SVG for effect) */}
                  <svg className="w-12 h-4" viewBox="0 0 50 15">
                    <path d="M0,8 L10,8 L13,2 L17,14 L20,8 L50,8" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_3s_linear_infinite]" strokeDasharray="50" strokeDashoffset="50" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* 2. Blood Pressure */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[32%] left-[-5%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[160px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                    <Activity className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Blood Pressure</span>
                    <span className="text-[9px] text-slate-500">Normal</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-slate-700">118 / 76</span>
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-cyan-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Sleep Quality */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-[52%] left-[0%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[160px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Sleep Quality</span>
                    <span className="text-[9px] text-slate-500">Excellent</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-slate-700">7h 45m</span>
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4. Daily Activity */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-[72%] left-[10%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[160px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Footprints className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Daily Activity</span>
                    <span className="text-[9px] text-slate-500">On Track</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-slate-700">7,800 <span className="text-[8px] font-normal text-slate-500">Steps</span></span>
                  <span className="text-[9px] font-semibold text-blue-600">78% Goal</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE CARDS */}
            {/* 1. Mental Wellness */}
            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-[17%] right-[0%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[160px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-3">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Mental Wellness</span>
                    <span className="text-[9px] text-slate-500">Calm</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-[10px] font-semibold text-purple-600">Low Stress</span>
                </div>
              </div>
            </motion.div>

            {/* 2. Medication */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.9 }}
              className="absolute top-[40%] right-[-5%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[160px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Pill className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Medication</span>
                    <span className="text-[9px] text-slate-500">On Track</span>
                  </div>
                </div>
                <div className="flex flex-col mt-2 gap-0.5">
                  <span className="text-[9px] font-medium text-emerald-600">Morning Done</span>
                  <span className="text-[9px] font-medium text-slate-600">Next: 8:00 PM</span>
                </div>
              </div>
            </motion.div>

            {/* 3. Hydration */}
            <motion.div 
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 1.4 }}
              className="absolute top-[65%] right-[5%] z-40 group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] w-[140px] transition-transform group-hover:scale-105">
                <div className="flex gap-2 items-center mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800">Hydration</span>
                    <span className="text-[9px] text-slate-500">Good</span>
                  </div>
                </div>
                <div className="flex flex-col mt-2 gap-0.5">
                  <span className="text-xs font-bold text-slate-700">85%</span>
                  <span className="text-[9px] font-medium text-teal-600">Keep it up!</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* BOTTOM GLASS PANELS */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1400px] mx-auto mt-12 xl:mt-8 z-30 flex flex-wrap justify-center xl:justify-end gap-6 relative right-0 xl:right-12"
        >
          {/* Panel 1 */}
          <div className="bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/80 shadow-[0_15px_40px_rgba(15,23,42,0.06)] w-[220px] transition-all hover:scale-105 hover:shadow-cyan-900/10 cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-[11px] font-bold text-slate-800">Today's Insight</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed">
              Your health is improving consistently. Continue your current routine.
            </p>
            <div className="mt-3 flex justify-end">
               <TrendingUp className="w-3 h-3 text-slate-300 group-hover:text-amber-500 transition-colors" />
            </div>
          </div>

          {/* Panel 2 */}
          <div className="bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/80 shadow-[0_15px_40px_rgba(15,23,42,0.06)] w-[220px] transition-all hover:scale-105 hover:shadow-cyan-900/10 cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <BellRing className="w-4 h-4 text-indigo-500" />
              <h4 className="text-[11px] font-bold text-slate-800">Medication Reminder</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-600 mb-1">Evening Medicine</p>
            <div className="flex justify-between items-end mt-2">
               <span className="text-sm font-bold text-indigo-600">8:00 PM</span>
               <Clock className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Panel 3 */}
          <div className="bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/80 shadow-[0_15px_40px_rgba(15,23,42,0.06)] w-[220px] transition-all hover:scale-105 hover:shadow-cyan-900/10 cursor-pointer group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/4" />
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h4 className="text-[11px] font-bold text-slate-800">Weekly Progress</h4>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium relative z-10">Health Score Improved</p>
            <div className="flex justify-between items-end mt-1 relative z-10">
               <span className="text-2xl font-bold text-emerald-500 tracking-tighter">+6%</span>
               <div className="flex flex-col items-end">
                 <span className="text-[9px] text-slate-400">This Week</span>
                 <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-1" />
               </div>
            </div>
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
