import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Mail, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function OfficerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginPolice } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError("Email and password are required"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/police/auth/login", { email, password });
      loginPolice(res.data.officer, res.data.accessToken);
      navigate("/officer");
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20"
      style={{ background: "linear-gradient(150deg,#0F2650 0%,#1B3A6B 60%,#2355D4 100%)" }}
    >
      {/* decorative blob */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#2355D4" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Navy header */}
          <div className="px-6 sm:px-8 py-6 sm:py-7" style={{ background: "linear-gradient(135deg,#1B3A6B,#2355D4)" }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">Prajwalan</p>
                <p className="text-blue-200 text-xs mt-0.5">Officer Secure Access</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-blue-100/80">Authorized personnel only — all access is monitored and audited.</p>
          </div>

          {/* Form */}
          <div className="px-6 sm:px-8 py-6 sm:py-7 space-y-5">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
              <ShieldCheck size={13} className="text-blue-500" />
              Secured by JWT · All access logged
            </div>

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="officer@police.gov.in"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-sm transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-sm transition"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#1B3A6B,#2355D4)" }}
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : "Sign In to Dashboard →"}
            </button>

            {/* Demo hint */}
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-2.5 text-xs text-amber-700">
              🔧 <strong>Demo:</strong> admin@reva.gov.in / Admin@123
            </div>

            <p className="text-center text-xs text-slate-400">
              Citizen?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">File a complaint →</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}