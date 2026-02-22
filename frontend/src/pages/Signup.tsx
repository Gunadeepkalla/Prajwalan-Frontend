import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { User, Mail, Phone, Lock, CreditCard } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const [aadhar, setAadhar] = useState("");

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) {
      setAadhar(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <div className="flex items-center justify-center pt-40 px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg p-10 rounded-md
                     bg-white border border-gray-200 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Create Citizen Identity
          </h2>

          <p className="text-[#64748B] mb-8 text-sm">
            Register securely to access AI-powered reporting services.
          </p>

          <div className="space-y-6">

            <Input icon={<User size={18} />} placeholder="Full Name" />
            <Input icon={<Mail size={18} />} placeholder="Email Address" />
            <Input icon={<Phone size={18} />} placeholder="Mobile Number" />

            <div className="relative">
              <CreditCard
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={aadhar}
                onChange={handleAadharChange}
                placeholder="Aadhaar Number (12 digits)"
                className="w-full pl-12 pr-4 py-3 rounded-md
                           border border-gray-300
                           focus:border-[#14B8A6] focus:outline-none
                           transition"
              />
            </div>

            <Input icon={<Lock size={18} />} placeholder="Create Password" type="password" />

          </div>

          <motion.button
            whileHover={{ opacity: 0.95 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-3 rounded-md
                       bg-[#0F766E] text-white font-medium
                       hover:bg-[#0D5E58] transition"
          >
            Register Securely
          </motion.button>

          <p className="mt-6 text-sm text-[#64748B] text-center">
            Already registered?{" "}
            <a href="/login" className="text-[#0F766E] hover:underline">
              Login Here
            </a>
          </p>

          <p className="mt-4 text-xs text-gray-400 text-center">
            Aadhaar data is encrypted and securely stored as per IT Act compliance.
          </p>

        </motion.div>

      </div>
    </div>
  );
}

function Input({ icon, placeholder, type = "text" }: any) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-md
                   border border-gray-300
                   focus:border-[#14B8A6] focus:outline-none
                   transition"
      />
    </div>
  );
}