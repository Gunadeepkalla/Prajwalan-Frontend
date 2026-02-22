import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  BarChart3,
  Settings
} from "lucide-react";

export default function OfficerSidebar() {
  return (
    <div className="w-64 h-screen bg-[#111827] text-white fixed left-0 top-0 flex flex-col">

      {/* Header */}
      <div className="p-6 text-lg font-semibold border-b border-[#1F2937]">
        Officer Control
      </div>

      <nav className="flex-1 p-4 space-y-2 text-sm">

        <NavLink
          to="/officer"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition ${
              isActive
                ? "bg-[#1F2937]"
                : "hover:bg-[#1F2937]"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/officer/high-priority"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1F2937]"
        >
          <AlertTriangle size={18} />
          High Priority
        </NavLink>

        <NavLink
          to="/officer/assigned"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1F2937]"
        >
          <Users size={18} />
          Assigned Cases
        </NavLink>

        <NavLink
          to="/officer/analytics"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1F2937]"
        >
          <BarChart3 size={18} />
          Analytics
        </NavLink>

        <NavLink
          to="/officer/settings"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-[#1F2937]"
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>

      <div className="p-4 text-xs border-t border-[#1F2937] text-gray-400">
        Internal Operational System
      </div>

    </div>
  );
}