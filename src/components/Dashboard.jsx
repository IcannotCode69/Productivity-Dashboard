// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Layout        from "./Layout.jsx";
import Card          from "./Card.jsx";
import CalendarCard from "./CalendarCard.jsx";
import NoteApp       from "./NoteApp.jsx";
import TaskApp       from "./TaskApp.jsx";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Dashboard({ onNavigate }) {
  // --- Notes state & persistence ---
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // --- Tasks state & persistence ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const tasksDone = tasks.filter((t) => t.done).length;

  
  return (
    <Layout onNavigate={onNavigate} activePage="dashboard">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card title="Your Course"   metric="Networking 101" className="min-h-[140px]" />
        <Card
          title="Completion"
          metric={
            <span className="flex items-center gap-2">
              {notes.length} Notes
              <button
                onClick={() => onNavigate && onNavigate("notepad")}
                className="ml-2 p-1 rounded hover:bg-blue-100"
                title="Open Notepad"
              >
                <PencilSquareIcon className="w-5 h-5 text-blue-600" />
              </button>
            </span>
          }
          className="min-h-[140px]"
        />
        <Card title="Tasks Done"    metric={`${tasksDone}/${tasks.length}`} className="min-h-[140px]" />
      </div>

      {/* Calendar Card */}
      <div className="mb-10">
        <CalendarCard />
      </div>

      {/* Notes & Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NoteApp notes={notes} setNotes={setNotes} />
        <TaskApp tasks={tasks} setTasks={setTasks} />
      </div>
    </Layout>
  );
}


// // Test the Dashboard component by rendering it in your main.jsx or App.jsx file

// import React from "react";
// import Layout from "./Layout.jsx";

// export default function Dashboard() {
//   return (
//     <Layout>
//       <h2 className="text-2xl">If you see this, Layout works!</h2>
//     </Layout>
//   );
// }



