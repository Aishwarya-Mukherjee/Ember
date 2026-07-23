import React from "react";
import { MessageSquare } from "lucide-react";
import { AppData, CheckIn } from "@/lib/types";

export function CheckInTab({ patientData }: { patientData: AppData }) {
  const checkIns = patientData?.checkIns || [];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-cyan-600" />
          Check-in History
        </h2>
        {checkIns.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No check-ins recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {checkIns.map((checkIn: CheckIn) => (
              <div key={checkIn.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col gap-2 hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500">
                    {new Date(checkIn.date).toLocaleString()}
                  </span>
                  {checkIn.mood && (
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      Mood: {checkIn.mood}
                    </span>
                  )}
                </div>
                {checkIn.notes ? (
                  <p className="text-slate-700 font-medium mt-2 leading-relaxed">"{checkIn.notes}"</p>
                ) : (
                  <p className="text-slate-400 italic mt-2">No additional notes provided.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
