"use client";

import { Bell, Settings, HelpCircle } from "lucide-react";

export function MobileHeader({ title, subtitle }: { title?: string, subtitle?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 flex md:hidden items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-3 shadow-sm">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-slate-800">{title || "Ember"}</h1>
        {subtitle && (
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
            {subtitle}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white relative shadow-md active:scale-95 transition-transform">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-400 rounded-full border-2 border-slate-900"></span>
        </button>
        <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md active:scale-95 transition-transform">
          <Settings className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md active:scale-95 transition-transform">
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
