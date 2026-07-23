import React from "react";
import { Stethoscope } from "lucide-react";
import { SymptomLog } from "@/lib/types";

export function SymptomsTab({ symptomsData }: { symptomsData: SymptomLog[] }) {
  const symptoms = symptomsData || [];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Stethoscope className="w-6 h-6 text-cyan-600" />
          Symptoms Log
        </h2>
        {symptoms.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No symptoms logged.</p>
        ) : (
          <div className="space-y-4">
            {symptoms.map((log: SymptomLog) => (
              <div key={log.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-sm font-bold text-slate-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${log.severity > 3 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    Severity: {log.severity}/5
                  </div>
                </div>
                <p className="text-slate-800 font-medium mb-3">"{log.rawText}"</p>
                {log.symptoms && log.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-slate-200">
                    {log.symptoms.map((sym, i) => (
                      <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                        {sym}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
