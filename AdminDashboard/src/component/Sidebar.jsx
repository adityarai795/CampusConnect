import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    {name:"Login", path:"/login", icon:"🔐"},
    { name: "Users", path: "/users", icon: "👥" },
    { name: "Ambassadors", path: "/ambassadors", icon: "🎯" },
    { name: "Resources", path: "/showallNotes", icon: "📚" },
    { name: "Jobs", path: "/jobs", icon: "💼" },
    { name: "Results", path: "/showallResult", icon: "📋" },
    { name: "Community", path: "/community", icon: "💬" },
    { name: "Coding Problems", path: "/showallProblems", icon: "💻" },
    { name: "Roadmaps", path: "/roadmaps", icon: "🗺️" },
    { name: "Marketplace", path: "/marketplace", icon: "🛒" },
    { name: "Quiz Questions", path: "/quizquestions", icon: "❓" },
    { name: "Projects", path: "/projects", icon: "📁" },
    { name: "Interview questions", path: "/interviewquestions", icon: "🎤" },
    {name :"Contact Queries", path:"/contactqueries", icon:"📞"},
    { name: "Logout", path: "/logout", icon: "🚪" },
  ];

  return (
    <aside className="w-64  bg-slate-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
