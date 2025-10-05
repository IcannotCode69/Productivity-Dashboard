import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { HomeIcon, CalendarIcon, DocumentTextIcon, CheckCircleIcon, SparklesIcon, LightBulbIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";

// Route metadata for the sidebar. Each item defines:
// - to: URL path
// - label: human-friendly name
// - icon: Heroicon element rendered in the nav
const navItems = [
  { to: "/", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
  { to: "/calendar", label: "Calendar", icon: <CalendarIcon className="w-6 h-6" /> },
  { to: "/notes", label: "Notes", icon: <DocumentTextIcon className="w-6 h-6" /> },
  { to: "/tasks", label: "Tasks", icon: <CheckCircleIcon className="w-6 h-6" /> },
  { to: "/ai", label: "AI Assistant", icon: <SparklesIcon className="w-6 h-6" /> },
  { to: "/recommendations", label: "Recommendations", icon: <LightBulbIcon className="w-6 h-6" /> },
  { to: "/settings", label: "Settings", icon: <Cog6ToothIcon className="w-6 h-6" /> },
];

// AppShell provides the persistent layout (sidebar + header) and renders
// the active page via <Outlet /> from React Router.
export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#181c24] to-[#232a36] font-sans text-text">
      {/* Sidebar */}
      <nav className="w-20 md:w-44 m-4 rounded-3xl bg-[#232a36]/80 shadow-xl backdrop-blur-md flex flex-col items-center py-8 space-y-2 h-[92vh] border border-[#2d3440] min-w-[80px] md:min-w-[176px]">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex flex-row md:flex-row items-center gap-2 md:gap-4 px-2 py-3 rounded-xl transition text-blue-200 hover:bg-blue-900/40 hover:text-blue-400 w-full ${isActive ? "bg-blue-700/80 text-blue-100 shadow-lg border border-blue-500/40" : "border border-transparent"}`
            }
            end={item.to === "/"}
            title={item.label}
            style={{ minWidth: '48px', maxWidth: '176px' }}
          >
            <span className="flex items-center justify-center w-8 h-8">{item.icon}</span>
            <span className="text-xs font-medium md:block hidden whitespace-nowrap">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#232a36]/80 backdrop-blur-md shadow px-6 md:px-12 h-20 rounded-b-3xl border-b border-[#2d3440]">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-blue-100 drop-shadow-sm whitespace-nowrap">Overdue Dashboard</h1>
          <div className="flex items-center space-x-4 md:space-x-6">
            <input
              className="px-3 md:px-4 py-2 rounded-lg bg-[#181c24] text-blue-100 border border-[#2d3440] focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 md:w-56"
              placeholder="Ask AI, search notes, tasks..."
            />
            <UserCircleIcon className="w-8 h-8 md:w-9 md:h-9 text-blue-400 hover:text-blue-300 cursor-pointer transition" />
          </div>
        </header>
        {/* Routed Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
