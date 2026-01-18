import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Award,
  Users,
  Briefcase,
  LogOut,
  LogIn,
  User,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import Logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Notes", path: "/notes", icon: BookOpen },
    { name: "Results", path: "/result", icon: Award },
    { name: "Community", path: "/community", icon: Users },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={Logo}
                    alt="CampusConnect Logo"
                    className="h-10 w-10 rounded-full relative z-10 ring-2 ring-white shadow-lg"
                  />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  CampusConnect
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium group"
                  >
                    <Icon
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to="/profile">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <User size={18} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {user.name || user.username}
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 bg-gradient-to-b from-white to-gray-50">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <Icon size={20} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <Link to="/profile" onClick={closeMenu}>
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <User size={20} className="text-blue-600" />
                      <span className="font-medium text-gray-700">
                        Hi, {user.name || user.username}
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
