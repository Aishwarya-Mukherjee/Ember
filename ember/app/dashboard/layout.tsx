import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#f5f6fa] min-h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
