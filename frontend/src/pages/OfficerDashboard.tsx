import OfficerLayout from "../components/OfficerLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  FolderOpen,
  CheckCircle2,
  Inbox,
  ChevronRight,
  Activity,
} from "lucide-react";
import SpotlightCard from "../components/ui/SpotlightCard";
import AnimatedCounter from "../components/ui/AnimatedCounter";

/* ── priority / status pill config ── */
const PRIORITY_PILL: Record<string, string> = {
  HIGH:     "bg-red-100   text-red-700   border border-red-200",
  CRITICAL: "bg-rose-100  text-rose-700  border border-rose-200",
  MEDIUM:   "bg-amber-100 text-amber-700 border border-amber-200",
  LOW:      "bg-green-100 text-green-700 border border-green-200",
};
const STATUS_PILL: Record<string, string> = {
  SUBMITTED:    "bg-blue-100   text-blue-700   border border-blue-200",
  INVESTIGATING: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  IN_PROGRESS:  "bg-violet-100 text-violet-700 border border-violet-200",
  RESOLVED:     "bg-emerald-100 text-emerald-700 border border-emerald-200",
  CLOSED:       "bg-gray-100   text-gray-600   border border-gray-200",
};

function CaseRow({ id, type, priority, status, date, evidenceCount, index }: any) {
  const navigate = useNavigate();
  return (
    <motion.tr
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={() => navigate(`/officer/case/${id}`)}
      className="group cursor-pointer border-b border-slate-100 hover:bg-blue-50/60 transition-colors"
    >
      <td className="py-3 px-4 font-mono text-xs text-slate-500">{id}</td>
      <td className="px-4 text-sm font-medium text-slate-700">{type}</td>
      <td className="px-4">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${PRIORITY_PILL[priority] ?? ""}`}>
          {priority}
        </span>
      </td>
      <td className="px-4">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_PILL[status] ?? ""}`}>
          {status}
        </span>
      </td>
      <td className="px-4 text-sm text-slate-500">{date}</td>
      <td className="px-4 text-sm text-slate-600">{evidenceCount ?? 0}</td>
      <td className="px-4 text-slate-400 group-hover:text-blue-600 transition-colors">
        <ChevronRight size={15} />
      </td>
    </motion.tr>
  );
}

/* ── metric card config ── */
const METRIC_CONFIG = [
  {
    key: "total",
    label: "Total Cases",
    icon: <FolderOpen size={18} />,
    accent: "#2355D4",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    spot: "rgba(35,85,212,0.08)",
  },
  {
    key: "highPriority",
    label: "High Priority",
    icon: <AlertTriangle size={18} />,
    accent: "#DC2626",
    bg: "from-red-50 to-rose-50",
    border: "border-red-200",
    spot: "rgba(220,38,38,0.08)",
  },
  {
    key: "openCases",
    label: "Open Cases",
    icon: <Activity size={18} />,
    accent: "#2563EB",
    bg: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    spot: "rgba(37,99,235,0.08)",
  },
  {
    key: "resolved",
    label: "Resolved",
    icon: <CheckCircle2 size={18} />,
    accent: "#059669",
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    spot: "rgba(5,150,105,0.08)",
  },
];

export default function OfficerDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [metrics, setMetrics] = useState<Record<string, number>>({
    total: 0, highPriority: 0, openCases: 0, resolved: 0,
  });

  useEffect(() => {
    api.get("/api/police/dashboard")
      .then((res) => {
        const s = res.data.stats ?? {};
        setMetrics({
          total:       s.total       ?? 0,
          highPriority: s.highPriority ?? 0,
          openCases:   (s.pending ?? 0) + (s.inProgress ?? 0),
          resolved:    s.resolved    ?? 0,
        });
        const mapped = (res.data.recentComplaints ?? []).map((c: any) => ({
          id:            c.trackingId,
          type:          c.incidentType?.replace(/_/g, " ") ?? "Unknown",
          priority:      c.priorityLevel ?? "LOW",
          status:        c.status ?? "SUBMITTED",
          date:          c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—",
          evidenceCount: c._count?.evidences ?? 0,
        }));
        setCases(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredCases = cases.filter((c) => {
    if (filter === "All")      return true;
    if (filter === "High")     return c.priority === "HIGH" || c.priority === "CRITICAL";
    if (filter === "Open")     return c.status === "SUBMITTED" || c.status === "INVESTIGATING" || c.status === "IN_PROGRESS";
    if (filter === "Resolved") return c.status === "RESOLVED" || c.status === "CLOSED";
    return true;
  });

  return (
    <OfficerLayout>
      <div className="space-y-7">

        {/* ── Command Header ── */}
        <div className="relative overflow-hidden rounded-2xl p-7 text-white shadow-lg"
          style={{ background: "linear-gradient(135deg,#1B3A6B 0%,#2355D4 60%,#1D4ED8 100%)" }}
        >
          {/* decorative blobs */}
          {[
            { s: 240, t: -70, l: -60, o: "0.07" },
            { s: 180, t: 10, r: -40, o: "0.05" },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none bg-white"
              style={{ width: b.s, height: b.s, top: b.t, left: (b as any).l, right: (b as any).r, opacity: b.o }}
              animate={{ scale: [1, 1.15, 1], x: [0, 18, 0] }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <div className="relative flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">Operational Command Dashboard</h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  LIVE
                </span>
              </div>
              <p className="text-sm text-blue-100">
                Real-time case overview for assigned law enforcement personnel.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Restricted Access", "Encrypted Channel", "Audit Logged"].map((chip) => (
                  <span key={chip} className="text-[11px] bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center gap-3 text-slate-500 text-sm py-6">
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            Loading operational data…
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && cases.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
              <Inbox size={26} className="text-blue-400" />
            </div>
            <p className="text-lg font-semibold text-slate-700 mb-1">No Cases Assigned</p>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Case metrics and records will populate here once incidents are reported and assigned to this unit.
            </p>
          </motion.div>
        )}

        {/* ── Dashboard Content (when cases exist) ── */}
        {!loading && cases.length > 0 && (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {METRIC_CONFIG.map((cfg, i) => (
                <motion.div
                  key={cfg.key}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <SpotlightCard
                    spotlightColor={cfg.spot}
                    className={`rounded-2xl border ${cfg.border} bg-gradient-to-br ${cfg.bg} p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{cfg.label}</span>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${cfg.accent}18`, color: cfg.accent }}>
                        {cfg.icon}
                      </div>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-800">
                      <AnimatedCounter to={metrics[cfg.key]} duration={1400} />
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "High", "Open", "Resolved"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === f
                      ? "bg-[#2355D4] text-white shadow shadow-blue-200"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Case Table */}
            <SpotlightCard
              spotlightColor="rgba(35,85,212,0.05)"
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* table header bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
                <h2 className="text-sm font-semibold text-slate-700">Recent Cases</h2>
                <span className="text-xs text-slate-400">{filteredCases.length} records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[600px]">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wide bg-slate-50/60">
                      <th className="py-3 px-4">Case ID</th>
                      <th className="px-4">Type</th>
                      <th className="px-4">Priority</th>
                      <th className="px-4">Status</th>
                      <th className="px-4">Date</th>
                      <th className="px-4">Evidence</th>
                      <th className="px-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((c, i) => (
                      <CaseRow key={c.id} {...c} index={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </SpotlightCard>
          </>
        )}
      </div>
    </OfficerLayout>
  );
}