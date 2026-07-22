import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Activity, BrainCircuit, AlertTriangle } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-20 py-24 md:py-32 border-t border-slate-200">
      
      {/* Problem Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-slate-900"
        >
          Why Patient Self-Care Fails
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-base sm:text-lg font-light text-slate-600 leading-relaxed"
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
              <p className="text-sm font-light leading-relaxed text-slate-600">
                {card.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
