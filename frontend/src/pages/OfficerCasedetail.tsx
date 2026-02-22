import OfficerLayout from "../components/OfficerLayout";
import { useParams } from "react-router-dom";

export default function OfficerCaseDetail() {
  const { id } = useParams();

  return (
    <OfficerLayout>
      <h1 className="text-2xl font-semibold mb-8">
        Case Details
      </h1>

      <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8 space-y-6">

        <div>
          <p className="text-gray-400 text-sm">Case ID</p>
          <p className="text-lg font-medium">{id}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Incident Type</p>
          <p>Harassment</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Priority</p>
          <p className="text-red-400">High</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Status</p>
          <p>Open</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Description</p>
          <p className="text-gray-300">
            Citizen reported repeated harassment near workplace.
          </p>
        </div>

      </div>
    </OfficerLayout>
  );
}