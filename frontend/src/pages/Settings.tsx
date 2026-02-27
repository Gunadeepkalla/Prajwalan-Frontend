import CitizenLayout from "../components/CitizenLayout";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <CitizenLayout>
      <h1 className="text-2xl font-semibold mb-8">
        Account Settings
      </h1>

      <div className="space-y-8">

        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-lg font-medium mb-6">Profile Information</h2>

          <div className="space-y-4">
            <Input label="Full Name" placeholder="Enter your full name" />
            <Input label="Email Address" placeholder="Enter your email" />
            <Input label="Mobile Number" placeholder="Enter mobile number" />
          </div>

          <button className="mt-6 px-6 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58] w-full sm:w-auto">
            Save Changes
          </button>
        </div>

        {/* Security Section */}
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-lg font-medium mb-6">Security</h2>

          <Input label="New Password" type="password" placeholder="Enter new password" />

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-sm text-gray-600">
              Enable Two-Factor Authentication
            </span>
            <input type="checkbox" className="accent-[#0F766E] w-4 h-4" />
          </div>

          <button className="mt-6 px-6 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58] w-full sm:w-auto">
            Update Security
          </button>
        </div>

        {/* Preferences Section */}
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-lg font-medium mb-6">Preferences</h2>

          <div className="space-y-4">

            <div>
              <label className="block text-sm mb-2">Language</label>
              <select className="w-full border border-gray-300 rounded-md p-3 focus:border-[#14B8A6] focus:outline-none">
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm text-gray-600">
                Receive Email Notifications
              </span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="accent-[#0F766E] w-4 h-4"
              />
            </div>

          </div>

          <button className="mt-6 px-6 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58] w-full sm:w-auto">
            Save Preferences
          </button>
        </div>

      </div>
    </CitizenLayout>
  );
}

function Input({ label, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-3
                   focus:border-[#14B8A6] focus:outline-none"
      />
    </div>
  );
}