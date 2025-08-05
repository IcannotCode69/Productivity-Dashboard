import React, { useState, useEffect } from "react";
import NoteApp from "./NoteApp";       // ← no “components/” prefix
import TaskApp from "./TaskApp";
import Analytics from "./Analytics";
import "../index.css";                 // only if you haven’t already imported it in main.jsx

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const tasksDone = tasks.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-background font-sans text-text flex flex-col">
      <header className="sticky top-0 bg-background shadow-sm z-10">
        <nav className="max-w-4xl mx-auto flex items-center justify-between h-16 px-6">
          <h1 className="text-2xl font-semibold text-text">Productivity</h1>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto p-6 space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NoteApp notes={notes} setNotes={setNotes} />
          <TaskApp tasks={tasks} setTasks={setTasks} />
        </section>
        <Analytics
          notesCount={notes.length}
          tasksCount={tasks.length}
          tasksDone={tasksDone}
        />
      </main>

      <footer className="text-center text-muted py-4">
        © 2025 Your Name · Built with ❤️
      </footer>
    </div>
  );
}
