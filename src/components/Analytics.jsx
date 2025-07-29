// src/components/Analytics.jsx
import React from "react";

export default function Analytics({ notesCount, tasksCount, tasksDone }) {
  const completionRate = tasksCount ? Math.round((tasksDone / tasksCount) * 100) : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white text-center">
        <h3 className="text-xl mb-2">Notes</h3>
        <p className="text-3xl font-bold">{notesCount}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white text-center">
        <h3 className="text-xl mb-2">Tasks</h3>
        <p className="text-3xl font-bold">{tasksCount}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white text-center">
        <h3 className="text-xl mb-2">Completion Rate</h3>
        <p className="text-3xl font-bold">{completionRate}%</p>
      </div>
    </div>
  );
}
