import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CreditCard, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

function formatAadhaar(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1-");
}

export default function Signup() {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [masked, setMasked] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginCitizen } = useAuth();
  const navigate = useNavigate();

  const rawAadhaar = () => aadhaar.replace(/-/g, "");

  const sendOtp = async () => {
    if (rawAadhaar().length !== 12) { setError("Enter a valid 12-digit Aadhaar number"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/send-otp", { aadhaar: rawAadhaar(), language: "en" });
      setMasked(res.data.aadhaarMasked ?? "");
      setStep("otp");
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { setError("Enter the 6-digit OTP"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/verify-otp", { aadhaar: rawAadhaar(), otp, language: "en" });
      loginCitizen(res.data.user, res.data.accessToken);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.response?.data?.error ?? "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <div className="flex items-center justify-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 sm:p-10 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <CreditCard size={20} className="text-[#0F766E]" />
            </div>
            <h2 className="text-2xl font-semibold">
              {step === "form" ? "Create Citizen Identity" : "Verify Aadhaar OTP"}
            </h2>
          </div>
          <p className="text-[#64748B] mb-8 text-sm">
            {step === "form"
              ? "Enter your 12-digit Aadhaar number to verify your identity."
              : `OTP sent to the mobile linked with ${masked || "your Aadhaar"}.`}
          </p>

          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="relative mb-4">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:outline-none transition text-sm font-mono tracking-widest"
                    maxLength={14}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full mt-2 py-3 rounded-xl bg-[#0F766E] text-white font-medium hover:bg-[#0D5E58] transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <><ArrowRight size={16} /> Send OTP</>}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <input
                  type="text" maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={(e) => e.key === "Enter" && verifyOtp()}
                  placeholder="6-digit OTP"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:outline-none transition text-center text-xl font-bold tracking-[0.3em] mb-4"
                />
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#0F766E] text-white font-medium hover:bg-[#0D5E58] transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <><ShieldCheck size={16} /> Verify & Register</>}
                </motion.button>
                <button onClick={() => { setStep("form"); setOtp(""); setError(""); }} className="w-full mt-3 py-2 text-sm text-slate-500 hover:text-slate-700">
                  ← Change Aadhaar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo hint */}
          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-100 px-4 py-2.5 text-xs text-amber-700">
            🧪 <strong>Demo mode:</strong> Enter any 12-digit Aadhaar number, then use OTP <strong>123456</strong>
          </div>

          <p className="mt-6 text-sm text-[#64748B] text-center">
            Already registered?{" "}
            <a href="/login" className="text-[#0F766E] hover:underline font-medium">Login Here</a>
          </p>
          <p className="mt-3 text-xs text-gray-400 text-center">Aadhaar data is encrypted per IT Act compliance.</p>
        </motion.div>
      </div>
    </div>
  );
}