import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Grid, User } from "lucide-react";

function CommunityHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Navigation Tabs */}
          <div className="flex gap-2">
            <Link
              to="/community"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/community")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Grid size={18} />
              <span>All Posts</span>
            </Link>
            <Link
              to="/community/myposts"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/community/myposts")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <User size={18} />
              <span>My Posts</span>
            </Link>
          </div>

          {/* Create Post Button */}
          <Link
            to="/createPost"
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Create Post</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommunityHeader;
  