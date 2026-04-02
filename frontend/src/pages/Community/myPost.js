import React, { useEffect, useState } from "react";
import { viewMyPosts } from "../../api/community.js";
import CardComponent from "./CardComponent";
import CommunityHeader from "./communityHeader.js";
import { toast } from "react-toastify";
import { Loader2, LayoutGrid, RefreshCw } from "lucide-react";

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getMyPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // API call to fetch only logged-in user's posts
      const response = await viewMyPosts(config);
      setPosts(response.data.posts);

      if (isRefresh) toast.success("Your posts updated!");
    } catch (error) {
      console.error("Error fetching my posts:", error);
      toast.error(error.response?.data?.message || "Failed to fetch your posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20 pb-10">
      <CommunityHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Profile Stats / Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My <span className="text-blue-600">Contributions</span>
            </h1>
            <p className="text-gray-500 mt-1">
              You have shared {posts.length} {posts.length === 1 ? "story" : "stories"} with the community
            </p>
          </div>

          <button
            onClick={() => getMyPosts(true)}
            disabled={refreshing}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            <span className="font-medium">Sync Posts</span>
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Fetching your posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl border-2 border-dashed border-gray-200">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <LayoutGrid size={48} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Posts Found</h3>
            <p className="text-gray-500 mb-8 text-center max-w-sm">
              It looks like you haven't posted anything yet. Start sharing your knowledge!
            </p>
            <a
              href="/createPost"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Post Now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <CardComponent key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPost;
