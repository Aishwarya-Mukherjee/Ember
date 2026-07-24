"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserProvider";
import { Users } from "lucide-react";
import { PatientRow } from "@/components/CaregiverDashboard";

export function CaregiverPatientsList() {
  const router = useRouter();
  const { activeProfile, setActivePatientId } = useUser();
  const assignedPatients = activeProfile.assignedPatientIds || [];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 h-full pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-cyan-600" />
          My Patients
        </h1>
        <p className="text-slate-500 font-medium mt-2 text-lg">
          A quick overview of all patients assigned to your care. Select a patient to view their full record.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Patient Roster</h2>
          <span className="text-sm font-bold text-cyan-600 bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200">
            {assignedPatients.length} Active
          </span>
        </div>
        
        {assignedPatients.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
              <Users className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Patients Assigned</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Contact an administrator to add patients to your care circle.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {assignedPatients.map((pid) => (
              <PatientRow
                key={pid}
                patientId={pid}
                onSelect={() => {
                  setActivePatientId(pid);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
