import React from "react";
import { Activity } from "lucide-react";
import { VitalsEntry } from "@/lib/types";

export function VitalsTab({ vitalsData }: { vitalsData: VitalsEntry[] }) {
  const vitals = vitalsData || [];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyan-600" />
          Vitals History
        </h2>
        {vitals.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No vitals logged yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vitals.map((vital: VitalsEntry) => (
                  <tr key={vital.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">
                      {new Date(vital.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-slate-700 capitalize">
                      {vital.type.replace(/_/g, " ")}
                    </td>
                    <td className="py-4 px-4 text-sm font-black text-cyan-600">
                      {vital.value} <span className="text-xs text-slate-500 font-medium">{vital.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
