import React, { useEffect, useState } from "react";
import { viewOne } from "../../api/community.js";
import { useParams, useNavigate } from "react-router-dom";
import CommunityHeader from "./communityHeader.js";
import {
  Heart,
  MessageCircle,
  Share2,
  Trash2,
  Send,
  User as UserIcon,
  Building2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { BASE_URL } from "../../api/api.js";
import {
  addComment,
  showallComments,
  deleteComment,
} from "../../api/community.js";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

function OpenPost() {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await viewOne(id);
      setPost(response.data.post);
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await showallComments(id);
      if (response.data.data) {
        setComments(response.data.data.comment);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await fetch(`http://localhost:3000/community/post/${postId}/delete`, {
        method: "DELETE",
      });
      toast.success("Post deleted successfully!");
      navigate("/community");
    } catch (err) {
      toast.error("Failed to delete post");
      console.error(err.message);
    }
  };

  const handleShare = () => {
    const url = `${BASE_URL}openPost/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShareSuccess(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setShareSuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link");
      });
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const AddComment = async () => {
    if (newComment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setCommenting(true);
      const token = localStorage.getItem("token");
      const res = await addComment(
        post._id,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Comment added!");
      setNewComment("");
      await fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
      console.error("Failed to add comment:", error);
    } finally {
      setCommenting(false);
    }
  };

  const commentDeleted = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await deleteComment(commentId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Comment deleted");
      await fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
        <CommunityHeader />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
        <CommunityHeader />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-600">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-10">
      <CommunityHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-blue-600">
                <UserIcon size={18} />
                <span className="font-semibold">
                  {post.owner?.username || "Anonymous"}
                </span>
              </div>

              {post.collage && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building2 size={18} />
                    <span>{post.collage}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Post Image */}
          {post?.image?.url && (
            <div className="relative w-full h-96 bg-gray-100">
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  liked
                    ? "text-red-500 bg-red-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart size={20} className={liked ? "fill-current" : ""} />
                <span className="font-medium">{liked ? "Liked" : "Like"}</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                <MessageCircle size={20} />
                <span className="font-medium">{comments.length} Comments</span>
              </button>

              <button
                onClick={handleShare}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  shareSuccess
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {shareSuccess ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span className="font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={20} />
                    <span className="font-medium">Share</span>
                  </>
                )}
              </button>

              {post.owner?._id === user?._id && (
                <button
                  onClick={() => handleDelete(post._id)}
                  className="ml-auto flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={20} />
                  <span className="font-medium">Delete</span>
                </button>
              )}
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && AddComment()}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
              />
              <button
                onClick={AddComment}
                disabled={commenting || !newComment.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                {commenting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send size={20} />
                )}
                <span>Post</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="px-6 py-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Comments ({comments.length})
            </h3>

            {comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div
                    key={c._id}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <UserIcon size={16} className="text-white" />
                          </div>
                          <span className="font-semibold text-gray-900">
                            {c.user?.username || "Anonymous"}
                          </span>
                        </div>
                        <p className="text-gray-700 ml-10">{c.comment}</p>
                      </div>

                      {c.user?._id === user?._id && (
                        <button
                          onClick={() => commentDeleted(c._id)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenPost;
