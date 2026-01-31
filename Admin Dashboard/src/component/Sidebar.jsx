import React, { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(new Set());
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Auto-expand menu if current route is in submenu
  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item.submenu) {
        const hasActiveRoute = item.submenu.some(
          (sub) => sub.path === location.pathname,
        );
        if (hasActiveRoute) {
          setExpandedMenus((prev) => new Set([...prev, index]));
        }
      }
    });
  }, [location.pathname]);

  const sidebarItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    {
      name: "Users & Staff",
      icon: "👥",
      submenu: [
        { name: "All Users", path: "/users" },
        { name: "Ambassadors", path: "/ambassadors" },
      ],
    },
    {
      name: "Resources",
      icon: "📚",
      submenu: [
        { name: "View All", path: "/showallNotes" },
        { name: "Upload", path: "/uploadnotes" },
      ],
    },
    {
      name: "Jobs",
      icon: "💼",
      submenu: [
        { name: "View All", path: "/viewalljobs" },
        { name: "Create New", path: "/createJob" },
      ],
    },
    {
      name: "Results",
      icon: "📋",
      submenu: [
        { name: "View All", path: "/showallResult" },
        { name: "Upload", path: "/createResult" },
      ],
    },
    {
      name: "Community",
      icon: "💬",
      submenu: [
        { name: "Moderate Posts", path: "/community" },
        { name: "View All Posts", path: "/showallPost" },
      ],
    },
    {
      name: "Coding Problems",
      icon: "💻",
      submenu: [
        { name: "View All", path: "/showallProblems" },
        { name: "Add Problem", path: "/addProblems" },
      ],
    },
    { name: "Roadmaps", path: "/roadmaps", icon: "🗺️" },
    { name: "Marketplace", path: "/marketplace", icon: "🛒" },
  ];

  const toggleSubmenu = useCallback((index) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isActiveRoute = (path) => location.pathname === path;

  const isMenuActive = (item) => {
    if (item.path && isActiveRoute(item.path)) return true;
    if (item.submenu) {
      return item.submenu.some((sub) => isActiveRoute(sub.path));
    }
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed md:hidden top-4 right-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky md:top-0 w-72 h-screen bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-white transition-transform duration-300 ease-in-out z-40 overflow-y-auto shadow-2xl`}
        aria-label="Main navigation"
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-blue-900 px-6 py-5 border-b border-blue-600 z-10">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <li key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`w-full px-6 py-3 hover:bg-blue-600 transition-all duration-200 flex items-center justify-between group ${
                        isMenuActive(item) ? "bg-blue-600 font-semibold" : ""
                      }`}
                      aria-expanded={expandedMenus.has(index)}
                      aria-controls={`submenu-${index}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          expandedMenus.has(index) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      id={`submenu-${index}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedMenus.has(index)
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="bg-blue-800/50 py-1">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.name}>
                            <Link
                              to={subitem.path}
                              onClick={closeSidebar}
                              className={`block px-6 py-2.5 pl-14 hover:bg-blue-700 transition-all duration-200 border-l-4 ${
                                isActiveRoute(subitem.path)
                                  ? "border-blue-400 bg-blue-700 font-medium"
                                  : "border-transparent hover:border-blue-500"
                              }`}
                              aria-current={
                                isActiveRoute(subitem.path) ? "page" : undefined
                              }
                            >
                              {subitem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`block px-6 py-3 hover:bg-blue-600 transition-all duration-200 border-l-4 ${
                      isActiveRoute(item.path)
                        ? "border-blue-400 bg-blue-600 font-semibold"
                        : "border-transparent hover:border-blue-500"
                    }`}
                    aria-current={isActiveRoute(item.path) ? "page" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sticky bottom-0 bg-blue-900 px-6 py-4 border-t border-blue-600 mt-auto">
          <p className="text-xs text-blue-200">© 2024 Admin Panel</p>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-30 animate-fadeIn"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Sidebar;
