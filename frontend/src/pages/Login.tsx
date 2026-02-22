import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <div className="flex items-center justify-center pt-40 px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-10 rounded-md
                     bg-white border border-gray-200 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Secure Login
          </h2>

          <p className="text-[#64748B] mb-8 text-sm">
            Access your citizen reporting dashboard.
          </p>

          <div className="space-y-6">

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Email or Phone"
                className="w-full pl-12 pr-4 py-3 rounded-md
                           border border-gray-300
                           focus:border-[#14B8A6] focus:outline-none
                           transition"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-md
                           border border-gray-300
                           focus:border-[#14B8A6] focus:outline-none
                           transition"
              />
            </div>

          </div>

          <motion.button
            whileHover={{ opacity: 0.95 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-3 rounded-md
                       bg-[#0F766E] text-white font-medium
                       hover:bg-[#0D5E58] transition"
          >
            Login Securely
          </motion.button>

          <p className="mt-6 text-sm text-[#64748B] text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#0F766E] hover:underline">
              Create Citizen Identity
            </a>
          </p>

          <p className="mt-4 text-xs text-gray-400 text-center">
            End-to-End Encrypted | Privacy-First Infrastructure
          </p>

        </motion.div>

      </div>
    </div>
  );
}