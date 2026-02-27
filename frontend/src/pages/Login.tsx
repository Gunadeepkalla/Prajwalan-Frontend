import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Phone, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginCitizen } = useAuth();
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (mobile.length !== 10) { setError("Enter a valid 10-digit mobile number"); return; }
    setError("");
    setLoading(true);
    try {
      await api.post("/api/auth/send-mobile-otp", { mobile });
      setStep("otp");
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { setError("Enter the 6-digit OTP"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/mobile/login", { mobile, otp });
      loginCitizen(res.data.user, res.data.accessToken);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") step === "form" ? sendOtp() : verifyOtp();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <div className="flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 sm:p-10 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <ShieldCheck size={20} className="text-[#0F766E]" />
            </div>
            <h2 className="text-2xl font-semibold">
              {step === "form" ? "Citizen Login" : "Verify OTP"}
            </h2>
          </div>
          <p className="text-[#64748B] mb-8 text-sm">
            {step === "form"
              ? "Enter your registered mobile number to receive a one-time password."
              : `A 6-digit OTP was sent to +91 ${mobile.slice(0, 2)}****${mobile.slice(-2)}.`}
          </p>

          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">+91</span>
                  <Phone className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    onKeyDown={handleKey}
                    placeholder="10-digit mobile number"
                    className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:outline-none transition text-sm"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full mt-2 py-3 rounded-xl bg-[#0F766E] text-white font-medium hover:bg-[#0D5E58] transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <><ArrowRight size={16} /> Get OTP</>
                  )}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={handleKey}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:outline-none transition text-center text-xl font-bold tracking-[0.3em] mb-4"
                />
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#0F766E] text-white font-medium hover:bg-[#0D5E58] transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <><ShieldCheck size={16} /> Verify & Login</>
                  )}
                </motion.button>
                <button
                  onClick={() => { setStep("form"); setOtp(""); setError(""); }}
                  className="w-full mt-3 py-2 text-sm text-slate-500 hover:text-slate-700"
                >
                  Change number
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo hint */}
          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-100 px-4 py-2.5 text-xs text-amber-700">
            🧪 <strong>Demo mode:</strong> Enter any 10-digit mobile number, then use OTP <strong>123456</strong>
          </div>

          <p className="mt-6 text-sm text-[#64748B] text-center">
            Do not have an account?{" "}
            <a href="/signup" className="text-[#0F766E] hover:underline font-medium">
              Create Citizen Identity
            </a>
          </p>
          <p className="mt-3 text-xs text-gray-400 text-center">
            End-to-End Encrypted - Privacy-First Infrastructure
          </p>
        </motion.div>
      </div>
    </div>
  );
}