import { useState } from "react";

export default function TaskApp({ tasks, setTasks }) {
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([{ id: Date.now(), text: input, done: false }, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, done: !t.done }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-card shadow-card rounded-2xl p-6">
      <h2 className="text-xl font-medium text-text mb-4">✅ Tasks</h2>
      <div className="flex space-x-2 mb-6">
        <input
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:ring focus:ring-accent focus:border-accent"
          placeholder="New task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-background border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="form-checkbox h-5 w-5 text-accent"
              />
              <span className={task.done ? "line-through text-muted" : "text-text"}>
                {task.text}
              </span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
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
