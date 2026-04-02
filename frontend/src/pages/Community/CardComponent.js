  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { toast } from "react-toastify";
  import { toggleLike } from "../../api/community.js";
  import {
    Heart,
    MessageCircle,
    User,
    Building2,
    ImageIcon,
    ArrowRight,
  } from "lucide-react";

  function CardComponent({ post }) {
    const userData = localStorage.getItem("user");
    const savedUser = userData ? JSON.parse(userData) : null;
    const currentUserId = savedUser?._id;

    const [isLiked, setIsLiked] = useState(post.like?.includes(currentUserId));
    const [likeCount, setLikeCount] = useState(post.like?.length || 0);
    const [isHovered, setIsHovered] = useState(false);

    const commentCount = post.comment?.length || 0;

    const handleLikeClick = async (e) => {
    e.preventDefault(); 
      
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to like posts");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const originalIsLiked = isLiked;
    const originalLikeCount = likeCount;

    try {
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      await toggleLike(post._id, config);
    } catch (err) {

      setIsLiked(originalIsLiked);
      setLikeCount(originalLikeCount);
      toast.error("Failed to update like");
    }
  };

    return (
      <div
        className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/community/openPost/${post._id}`} className="block">
          {/* Image Section */}
          {post?.image?.url ? (
            <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <img
                src={post.image.url}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white">
                  <span className="text-sm font-medium">View Post</span>
                  <ArrowRight
                    size={18}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-56 w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <ImageIcon size={64} className="text-white/30" />
              <div
                className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white">
                  <span className="text-sm font-medium">View Post</span>
                  <ArrowRight
                    size={18}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-5">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1.5 text-blue-600">
                  <User size={16} />
                  <span className="font-semibold">
                    {post.owner?.name || "Anonymous"}
                  </span>
                </div>
              </div>

              {post.collage && (
                <div className="flex items-center space-x-1.5 text-gray-500 text-xs">
                  <Building2 size={14} />
                  <span className="truncate max-w-[100px]">{post.collage}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
              {post.description || "No description provided."}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isLiked
                    ? "text-red-500 bg-red-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart
                  size={18}
                  className={`transition-all ${isLiked ? "fill-current scale-110" : ""}`}
                />
                <span className="text-sm">{likeCount > 0 ? likeCount : ""}Like</span>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-all"
              >
                <MessageCircle size={18} />
                <span className="text-sm">{commentCount > 0 ? commentCount : ""} Comment</span>
              </button>
            </div>
          </div>
        </Link>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    );
  }

  export default CardComponent;
