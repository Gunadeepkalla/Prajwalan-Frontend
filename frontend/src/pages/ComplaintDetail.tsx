import CitizenLayout from "../components/CitizenLayout";
import { useParams } from "react-router-dom";

export default function ComplaintDetail() {
  const { id } = useParams();

  return (
    <CitizenLayout>
      <h1 className="text-2xl font-semibold mb-8">
        Complaint Details
      </h1>

      <div className="bg-white border border-gray-200 rounded-md p-8 space-y-8">

        <div>
          <p className="text-sm text-gray-500">Case ID</p>
          <p className="text-lg font-medium">{id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Incident Type</p>
          <p>Harassment</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <p className="text-red-600">High</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="text-yellow-600">Investigating</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-gray-700">
            Reported repeated harassment near workplace area.
          </p>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-sm text-gray-500 mb-4">
            Case Progress
          </p>

          <div className="space-y-4">
            <TimelineStep label="Submitted" active />
            <TimelineStep label="Under Review" active />
            <TimelineStep label="Assigned to Officer" />
            <TimelineStep label="Resolved" />
          </div>
        </div>

      </div>
    </CitizenLayout>
  );
}

function TimelineStep({ label, active }: any) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-4 h-4 rounded-full ${
          active ? "bg-[#0F766E]" : "bg-gray-300"
        }`}
      />
      <span className={active ? "text-[#0F766E]" : "text-gray-400"}>
        {label}
      </span>
    </div>
  );
}