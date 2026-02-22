import { NavLink } from "react-router-dom";
import { LayoutDashboard, MessageCircle, Settings } from "lucide-react";

export default function CitizenSidebar() {
  return (
    <div className="w-64 h-screen bg-[#0F766E] text-white fixed left-0 top-0 flex flex-col">

      {/* Logo / Title */}
      <div className="p-6 text-lg font-semibold border-b border-[#0D5E58]">
        Citizen Portal
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 text-sm">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition ${
              isActive ? "bg-[#0D5E58]" : "hover:bg-[#0D5E58]"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/report"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition ${
              isActive ? "bg-[#0D5E58]" : "hover:bg-[#0D5E58]"
            }`
          }
        >
          <MessageCircle size={18} />
          File Report
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition ${
              isActive ? "bg-[#0D5E58]" : "hover:bg-[#0D5E58]"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="p-4 text-xs border-t border-[#0D5E58] text-gray-200">
        Secure Digital Reporting
      </div>

    </div>
  );
}