"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ProfileRole = "patient" | "caregiver";

export interface Profile {
  id: string; // e.g., 'patient_001', 'caregiver_001'
  name: string;
  role: ProfileRole;
  avatar: string;
  assignedPatientIds?: string[]; // only for caregivers
}

export const PROFILES: Profile[] = [
  { id: "patient_001", name: "Meera Sharma", role: "patient", avatar: "/avatars/avatar_meera.png" },
  { id: "patient_002", name: "Rajesh Kumar", role: "patient", avatar: "/avatars/avatar_rajesh.png" },
  { id: "patient_003", name: "Sarah Jenkins", role: "patient", avatar: "/avatars/avatar_sarah.png" },
  { id: "caregiver_001", name: "Arun Sharma", role: "caregiver", avatar: "/avatars/avatar_arun.png", assignedPatientIds: ["patient_001"] },
  { id: "caregiver_002", name: "Emily Davis", role: "caregiver", avatar: "/avatars/avatar_emily.png", assignedPatientIds: ["patient_002", "patient_003"] }
];

interface UserContextType {
  activeProfile: Profile;
  activePatientId: string | null;
  setActiveProfileId: (id: string) => void;
  setActivePatientId: (id: string | null) => void; // Used when a caregiver switches which patient they are viewing (null = aggregate view)
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [activeProfile, setActiveProfile] = useState<Profile>(PROFILES[0]);
  const [activePatientId, setActivePatientId] = useState<string | null>("patient_001");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedProfileId = localStorage.getItem("ember_activeProfileId");
    if (storedProfileId) {
      const p = PROFILES.find(p => p.id === storedProfileId);
      if (p) {
        setActiveProfile(p);
        
        // Restore their selected patient if they are a caregiver, or themselves if patient
        if (p.role === "patient") {
          setActivePatientId(p.id);
        } else {
          // Caregivers default to the aggregate view (null)
          setActivePatientId(null);
        }
      }
    }
  }, []);

  const handleSetProfile = (id: string) => {
    const p = PROFILES.find(p => p.id === id);
    if (!p) return;
    
    setActiveProfile(p);
    localStorage.setItem("ember_activeProfileId", id);

    if (p.role === "patient") {
      setActivePatientId(p.id);
      localStorage.setItem("ember_activePatientId", p.id);
    } else {
      setActivePatientId(null);
      localStorage.removeItem("ember_activePatientId");
    }
  };

  const handleSetPatient = (id: string | null) => {
    setActivePatientId(id);
    if (id) {
      localStorage.setItem("ember_activePatientId", id);
    } else {
      localStorage.removeItem("ember_activePatientId");
    }
  };

  if (!isClient) {
    return <div className="min-h-screen bg-[#f5f6fa]"></div>; // Render empty state during SSR to avoid hydration mismatch
  }

  return (
    <UserContext.Provider value={{
      activeProfile,
      activePatientId,
      setActiveProfileId: handleSetProfile,
      setActivePatientId: handleSetPatient
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
