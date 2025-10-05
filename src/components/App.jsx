/*
  App sets up the router and maps routes to page components.
  Structure:
  - AppShell provides a persistent layout (sidebar + header)
  - Nested routes render inside <Outlet /> of AppShell
  How to add a new page:
  - Create a component in src/components/pages/MyPage.jsx
  - Add a <Route path="my-page" element={<MyPage />} /> below
  - Add an entry in navItems in AppShell.jsx for navigation
*/
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
