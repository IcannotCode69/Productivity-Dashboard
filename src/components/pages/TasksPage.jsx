import React, { useState, useEffect } from "react";
import TaskApp from "../TaskApp";

// TasksPage owns the tasks state and persistence.
// The TaskApp component only renders the UI and triggers updates.
export default function TasksPage() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="max-w-3xl mx-auto">
      <TaskApp tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
