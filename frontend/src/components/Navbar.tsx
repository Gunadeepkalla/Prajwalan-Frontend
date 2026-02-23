import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavbarProps {
  scrolled?: boolean;
}

export default function Navbar({ scrolled = false }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 transition-all duration-400"
      style={{
        background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(210,220,240,0.6)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(35,85,212,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
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

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#4B5563]">
          <Link to="/" className="hover:text-[#2355D4] transition-colors duration-200">
            Home
          </Link>
          <Link to="/report" className="hover:text-[#2355D4] transition-colors duration-200">
            Report Incident
          </Link>
          <Link to="/track" className="hover:text-[#2355D4] transition-colors duration-200">
            Track Complaint
          </Link>
          <Link to="/login" className="hover:text-[#2355D4] transition-colors duration-200">
            Login
          </Link>
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
      </div>
    </motion.header>
  );
}