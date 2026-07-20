import Link from "next/link";
import { Flame, LayoutDashboard, CheckSquare, Pill, Activity, Stethoscope, Calendar, BrainCircuit, FileText, Users, Settings } from "lucide-react";
import Image from "next/image";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 left-0 bg-white/40 backdrop-blur-3xl border-r border-white/50 flex flex-col justify-between py-8 px-4 shadow-[10px_0_30px_-15px_rgba(139,92,246,0.1)] z-50">
      
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-slate-800">Ember</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-md shadow-purple-500/20 font-medium">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href="/check-in" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <CheckSquare className="w-5 h-5" />
          Check-in
        </Link>
        <Link href="/medications" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <Pill className="w-5 h-5" />
          Medications
        </Link>
        <Link href="/vitals" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <Activity className="w-5 h-5" />
          Vitals
        </Link>
        <Link href="/symptoms" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <Stethoscope className="w-5 h-5" />
          Symptoms
        </Link>
        <Link href="/appointments" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <Calendar className="w-5 h-5" />
          Appointments
        </Link>
        
        <div className="my-6 border-t border-white/50 w-full" />
        
        <Link href="/insights" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <BrainCircuit className="w-5 h-5" />
          Insights
        </Link>
        <Link href="/reports" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <FileText className="w-5 h-5" />
          Reports
        </Link>
        <Link href="/care-circle" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <Users className="w-5 h-5" />
          Care Circle
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-2xl transition-all font-medium">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>

      {/* User Profile */}
      <div className="mt-8 bg-white/60 border border-white/80 p-4 rounded-3xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-white/80 transition-colors">
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
