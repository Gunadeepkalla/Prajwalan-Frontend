import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Lock } from "lucide-react";

export default function OfficerLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/officer");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-md p-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-[#2563EB]" />
          <h2 className="text-2xl font-semibold">
            Officer Secure Access
          </h2>
        </div>

        <p className="text-sm text-gray-400 mb-8">
          Authorized personnel only. All access attempts are monitored.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Officer ID"
            className="w-full px-4 py-3 bg-[#0F172A] border border-[#1F2937] rounded-md focus:outline-none focus:border-[#2563EB]"
          />

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-[#1F2937] rounded-md focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-8 py-3 bg-[#2563EB] rounded-md hover:bg-[#1D4ED8]"
        >
          Access Operational System
        </button>

      </motion.div>
    </div>
  );
}