import { NavLink } from "react-router-dom";
import { LayoutDashboard, MessageCircle, Settings, X } from "lucide-react";

interface CitizenSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CitizenSidebar({ isOpen = false, onClose }: CitizenSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 h-screen bg-[#0F766E] text-white fixed left-0 top-0 flex flex-col z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo / Title */}
        <div className="p-6 text-lg font-semibold border-b border-[#0D5E58] flex items-center justify-between">
          <span>Citizen Portal</span>
          {/* Close button (mobile only) */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 text-sm">
          {[
            { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
            { to: "/report",    icon: <MessageCircle size={18} />,   label: "File Report" },
            { to: "/settings",  icon: <Settings size={18} />,        label: "Settings" },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition ${
                  isActive ? "bg-[#0D5E58]" : "hover:bg-[#0D5E58]"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 text-xs border-t border-[#0D5E58] text-gray-200">
          Secure Digital Reporting
        </div>
      </div>
    </>
  );
}