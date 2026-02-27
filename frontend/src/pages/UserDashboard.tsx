import { useEffect, useState } from "react";
import CitizenLayout from "../components/CitizenLayout";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCw, FileText, AlertTriangle } from "lucide-react";
import api from "../lib/api";

interface Complaint {
  trackingId: string;
  incidentType: string;
  status: string;
  priorityLevel: string;
  isEmergency: boolean;
  createdAt: string;
}

const statusStyle: Record<string, string> = {
  SUBMITTED: "bg-blue-100 text-blue-700",
  INVESTIGATING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-600",
};

const priorityStyle: Record<string, string> = {
  LOW: "text-slate-500",
  MEDIUM: "text-yellow-600",
  HIGH: "text-orange-600",
  CRITICAL: "text-red-600 font-semibold",
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/complaints/my")
      .then((res) => {
        setComplaints(res.data.complaints ?? []);
      })
      .catch(() => setError("Could not load your reports. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CitizenLayout>
      <h1 className="text-2xl font-semibold mb-8">Welcome Back</h1>

      {/* Quick Action Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-medium mb-2">Start a New Report</h2>
        <p className="text-sm text-gray-500 mb-4">
          Report incidents safely and securely with AI guidance.
        </p>
        <Link
          to="/report"
          className="inline-block px-6 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0D5E58] transition text-sm font-medium"
        >
          File Report
        </Link>
      </div>

      {/* Recent Reports */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-6">Recent Reports</h2>

        {loading ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm py-8 justify-center">
            <RefreshCw size={16} className="animate-spin" />
            Loading your reports...
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-500 text-sm py-8 justify-center">
            <AlertTriangle size={16} />
            {error}
          </div>
        ) : complaints.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-slate-400">
            <FileText size={36} strokeWidth={1.2} />
            <p className="text-sm">No reports filed yet.</p>
            <Link to="/report" className="text-[#0F766E] text-sm hover:underline">File your first report</Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm text-left min-w-[540px]">
              <thead className="border-b border-gray-200">
                <tr className="text-slate-500">
                  <th className="py-3 font-medium">Tracking ID</th>
                  <th className="font-medium">Incident</th>
                  <th className="font-medium">Status</th>
                  <th className="font-medium">Priority</th>
                  <th className="font-medium">Filed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {complaints.map((c, i) => (
                  <motion.tr
                    key={c.trackingId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/complaint/${c.trackingId}`)}
                    className="cursor-pointer hover:bg-slate-50 transition"
                  >
                    <td className="py-3 font-mono text-xs text-slate-600">{c.trackingId}</td>
                    <td className="capitalize">{c.incidentType?.toLowerCase().replace(/_/g, " ") ?? "—"}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[c.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {c.status?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className={`text-xs ${priorityStyle[c.priorityLevel] ?? ""}`}>
                      {c.isEmergency ? " Emergency" : c.priorityLevel}
                    </td>
                    <td className="text-slate-400 text-xs">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CitizenLayout>
  );
}