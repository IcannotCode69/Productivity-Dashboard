import React, { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl border border-[#2d3440] p-8 mb-6">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4 tracking-tight">Settings</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-blue-100 mb-2 font-medium">Theme</label>
            <select
              className="bg-[#232a36] text-blue-100 border border-[#2d3440] rounded-lg px-4 py-2"
              value={theme}
              onChange={e => setTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-100 mb-2 font-medium">Notifications</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-blue-100">Enable notifications</span>
          </div>
          <button
            type="button"
            className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
