import { useState } from "react";

// Dumb UI component: expects notes and setNotes from the parent.
export default function NoteApp({ notes, setNotes }) {
  const [input, setInput] = useState("");

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([{ id: Date.now(), text: input }, ...notes]);
    setInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#2d3440] transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-blue-900/40 hover:border-blue-500/60">
      <h2 className="text-2xl font-semibold text-blue-200 mb-6 tracking-tight flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182M11.25 6.75h.008v.008h-.008V6.75zm-6 10.5h7.5m-7.5 0a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 5.25 4.5h7.5a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5zm0 0v2.25A2.25 2.25 0 0 0 7.5 21h7.5a2.25 2.25 0 0 0 2.25-2.25V18" />
        </svg>
        Notes
      </h2>
      <form
        className="flex space-x-3 mb-8"
        onSubmit={e => { e.preventDefault(); addNote(); }}
      >
        <input
          className="flex-1 p-3 rounded-xl border border-[#2d3440] bg-[#232a36]/80 text-blue-100 placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
          placeholder="New note…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition"
        >
          Add
        </button>
      </form>
      <ul className="space-y-4">
        {notes.map((n) => (
          <li
            key={n.id}
            className="bg-[#232a36]/80 backdrop-blur rounded-xl border border-[#2d3440] p-4 flex justify-between items-start shadow-sm hover:shadow-blue-900/40 transition"
          >
            <p className="text-blue-100 text-base font-medium">{n.text}</p>
            <button
              onClick={() => deleteNote(n.id)}
              className="text-red-400 hover:text-red-600 text-lg px-2 py-1 rounded transition"
              title="Delete note"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
