"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Activity, Moon, BrainCircuit, Pill, Droplets } from "lucide-react";
import ProblemSection from "./components/ProblemSection";

// --- Micro Components ---

const MiniBars = () => (
  <div className="flex items-end gap-[3px] h-[18px]">
    {[40, 80, 50, 100, 60].map((h, i) => (
      <motion.div
        key={i}
        animate={{ height: [`${h}%`, `${Math.max(20, h - 30)}%`, `${h}%`] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.2, ease: "easeInOut" }}
        className="w-1 rounded-full bg-[#06b6d4]/30"
      />
    ))}
  </div>
);

const PulseLine = () => (
  <svg className="w-10 h-5 overflow-visible" viewBox="0 0 50 20">
    <motion.path
      d="M0 10 L15 10 L20 2 L25 18 L30 10 L50 10"
      fill="none"
      stroke="rgba(6,182,212,0.4)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, value, { duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 1 });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const MagneticButton = ({ children, className, primary = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
      className={`relative overflow-hidden group ${className}`}
      aria-label={typeof children === 'string' ? children : "Action Button"}
    >
      {primary && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />
      )}
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.button>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePortalTransition = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  // Animations
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: 0.6 + i * 0.1,
      }
    })
  };

  return (
    <>
      <div className="relative min-h-screen bg-[#FAFAFA] font-sans text-slate-900 overflow-hidden flex items-center selection:bg-slate-200">
      
      {/* 1. Ambient Background Effects (Ultra Soft) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Extremely soft radial light */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#06b6d4]/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#06b6d4]/[0.015] rounded-full blur-[150px]" />
        
        {/* Subtle neural pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Faint floating background particles */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -100], 
                x: [0, (i % 2 === 0 ? 30 : -30)],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 15 + (i % 10), 
                delay: i * 0.5,
                ease: "linear" 
              }}
              className="absolute w-[2px] h-[2px] bg-slate-400 rounded-full blur-[0.5px]"
              style={{
                left: `${10 + (i * 5)}%`,
                bottom: `${10 + (i % 5) * 15}%`
              }}
            />
          ))}
        </div>
      </div>

      <main className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 h-[100dvh] flex flex-col md:flex-row items-center justify-between">
        
        {/* --- Left Column (40%) --- */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-[40%] flex flex-col items-start justify-center pt-24 md:pt-0 pr-0 md:pr-12 lg:pr-20 z-20 relative"
        >
          {/* Subtle light behind text */}
          <div 
            className="absolute -top-[10%] -left-[20%] w-[150%] h-[150%] pointer-events-none z-[-1]"
            style={{
              background: "radial-gradient(circle at top, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0.08) 25%, transparent 65%)"
            }}
          />
          
          <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-[12px] font-medium tracking-[0.02em] text-slate-500 uppercase">Introducing Ember</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-7 text-[clamp(2.8rem,5vw,4.2rem)] font-semibold tracking-[-0.03em] text-slate-900 leading-[1.1] will-change-transform">
            Empowering Care Through<br />
            <span className="text-teal-500" style={{ textShadow: "0 0 12px rgba(20,184,166,0.18)" }}>Context &amp; Clarity</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mb-12 text-[17px] lg:text-[19px] text-slate-500 font-normal leading-[1.65] max-w-[420px] tracking-[-0.01em]">
            Bringing patient insights, diagnostics, and care together in one seamless experience.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 mt-4">
            <MagneticButton onClick={handlePortalTransition} primary className="px-8 py-3.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-[14.5px] font-semibold shadow-[0_4px_16px_rgba(20,184,166,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_24px_rgba(20,184,166,0.4)] transition-all duration-300">
              Request Access
            </MagneticButton>
            <MagneticButton className="px-8 py-3.5 rounded-full bg-white/60 backdrop-blur-md text-slate-700 text-[14.5px] font-medium border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.04)] hover:bg-white transition-all duration-300">
              View demo
            </MagneticButton>
          </motion.div>

        </motion.div>

        {/* --- Right Column (60%) --- */}
        <div className="w-full md:w-[60%] h-[70vh] md:h-[85vh] flex items-center justify-center mt-12 md:mt-0 relative z-10">
          <div className="w-full h-full relative flex items-center justify-center">
             
             {/* Stage Lighting */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Extremely soft radial bloom behind hologram */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1], opacity: [0.015, 0.03, 0.015] }}
                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                  className="absolute w-[40%] h-[60%] bg-[#06b6d4] rounded-full blur-[120px]" 
                />
                
                {/* Soft volumetric rays */}
                <motion.div 
                  animate={{ rotate: [0, 1, 0], opacity: [0.005, 0.015, 0.005] }}
                  transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                  className="absolute top-[15%] w-[100%] h-[120%] bg-[conic-gradient(from_90deg_at_50%_0%,rgba(6,182,212,0.05)_0deg,transparent_30deg,transparent_330deg,rgba(6,182,212,0.05)_360deg)] blur-[30px] origin-top"
                />
             </div>

             {/* Connection Lines */}
             <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40">
               <defs>
                 <filter id="premium-glow">
                   <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
               </defs>
               {[
                 // Left Side Connections
                 { d: "M 22% 22% C 35% 22%, 40% 25%, 48% 25%", delay: 0 },
                 { d: "M 18% 48% C 30% 48%, 40% 38%, 48% 38%", delay: 0.6 },
                 { d: "M 24% 73% C 35% 73%, 45% 42%, 50% 42%", delay: 1.2 },
                 // Right Side Connections
                 { d: "M 74% 27% C 65% 27%, 60% 20%, 52% 20%", delay: 0.3 },
                 { d: "M 80% 52% C 70% 52%, 65% 50%, 58% 50%", delay: 0.9 },
                 { d: "M 72% 77% C 65% 77%, 55% 55%, 52% 55%", delay: 1.5 },
               ].map((path, i) => (
                  <g key={i}>
                    {/* Base faint line */}
                    <path d={path.d} fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
                    {/* Animated data pulse */}
                    <motion.path 
                      d={path.d}
                      fill="none"
                      stroke="rgba(6,182,212,0.5)"
                      strokeWidth="1.5"
                      filter="url(#premium-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, delay: path.delay, ease: "easeInOut" }}
                    />
                  </g>
               ))}
             </svg>

             {/* The Holographic AI Figure */}
             <motion.div
                animate={{ y: [0, -6, 0] }} // Gentle float
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="relative w-full md:w-[80%] h-[90%] flex items-center justify-center drop-shadow-[0_0_20px_rgba(6,182,212,0.08)] z-20 will-change-transform"
             >
                <motion.div
                  animate={{ scaleY: [1, 1.008, 1], scaleX: [1, 0.998, 1] }} // Idle breathing
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center will-change-transform"
                >
                  <Image 
                    src="/hologram_transparent.png" 
                    alt="AI Healthcare Assistant" 
                    fill
                    className="object-contain opacity-[0.82] drop-shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    priority
                  />
                  
                  {/* Gentle shimmer pulse over body */}
                  <motion.div
                    animate={{ opacity: [0, 0.25, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                    className="absolute inset-0 mix-blend-screen"
                  >
                    <Image src="/hologram_transparent.png" alt="" fill className="object-contain" />
                  </motion.div>
                </motion.div>
             </motion.div>
             
             {/* Health Score Widget (Abdomen Center) */}
             <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                 transition={{ 
                   opacity: { duration: 1, delay: 1.2 }, 
                   scale: { duration: 1, delay: 1.2, type: "spring", stiffness: 100 },
                   y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 } 
                 }}
                 className="w-[180px] h-[180px] rounded-full bg-white/[0.65] backdrop-blur-[24px] border border-[rgba(255,255,255,0.7)] shadow-[0_4px_24px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,1)] flex flex-col items-center justify-center relative will-change-transform"
               >
                  <div className="absolute inset-0 rounded-full bg-[#06b6d4]/5 blur-[12px]" />
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="46%" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1.5" />
                    <motion.circle 
                      cx="50%" cy="50%" r="46%" 
                      fill="none" 
                      stroke="#06b6d4" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.92 }}
                      transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                      className="drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
                    />
                    {/* Slow Ambient Pulse Ring */}
                    <motion.circle 
                      cx="50%" cy="50%" r="46%" 
                      fill="none" 
                      stroke="#06b6d4" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.12, opacity: [0, 0.2, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 3 }}
                      style={{ transformOrigin: 'center' }}
                    />
                  </svg>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] relative z-10 mb-0.5">Health Score</span>
                  <span className="text-[52px] font-medium tracking-tight text-slate-800 relative z-10 leading-none">
                    <Counter value={92} />
                  </span>
                  <span className="text-[10px] font-semibold text-[#06b6d4] uppercase tracking-[0.15em] relative z-10 mt-1">Excellent</span>
               </motion.div>
             </div>

             {/* Floating Glassmorphism Health Cards */}
             <div className="absolute inset-0 z-40 hidden md:block pointer-events-none">
               {[
                 { side: "left", title: "Sleep Quality", value: "7h 45m", status: "Excellent", icon: Moon, chart: "bars", top: "15%", pos: "left-[4%]" },
                 { side: "left", title: "Heart Health", value: "72 BPM", status: "Stable", icon: Heart, chart: "pulse", top: "42%", pos: "left-[0%]" },
                 { side: "left", title: "Blood Pressure", value: "118 / 76", status: "Normal", icon: Activity, chart: "bars", top: "68%", pos: "left-[6%]" },
                 { side: "right", title: "Mental Wellness", value: "Low Stress", status: "Optimal", icon: BrainCircuit, chart: "pulse", top: "20%", pos: "right-[6%]" },
                 { side: "right", title: "Medication", value: "Morning Dose", status: "Completed", icon: Pill, chart: "bars", top: "46%", pos: "right-[0%]" },
                 { side: "right", title: "Hydration", value: "85%", status: "On Track", icon: Droplets, chart: "bars", top: "72%", pos: "right-[8%]" },
               ].map((card, idx) => {
                 const Icon = card.icon;
                 return (
                   <motion.div
                     key={idx}
                     custom={idx}
                     variants={cardVariants}
                     initial="hidden"
                     animate="visible"
                     className={`absolute pointer-events-none z-40 ${card.pos}`}
                     style={{ top: card.top }}
                   >
                     {/* Floating Animation Wrapper */}
                     <motion.div
                       animate={{ y: [0, -4, 0], rotate: [0, 0.5, 0] }}
                       transition={{ repeat: Infinity, duration: 6 + (idx % 3), ease: "easeInOut", delay: idx * 0.2 }}
                       className="pointer-events-auto will-change-transform"
                     >
                       {/* Hover Physics Wrapper */}
                       <motion.div
                         whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02, rotate: 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
                         className="w-[230px] rounded-[24px] bg-white/[0.82] backdrop-blur-[24px] border border-[rgba(255,255,255,0.55)] shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] p-4 pt-4.5 flex flex-col gap-3.5 relative overflow-hidden group will-change-transform"
                       >
                         {/* Subtle internal edge reflection */}
                         <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                         
                         <div className="flex items-center gap-2.5 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-slate-50/80 flex items-center justify-center border border-[rgba(0,0,0,0.03)] shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
                               <Icon className="w-3 h-3 text-slate-500" strokeWidth={2.5} />
                            </div>
                            <span className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-[0.06em]">{card.title}</span>
                         </div>
                         <div className="flex items-end justify-between pl-0.5 relative z-10">
                            <div className="flex flex-col gap-1">
                               <span className="text-[19px] font-semibold text-slate-800 tracking-tight leading-none">{card.value}</span>
                               <span className="text-[9.5px] font-medium text-slate-400 uppercase tracking-widest">{card.status}</span>
                            </div>
                            <div className="pb-0.5 opacity-60 mix-blend-multiply">
                               {card.chart === "bars" ? <MiniBars /> : <PulseLine />}
                            </div>
                         </div>
                       </motion.div>
                     </motion.div>
                   </motion.div>
                 );
               })}
             </div>
             
          </div>
        </div>

      </main>

      {/* Loading Pulse Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col items-center justify-center gap-6"
          >
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* Circular glow pulse */}
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-teal-500/20 rounded-full blur-2xl"
              />
              {/* Radial ring pulse */}
              <div className="absolute w-20 h-20 rounded-full border border-teal-500/30 animate-ping" />
              
              <svg className="w-24 h-24 text-teal-500 z-10" viewBox="0 0 100 40">
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
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-semibold tracking-[0.25em] text-teal-600 uppercase animate-pulse"
            >
              Syncing Vitals
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    <ProblemSection />
    </>
  );
}
