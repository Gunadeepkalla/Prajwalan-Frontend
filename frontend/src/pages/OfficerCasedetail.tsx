import OfficerLayout from "../components/OfficerLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, FileText, AlertTriangle, RefreshCw, CheckCircle2, Send } from "lucide-react";
import api from "../lib/api";

const PRIORITY_STYLE: Record<string, string> = {
  CRITICAL: "text-rose-600 font-semibold",
  HIGH:     "text-red-600 font-semibold",
  MEDIUM:   "text-amber-600",
  LOW:      "text-slate-500",
};

const STATUS_OPTS = ["SUBMITTED", "INVESTIGATING", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export default function OfficerCaseDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [noteSending, setNoteSending] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchCase = () => {
    setLoading(true);
    api.get(`/api/police/complaints/${id}`)
      .then((res) => setData(res.data.complaint ?? res.data))
      .catch(() => setError("Failed to load case details."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCase(); }, [id]);

  const addNote = async () => {
    if (!note.trim()) return;
    setNoteSending(true);
    try {
      await api.post(`/api/police/complaints/${id}/notes`, { note });
      setNote("");
      setNoteSuccess(true);
      setTimeout(() => setNoteSuccess(false), 3000);
      fetchCase();
    } catch {
      // silently log
    } finally {
      setNoteSending(false);
    }
  };

  const updateStatus = async (status: string) => {
    setUpdatingStatus(true);
    try {
      await api.patch(`/api/police/complaints/${id}`, { status });
      fetchCase();
    } catch {/* ignore */} finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return (
    <OfficerLayout>
      <div className="flex items-center gap-2 text-slate-500 text-sm py-20 justify-center">
        <RefreshCw size={16} className="animate-spin" /> Loading case
      </div>
    </OfficerLayout>
  );

  if (error || !data) return (
    <OfficerLayout>
      <div className="text-red-500 text-sm py-20 text-center">{error || "Case not found."}</div>
    </OfficerLayout>
  );

  return (
    <OfficerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Case Operational View</h1>
          <p className="text-slate-400 text-sm mt-0.5 font-mono">{id}</p>
        </div>

        {/* Basic Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Incident Type" value={data.incidentType?.replace(/_/g, " ") ?? "—"} />
            <Field label="Priority" value={<span className={PRIORITY_STYLE[data.priorityLevel] ?? ""}>{data.priorityLevel ?? "—"}</span>} />
            <Field label="Status" value={
              <select
                value={data.status}
                disabled={updatingStatus}
                onChange={(e) => updateStatus(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
              >
                {STATUS_OPTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            } />
            <Field label="Reported At" value={data.createdAt ? new Date(data.createdAt).toLocaleString() : "—"} />
            {data.isEmergency && (
              <div className="sm:col-span-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                  <AlertTriangle size={12} /> Emergency Case
                </span>
              </div>
            )}
          </div>
          {data.aiSummary && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">AI Summary</p>
              <p className="text-sm text-slate-700 leading-relaxed">{data.aiSummary}</p>
            </div>
          )}
        </motion.div>

        {/* Location */}
        {(data.latitude || data.locationAddress) && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={17} className="text-[#2355D4]" />
              <h2 className="font-semibold text-slate-700">Incident Location</h2>
            </div>
            {data.locationAddress && <p className="text-sm text-slate-600 mb-2">{data.locationAddress}</p>}
            {data.latitude && (
              <>
                <p className="text-xs text-slate-400 mb-3">
                  {data.latitude}, {data.longitude}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#2355D4] hover:underline"
                >
                  View on Google Maps
                </a>
              </>
            )}
          </motion.div>
        )}

        {/* Timeline / Updates */}
        {data.updates?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={17} className="text-[#2355D4]" />
              <h2 className="font-semibold text-slate-700">Case Timeline</h2>
            </div>
            <ol className="space-y-4">
              {data.updates.map((u: any, i: number) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2355D4] mt-1 flex-shrink-0" />
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

        {/* Evidence */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={17} className="text-[#2355D4]" />
            <h2 className="font-semibold text-slate-700">Evidence Files</h2>
          </div>
          {data.evidences?.length ? (
            <ul className="space-y-2">
              {data.evidences.map((e: any, i: number) => (
                <li key={i} className="text-sm text-blue-600 hover:underline">
                  <a href={e.url} target="_blank" rel="noopener noreferrer">{e.fileName ?? `Evidence ${i + 1}`}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No evidence files uploaded.</p>
          )}
        </motion.div>

        {/* Add Note */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">Add Internal Note</h2>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add an internal note visible only to officers..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-blue-400"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
            <button
              onClick={addNote}
              disabled={noteSending || !note.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#2355D4] text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 w-full sm:w-auto justify-center sm:justify-start"
            >
              {noteSending ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
              Add Note
            </button>
            {noteSuccess && (
              <span className="flex items-center gap-1 text-emerald-600 text-sm">
                <CheckCircle2 size={14} /> Note added
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </OfficerLayout>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
      <div className="text-sm text-slate-700">{value}</div>
    </div>
  );
}