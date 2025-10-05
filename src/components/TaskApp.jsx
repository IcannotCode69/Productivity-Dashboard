import { useState } from "react";

// Dumb UI component: expects tasks and setTasks from the parent.
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
    <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#2d3440] transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-blue-900/40 hover:border-blue-500/60">
      <h2 className="text-2xl font-semibold text-blue-200 mb-6 tracking-tight flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l6.75 6.75 12.75-12.75" />
        </svg>
        Tasks
      </h2>
      <form
        className="flex space-x-3 mb-8"
        onSubmit={e => { e.preventDefault(); addTask(); }}
      >
        <input
          className="flex-1 p-3 rounded-xl border border-[#2d3440] bg-[#232a36]/80 text-blue-100 placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
          placeholder="New task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition"
        >
          Add
        </button>
      </form>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-[#232a36]/80 backdrop-blur rounded-xl border border-[#2d3440] p-4 flex justify-between items-center shadow-sm hover:shadow-blue-900/40 transition"
          >
            <label className="flex items-center space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="form-checkbox h-5 w-5 text-blue-400 focus:ring-blue-500 transition"
              />
              <span className={task.done ? "line-through text-blue-400" : "text-blue-100 font-medium"}>
                {task.text}
              </span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-600 text-lg px-2 py-1 rounded transition"
              title="Delete task"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
