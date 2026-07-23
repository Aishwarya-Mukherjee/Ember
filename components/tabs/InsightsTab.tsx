import React from "react";
import { BrainCircuit, AlertTriangle } from "lucide-react";
import { AppData } from "@/lib/types";

export function InsightsTab({ patientData }: { patientData: AppData }) {
  const alerts = patientData?.alerts || [];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-cyan-600" />
          AI Insights & Alerts
        </h2>
        {alerts.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No insights available.</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert: any) => (
              <div key={alert.id} className="p-6 border border-slate-100 rounded-2xl bg-slate-50 relative overflow-hidden">
                <div className="flex items-start gap-4 z-10 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${alert.severity === 'critical' ? 'bg-red-100' : 'bg-orange-100'}`}>
                    <AlertTriangle className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 capitalize text-lg mb-1">{alert.rule.replace(/_/g, ' ')}</h4>
                    <p className="text-xs text-slate-500 mb-3">{new Date(alert.triggeredAt).toLocaleString()}</p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      {alert.insight || "Rule triggered without AI insight generated."}
                    </p>
                  </div>
                </div>
                {alert.severity === 'critical' && (
                  <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-32 h-32 bg-red-400/10 blur-2xl rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
