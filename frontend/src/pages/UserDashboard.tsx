import CitizenLayout from "../components/CitizenLayout";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <CitizenLayout>

      <h1 className="text-2xl font-semibold mb-8">
        Welcome Back
      </h1>

      {/* Quick Action Card */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-8">
        <h2 className="text-lg font-medium mb-2">
          Start a New Report
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Report incidents safely and securely with AI guidance.
        </p>

        <Link
          to="/report"
          className="inline-block px-6 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58]"
        >
          File Report
        </Link>
      </div>

      {/* Recent Reports */}
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <h2 className="text-lg font-medium mb-6">
          Recent Reports
        </h2>

        {/* Table */}
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="py-3">Case ID</th>
              <th>Incident</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            <tr
              onClick={() => navigate("/complaint/C-1023")}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="py-3">C-1023</td>
              <td>Harassment</td>
              <td>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                  Investigating
                </span>
              </td>
              <td className="text-red-600">High</td>
            </tr>

            <tr
              onClick={() => navigate("/complaint/C-1024")}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="py-3">C-1024</td>
              <td>Cybercrime</td>
              <td>
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  Submitted
                </span>
              </td>
              <td className="text-yellow-600">Medium</td>
            </tr>

          </tbody>
        </table>

      </div>

    </CitizenLayout>
  );
}