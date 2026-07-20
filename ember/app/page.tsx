"use client";

import { CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4"
      />
      <div className="absolute inset-0 bg-black/30 z-0 mix-blend-multiply pointer-events-none" />

      {/* Navigation (Top) */}
      <nav className="relative z-20 flex items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8 md:px-16 lg:px-20">
        
        {/* Left: Custom SVG Logo */}
        <div className="flex items-center">
          <svg className="w-8 h-8 md:w-9 md:h-9 fill-white" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
          </svg>
        </div>

        {/* Center: Desktop Nav Pill */}
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8">
          <Link href="#" className="text-sm font-medium text-white transition-opacity">Home</Link>
          <Link href="#" className="text-sm font-medium text-white/70 hover:opacity-100 transition-opacity">Our Approach</Link>
          <Link href="#" className="text-sm font-medium text-white/70 hover:opacity-100 transition-opacity">Healing Methods</Link>
        </div>

        {/* Right: Desktop Avatar */}
        <div className="hidden md:flex liquid-glass h-10 w-10 rounded-full items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          <CircleUserRound className="h-5 w-5 text-white/80" strokeWidth={1.5} />
        </div>

        {/* Right: Mobile Menu Toggle */}
        <button 
          className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
           <Menu className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
           <X className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl md:hidden transition-opacity duration-500 ease-out ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
         <div className={`flex flex-col items-center gap-8 transition-transform duration-500 ease-out ${menuOpen ? "translate-y-0" : "-translate-y-8"}`}>
            <Link href="#" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-white">Home</Link>
            <Link href="#" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-white/80">Our Approach</Link>
            <Link href="#" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-white/80">Healing Methods</Link>
            
            <div className="flex flex-col items-center gap-2 mt-4 cursor-pointer" onClick={() => setMenuOpen(false)}>
              <div className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center">
                 <CircleUserRound className="h-6 w-6 text-white/80" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-light text-white/60">Account</span>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className={`relative z-10 flex flex-col justify-between h-[calc(100vh-88px)] px-5 sm:px-8 md:px-16 lg:px-20 transition-opacity duration-300 ${menuOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}>
        
        {/* Top Block */}
        <div className="mt-14 sm:mt-20 md:mt-28 max-w-2xl flex flex-col items-start">
          
          {/* Badge */}
          <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6">
            <div className="flex -space-x-2">
              <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 1" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
              <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 2" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
              <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 3" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
              <img src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar 4" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover" />
            </div>
            <span className="text-xs sm:text-sm font-light text-white/80 pr-1">our path to natural wellness</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-white tracking-[-0.05em]">
            Heal Your Body<br/>Naturally
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-light text-white/70">
            Holistic wellness. Transformative results.
          </p>

          {/* CTA Button */}
          <Link href="/dashboard" className="liquid-glass rounded-full px-6 py-3 sm:px-7 sm:py-3.5 mt-6 sm:mt-8 text-sm font-medium text-white transition duration-300 hover:bg-white/10 hover:scale-105 inline-block cursor-pointer">
            Begin Your Journey
          </Link>

        </div>

        {/* Bottom Stats */}
        <div className="flex flex-wrap items-end gap-6 sm:gap-10 md:gap-16 pb-8 md:pb-12 mt-12">
          
          {/* Stat 1 */}
          <div className="flex flex-col gap-2">
            <div className="relative w-5 h-5 flex flex-wrap content-between justify-between mb-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-[2.5px] h-[2.5px] bg-white/60 ${i === 4 ? 'opacity-0' : ''}`} />
              ))}
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-normal text-white">48 Hours</span>
            <span className="text-xs sm:text-sm font-light text-white/60">Initial Consultation</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-[2px] w-5 h-5 mb-2">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className={`w-[4px] h-[4px] rounded-[1px] ${(i % 2 === 0) ? 'bg-white/60' : 'bg-white/0'}`} />
               ))}
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-normal text-white">Initial Consultation</span>
            <span className="text-xs sm:text-sm font-light text-white/60">Healing Sessions</span>
          </div>

        </div>

      </main>

    </div>
  );
}
