"use client";

import { CircleUserRound, Menu, X, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
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

          {/* Right Column: Clean Medical Dashboard Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center h-[400px] sm:h-[500px] w-full lg:translate-x-8"
          >
            {/* Subtle background glow */}
            <div className="absolute w-[280px] h-[280px] bg-cyan-100/50 rounded-full blur-[80px] pointer-events-none" />

            {/* Main Center Card: Health Score */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10 bg-white border border-slate-200 rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-[260px] flex flex-col items-center"
            >
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 w-full justify-start text-sm">
                <Activity className="w-4 h-4 text-emerald-500" /> Health Score
              </h3>
              <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0d9488" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="45.216" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-800">82</span>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold mt-2">
                ↑ 8 pts from last week
              </div>
            </motion.div>

            {/* Top Right Floating Card: AI Insight */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-[5%] right-[-5%] sm:right-[5%] z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-bold text-slate-800">AI Insight</span>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                Blood pressure is stable. Great job maintaining your daily routine!
              </p>
            </motion.div>

            {/* Bottom Left Floating Card: Vitals */}
            <motion.div 
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[10%] left-[-5%] sm:left-[0%] z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[180px]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Heart Rate</span>
                <Heart className="w-3 h-3 text-red-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">72</span>
                <span className="text-[10px] text-slate-500 font-medium">bpm</span>
              </div>
              <div className="mt-2 h-6 w-full flex items-end gap-1">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div key={i} className="w-full bg-red-100 rounded-t-sm" style={{ height: `${h}%` }}>
                    <div className="w-full bg-red-400 rounded-t-sm" style={{ height: '30%' }} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Right Floating Card: Medication */}
            <motion.div 
              animate={{ y: [3, -3, 3] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[25%] right-[-10%] sm:right-[-5%] z-0 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-3 shadow-lg w-[140px] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Pill className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-800">Medication</span>
                <span className="text-[9px] text-slate-500">Taken</span>
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
