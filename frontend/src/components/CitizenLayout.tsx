import { useState } from "react";
import CitizenSidebar from "./CitzenSidebar";
import { Menu } from "lucide-react";

export default function CitizenLayout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <CitizenSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset on desktop, full-width on mobile */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 bg-[#0F766E] text-white px-4 py-3.5 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md hover:bg-[#0D5E58] transition"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-sm tracking-wide">Citizen Portal</span>
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}