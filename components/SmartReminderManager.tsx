"use client";

import React, { useEffect, useState } from "react";
import { Pill, Calendar, BellRing, X, Check } from "lucide-react";
import { Reminder } from "@/lib/types";

export function SmartReminderManager({ 
  reminders, 
  onUpdate 
}: { 
  reminders: Reminder[], 
  onUpdate: () => void 
}) {
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReasonSelector, setShowReasonSelector] = useState(false);

  // Check for due reminders every 30 seconds
  useEffect(() => {
    const checkReminders = () => {
      if (activeReminder) return; // Don't interrupt if one is already showing

      const now = new Date();
      // Find a pending reminder that is past its scheduled time
      const due = reminders.find(r => {
        if (r.status !== 'pending') return false;
        const scheduled = new Date(r.scheduledAt);
        return scheduled <= now;
      });

      if (due) {
        setActiveReminder(due);
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 30000);
    return () => clearInterval(interval);
  }, [reminders, activeReminder]);

  const handleAction = async (action: 'done' | 'snooze' | 'missed', reason?: string) => {
    if (!activeReminder) return;
    
    // If user clicked 'missed' on a medication reminder but hasn't selected a reason yet,
    // we want to show the reason selector. We handle this locally by setting a state.
    if (action === 'missed' && activeReminder.type === 'medication' && !reason && !showReasonSelector) {
      setShowReasonSelector(true);
      return;
    }

    setIsProcessing(true);

    try {
      let newScheduledAt = activeReminder.scheduledAt;
      let newStatus = activeReminder.status;

      if (action === 'snooze') {
        // Add 30 minutes
        const d = new Date(activeReminder.scheduledAt);
        d.setMinutes(d.getMinutes() + 30);
        newScheduledAt = d.toISOString();
      } else {
        newStatus = action;
      }

      const res = await fetch('/api/reminders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeReminder.id,
          status: newStatus,
          scheduledAt: newScheduledAt,
          missedReason: reason,
        })
      });

      if (res.ok) {
        onUpdate();
      }
    } catch (e) {
      console.error("Failed to update reminder", e);
    } finally {
      setActiveReminder(null);
      setShowReasonSelector(false);
      setIsProcessing(false);
    }
  };

  if (!activeReminder) return null;

  const isMed = activeReminder.type === 'medication';
  const missedReasons = ['Forgot', 'Side effects', 'Ran out', 'Felt fine', 'Other'];

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-80 bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
        <BellRing className="w-4 h-4 text-white" />
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isMed ? 'bg-cyan-100 text-cyan-600' : 'bg-purple-100 text-purple-600'}`}>
          {isMed ? <Pill className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 leading-tight">Reminder Due</h4>
          <p className="text-xs text-slate-500">{new Date(activeReminder.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      
      <p className="text-sm font-medium text-slate-800 mb-5">{activeReminder.label}</p>
      
      {showReasonSelector ? (
        <div className="space-y-3 animate-in fade-in zoom-in duration-200">
          <p className="text-xs font-bold text-slate-600 mb-2">Why did you miss this dose?</p>
          <div className="flex flex-wrap gap-2">
            {missedReasons.map(r => (
              <button 
                key={r}
                onClick={() => handleAction('missed', r)}
                disabled={isProcessing}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {r}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowReasonSelector(false)}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button 
            onClick={() => handleAction('done')}
            disabled={isProcessing}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl flex justify-center items-center gap-1 transition-colors disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> Done
          </button>
          <button 
            onClick={() => handleAction('snooze')}
            disabled={isProcessing}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            Snooze 30m
          </button>
          <button 
            onClick={() => handleAction('missed')}
            disabled={isProcessing}
            className="w-10 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-400 font-bold text-xs py-2 rounded-xl flex justify-center items-center transition-colors disabled:opacity-50"
            title="Dismiss / Missed"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
