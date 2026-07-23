import React from "react";
import { Users, UserPlus, Heart, Stethoscope, AlertTriangle } from "lucide-react";
import { AppData } from "@/lib/types";

export function CareCircleTab({ patientData }: { patientData: AppData }) {
  // Mock Care Circle Members for MVP based on patient data
  const careCircle = [
    {
      id: 1,
      name: "Arun Sharma",
      role: "Primary Caregiver",
      relationship: "Son",
      icon: Heart,
      color: "bg-rose-100 text-rose-600",
      iconColor: "text-rose-500",
    },
    {
      id: 2,
      name: "Dr. Anya",
      role: "Primary Doctor",
      relationship: "Cardiologist",
      icon: Stethoscope,
      color: "bg-cyan-100 text-cyan-600",
      iconColor: "text-cyan-500",
    }
  ];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Users className="w-6 h-6 text-cyan-600" />
            Your Care Circle
          </h2>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-colors">
            <UserPlus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        <p className="text-slate-500 mb-8">Manage the people who have access to your health updates and alerts.</p>

        {/* Caregiver Alerts */}
        {(() => {
          const criticalReminders = patientData.reminders?.filter((r: any) => r.missedCount >= 2) || [];
          if (criticalReminders.length === 0) return null;
          
          return (
            <div className="mb-8 space-y-3">
              {criticalReminders.map((reminder: any) => (
                <div key={`caregiver-alert-${reminder.id}`} className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-full shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-900 text-sm">Caregiver Notification Triggered</h4>
                      <p className="text-orange-800 text-sm mt-0.5">
                        ⚠️ <strong>Arun Sharma</strong> would be notified: <strong>{reminder.text}</strong> missed {reminder.missedCount}x in a row.
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-sm whitespace-nowrap transition-colors">
                    Review Alert
                  </button>
                </div>
              ))}
            </div>
          );
        })()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careCircle.map((member) => {
            const Icon = member.icon;
            return (
              <div key={member.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${member.color}`}>
                    <Icon className={`w-6 h-6 ${member.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{member.name}</h4>
                    <p className="text-sm text-slate-500">{member.relationship}</p>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-200 text-slate-700`}>
                    {member.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
