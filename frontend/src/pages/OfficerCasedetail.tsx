import OfficerLayout from "../components/OfficerLayout";
import { useParams } from "react-router-dom";
import { MapPin, Clock, FileText, AlertTriangle } from "lucide-react";

export default function OfficerCaseDetail() {
  const { id } = useParams();

  // Simulated data (backend-ready structure)
  const caseData = {
    incidentType: "Harassment",
    priority: "High",
    status: "Open",
    description:
      "Citizen reported repeated harassment near workplace during evening hours.",
    latitude: 17.3850,
    longitude: 78.4867,
    reportedAt: "12 Feb 2026, 18:45",
  };

  return (
    <OfficerLayout>
      <h1 className="text-2xl font-semibold mb-8">
        Case Operational View
      </h1>

      <div className="space-y-8">

        {/* Basic Information */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8 space-y-6">

          <Section label="Case ID" value={id} />
          <Section label="Incident Type" value={caseData.incidentType} />

          <Section
            label="Priority"
            value={
              <span className="text-red-400">
                {caseData.priority}
              </span>
            }
          />

          <Section label="Status" value={caseData.status} />

          <Section label="Reported At" value={caseData.reportedAt} />

          <div>
            <p className="text-gray-400 text-sm mb-2">Description</p>
            <p className="text-gray-300">
              {caseData.description}
            </p>
          </div>

        </div>

        {/* Location Section */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={18} className="text-[#14B8A6]" />
            <h2 className="text-lg font-medium">
              Incident Location
            </h2>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Latitude: {caseData.latitude} | Longitude: {caseData.longitude}
          </p>

          <a
            href={`https://www.google.com/maps?q=${caseData.latitude},${caseData.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#1F2937] text-sm rounded-md hover:bg-[#273244]"
          >
            View on Map
          </a>
        </div>

        {/* Timeline Section */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={18} className="text-[#14B8A6]" />
            <h2 className="text-lg font-medium">
              Case Progress
            </h2>
          </div>

          <TimelineStep label="Submitted" active />
          <TimelineStep label="Under Review" active />
          <TimelineStep label="Assigned to Officer" />
          <TimelineStep label="Resolved" />
        </div>

        {/* Evidence Section */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={18} className="text-[#14B8A6]" />
            <h2 className="text-lg font-medium">
              Evidence Files
            </h2>
          </div>

          <p className="text-gray-400 text-sm">
            No evidence files uploaded yet.
          </p>
        </div>

        {/* Action Panel */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={18} className="text-yellow-400" />
            <h2 className="text-lg font-medium">
              Case Actions
            </h2>
          </div>

          <div className="flex gap-4 flex-wrap">

            <button className="px-5 py-2 bg-[#14B8A6] text-black rounded-md hover:opacity-90">
              Assign to Me
            </button>

            <button className="px-5 py-2 bg-[#1F2937] rounded-md hover:bg-[#273244]">
              Escalate
            </button>

            <button className="px-5 py-2 bg-green-600 rounded-md hover:bg-green-700">
              Mark as Resolved
            </button>

          </div>
        </div>

      </div>
    </OfficerLayout>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ label, value }: any) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}

function TimelineStep({ label, active }: any) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <div
        className={`w-3 h-3 rounded-full ${
          active ? "bg-[#14B8A6]" : "bg-gray-600"
        }`}
      />
      <span className={active ? "text-[#14B8A6]" : "text-gray-400"}>
        {label}
      </span>
    </div>
  );
}