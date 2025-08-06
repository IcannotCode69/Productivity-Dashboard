import React, { useState, useEffect } from "react";
import NoteApp from "../NoteApp";

const STORAGE_KEY = "class-notes";

function getInitialClasses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: Date.now(), name: "General", notes: [] }
  ];
}

export default function NotesPage() {
  const [classes, setClasses] = useState(getInitialClasses);
  const [activeId, setActiveId] = useState(() => getInitialClasses()[0].id);
  const [renamingId, setRenamingId] = useState(null);
  const [newClassName, setNewClassName] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  function addClass() {
    if (!newClassName.trim()) return;
    const newClass = {
      id: Date.now(),
      name: newClassName.trim(),
      notes: []
    };
    setClasses([...classes, newClass]);
    setActiveId(newClass.id);
    setNewClassName("");
  }

  function renameClass(id, name) {
    setClasses(classes.map(cls => cls.id === id ? { ...cls, name } : cls));
    setRenamingId(null);
  }

  function deleteClass(id) {
    if (classes.length === 1) return;
    const idx = classes.findIndex(cls => cls.id === id);
    const newClasses = classes.filter(cls => cls.id !== id);
    setClasses(newClasses);
    if (activeId === id) {
      setActiveId(newClasses[Math.max(0, idx - 1)].id);
    }
  }

  function setNotesForActive(notes) {
    setClasses(classes.map(cls =>
      cls.id === activeId ? { ...cls, notes } : cls
    ));
  }

  const activeClass = classes.find(cls => cls.id === activeId);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tabs for classes */}
      <div className="flex items-end gap-1 mb-6 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-900/40 scrollbar-track-transparent">
        {classes.map(cls => (
          <div key={cls.id} className="relative flex items-center">
            {renamingId === cls.id ? (
              <input
                className="px-3 py-1 rounded-t-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white text-black shadow"
                value={cls.name}
                autoFocus
                onChange={e => renameClass(cls.id, e.target.value)}
                onBlur={() => setRenamingId(null)}
                onKeyDown={e => {
                  if (e.key === "Enter") setRenamingId(null);
                }}
                style={{ minWidth: 80, maxWidth: 160 }}
              />
            ) : (
              <button
                className={`flex items-center gap-2 px-5 h-10 rounded-t-lg font-medium text-base transition shadow-sm border-b-0 border border-[#2d3440] relative z-20
                  ${activeId === cls.id
                    ? "bg-[#232a36] text-blue-100 border-blue-400 shadow-lg -mb-[2px]"
                    : "bg-[#181c24] text-blue-200 hover:bg-blue-900/40 border-transparent z-10"}
                `}
                onClick={() => setActiveId(cls.id)}
                onDoubleClick={() => setRenamingId(cls.id)}
                title="Double-click to rename"
                style={{ minWidth: 80, maxWidth: 160, height: 40 }}
              >
                <span className="truncate max-w-[90px]">{cls.name}</span>
                {classes.length > 1 && (
                  <span
                    className="ml-1 text-xs text-blue-300 hover:text-red-400 cursor-pointer"
                    onClick={e => { e.stopPropagation(); deleteClass(cls.id); }}
                    title="Delete class"
                  >
                    ×
                  </span>
                )}
              </button>
            )}
          </div>
        ))}
        {/* Add new class as a Chrome-style tab */}
        <form
          onSubmit={e => { e.preventDefault(); addClass(); }}
          className="flex items-center"
        >
          {newClassName === "" ? (
            <button
              type="button"
              className="flex items-center justify-center px-4 h-10 rounded-t-lg bg-[#181c24] text-blue-300 border border-transparent hover:bg-blue-900/40 hover:text-blue-400 text-2xl font-bold shadow-sm"
              style={{ minWidth: 40, height: 40 }}
              title="Add class"
              onClick={() => setNewClassName("New Class")}
            >
              +
            </button>
          ) : (
            <input
              className="ml-1 px-2 h-10 rounded-t-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white text-black shadow"
              value={newClassName}
              autoFocus
              onChange={e => setNewClassName(e.target.value)}
              onBlur={() => setNewClassName("")}
              onKeyDown={e => {
                if (e.key === "Enter") addClass();
                if (e.key === "Escape") setNewClassName("");
              }}
              style={{ minWidth: 80, maxWidth: 160, height: 40 }}
              placeholder="Class name"
            />
          )}
        </form>
      </div>
      {/* Notepad for active class */}
      <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 rounded-3xl shadow-xl border border-[#2d3440] p-6 mt-[-18px] pt-8 z-10 relative">
        <h3 className="text-xl font-semibold text-blue-200 mb-4 tracking-tight">{activeClass.name} Notes</h3>
        <textarea
          className="w-full h-[50vh] p-4 rounded-2xl bg-[#181c24] text-blue-100 text-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-[#2d3440]"
          value={activeClass.notes || ""}
          onChange={e => setNotesForActive(e.target.value)}
          placeholder={`Type your notes for ${activeClass.name} here...`}
        />
        <div className="text-blue-300 text-xs mt-2 mb-4">Auto-saved for "{activeClass.name}"</div>
        <AskNotesAI notes={activeClass.notes || ""} />
      </div>
    </div>
  );
}

// --- AI Question Box ---
function AskNotesAI({ notes }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  function askAI(e) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAnswer(
        `AI (mock): I would answer your question about your notes here.\n\nQuestion: ${question}\n\nNotes: ${notes.slice(0, 200)}${notes.length > 200 ? "..." : ""}`
      );
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="mt-6">
      <form onSubmit={askAI} className="flex gap-2 mb-2">
        <input
          className="flex-1 px-4 py-2 rounded-lg bg-[#181c24] text-blue-100 border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask your notes a question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="bg-[#232a36]/80 border border-[#2d3440] rounded-xl p-4 text-blue-100 whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
}
