import React, { useState, useEffect } from "react";
import NoteApp from "../NoteApp";

const STORAGE_KEY = "class-notes";

function getInitialClasses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    // Migrate old data structure to new structure with chapters
    return parsed.map(cls => {
      if (cls.chapters) {
        return cls; // Already has chapters structure
      } else {
        // Migrate old structure to new structure
        return {
          ...cls,
          chapters: [
            { id: Date.now() + Math.random(), name: "Chapter 1", notes: cls.notes || "" }
          ]
        };
      }
    });
  }
  return [
    { 
      id: Date.now(), 
      name: "General", 
      chapters: [
        { id: Date.now() + 1, name: "Chapter 1", notes: "" }
      ]
    }
  ];
}

export default function NotesPage() {
  const [classes, setClasses] = useState(getInitialClasses);
  const [activeId, setActiveId] = useState(() => {
    const initialClasses = getInitialClasses();
    return initialClasses[0]?.id || Date.now();
  });
  const [activeChapterId, setActiveChapterId] = useState(() => {
    const initialClasses = getInitialClasses();
    const firstClass = initialClasses[0];
    return firstClass?.chapters?.[0]?.id || Date.now() + 1;
  });
  const [renamingId, setRenamingId] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [newChapterName, setNewChapterName] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  function addClass() {
    if (!newClassName.trim()) return;
    const newClass = {
      id: Date.now(),
      name: newClassName.trim(),
      chapters: [
        { id: Date.now() + 1, name: "Chapter 1", notes: "" }
      ]
    };
    setClasses([...classes, newClass]);
    setActiveId(newClass.id);
    setActiveChapterId(newClass.chapters[0].id);
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
      const newActiveClass = newClasses[Math.max(0, idx - 1)];
      setActiveId(newActiveClass.id);
      setActiveChapterId(newActiveClass.chapters[0].id);
    }
  }

  function addChapter() {
    if (!newChapterName.trim()) return;
    const newChapter = {
      id: Date.now(),
      name: newChapterName.trim(),
      notes: ""
    };
    setClasses(classes.map(cls =>
      cls.id === activeId 
        ? { ...cls, chapters: [...cls.chapters, newChapter] }
        : cls
    ));
    setActiveChapterId(newChapter.id);
    setNewChapterName("");
  }

  function deleteChapter(chapterId) {
    const activeClass = classes.find(cls => cls.id === activeId);
    if (activeClass.chapters.length === 1) return;
    
    const newChapters = activeClass.chapters.filter(ch => ch.id !== chapterId);
    setClasses(classes.map(cls =>
      cls.id === activeId 
        ? { ...cls, chapters: newChapters }
        : cls
    ));
    
    if (activeChapterId === chapterId) {
      setActiveChapterId(newChapters[0].id);
    }
  }

  function setNotesForActiveChapter(notes) {
    setClasses(classes.map(cls =>
      cls.id === activeId 
        ? { 
            ...cls, 
            chapters: cls.chapters.map(ch =>
              ch.id === activeChapterId ? { ...ch, notes } : ch
            )
          }
        : cls
    ));
  }

  const activeClass = classes.find(cls => cls.id === activeId);
  const activeChapter = activeClass?.chapters?.find(ch => ch.id === activeChapterId);

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
      {/* Chapter tabs for active class */}
      <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 rounded-3xl shadow-xl border border-[#2d3440] p-6 mt-[-18px] pt-8 z-10 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-blue-200 tracking-tight">{activeClass.name} Notes</h3>
        </div>
        
        {/* Chapter tabs */}
        <div className="flex items-end gap-1 mb-6 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-900/40 scrollbar-track-transparent">
          {activeClass.chapters.map(chapter => (
            <div key={chapter.id} className="relative flex items-center">
              <button
                className={`flex items-center gap-2 px-4 h-8 rounded-t-lg font-medium text-sm transition shadow-sm border-b-0 border border-[#2d3440] relative z-20
                  ${activeChapterId === chapter.id
                    ? "bg-[#181c24] text-blue-100 border-blue-400 shadow-lg -mb-[2px]"
                    : "bg-[#232a36] text-blue-200 hover:bg-blue-900/40 border-transparent z-10"}
                `}
                onClick={() => setActiveChapterId(chapter.id)}
                title="Click to switch chapter"
                style={{ minWidth: 80, maxWidth: 160, height: 32 }}
              >
                <span className="truncate max-w-[90px]">{chapter.name}</span>
                {activeClass.chapters.length > 1 && (
                  <span
                    className="ml-1 text-xs text-blue-300 hover:text-red-400 cursor-pointer"
                    onClick={e => { e.stopPropagation(); deleteChapter(chapter.id); }}
                    title="Delete chapter"
                  >
                    ×
                  </span>
                )}
              </button>
            </div>
          ))}
          {/* Add new chapter */}
          <form
            onSubmit={e => { e.preventDefault(); addChapter(); }}
            className="flex items-center"
          >
            {newChapterName === "" ? (
              <button
                type="button"
                className="flex items-center justify-center px-3 h-8 rounded-t-lg bg-[#232a36] text-blue-300 border border-transparent hover:bg-blue-900/40 hover:text-blue-400 text-lg font-bold shadow-sm"
                style={{ minWidth: 32, height: 32 }}
                title="Add chapter"
                onClick={() => setNewChapterName("New Chapter")}
              >
                +
              </button>
            ) : (
              <input
                className="ml-1 px-3 h-8 rounded-t-lg border border-blue-500 bg-[#232a36] text-blue-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow"
                value={newChapterName}
                autoFocus
                onChange={e => setNewChapterName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") addChapter();
                  if (e.key === "Escape") setNewChapterName("");
                }}
                style={{ minWidth: 80, maxWidth: 160, height: 32 }}
                placeholder="Chapter name"
              />
            )}
          </form>
        </div>

        {/* Notes for active chapter */}
        <textarea
          className="w-full h-[50vh] p-4 rounded-2xl bg-[#181c24] text-blue-100 text-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-[#2d3440]"
          value={activeChapter?.notes || ""}
          onChange={e => setNotesForActiveChapter(e.target.value)}
          placeholder={`Type your notes for ${activeChapter?.name || "this chapter"} here...`}
        />
        <div className="text-blue-300 text-xs mt-2 mb-4">Auto-saved for "{activeClass.name} - {activeChapter?.name}"</div>
        <AskNotesAI notes={activeChapter?.notes || ""} />
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
