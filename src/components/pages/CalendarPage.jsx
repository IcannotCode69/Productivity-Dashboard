import React, { useState } from "react";

// Default embed when nothing is configured.
// The UI lets the user paste a Google account email and builds the embed URL.
const DEFAULT_CALENDAR = "https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=America%2FChicago&bgcolor=%23000000&color=%230B8043&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=1&showTz=0&mode=WEEK&height=600&hl=en&wkst=1&theme=dark&dark=1";

export default function CalendarPage() {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  // Persist the selected calendar URL and an iframe key to force reloads
  const [calendarSrc, setCalendarSrc] = useState(() => {
    return localStorage.getItem("calendar-embed-link") || DEFAULT_CALENDAR;
  });
  const [iframeKey, setIframeKey] = useState(() => {
    return localStorage.getItem("calendar-iframe-key") || Date.now();
  });

  function handleSwitch() {
    if (input.trim()) {
      // Convert email to Google Calendar embed URL
      const email = input.trim();
      const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(email)}&ctz=America%2FChicago&bgcolor=%23000000&color=%230B8043&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=1&showTz=0&mode=WEEK&height=600&hl=en&wkst=1&theme=dark&dark=1`;
      setCalendarSrc(calendarUrl);
      localStorage.setItem("calendar-embed-link", calendarUrl);
      // Generate new key to force iframe reload with new calendar
      const newKey = Date.now();
      setIframeKey(newKey);
      localStorage.setItem("calendar-iframe-key", newKey);
      setShowInput(false);
      setInput("");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#2d3440]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-blue-200 tracking-tight">Google Calendar</h2>
          <button
            className="px-4 py-2 rounded-lg bg-blue-700/60 text-blue-100 hover:bg-blue-600/80 transition text-sm font-medium border border-blue-500/30"
            onClick={() => setShowInput(v => !v)}
          >
            Switch Account
          </button>
        </div>
        
        {showInput && (
          <div className="mb-6 flex gap-3 items-center animate-fadein">
            <input
              className="flex-1 px-4 py-3 rounded-lg border border-blue-500 bg-[#232a36] text-blue-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Google account email (e.g., your-email@gmail.com)..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              onKeyDown={e => { if (e.key === 'Enter') handleSwitch(); if (e.key === 'Escape') setShowInput(false); }}
            />
            <button
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
              onClick={handleSwitch}
            >
              Connect
            </button>
          </div>
        )}
        
        <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-700">
          <iframe
            key={iframeKey}
            src={calendarSrc}
            style={{ 
              border: 0,
              filter: 'invert(0.9) hue-rotate(180deg)',
              backgroundColor: '#000000'
            }}
            width="100%"
            height="700"
            frameBorder="0"
            scrolling="no"
            className="w-full"
            title="Google Calendar"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
