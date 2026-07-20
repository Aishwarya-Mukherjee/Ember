"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Users, ScanLine, Bell, Menu } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  const navItems = [
    { id: "dashboard", label: "Overview", icon: Home, href: "/dashboard" },
    { id: "registry", label: "Registry", icon: Users, href: "/dashboard?tab=registry" },
    { id: "pillguard", label: "PillGuard", icon: ScanLine, href: "/dashboard?tab=pillguard" },
    { id: "alerts", label: "Alerts", icon: Bell, href: "/dashboard?tab=alerts" },
    { id: "tools", label: "Tools", icon: Menu, href: "/dashboard?tab=tools" },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 flex md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-100 px-2 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] pb-safe justify-around items-center">
      {navItems.map((item) => {
        const isActive = tab === item.id;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.id} 
            href={item.href}
            className={`flex flex-col items-center gap-1.5 min-w-[64px] px-2 py-1 rounded-xl transition-all ${
              isActive 
                ? "text-pink-500 scale-105" 
                : "text-slate-400 hover:text-slate-600 active:scale-95"
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
              {/* Add a tiny dot under the active icon like in the screenshot */}
              {isActive && (
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
              )}
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? "text-slate-700" : ""}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
