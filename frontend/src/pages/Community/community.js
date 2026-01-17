import React, { useEffect, useState } from "react";
import { viewAllPost } from "../../api/community.js"
import CardComponent from "./CardComponent";
import CommunityHeader from "./communityHeader.js";
import { toast } from "react-toastify";
import { Loader2, MessageSquare, RefreshCw } from "lucide-react";

function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getDataFromBackend = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await viewAllPost();
      setPosts(response.data.posts);

      if (isRefresh) {
        toast.success("Posts refreshed!");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    getDataFromBackend(true);
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-10">
      <CommunityHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Header with Refresh Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Feed
            </h1>
            <p className="text-gray-600 mt-1">
              {posts.length} {posts.length === 1 ? "post" : "posts"} available
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg text-gray-700 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            <span className="font-medium">Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading posts...</p>
            <p className="text-gray-400 text-sm mt-1">
              Please wait while we fetch the latest content
            </p>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30"></div>
              <MessageSquare className="relative w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Posts Yet
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Be the first to share something amazing with the community!
            </p>
            <a
              href="/createPost"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Create Your First Post
            </a>
          </div>
        ) : (
          /* Posts Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <CardComponent key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;
