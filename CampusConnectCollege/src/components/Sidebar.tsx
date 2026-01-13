import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  ChevronRight,
  Building2,
  FileText,
} from "lucide-react";
import type { SidebarItem } from "../types";

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  // Define sidebar items based on user role
  const sidebarItems: SidebarItem[] = [
    {
      name: "Home",
      path: "/",
      icon: "home",
      roles: ["admin", "teacher","organization"],
    },
    {
      name: "Dashboard",
      path: (user?.role === "admin" || user?.role === "organization") ? "/admin/dashboard" : "/teacher/dashboard",
      icon: "dashboard",
      roles: ["admin", "teacher","organization"],
    },
    {
      name: "Manage Students",
      path: "/admin/students",
      icon: "students",
      roles: ["admin","teacher","organization"],
    },
    ...(( user?.role === "admin" || user?.role === "organization") 
      ? ([
          {
            name: "Manage Teachers",
            path: "/admin/teachers",
            icon: "teachers",
            roles: ["admin","organization"] as const,
          },
          {
            name: "Departments / Classes",
            path: "/admin/departments",
            icon: "departments",
            roles: ["admin","organization"] as const,
          },
        ] as const)
      : ([] as const)),

    ...(user?.role === "teacher"
      ? ([
          {
            name: "Notes",
            path: "/notes",
            icon: "notes",
            roles: ["teacher"],
          },
          {
            name: "Results",
            path: "/results",
            icon: "results",
            roles: ["teacher"],
          },
          {
            name: "Events",
            path: "/events",
            icon: "events",
            roles: ["teacher"],
          },
          {
            name: "Community",
            path: "/community",
            icon: "community",
            roles: ["teacher"],
          },
        ] as const)
      : ([] as const)),
    {
      name: "Settings",
      path: "/settings",
      icon: "settings",
      roles: ["admin", "teacher"],
    },
  ];

  const getIcon = (iconName: string) => {
    const iconProps = "w-5 h-5";
    switch (iconName) {
      case "dashboard":
        return <LayoutDashboard className={iconProps} />;
      case "students":
        return <Users className={iconProps} />;
      case "teachers":
        return <FileText className={iconProps} />;
      case "departments":
        return <Building2 className={iconProps} />;
      case "notes":
        return <BookOpen className={iconProps} />;
      case "results":
        return <BarChart3 className={iconProps} />;
      case "events":
        return <Calendar className={iconProps} />;
      case "community":
        return <MessageSquare className={iconProps} />;
      case "settings":
        return <Settings className={iconProps} />;
      default:
        return <ChevronRight className={iconProps} />;
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="pt-20 mt-2 w-[200px] bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <ul className="space-y-2 p-4">
        {sidebarItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <li
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive(item.path)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {getIcon(item.icon)}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
