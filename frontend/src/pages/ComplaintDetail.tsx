import CitizenLayout from "../components/CitizenLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, MapPin, Clock, Info } from "lucide-react";
import api from "../lib/api";

const STATUS_STYLE: Record<string, string> = {
  SUBMITTED:    "bg-blue-100 text-blue-700",
  INVESTIGATING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS:  "bg-orange-100 text-orange-700",
  RESOLVED:     "bg-emerald-100 text-emerald-700",
  CLOSED:       "bg-gray-100 text-gray-600",
};

const PRIORITY_STYLE: Record<string, string> = {
  CRITICAL: "text-rose-600 font-semibold",
  HIGH:     "text-red-600 font-semibold",
  MEDIUM:   "text-amber-600",
  LOW:      "text-slate-500",
};

const TIMELINE_STEPS = ["SUBMITTED", "INVESTIGATING", "IN_PROGRESS", "RESOLVED"];

function stepIndex(status: string) {
  const i = TIMELINE_STEPS.indexOf(status);
  return i === -1 ? (status === "CLOSED" ? 3 : 0) : i;
}

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/complaints/track/${id}`)
      .then((res) => setData(res.data.complaint ?? res.data))
      .catch(() => setError("Could not load complaint details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <CitizenLayout>
      <div className="flex items-center gap-2 text-slate-500 text-sm py-20 justify-center">
        <RefreshCw size={16} className="animate-spin" /> Loading complaint
      </div>
    </CitizenLayout>
  );

  if (error || !data) return (
    <CitizenLayout>
      <div className="text-red-500 text-sm py-20 text-center">{error || "Complaint not found."}</div>
    </CitizenLayout>
  );

  const activeStep = stepIndex(data.status);

  return (
    <CitizenLayout>
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Complaint Details</h1>

      <div className="space-y-5">

        {/* Core info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm space-y-5">

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Tracking ID">
              <span className="font-mono text-sm text-slate-600">{data.trackingId ?? id}</span>
            </Field>
            <Field label="Incident Type">
              <span className="capitalize">{data.incidentType?.replace(/_/g, " ").toLowerCase() ?? "—"}</span>
            </Field>
            <Field label="Priority">
              <span className={PRIORITY_STYLE[data.priorityLevel] ?? ""}>{data.priorityLevel ?? "—"}</span>
            </Field>
            <Field label="Status">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[data.status] ?? "bg-gray-100 text-gray-600"}`}>
                {data.status?.replace(/_/g, " ")}
              </span>
            </Field>
            <Field label="Filed On">
              <span className="text-sm text-slate-600">{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "—"}</span>
            </Field>
            {data.station && (
              <Field label="Assigned Station">
                <span className="text-sm text-slate-600">{data.station.stationName}{data.station.district ? `, ${data.station.district}` : ""}</span>
              </Field>
            )}
          </div>

          {data.locationAddress && (
            <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
              <MapPin size={15} className="text-[#0F766E] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-600">{data.locationAddress}</p>
            </div>
          )}
        </motion.div>

        {/* Progress Timeline */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
          className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={16} className="text-[#0F766E]" />
            <h2 className="font-semibold text-slate-700">Case Progress</h2>
          </div>

          <ol className="relative border-l-2 border-slate-100 ml-3 space-y-6">
            {TIMELINE_STEPS.map((step, i) => {
              const isActive = i <= activeStep;
              return (
                <li key={step} className="flex items-start gap-4 pl-4 relative">
                  <div className={`absolute -left-[11px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${isActive ? "bg-[#0F766E] border-[#0F766E]" : "bg-white border-slate-200"}`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isActive ? "text-[#0F766E]" : "text-slate-400"}`}>
                      {step.replace(/_/g, " ")}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>

        {/* Activity Updates */}
        {data.updates?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Info size={16} className="text-[#0F766E]" />
              <h2 className="font-semibold text-slate-700">Activity Updates</h2>
            </div>
            <ol className="space-y-4">
              {data.updates.map((u: any, i: number) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0F766E] mt-1 flex-shrink-0" />
                    {i < data.updates.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-slate-700">{u.updateType?.replace(/_/g, " ")}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(u.createdAt).toLocaleString()}</p>
                    {u.content && <p className="text-sm text-slate-600 mt-1">{u.content}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </div>
    </CitizenLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
      <div>{children}</div>
    </div>
  );
}