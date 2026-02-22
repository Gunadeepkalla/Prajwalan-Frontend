import OfficerLayout from "../components/OfficerLayout";
import { useState } from "react";

export default function OfficerSettings() {
  const [settings, setSettings] = useState({
    highPriorityAlerts: true,
    emailAlerts: false,
    soundAlerts: true,
    autoAssign: false,
    escalationHours: 24,
    maxCases: 15,
    aiAutoPriority: true,
    patternDetection: true,
    maintenanceMode: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <OfficerLayout>
      <h1 className="text-2xl font-semibold mb-10">
        Officer Settings & Control Panel
      </h1>

      <div className="space-y-10">

        {/* 🔹 Notifications Section */}
        <Section title="Notifications & Alerts">
          <Toggle
            label="High Priority Alerts"
            value={settings.highPriorityAlerts}
            onChange={() => handleToggle("highPriorityAlerts")}
          />

          <Toggle
            label="Email Notifications"
            value={settings.emailAlerts}
            onChange={() => handleToggle("emailAlerts")}
          />

          <Toggle
            label="Sound Alerts"
            value={settings.soundAlerts}
            onChange={() => handleToggle("soundAlerts")}
          />
        </Section>

        {/* 🔹 Case Handling */}
        <Section title="Case Handling Controls">
          <Toggle
            label="Auto-Assign High Priority Cases"
            value={settings.autoAssign}
            onChange={() => handleToggle("autoAssign")}
          />

          <InputNumber
            label="Escalation Threshold (Hours)"
            value={settings.escalationHours}
            onChange={(val: number) => handleChange("escalationHours", val)}
          />

          <InputNumber
            label="Max Cases Per Officer"
            value={settings.maxCases}
            onChange={(val: number) => handleChange("maxCases", val)}
          />
        </Section>

        {/* 🔹 System Controls */}
        <Section title="System Controls">
          <Toggle
            label="Enable AI Auto Priority Detection"
            value={settings.aiAutoPriority}
            onChange={() => handleToggle("aiAutoPriority")}
          />

          <Toggle
            label="Enable Pattern Detection Alerts"
            value={settings.patternDetection}
            onChange={() => handleToggle("patternDetection")}
          />

          <Toggle
            label="Maintenance Mode"
            value={settings.maintenanceMode}
            onChange={() => handleToggle("maintenanceMode")}
          />
        </Section>

        <button className="px-6 py-2 bg-[#14B8A6] text-black rounded-md">
          Save Configuration
        </button>

      </div>
    </OfficerLayout>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }: any) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-md p-8">
      <h2 className="text-lg font-medium mb-6">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Toggle({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="accent-[#14B8A6]"
      />
    </div>
  );
}

function InputNumber({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-[#1F2937] border border-[#374151] rounded-md px-3 py-2 w-32 text-white"
      />
    </div>
  );
}