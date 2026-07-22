"use client";

import { CircleUserRound, Menu, X, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, AlertTriangle, Moon, Droplets, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";

const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, value, { duration: 1.5, ease: "easeOut", delay: 0.5 });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const MiniGraph = ({ bgClass }: { bgClass: string }) => {
  return (
    <div className="flex items-end gap-[3px] h-5 mt-1">
      {[40, 80, 50, 100, 60].map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [`${h}%`, `${Math.max(20, h - 30)}%`, `${h}%`] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.2, ease: "easeInOut" }}
          className={`w-1.5 rounded-t-sm opacity-70 ${bgClass}`}
        />
      ))}
    </div>
  );
};

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

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxBgX = useTransform(smoothMouseX, [-500, 500], [15, -15]);
  const parallaxBgY = useTransform(smoothMouseY, [-500, 500], [15, -15]);

  const parallaxHeroX = useTransform(smoothMouseX, [-500, 500], [-10, 10]);
  const parallaxHeroY = useTransform(smoothMouseY, [-500, 500], [-10, 10]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, staggerChildren: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const headlineVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-x-hidden bg-white font-sans text-slate-900"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
    >
      

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
        <div className="hidden md:flex bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] rounded-full px-8 py-3 items-center gap-10">
          <Link href="/" className="text-[13px] font-medium text-slate-900 transition-opacity hover:text-cyan-600">Home</Link>
          <button onClick={handlePortalTransition} className="text-[13px] font-medium text-slate-500 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none">Our Approach</button>
          <button onClick={handlePortalTransition} className="text-[13px] font-medium text-slate-500 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none">Healing Methods</button>
        </div>

        {/* Right: Desktop Avatar */}
        <button onClick={handlePortalTransition} className="hidden md:flex bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] h-10 w-10 rounded-full items-center justify-center cursor-pointer hover:bg-white/60 transition-all hover:scale-105 active:scale-95 bg-transparent outline-none">
          <CircleUserRound className="h-[18px] w-[18px] text-slate-600" strokeWidth={2} />
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
      <main className="relative z-10 min-h-[calc(100vh-88px)] w-full flex items-center overflow-hidden pt-16 md:pt-24 pb-20">
        
        {/* Foreground Content Overlay */}
        <div className="relative z-50 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16 lg:px-20 pointer-events-none">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl flex flex-col items-start text-left pointer-events-auto"
          >
            {/* Pill */}
            <motion.div 
              variants={pillVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] mb-12"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-[11px] font-semibold tracking-[0.15em] text-slate-700 uppercase">Next-Gen Healthcare</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={headlineVariants}
              className="text-5xl sm:text-6xl lg:text-[76px] font-semibold leading-[1.05] text-slate-950 tracking-tight"
            >
              Intelligent care, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500">
                simplified.
              </span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p 
              variants={paragraphVariants}
              className="mt-8 text-lg sm:text-xl text-slate-500/90 max-w-md leading-loose font-normal"
            >
              Elevate your practice with AI-driven insights, seamless patient experiences, and intuitive workflows designed for modern healthcare.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={buttonVariants} className="mt-14 flex flex-wrap items-center gap-4">
              <button 
                onClick={handlePortalTransition}
                className="group rounded-full bg-slate-950 hover:bg-slate-800 px-8 py-4 text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
              >
                Request Access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                className="group rounded-full px-8 py-4 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white/50 hover:bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-sm flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                View demo
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Full-Screen Holographic AI Assistant */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute inset-0 w-full h-full pointer-events-none flex"
        >
            {/* Single subtle radial blue glow behind the holographic body */}
            <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[60%] h-[80%] bg-blue-200/5 rounded-full blur-[120px] z-0 pointer-events-none" />

            {/* Hologram & Cards Wrapper (Right Side of Screen) */}
            <div className="relative w-full md:w-[55%] lg:w-[48%] h-full ml-auto flex items-center justify-center mr-[2%] md:mr-[5%]">

            {/* Glowing Cyan Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-60 hidden md:block">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {[
                { x1: "20%", y1: "12%", x2: "50%", y2: "15%", delay: 0 }, // Mental -> head
                { x1: "15%", y1: "38%", x2: "50%", y2: "32%", delay: 0.3 }, // Heart Rate -> heart
                { x1: "80%", y1: "44%", x2: "50%", y2: "38%", delay: 0.6 }, // Blood Pressure -> chest
                { x1: "75%", y1: "75%", x2: "50%", y2: "58%", delay: 0.9 }, // Hydration -> abdomen
                { x1: "25%", y1: "90%", x2: "50%", y2: "85%", delay: 1.2 }, // Activity -> legs
              ].map((pos, i) => (
                <motion.line 
                  key={i} 
                  x1={pos.x1} 
                  y1={pos.y1} 
                  x2={pos.x2} 
                  y2={pos.y2} 
                  stroke="#22d3ee" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.8, 0.2] }}
                  transition={{ 
                    pathLength: { duration: 1.5, delay: pos.delay, ease: "easeOut" },
                    opacity: { repeat: Infinity, duration: 3, delay: pos.delay, ease: "easeInOut" }
                  }}
                />
              ))}
            </svg>

            {/* Floating Health Cards */}
            <div className="absolute inset-0 z-40 pointer-events-none hidden md:block">
              {[
                { title: "Mental Wellness", Icon: BrainCircuit, value: "Calm", status: "Stable", color: "text-purple-500", bg: "bg-purple-500", style: { top: "8%", left: "4%" }, delay: 0 },
                { title: "Heart Rate", Icon: Heart, value: "72 bpm", status: "Normal", color: "text-rose-500", bg: "bg-rose-500", style: { top: "35%", left: "2%" }, delay: 0.3 },
                { title: "Blood Pressure", Icon: Activity, value: "118/75", status: "Optimal", color: "text-blue-500", bg: "bg-blue-500", style: { top: "40%", right: "2%" }, delay: 0.6 },
                { title: "Hydration", Icon: Droplets, value: "1.8 L", status: "On Track", color: "text-cyan-500", bg: "bg-cyan-500", style: { top: "72%", right: "6%" }, delay: 0.9 },
                { title: "Daily Activity", Icon: Flame, value: "6,420", status: "Steps", color: "text-orange-500", bg: "bg-orange-500", style: { bottom: "6%", left: "12%" }, delay: 1.2 },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: card.delay },
                    scale: { duration: 0.5, delay: card.delay },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: card.delay }
                  }}
                  className="absolute bg-white/80 backdrop-blur-[20px] border border-white/60 shadow-[0_4px_20px_rgba(15,23,42,0.04),0_12px_40px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_0_20px_rgba(255,255,255,0.5)] rounded-[20px] p-3 w-[136px] h-[84px] flex flex-col justify-between pointer-events-auto group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,23,42,0.06),0_16px_50px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out overflow-hidden"
                  style={card.style}
                >
                  {/* VisionOS Specular Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Gentle Edge Reflection on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/0 to-slate-100/0 group-hover:from-slate-100/20 group-hover:to-transparent transition-colors duration-500 pointer-events-none rounded-[20px]" />
                  
                  <div className="relative z-10 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 ${card.bg}/20 flex items-center justify-center border border-white/50 backdrop-blur-md`}>
                      <card.Icon className={`w-3 h-3 ${card.color}`} />
                    </div>
                    <span className="text-[9.5px] font-semibold text-slate-600 leading-tight uppercase tracking-[0.08em] truncate">{card.title}</span>
                  </div>
                  <div className="relative z-10 flex items-end justify-between pl-1">
                    <div>
                      <div className="text-[14px] font-bold text-slate-900 leading-none">{card.value}</div>
                      <div className="text-[9px] font-semibold text-slate-400/90 mt-1 uppercase tracking-wider">{card.status}</div>
                    </div>
                    <MiniGraph bgClass={card.bg} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden hidden md:block">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, Math.random() * -60 - 20, 0], 
                    x: [0, (Math.random() - 0.5) * 40, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, Math.random() * 1.5 + 0.5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: Math.random() * 4 + 3, 
                    delay: Math.random() * 5,
                    ease: "easeInOut" 
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px] shadow-[0_0_12px_3px_rgba(34,211,238,0.8)]"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                />
              ))}
            </div>

            {/* Holographic Body Image with Breathing Animation and Parallax */}
            <motion.div
               animate={{ y: [0, -12, 0], scale: [1, 1.015, 1] }}
               transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
               style={{ x: parallaxHeroX, y: parallaxHeroY }}
               className="relative z-30 w-[95%] h-[95%] flex items-center justify-center drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
               {/* Radial Illumination Behind Hologram */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                 <div className="w-[80%] h-[90%] bg-blue-100/5 rounded-full blur-[100px]" />
               </div>

               {/* Volumetric God Rays */}
               <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_50%_80%_at_50%_50%,#000_60%,transparent_100%)]">
                 <motion.div
                   animate={{ rotate: [0, 5, 0] }}
                   transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                   className="absolute top-[-20%] left-[20%] w-[100%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_10%,rgba(255,255,255,0)_35%,rgba(241,245,249,0.3)_45%,rgba(226,232,240,0.5)_50%,rgba(241,245,249,0.3)_55%,rgba(255,255,255,0)_65%)] blur-[40px] origin-top opacity-50"
                 />
                 <motion.div
                   animate={{ rotate: [0, -5, 0] }}
                   transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 2 }}
                   className="absolute top-[-20%] left-[-20%] w-[100%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_10%,rgba(255,255,255,0)_35%,rgba(241,245,249,0.2)_45%,rgba(226,232,240,0.4)_50%,rgba(241,245,249,0.2)_55%,rgba(255,255,255,0)_65%)] blur-[50px] origin-top opacity-40"
                 />
               </div>

               {/* Soft Radial Glow / Chest Illumination */}
               <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-30">
                 <motion.div 
                   animate={{ x: [-20, 20, -20], y: [0, -20, 0] }}
                   transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                   className="absolute top-[20%] left-[10%] w-[80%] h-[60%] bg-blue-100/10 blur-[100px] rounded-full"
                 />
                 <motion.div 
                   animate={{ x: [20, -20, 20], y: [0, 20, 0] }}
                   transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 1 }}
                   className="absolute top-[35%] right-[15%] w-[50%] h-[50%] bg-slate-50/30 blur-[90px] rounded-full"
                 />
               </div>

               {/* Ambient Bloom of the Hologram itself */}
               <div className="absolute inset-0 z-10 scale-95 blur-[40px] opacity-40 pointer-events-none">
                 <Image src="/hologram_transparent.png" alt="" fill className="object-contain" />
               </div>

               {/* Main image */}
               <div className="absolute inset-0 z-20 pointer-events-none">
                 <Image 
                   src="/hologram_transparent.png" 
                   alt="Glowing Holographic AI Health Assistant" 
                   fill
                   className="object-contain drop-shadow-[0_0_24px_rgba(34,211,238,0.25)]"
                   priority
                 />
               </div>

               {/* Floating Dust & Light Particles */}
               <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                 {[...Array(30)].map((_, i) => (
                   <motion.div
                     key={`body-dust-${i}`}
                     animate={{ 
                       y: [0, -100 - Math.random() * 100], 
                       x: [0, (Math.random() - 0.5) * 50],
                       opacity: [0, Math.random() * 0.8 + 0.2, 0],
                       scale: [0, Math.random() * 1.5 + 0.5, 0]
                     }}
                     transition={{ 
                       repeat: Infinity, 
                       duration: Math.random() * 5 + 4, 
                       delay: Math.random() * 5,
                       ease: "easeInOut" 
                     }}
                     className="absolute w-1.5 h-1.5 rounded-full bg-white blur-[1px] shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]"
                     style={{
                       top: `${Math.random() * 60 + 30}%`,
                       left: `${Math.random() * 60 + 20}%`,
                     }}
                   />
                 ))}
               </div>

               {/* Soft glowing heart */}
               <motion.div 
                 animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="absolute top-[35%] left-[49%] w-8 h-8 sm:w-10 sm:h-10 bg-rose-400 rounded-full blur-[20px] mix-blend-screen z-10"
               />

               {/* Center Health Score Widget (Solar Plexus) */}
               <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center">
                 {/* Subtle cyan bloom */}
                 <div className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full scale-100" />
                 
                 {/* Glass Circle */}
                 <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white/5 backdrop-blur-md rounded-full border border-white/20 flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(6,182,212,0.1)]">
                   
                   {/* Animated glowing ring */}
                   <motion.svg 
                     className="absolute inset-0 w-full h-full overflow-visible"
                     animate={{ rotate: [-90, 270] }}
                     transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                   >
                     <circle 
                       cx="50%" cy="50%" r="48%" 
                       fill="none" 
                       stroke="rgba(255,255,255,0.1)" 
                       strokeWidth="1.5" 
                     />
                     <motion.circle 
                       cx="50%" cy="50%" r="48%" 
                       fill="none" 
                       stroke="#22d3ee" 
                       strokeWidth="2" 
                       strokeLinecap="round"
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 0.92 }}
                       transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                       className="drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]"
                     />
                   </motion.svg>
                   
                   {/* Soft pulse ring */}
                   <motion.div
                     animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2.5, ease: "easeOut" }}
                     className="absolute inset-0 rounded-full border border-cyan-300/20"
                   />

                   <span className="text-[8px] sm:text-[9px] font-semibold text-cyan-50 tracking-widest uppercase mb-0.5 drop-shadow-sm">Health Score</span>
                   <div className="text-3xl sm:text-4xl font-black text-white leading-none drop-shadow-lg">
                     <Counter value={92} />
                   </div>
                   <span className="text-[7px] sm:text-[8px] font-bold text-cyan-300 mt-1 uppercase tracking-[0.2em]">Excellent</span>
                 </div>
               </div>
             </motion.div>
            </div> {/* End Hologram & Cards Wrapper */}
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
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-900"
          >
            Why Patient Self-Care Fails
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-base sm:text-lg font-normal text-slate-500/90 leading-loose"
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
                className="relative bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] group rounded-3xl p-6 flex flex-col justify-between h-72 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(34,211,238,0.15)] hover:border-cyan-200/50 cursor-pointer overflow-hidden"
              >
                {/* Subtle reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center ${card.iconColor} border border-white/50 backdrop-blur-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="relative z-10 text-[15px] font-normal leading-loose text-slate-500/90">
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
