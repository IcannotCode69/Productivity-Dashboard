// // src/components/Layout.jsx
// import {
//   HomeIcon,
//   ChartBarIcon,
//   CogIcon,
//   SearchIcon,
//   UserCircleIcon
// } from "@heroicons/react/24/outline";

// export default function Layout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-mutedBg font-sans text-text">
//       {/* Sidebar */}
//       <nav className="w-16 bg-white shadow-lg flex flex-col items-center py-4 space-y-6">
//         <HomeIcon className="w-6 h-6 text-primary" />
//         <ChartBarIcon className="w-6 h-6 text-primary" />
//         <CogIcon className="w-6 h-6 text-primary" />
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 p-8 space-y-8">
//         {/* Header */}
//         <header className="flex justify-between items-center">
//           <h1 className="text-3xl font-semibold">Hello, Arka 👋</h1>
//           <div className="flex items-center space-x-4">
//             <SearchIcon className="w-5 h-5 text-subtext" />
//             <UserCircleIcon className="w-8 h-8 text-primary" />
//           </div>
//         </header>

//         {children}
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Layout({ children, onNavigate, activePage }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#181c24] to-[#232a36] font-sans text-text">
      {/* Sidebar */}
      <nav className="w-20 m-4 rounded-3xl bg-[#232a36]/80 shadow-xl backdrop-blur-md flex flex-col items-center py-8 space-y-8 h-[92vh] border border-[#2d3440]">
        <HomeIcon
          className={`w-6 h-6 cursor-pointer ${activePage === 'dashboard' ? 'text-blue-600' : 'text-primary hover:text-primary/80'}`}
          onClick={() => onNavigate && onNavigate('dashboard')}
          title="Dashboard"
        />
        {/* Notes Button */}
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${activePage === 'notepad' ? 'bg-blue-100 text-blue-600' : 'text-primary hover:bg-gray-100 hover:text-blue-600'} transition`}
          onClick={() => onNavigate && onNavigate('notepad')}
          title="Notepad"
        >
          <span className="text-lg font-bold">N</span>
        </button>
        <ChartBarIcon
          className="w-6 h-6 text-primary hover:text-primary/80 cursor-pointer"
          onClick={() => alert('Analytics button clicked!')}
        />
        <Cog6ToothIcon
          className="w-6 h-6 text-primary hover:text-primary/80 cursor-pointer"
          onClick={() => alert('Settings button clicked!')}
        />
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#232a36]/80 backdrop-blur-md shadow px-12 h-20 rounded-b-3xl border-b border-[#2d3440]">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-100 drop-shadow-sm">Dashboard</h1>
          <div className="flex items-center space-x-6">
            <MagnifyingGlassIcon
              className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition"
              onClick={() => alert('Search button clicked!')}
            />
            <UserCircleIcon
              className="w-9 h-9 text-blue-400 hover:text-blue-300 cursor-pointer transition"
              onClick={() => alert('User button clicked!')}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-12 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

