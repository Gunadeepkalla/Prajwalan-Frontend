import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/officer",               icon: <LayoutDashboard size={17} />, label: "Dashboard" },
  { to: "/officer/high-priority", icon: <AlertTriangle size={17} />,   label: "High Priority" },
  { to: "/officer/assigned",      icon: <Users size={17} />,           label: "Assigned Cases" },
  { to: "/officer/analytics",     icon: <BarChart3 size={17} />,       label: "Analytics" },
  { to: "/officer/settings",      icon: <Settings size={17} />,        label: "Settings" },
];

interface OfficerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function OfficerSidebar({ isOpen = false, onClose }: OfficerSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          w-64 h-screen fixed left-0 top-0 flex flex-col text-white z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{ background: "linear-gradient(180deg,#1B3A6B 0%,#0F2650 100%)" }}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Prajwalan</p>
              <p className="text-[10px] text-blue-200 mt-0.5">Officer Control</p>
            </div>
          </div>
          {/* Close button (mobile only) */}
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 text-sm">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/officer"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 font-medium ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[10px] text-blue-300/70 uppercase tracking-wider">Internal Operational System</p>
          <p className="text-[10px] text-blue-300/50 mt-0.5">Secure · Encrypted · Audited</p>
        </div>
      </div>
    </>
  );
}