import { useState } from "react";
import { Send, Heart, MessageCircle, Trash2 } from "lucide-react";

interface Post {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Prof. Anita Sharma",
      role: "Teacher",
      content:
        "Great discussion in the data structures class today! Students showed excellent understanding of binary trees.",
      timestamp: "2024-01-15 10:30 AM",
      likes: 24,
      comments: 5,
      liked: false,
    },
    {
      id: "2",
      author: "Dr. Rajesh Kumar",
      role: "Admin",
      content:
        "Reminder: Annual cultural fest is coming up next month. All departments should prepare their entries.",
      timestamp: "2024-01-14 02:15 PM",
      likes: 18,
      comments: 8,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: "You",
        role: "Staff",
        content: newPost,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: 0,
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setShowPostForm(false);
    }
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">College Community</h1>
        <p className="text-gray-600 mt-2">
          Share thoughts and connect with faculty and staff
        </p>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="w-full flex items-center gap-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            Y
          </div>
          <span className="text-gray-600">What's on your mind?</span>
        </button>

        {showPostForm && (
          <div className="mt-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              rows={5}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddPost}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
              <button
                onClick={() => setShowPostForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{post.author}</h3>
                <p className="text-sm text-gray-600">
                  {post.role} • {post.timestamp}
                </p>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-800 mb-4">{post.content}</p>

            <div className="flex gap-6 pt-4 border-t border-gray-200 text-gray-600">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 hover:text-indigo-600 transition ${
                  post.liked ? "text-red-600" : ""
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${post.liked ? "fill-red-600" : ""}`}
                />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-indigo-600 transition">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No posts yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
};

export default Community;
