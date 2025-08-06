import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const [value, setValue] = useState(new Date());
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#2d3440]">
        <h2 className="text-2xl font-semibold text-blue-200 mb-6 tracking-tight">Calendar</h2>
        <Calendar
          onChange={setValue}
          value={value}
          className="dark-calendar"
        />
        <style>{`
          .dark-calendar {
            background: transparent;
            color: #cbd5e1;
            border-radius: 1.5rem;
            border: none;
            box-shadow: none;
            width: 100%;
            padding: 0.5rem 0;
          }
          .dark-calendar abbr {
            color: #e0e7ef;
          }
          .dark-calendar .react-calendar__tile {
            background: none;
            color: #cbd5e1;
            border-radius: 0.75rem;
            transition: background 0.2s, color 0.2s;
          }
          .dark-calendar .react-calendar__tile--active,
          .dark-calendar .react-calendar__tile--now {
            background: #2563eb;
            color: #fff;
          }
          .dark-calendar .react-calendar__tile--hasActive {
            background: #334155;
          }
          .dark-calendar .react-calendar__tile:enabled:hover {
            background: #334155;
            color: #fff;
          }
          .dark-calendar .react-calendar__navigation {
            background: none;
            color: #60a5fa;
          }
          .dark-calendar .react-calendar__navigation button {
            color: #60a5fa;
            background: none;
          }
          .dark-calendar .react-calendar__month-view__weekdays {
            color: #60a5fa;
          }
        `}</style>
      </div>
    </div>
  );
}
