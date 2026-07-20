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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black font-sans text-white">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-45"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4"
      />
      
      {/* Dark overlay with custom radial glow behind the hero visual */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/75 to-transparent z-0 pointer-events-none" />
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
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6"
          >
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* Circular glow pulse */}
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl"
              />
              {/* Radial ring pulse */}
              <div className="absolute w-20 h-20 rounded-full border border-cyan-500/30 animate-ping" />
              
              <svg className="w-24 h-24 text-cyan-400 z-10" viewBox="0 0 100 40">
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
              className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase animate-pulse"
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
          <svg className="w-8 h-8 md:w-9 md:h-9 fill-white" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
          </svg>
        </div>

        {/* Center: Desktop Nav Pill */}
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white transition-opacity hover:opacity-80">Home</Link>
          <button onClick={handlePortalTransition} className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 outline-none">Our Approach</button>
          <button onClick={handlePortalTransition} className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 outline-none">Healing Methods</button>
        </div>

        {/* Right: Desktop Avatar */}
        <button onClick={handlePortalTransition} className="hidden md:flex liquid-glass h-10 w-10 rounded-full items-center justify-center cursor-pointer hover:bg-white/20 transition-all hover:scale-105 active:scale-95 bg-transparent border-none outline-none">
          <CircleUserRound className="h-5 w-5 text-white/80" strokeWidth={1.5} />
        </button>

        {/* Right: Mobile Menu Toggle */}
        <button 
          className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center relative z-50 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
           <Menu className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
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
            className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl md:hidden"
          >
              <div className="flex flex-col items-center gap-8">
                <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-white">Home</Link>
                <button onClick={(e) => { setMenuOpen(false); handlePortalTransition(e); }} className="text-2xl font-medium text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">Our Approach</button>
                <button onClick={(e) => { setMenuOpen(false); handlePortalTransition(e); }} className="text-2xl font-medium text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">Healing Methods</button>
                
                <button onClick={(e) => { setMenuOpen(false); handlePortalTransition(e); }} className="flex flex-col items-center gap-2 mt-4 cursor-pointer bg-transparent border-none outline-none">
                  <div className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center">
                     <CircleUserRound className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-light text-white/60">Account</span>
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
              <span className="text-xs sm:text-sm font-light text-white/80 pr-1 flex items-center gap-1.5 relative z-10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Our path to natural wellness
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-white tracking-[-0.05em]"
            >
              Heal Your Body<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Naturally</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg md:text-xl font-light text-white/70 max-w-lg leading-relaxed"
            >
              Experience care loop’s continuous, intelligent health companion. Bridging the gap between doctor visits with personalized daily wellness.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
              <button 
                onClick={handlePortalTransition}
                className="group liquid-glass rounded-full px-7 py-3.5 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/15 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] cursor-pointer bg-transparent border-none outline-none"
              >
                Begin Your Journey
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive Animated Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-5 relative flex items-center justify-center h-[380px] sm:h-[480px] w-full lg:translate-x-12"
          >
            
            {/* Outer Rotating Dotted Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
              className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border-2 border-dashed border-cyan-500/20 rounded-full pointer-events-none"
            />

            {/* Mid Pulsing Ring */}
            <motion.div 
              animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] border border-teal-500/30 rounded-full pointer-events-none"
            />

            {/* Core Glow Background */}
            <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Floating 3D Character Container (Floating + Subtle heartbeat pulse) */}
            <motion.div 
              animate={{ 
                y: [-12, 12, -12],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              className="relative z-10 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] flex items-center justify-center"
            >
              
              {/* Doctor Avatar Image */}
              <img 
                src="/Bot.png" 
                alt="AI Health Companion" 
                className="w-full h-full object-contain filter drop-shadow-[0_8px_35px_rgba(6,182,212,0.35)]"
              />

              {/* Breathing Avatar Shadow */}
              <motion.div 
                animate={{ 
                  scaleX: [0.75, 1, 0.75],
                  opacity: [0.25, 0.45, 0.25]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut" 
                }}
                className="absolute bottom-[-15px] left-[15%] right-[15%] h-[12px] bg-cyan-950/40 blur-sm rounded-full pointer-events-none"
              />
            </motion.div>

            {/* Floating Dynamic Vitals Widgets */}
            
            {/* Widget 1: Heart Rate (Heart Icon + Heartbeat pulse) */}
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[8%] left-[2%] sm:left-[8%] z-20 liquid-glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg"
            >
              <motion.div 
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-500"
              >
                <Heart className="w-4 h-4 fill-pink-500" />
              </motion.div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Heart Rate</span>
                <span className="text-xs font-bold text-white tracking-wide">72 bpm</span>
              </div>
            </motion.div>

            {/* Widget 2: Brain Synapses (Activity Icon) */}
            <motion.div 
              animate={{ y: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-[20%] right-[2%] sm:right-[5%] z-20 liquid-glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Vitals Status</span>
                <span className="text-xs font-bold text-emerald-400 tracking-wide">Optimal</span>
              </div>
            </motion.div>

            {/* Widget 3: Brain waves / Mind State */}
            <motion.div 
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.2 }}
              className="absolute bottom-[16%] left-[2%] sm:left-[6%] z-20 liquid-glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Cognitive</span>
                <span className="text-xs font-bold text-white tracking-wide">Active</span>
              </div>
            </motion.div>

            {/* Widget 4: Medication compliance */}
            <motion.div 
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 1.8 }}
              className="absolute bottom-[8%] right-[2%] sm:right-[8%] z-20 liquid-glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Pill className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">PillGuard</span>
                <span className="text-xs font-bold text-white tracking-wide">100% Adhere</span>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* Bottom Stats Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.5 }}
          className="flex flex-wrap items-end gap-10 sm:gap-16 md:gap-24 pt-10 border-t border-white/10 pb-4 mt-8"
        >
          
          {/* Stat 1 */}
          <div className="flex flex-col gap-2">
            <div className="relative w-5 h-5 flex flex-wrap content-between justify-between mb-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-[2.5px] h-[2.5px] bg-white/60 ${i === 4 ? 'opacity-0' : ''}`} />
              ))}
            </div>
            <span className="text-2xl sm:text-3xl font-normal text-white tracking-tight">48 Hours</span>
            <span className="text-xs sm:text-sm font-light text-white/60">Initial Consultation</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-[2px] w-5 h-5 mb-2">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className={`w-[4px] h-[4px] rounded-[1px] ${(i % 2 === 0) ? 'bg-white/60' : 'bg-white/0'}`} />
               ))}
            </div>
            <span className="text-2xl sm:text-3xl font-normal text-white tracking-tight">500+ Sessions</span>
            <span className="text-xs sm:text-sm font-light text-white/60">Healing Sessions</span>
          </div>

        </motion.div>

      </main>

      {/* Problem Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-20 py-24 md:py-32 border-t border-white/5">
        
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
            className="mt-4 text-base sm:text-lg font-light text-white/60 leading-relaxed"
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
              iconColor: "text-pink-400",
              delay: 0
            },
            {
              icon: Activity,
              title: "Untracked Symptoms",
              desc: "Daily symptom flares and vital trends go unrecorded, leaving doctors with incomplete patient histories.",
              color: "from-cyan-500/20 to-teal-500/20",
              iconColor: "text-cyan-400",
              delay: 0.15
            },
            {
              icon: BrainCircuit,
              title: "High Friction",
              desc: "Traditional health tracking is tedious and manual, causing patients to abandon logging in a few days.",
              color: "from-blue-500/20 to-indigo-500/20",
              iconColor: "text-blue-400",
              delay: 0.3
            },
            {
              icon: AlertTriangle,
              title: "Data Disconnect",
              desc: "A massive clinical care gap exists between daily home realities and infrequent monthly check-ins.",
              color: "from-emerald-500/20 to-teal-500/20",
              iconColor: "text-emerald-400",
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
                className="liquid-glass group rounded-3xl p-6 flex flex-col justify-between h-72 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center ${card.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-white/60">
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
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.3);
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
