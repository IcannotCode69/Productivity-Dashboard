import React, { useState, useRef } from "react";

const DEFAULT_CALENDAR = "https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata&bgcolor=%23232a36";

export default function CalendarCard() {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [calendarSrc, setCalendarSrc] = useState(() => {
    return localStorage.getItem("calendar-embed-link") || DEFAULT_CALENDAR;
  });

  function handleSwitch() {
    if (input.trim()) {
      setCalendarSrc(input.trim());
      localStorage.setItem("calendar-embed-link", input.trim());
      setShowInput(false);
      setInput("");
    }
  }

  // Resizable calendar height
  const defaultHeight = 350;
  const [height, setHeight] = useState(() => {
    return Number(localStorage.getItem("calendar-embed-height")) || defaultHeight;
  });
  const dragRef = useRef(null);
  const dragging = useRef(false);

  function startDrag(e) {
    dragging.current = true;
    dragRef.current = e.clientY;
    document.body.style.cursor = "ns-resize";
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  }
  function onDrag(e) {
    if (!dragging.current) return;
    const delta = e.clientY - dragRef.current;
    dragRef.current = e.clientY;
    setHeight(h => {
      const newH = Math.max(200, Math.min(900, h + delta));
      localStorage.setItem("calendar-embed-height", newH);
      return newH;
    });
  }
  function stopDrag() {
    dragging.current = false;
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  }

  return (
    <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl p-4 border border-[#2d3440] min-h-[340px] flex flex-col transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-blue-900/40 hover:border-blue-500/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-200 tracking-tight">Google Calendar</h3>
        <button
          className="ml-2 px-3 py-1 rounded-lg bg-blue-700/60 text-blue-100 hover:bg-blue-600/80 transition text-sm font-medium border border-blue-500/30"
          onClick={() => setShowInput(v => !v)}
        >
          Switch Calendar
        </button>
      </div>
      {showInput && (
        <div className="mb-4 flex gap-2 items-center animate-fadein">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-blue-500 bg-[#232a36] text-blue-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste Google Calendar embed link..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') handleSwitch(); if (e.key === 'Escape') setShowInput(false); }}
          />
          <button
            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
            onClick={handleSwitch}
          >
            Set
          </button>
        </div>
      )}
      <iframe
        src={calendarSrc}
        style={{ border: 0 }}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        className="rounded-2xl w-full"
        title="Google Calendar"
      ></iframe>
      {/* Drag handle */}
      <div
        className="w-full flex items-center justify-center cursor-ns-resize mt-1"
        style={{ minHeight: 18 }}
        onMouseDown={startDrag}
      >
        <div className="w-16 h-2 rounded-full bg-blue-900/60 hover:bg-blue-500/60 transition shadow-inner" />
      </div>
    </div>
  );
}
