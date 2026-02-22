import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 w-full z-50"
    >
      {/* Authority Strip */}
      <div className="bg-gray-100 border-b border-gray-300 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <div>Empowering Citizens, Enhancing Safety</div>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="bg-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Portal Name */}
          <div className="text-lg font-semibold tracking-wide">
            AI Secure Reporting Portal
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8 text-sm">

            <Link to="/" className="hover:underline underline-offset-4">
              Home
            </Link>

            <Link to="/report" className="hover:underline underline-offset-4">
              Report Incident
            </Link>

            <Link to="/track" className="hover:underline underline-offset-4">
              Track Complaint
            </Link>

            <Link to="/login" className="hover:underline underline-offset-4">
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-white text-[#1E3A8A] px-4 py-1 rounded-sm font-medium"
            >
              Register
            </Link>

          </nav>
        </div>
      </div>
    </motion.header>
  );
}