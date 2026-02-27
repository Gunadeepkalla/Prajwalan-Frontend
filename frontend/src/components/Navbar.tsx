import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  scrolled?: boolean;
}

export default function Navbar({ scrolled = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 transition-all duration-400"
      style={{
        background: scrolled || menuOpen ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(210,220,240,0.6)" : "none",
        boxShadow: scrolled || menuOpen ? "0 1px 24px rgba(35,85,212,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
            style={{ background: "linear-gradient(135deg,#2355D4,#1D4ED8)" }}
          >
            P
          </span>
          <span className="font-bold tracking-wide text-base text-[#111827]">
            Prajwalan
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#4B5563]">
          <Link to="/" className="hover:text-[#2355D4] transition-colors duration-200">Home</Link>
          <Link to="/report" className="hover:text-[#2355D4] transition-colors duration-200">Report Incident</Link>
          <Link to="/track" className="hover:text-[#2355D4] transition-colors duration-200">Track Complaint</Link>
          <Link to="/login" className="hover:text-[#2355D4] transition-colors duration-200">Login</Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg text-white font-semibold text-xs tracking-wide transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg,#2355D4,#1D4ED8)",
              boxShadow: "0 2px 12px rgba(35,85,212,0.28)",
            }}
          >
            Register
          </Link>
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden p-2 rounded-lg text-[#374151] hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg px-6 pb-5 pt-3 flex flex-col gap-3 text-sm text-[#374151]"
          >
            {[
              { to: "/", label: "Home" },
              { to: "/report", label: "Report Incident" },
              { to: "/track", label: "Track Complaint" },
              { to: "/login", label: "Login" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="py-2 border-b border-gray-100 hover:text-[#2355D4] transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="mt-1 text-center py-2.5 rounded-lg text-white font-semibold text-xs tracking-wide"
              style={{ background: "linear-gradient(135deg,#2355D4,#1D4ED8)" }}
            >
              Register
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}