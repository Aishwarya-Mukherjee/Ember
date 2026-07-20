"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Flame, LayoutDashboard, CheckSquare, Pill, Activity, Stethoscope, Calendar, BrainCircuit, FileText, Users, Settings } from "lucide-react";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard?tab=check-in", label: "Check-in", icon: CheckSquare },
    { href: "/dashboard?tab=medications", label: "Medications", icon: Pill },
    { href: "/dashboard?tab=vitals", label: "Vitals", icon: Activity },
    { href: "/dashboard?tab=symptoms", label: "Symptoms", icon: Stethoscope },
    { href: "/dashboard?tab=appointments", label: "Appointments", icon: Calendar },
  ];

  const secondaryNavItems = [
    { href: "/dashboard?tab=insights", label: "Insights", icon: BrainCircuit },
    { href: "/dashboard?tab=reports", label: "Reports", icon: FileText },
    { href: "/dashboard?tab=care-circle", label: "Care Circle", icon: Users },
    { href: "/dashboard?tab=settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 left-0 bg-white/40 backdrop-blur-3xl border-r border-white/50 flex flex-col justify-between py-8 px-4 shadow-[10px_0_30px_-15px_rgba(139,92,246,0.1)] z-50">
      
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3 px-4 mb-8 group cursor-pointer">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-slate-800">Ember</span>
      </Link>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = (item.href === "/dashboard" && tab === "dashboard") || (item.href.includes("?tab=") && item.href.includes(`tab=${tab}`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
        
        <div className="my-4 border-t border-white/50 w-full" />
        
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = (item.href === "/dashboard" && tab === "dashboard") || (item.href.includes("?tab=") && item.href.includes(`tab=${tab}`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-6 bg-white/60 border border-white/80 p-4 rounded-3xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-white/80 transition-colors">
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
          <Image src="/doctor-avatar.png" alt="Profile" width={40} height={40} className="object-cover" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-bold text-sm text-slate-800 truncate">Meera Sharma</p>
          <p className="text-xs text-slate-500 truncate">Patient ID: EMB-7845</p>
        </div>
      </div>
    </aside>
  );
}

