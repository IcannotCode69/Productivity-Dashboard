import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./AppShell";
import DashboardHome from "./pages/DashboardHome";
import CalendarPage from "./pages/CalendarPage";
import NotesPage from "./pages/NotesPage";
import TasksPage from "./pages/TasksPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<DashboardHome />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="ai" element={<AIAssistantPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
