import React from 'react';

export default function HolographicSection() {
  return (
    <section id="features" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Interactive Context Engine
          </h2>
          <p className="text-slate-600 mt-2">
            Real-time holographic patient insights and medical visualizer.
          </p>
        </div>

        {/* Hologram Display Card */}
        <div className="relative rounded-2xl border border-teal-500/30 bg-slate-900 p-6 shadow-[0_0_50px_rgba(13,148,136,0.2)] overflow-hidden">
          
          {/* Hologram Background Grid Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Animated Laser Scanline */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 animate-[pulse_2s_infinite]" />

          {/* Holographic Header Bar */}
          <div className="flex items-center justify-between border-b border-teal-500/20 pb-4 mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400 animate-ping" />
              <span className="text-xs font-mono tracking-wider text-teal-300 uppercase">
                Hologram Projection :: Active
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400/80">3D SCAN v2.4</span>
          </div>

          {/* Holographic Content Box */}
          <div className="relative z-10 h-80 rounded-xl border border-cyan-500/20 bg-teal-950/20 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
            {/* Glowing Center Ring / Icon */}
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-teal-400/60 flex items-center justify-center mb-4 animate-[spin_12s_linear_infinite] shadow-[0_0_20px_rgba(20,184,166,0.4)]">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 border border-cyan-300 flex items-center justify-center text-cyan-300 font-bold">
                E
              </div>
            </div>

            <p className="text-teal-200 font-mono text-sm tracking-wide">
              [ Holographic Medical Visualizer ]
            </p>
            <span className="text-slate-400 text-xs mt-2 max-w-sm">
              Renders high-resolution 3D diagnostic layers and real-time medical context as you scroll.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
