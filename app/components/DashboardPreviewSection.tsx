import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Activity, Droplets, AlertCircle } from 'lucide-react';

export default function DashboardPreviewSection() {
  return (
    <section id="preview" className="relative py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Comprehensive Patient Intelligence
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Experience our ultra-clean, intuitive dashboard that surfaces critical insights exactly when you need them.
          </p>
        </div>

        {/* Clean Medical Dashboard Mockup Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 60, damping: 20 }}
          className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl max-w-4xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden border border-slate-100 bg-white w-full text-left shadow-sm flex flex-col md:flex-row">
            {/* Sidebar / Left Column - Patient Summary */}
            <div className="w-full md:w-1/3 bg-white border-b md:border-b-0 md:border-r border-slate-100 p-6 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 leading-tight">Sarah Jenkins</h3>
                  <p className="text-xs text-slate-500 mt-0.5">ID: #8492-EM • 32 y/o</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-semibold border border-teal-100 tracking-wide uppercase">Stable</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Admitted</span>
                  <span className="text-slate-700 font-medium text-xs">Oct 24, 08:30 AM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Department</span>
                  <span className="text-slate-700 font-medium text-xs">Cardiology</span>
                </div>
              </div>
            </div>

            {/* Right Column - Vitals & Alerts */}
            <div className="w-full md:w-2/3 p-6 bg-slate-50/50 flex flex-col gap-6">
              {/* Alert Badge */}
              <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-900">Medication Review Pending</h4>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">Please review the updated dosage for Lisinopril before the next scheduled administration.</p>
                </div>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Heart Rate */}
                <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Heart Rate</span>
                    </div>
                    <Activity className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-slate-800 tracking-tight">72</span>
                    <span className="text-xs font-semibold text-slate-500">bpm</span>
                  </div>
                </div>

                {/* SpO2 */}
                <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">SpO2 Level</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-slate-800 tracking-tight">98</span>
                    <span className="text-xs font-semibold text-slate-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
