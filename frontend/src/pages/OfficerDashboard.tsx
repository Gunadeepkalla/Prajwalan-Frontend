import OfficerLayout from "../components/OfficerLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CaseRow({ id, type, priority, status, date }: any) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/officer/case/${id}`)}
      className="cursor-pointer hover:bg-[#1F2937] transition"
    >
      <td className="py-3">{id}</td>
      <td>{type}</td>
      <td
        className={
          priority === "High"
            ? "text-red-400"
            : priority === "Medium"
            ? "text-yellow-400"
            : "text-green-400"
        }
      >
        {priority}
      </td>
      <td>{status}</td>
      <td>{date}</td>
    </tr>
  );
}

export default function OfficerDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // 🔹 Simulated API-ready structure
  useEffect(() => {
    setTimeout(() => {
      setCases([]); // No backend data yet
      setLoading(false);
    }, 1000);
  }, []);

  // 🔹 Apply Filtering
  const filteredCases = cases.filter((c) => {
    if (filter === "All") return true;
    if (filter === "High") return c.priority === "High";
    if (filter === "Open") return c.status === "Open";
    if (filter === "Resolved") return c.status === "Resolved";
    return true;
  });

  // 🔹 Derived Metrics
  const metrics = {
    total: cases.length,
    highPriority: cases.filter((c) => c.priority === "High").length,
    openCases: cases.filter((c) => c.status === "Open").length,
    resolved: cases.filter((c) => c.status === "Resolved").length,
  };

  return (
    <OfficerLayout>
      <h1 className="text-2xl font-semibold mb-10">
        Operational Dashboard
      </h1>

      {/* Loading */}
      {loading && (
        <div className="text-gray-400">
          Loading operational data...
        </div>
      )}

      {/* Empty State */}
      {!loading && cases.length === 0 && (
        <div className="bg-[#111827] border border-[#1F2937] rounded-md p-10 text-center">
          <p className="text-lg text-gray-300 mb-2">
            No Cases Available
          </p>
          <p className="text-sm text-gray-500">
            Case metrics will appear here once incidents are reported and assigned.
          </p>
        </div>
      )}

      {/* Dashboard Content */}
      {!loading && cases.length > 0 && (
        <>
          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <MetricCard title="Total Cases" value={metrics.total} />
            <MetricCard title="High Priority" value={metrics.highPriority} highlight />
            <MetricCard title="Open Cases" value={metrics.openCases} />
            <MetricCard title="Resolved" value={metrics.resolved} />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mb-6">
            {["All", "High", "Open", "Resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm ${
                  filter === f
                    ? "bg-[#14B8A6] text-black"
                    : "bg-[#1F2937] text-gray-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Case Table */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-md p-6">
            <h2 className="text-lg font-medium mb-6">
              Recent Cases
            </h2>

            <table className="w-full text-sm text-left">
              <thead className="text-gray-400 border-b border-[#1F2937]">
                <tr>
                  <th className="py-3">Case ID</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1F2937]">
                {filteredCases.map((c) => (
                  <CaseRow key={c.id} {...c} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </OfficerLayout>
  );
}

function MetricCard({ title, value, highlight }: any) {
  return (
    <div
      className={`p-6 rounded-md border ${
        highlight
          ? "bg-[#1E293B] border-[#14B8A6]"
          : "bg-[#111827] border-[#1F2937]"
      }`}
    >
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}