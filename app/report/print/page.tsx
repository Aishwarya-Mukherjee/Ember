"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { AppData, VitalsEntry, SymptomLog } from "@/lib/types";
import { Flame, Activity, Stethoscope, AlertTriangle } from "lucide-react";
import { useUser } from "@/components/UserProvider";

export default function PrintReportPage() {
  const { activePatientId } = useUser();
  const { data: patientData, isLoading: patientLoading } = useSWR<AppData>(`/api/patients/${activePatientId}`, fetcher);
  const { data: vitalsData, isLoading: vitalsLoading } = useSWR<VitalsEntry[]>(`/api/vitals?patientId=${activePatientId}`, fetcher);
  const { data: symptomsData, isLoading: symptomsLoading } = useSWR<SymptomLog[]>(`/api/symptoms?patientId=${activePatientId}`, fetcher);

  useEffect(() => {
    // Automatically open the print dialog when all data is loaded
    if (!patientLoading && !vitalsLoading && !symptomsLoading && patientData) {
      setTimeout(() => {
        window.print();
      }, 500); // slight delay to allow rendering
    }
  }, [patientLoading, vitalsLoading, symptomsLoading, patientData]);

  if (patientLoading || vitalsLoading || symptomsLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Generating report...</div>;
  }

  if (!patientData) {
    return <div className="p-8 text-center text-red-500 font-bold">Failed to load report data.</div>;
  }

  const alerts = patientData.alerts || [];
  const vitals = vitalsData || [];
  const symptoms = symptomsData || [];
  const medications = patientData.medications || [];

  return (
    <div className="bg-white min-h-screen text-black w-full max-w-4xl mx-auto p-8 md:p-12" style={{ WebkitPrintColorAdjust: 'exact', colorAdjust: 'exact' }}>
      {/* Print-specific styles to hide browser UI and set A4 sizing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: A4; margin: 20mm; }
        }
      `}} />

      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-8 h-8 text-slate-900" />
            <h1 className="text-3xl font-black tracking-tight">Ember Health</h1>
          </div>
          <h2 className="text-xl font-bold text-slate-600">Weekly Health Summary</h2>
          <p className="text-sm text-slate-500 mt-1">Generated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <h3 className="text-2xl font-bold">{(patientData as any).name}</h3>
          <p className="text-slate-600 font-medium">Patient ID: {(patientData as any).id.split('-')[0].toUpperCase()}</p>
          <p className="text-slate-600 font-medium">Age: {(patientData as any).age} | Condition: <span className="capitalize">{(patientData as any).condition.replace(/_/g, ' ')}</span></p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-8">
          
          {/* Active Medications */}
          <section>
            <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider text-slate-800">
              Active Medications
            </h3>
            {medications.length === 0 ? (
              <p className="text-slate-500 text-sm">No active medications.</p>
            ) : (
              <ul className="space-y-3">
                {medications.map(m => (
                  <li key={m.id} className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                    <p className="font-bold text-slate-900">{m.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* AI Insights & Alerts */}
          <section>
            <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider flex items-center gap-2 text-slate-800">
              <AlertTriangle className="w-5 h-5 text-slate-700" /> Risk Alerts
            </h3>
            {alerts.length === 0 ? (
              <p className="text-slate-500 text-sm">No recent alerts triggered.</p>
            ) : (
              <div className="space-y-4">
                {alerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${alert.severity === 'critical' ? 'border-red-600 bg-red-50' : 'border-orange-500 bg-orange-50'}`}>
                    <p className="font-bold text-slate-900 capitalize text-sm mb-1">{alert.rule.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-slate-600 mb-2">{new Date(alert.triggeredAt).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-800 italic">"{alert.insight}"</p>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Recent Vitals */}
          <section>
            <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider flex items-center gap-2 text-slate-800">
              <Activity className="w-5 h-5 text-slate-700" /> Vitals Summary (Last 5)
            </h3>
            {vitals.length === 0 ? (
              <p className="text-slate-500 text-sm">No vitals logged.</p>
            ) : (
              <table className="w-full text-left text-sm border border-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-2 border-b border-slate-200">Date</th>
                    <th className="p-2 border-b border-slate-200">Metric</th>
                    <th className="p-2 border-b border-slate-200">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {vitals.slice(0, 5).map(v => (
                    <tr key={v.id} className="border-b border-slate-100">
                      <td className="p-2 text-slate-600">{new Date(v.timestamp).toLocaleDateString()}</td>
                      <td className="p-2 font-bold capitalize text-slate-800">{v.type.replace(/_/g, ' ')}</td>
                      <td className="p-2 font-black">{v.value} <span className="font-normal text-xs text-slate-500">{v.unit}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Recent Symptoms */}
          <section>
            <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider flex items-center gap-2 text-slate-800">
              <Stethoscope className="w-5 h-5 text-slate-700" /> Reported Symptoms
            </h3>
            {symptoms.length === 0 ? (
              <p className="text-slate-500 text-sm">No symptoms reported recently.</p>
            ) : (
              <ul className="space-y-3">
                {symptoms.slice(0, 4).map(s => (
                  <li key={s.id} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleDateString()}</span>
                      <span className="text-xs font-bold bg-slate-200 px-2 py-0.5 rounded">Severity: {s.severity}/5</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800">"{s.rawText}"</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>This report is automatically generated by Ember AI and is intended for medical professional review.</p>
        <p>Ember Health • Confidential Patient Data</p>
      </div>

    </div>
  );
}
