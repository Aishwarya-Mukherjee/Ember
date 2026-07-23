import React from "react";
import { FileText, FileDown } from "lucide-react";
import { AppData } from "@/lib/types";

export function ReportsTab({ patientData }: { patientData: AppData }) {
  const handleGeneratePDF = () => {
    // Open the print route in a new tab which will trigger the print dialog
    window.open("/report/print", "_blank");
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-cyan-600" />
          Health Reports
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col justify-between hover:border-cyan-200 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-cyan-600" />
              </div>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Current
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg mb-1">Weekly Health Summary</h4>
              <p className="text-sm text-slate-500 mb-4">A comprehensive summary of vitals, symptoms, and AI insights tailored for your doctor.</p>
              <button 
                onClick={handleGeneratePDF}
                className="w-full flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
