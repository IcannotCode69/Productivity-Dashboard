import { useState } from "react";

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
    <div className="bg-card shadow-card rounded-2xl p-6">
      <h2 className="text-xl font-medium text-text mb-4">📝 Notes</h2>
      <div className="flex space-x-2 mb-6">
        <input
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:ring focus:ring-accent focus:border-accent"
          placeholder="New note…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
      <ul className="space-y-4">
        {notes.map((n) => (
          <li
            key={n.id}
            className="bg-background border border-gray-200 rounded-lg p-4 flex justify-between items-start"
          >
            <p className="text-text">{n.text}</p>
            <button
              onClick={() => deleteNote(n.id)}
              className="text-red-500 hover:text-red-600"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
