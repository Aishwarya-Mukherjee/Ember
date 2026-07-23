import React, { useState } from "react";
import { Calendar, CheckCircle2, Circle, Wand2 } from "lucide-react";
import { AppData } from "@/lib/types";

export function AppointmentsTab({ patientData, onUpdate }: { patientData: AppData, onUpdate?: () => void }) {
  const reminders = patientData?.reminders || [];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/reminders/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: patientData.patient.id })
      });
      if (res.ok) {
        if (onUpdate) onUpdate();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-cyan-600" />
            Appointments & Reminders
          </h2>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? "Generating..." : "Auto-Schedule (AI)"}
          </button>
        </div>
        {reminders.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No scheduled reminders.</p>
        ) : (
          <div className="space-y-3">
            {reminders.map((rem: any) => (
              <div key={rem.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    {rem.status === 'done' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : rem.status === 'missed' ? (
                      <div className="w-6 h-6 rounded-full bg-red-100 border border-red-500 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{rem.label}</h4>
                    <p className="text-xs text-slate-500">
                      {new Date(rem.scheduledAt).toLocaleString()}
                      <span className="mx-2">•</span>
                      <span className="capitalize">{rem.type}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    rem.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                    rem.status === 'missed' ? 'bg-red-100 text-red-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {rem.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
