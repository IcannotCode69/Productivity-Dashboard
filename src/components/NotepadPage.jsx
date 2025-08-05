import React, { useState, useEffect } from "react";
import Layout from "./Layout.jsx";
import { PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const STORAGE_KEY = "notepad-classes";

function getInitialClasses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: Date.now(), name: "General", notes: "" }
  ];
}

export default function NotepadPage({ onNavigate }) {
  const [classes, setClasses] = useState(getInitialClasses);
  const [activeId, setActiveId] = useState(classes[0].id);
  const [renamingId, setRenamingId] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [addingClass, setAddingClass] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  // Add a new class
  function addClass() {
    if (!newClassName.trim()) return;
    const newClass = {
      id: Date.now(),
      name: newClassName.trim(),
      notes: ""
    };
    setClasses([...classes, newClass]);
    setActiveId(newClass.id);
    setNewClassName("");
  }

  // Rename a class
  function renameClass(id, name) {
    setClasses(classes.map(cls => cls.id === id ? { ...cls, name } : cls));
    setRenamingId(null);
  }

  // Delete a class
  function deleteClass(id) {
    if (classes.length === 1) return; // Always keep at least one
    const idx = classes.findIndex(cls => cls.id === id);
    const newClasses = classes.filter(cls => cls.id !== id);
    setClasses(newClasses);
    // Switch to previous or next class
    if (activeId === id) {
      setActiveId(newClasses[Math.max(0, idx - 1)].id);
    }
  }

  // Update notes for the active class
  function setNotesForActive(notes) {
    setClasses(classes.map(cls =>
      cls.id === activeId ? { ...cls, notes } : cls
    ));
  }

  const activeClass = classes.find(cls => cls.id === activeId);

  return (
    <Layout onNavigate={onNavigate} activePage="notepad">
      <div className="max-w-5xl mx-auto mt-8 flex flex-row items-start gap-8 w-full">
        {/* Sidebar: Class list */}
        <aside className="w-56 flex-shrink-0 bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur rounded-2xl shadow-xl p-4 flex flex-col border border-[#2d3440] min-h-[60vh] max-h-[70vh]">
          <h2 className="text-lg font-semibold text-blue-200 mb-2 pl-1">Classes</h2>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[48vh] pr-1">
            {classes.map(cls => (
              <div
                key={cls.id}
                className="relative animate-fadein transition-all duration-300"
              >
                <div className="flex items-center w-full gap-2">
                  {renamingId === cls.id ? (
                    <input
                      className="flex-1 px-2 py-1 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white animate-fadein"
                      value={cls.name}
                      autoFocus
                      onChange={e => renameClass(cls.id, e.target.value)}
                      onBlur={() => setRenamingId(null)}
                      onKeyDown={e => {
                        if (e.key === "Enter") setRenamingId(null);
                      }}
                    />
                  ) : (
                    <button
                      className={`flex-1 text-left px-4 py-2 rounded-xl font-medium text-base transition shadow-sm ${activeId === cls.id ? "bg-blue-700/80 text-blue-100 scale-[1.04] shadow-lg border border-blue-500/40" : "bg-[#232a36]/80 text-blue-100 hover:bg-blue-900/40 border border-[#2d3440]"}`}
                      onClick={() => setActiveId(cls.id)}
                      onDoubleClick={() => setRenamingId(cls.id)}
                      title="Double-click to rename"
                      style={{ transition: 'all 0.2s cubic-bezier(.4,0,.2,1)' }}
                    >
                      {cls.name}
                    </button>
                  )}
                  {classes.length > 1 && (
                    <button
                      className="text-xs text-red-400 hover:text-red-600 bg-white rounded-full px-1.5 py-0.5 shadow transition-all duration-200 ml-1"
                      onClick={e => {
                        // Animate fade out before delete
                        const el = e.currentTarget.parentElement.parentElement;
                        el.style.transition = 'opacity 0.2s';
                        el.style.opacity = 0;
                        setTimeout(() => deleteClass(cls.id), 180);
                      }}
                      title="Delete class"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Add new class */}
          <div className="flex items-center gap-2 mt-3 min-h-[32px] w-full">
            {addingClass ? (
              <>
                <input
                  className="flex-1 px-2 py-1 rounded border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-[#232a36]/80 text-blue-100 animate-fadein"
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  placeholder="Class name"
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === "Enter") { addClass(); setAddingClass(false); }
                    if (e.key === "Escape") { setAddingClass(false); setNewClassName(""); }
                  }}
                  style={{ transition: 'all 0.2s cubic-bezier(.4,0,.2,1)' }}
                />
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 p-1 animate-fadein"
                  title="Add"
                  onClick={() => { addClass(); setAddingClass(false); }}
                >
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-500 p-1 animate-fadein"
                  title="Cancel"
                  onClick={() => { setAddingClass(false); setNewClassName(""); }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow transition ml-auto animate-fadein"
                title="Add class"
                onClick={() => setAddingClass(true)}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </aside>
        {/* Notepad area for active class */}
        <section className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-100 text-center">Notepad</h1>
          <textarea
            className="w-full h-[60vh] p-4 rounded-2xl bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 text-blue-100 text-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-[#2d3440]"
            value={activeClass.notes}
            onChange={e => setNotesForActive(e.target.value)}
            placeholder="Start typing your notes..."
          />
          <div className="text-blue-300 text-xs mt-2">Auto-saved for "{activeClass.name}"</div>
        </section>
      </div>
    </Layout>
  );
}
