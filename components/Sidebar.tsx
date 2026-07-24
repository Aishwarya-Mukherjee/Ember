"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Flame,
  LayoutDashboard,
  CheckSquare,
  Pill,
  Activity,
  Stethoscope,
  Calendar,
  BrainCircuit,
  FileText,
  Users,
  Settings,
  Heart,
  Bell,
  TrendingUp,
  ClipboardList,
  Phone,
} from "lucide-react";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { useUser } from "./UserProvider";

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";
  const { activeProfile } = useUser();

  const isCaregiver = activeProfile.role === "caregiver";

  // Patient sidebar items (existing)
  const patientNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard?tab=check-in", label: "Check-in", icon: CheckSquare },
    { href: "/dashboard?tab=medications", label: "Medications", icon: Pill },
    { href: "/dashboard?tab=vitals", label: "Vitals", icon: Activity },
    { href: "/dashboard?tab=symptoms", label: "Symptoms", icon: Stethoscope },
    { href: "/dashboard?tab=appointments", label: "Appointments", icon: Calendar },
  ];

  const patientSecondaryItems = [
    { href: "/dashboard?tab=insights", label: "Insights", icon: BrainCircuit },
    { href: "/dashboard?tab=reports", label: "Reports", icon: FileText },
    { href: "/dashboard?tab=care-circle", label: "Care Circle", icon: Users },
    { href: "/dashboard?tab=settings", label: "Settings", icon: Settings },
  ];

  // Caregiver sidebar items (new)
  const caregiverNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard?tab=my-patients", label: "My Patients", icon: Users },
    { href: "/dashboard?tab=health-trends", label: "Health Trends", icon: TrendingUp },
    { href: "/dashboard?tab=cg-alerts", label: "Alerts", icon: Bell },
  ];

  const caregiverToolItems = [
    { href: "/dashboard?tab=med-tracker", label: "Med Tracker", icon: Pill },
    { href: "/dashboard?tab=daily-log", label: "Daily Log", icon: ClipboardList },
    { href: "/dashboard?tab=emergency", label: "Emergency Info", icon: Phone },
  ];

  const navItems = isCaregiver ? caregiverNavItems : patientNavItems;
  const secondaryItems = isCaregiver ? caregiverToolItems : patientSecondaryItems;
  const sectionLabel = isCaregiver ? "TOOLS" : "";

  const renderNavItem = (item: { href: string; label: string; icon: any }) => {
    const Icon = item.icon;
    const isActive =
      (item.href === "/dashboard" && tab === "dashboard") ||
      (item.href.includes("?tab=") && item.href.includes(`tab=${tab}`));

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
  };

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
        {isCaregiver && (
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] px-4 mb-2">
            General
          </p>
        )}
        {navItems.map(renderNavItem)}
        
        <div className="my-4 border-t border-white/50 w-full" />
        
        {isCaregiver && (
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] px-4 mb-2">
            Tools
          </p>
        )}
        {secondaryItems.map(renderNavItem)}
      </nav>

      {/* User Profile */}
      <div className="mt-6">
        <ProfileSwitcher />
      </div>
    </aside>
  );
}

