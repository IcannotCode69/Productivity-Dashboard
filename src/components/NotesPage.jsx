import React, { useState, useEffect } from "react";
import Layout from "./Layout.jsx";
import NoteApp from "./NoteApp.jsx";

export default function NotesPage({ onNavigate }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <Layout onNavigate={onNavigate} activePage="notes">
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Notes</h1>
        <NoteApp notes={notes} setNotes={setNotes} />
      </div>
    </Layout>
  );
}
