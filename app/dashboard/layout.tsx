import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { BottomNav } from "@/components/BottomNav";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#f5f6fa] min-h-screen font-sans">
      <div className="hidden md:flex">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>
      </div>
      <main className="flex-1 h-screen overflow-y-auto relative pb-20 md:pb-0">
        <MobileHeader subtitle={<><span className="w-2 h-2 rounded-full bg-green-500"></span> OPTIMAL</>} />
        {children}
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </main>
    </div>
  );
}
