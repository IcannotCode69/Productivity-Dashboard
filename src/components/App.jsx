import React, { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import NotesPage from "./NotesPage.jsx";
import NotepadPage from "./NotepadPage.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");

  if (page === "notepad") {
    return <NotepadPage onNavigate={setPage} />;
  }
  if (page === "notes") {
    return <NotesPage onNavigate={setPage} />;
  }
  return <Dashboard onNavigate={setPage} />;
}
