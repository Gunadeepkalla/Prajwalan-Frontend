import { useState } from "react";
import OfficerSidebar from "./OfficerSidebar";
import { Menu } from "lucide-react";

export default function OfficerLayout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <OfficerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen bg-[#F1F5F9] text-[#0F172A]">
        {/* Mobile top bar */}
        <div
          className="md:hidden flex items-center gap-3 text-white px-4 py-3.5 sticky top-0 z-20"
          style={{ background: "linear-gradient(135deg,#1B3A6B,#2355D4)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-sm tracking-wide">Officer Control</span>
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}