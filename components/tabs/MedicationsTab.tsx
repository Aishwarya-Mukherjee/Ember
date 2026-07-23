import React from "react";
import { Pill } from "lucide-react";
import { AppData } from "@/lib/types";

export function MedicationsTab({ patientData }: { patientData: AppData }) {
  const medications = patientData?.medications || [];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Pill className="w-6 h-6 text-cyan-600" />
          Active Medications
        </h2>
        {medications.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No active medications.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med: any) => (
              <div key={med.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 flex items-center gap-4 hover:border-cyan-200 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                  <Pill className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{med.name}</h4>
                  <p className="text-sm text-slate-500">Prescribed: {new Date(med.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
