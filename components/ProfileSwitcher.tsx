"use client";

import React, { useState } from "react";
import { PROFILES, useUser } from "./UserProvider";
import Image from "next/image";
import { Check, ChevronDown, User, Users } from "lucide-react";

export function ProfileSwitcher() {
  const { activeProfile, activePatientId, setActiveProfileId, setActivePatientId } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Close the dropdown when clicking outside (simple approach for MVP)
  // Usually done via an overlay or a ref hook
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/60 border border-white/80 p-3 rounded-3xl flex items-center justify-between gap-3 shadow-sm hover:bg-white/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
            <Image src={activeProfile.avatar} alt="Profile" width={40} height={40} className="object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm text-slate-800 truncate">{activeProfile.name}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{activeProfile.role}</p>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          <div className="p-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <User className="w-3 h-3" /> Patients
            </div>
            {PROFILES.filter(p => p.role === "patient").map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  setActiveProfileId(profile.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                  activeProfile.id === profile.id ? 'bg-cyan-50 text-cyan-900 font-medium' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                    <Image src={profile.avatar} alt={profile.name} width={24} height={24} className="object-cover" />
                  </div>
                  <span className="text-sm">{profile.name}</span>
                </div>
                {activeProfile.id === profile.id && <Check className="w-4 h-4 text-cyan-600" />}
              </button>
            ))}

            <div className="h-px bg-slate-100 my-2"></div>

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Users className="w-3 h-3" /> Caregivers
            </div>
            {PROFILES.filter(p => p.role === "caregiver").map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  setActiveProfileId(profile.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                  activeProfile.id === profile.id ? 'bg-purple-50 text-purple-900 font-medium' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                    <Image src={profile.avatar} alt={profile.name} width={24} height={24} className="object-cover" />
                  </div>
                  <span className="text-sm">{profile.name}</span>
                </div>
                {activeProfile.id === profile.id && <Check className="w-4 h-4 text-purple-600" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Patient selection is now handled via the CaregiverDashboard */}
    </div>
  );
}
