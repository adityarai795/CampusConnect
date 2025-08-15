import React, { useEffect, useState } from "react";
import { viewOne } from "../api/community.js";
import { useParams } from "react-router-dom";
import CommunityHeader from "./communityHeader.js";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShareAlt,
  
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../api/api.js";
import axios from "axios";
import {
  addComment,
  showallComments,
  deleteComment,
} from "../api/community.js";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

function OpenPost() {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const fetchData = async () => {
    const response = await viewOne(id);
    setPost(response.data.post);
  };
  const { user } = useUser();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const fetchComments = async () => {
    try {
      const response = await showallComments(id);
      console.log(response.data.data);
      if (response.data.data) {
        setComments(response.data.data.comment);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleDelete = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/community/post/${postId}/delete`, {
        method: 'DELETE',
      });
      console.log(res.data);
      toast.success("Post Successfully Deleted !");
      navigate("/community");
    } catch (err) {
      toast.error("Something error")
      console.error(err.message);
    }
  };
  const handleShare = () => {
    const url = `${BASE_URL}openPost/${id}`;
    navigator.clipboard.writeText(url).catch((err) => {
      console.error("Failed to copy link: ", err);
    });
  };
  const [liked, setLiked] = useState(false);
  const isliked = () => {
    setLiked(true);
  };

  const AddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const token = localStorage.getItem("token"); // Login ke baad store kiya tha
      const res = await addComment(
        post._id,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setComments([...comments, newComment]);
      setNewComment("");
      setComments(" ");
      await fetchComments();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.error("Failed to add comment:", error);
    }
  };

  const commentDeleted = async (id) => {
    try {
         const token = localStorage.getItem("token");

         const response = await deleteComment(id, {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
         toast.success(response.message || "Comment Deleted");
         await fetchComments();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.error("Failed to add comment:", error);
    }
 
  };
  useEffect(() => {
    fetchData();
    fetchComments();
  }, []);
  return (
    <>
      <div className="mt-20 ml-10">
        <CommunityHeader />

        <div>
          {/* Title */}
          <h3 className="font-extrabold text-2xl mb-4">{post.title}</h3>
          {post?.image?.url && (
            <img
              src={post?.image?.url}
              alt="Post"
              className="h-[300px] w-[80%] object-cover rounded-md shadow-md"
            />
          )}

          <span className="font-semibold text-blue-600">
            Owner: {post.owner?.username || "Anonymous"}
            {" | "} {post.collage || "N/A"}
          </span>

          {/* Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {post.description}
          </p>

          <span>{}</span>
          <hr className="mt-4" />
          {/* Action Buttons */}
          <div className="flex items-center space-x-6 mt-4 text-2xl">
            <button className="text-red-500" onClick={isliked}>
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button className="text-blue-500">
              <FaComment />
            </button>
            <button className="text-green-500" onClick={handleShare}>
              <FaShareAlt />
            </button>
            {post.owner?._id === user?._id && (
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500"
              >
                <MdDelete />
              </button>
            )}
          </div>
          {/* Add New Comment */}
          <div className="mt-6 flex space-x-2">
            <input
              type="text"
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded px-3 py-1"
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={AddComment}
            >
              Post
            </button>
          </div>
          {/* Comments Section */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-2">Comments</h4>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {Array.isArray(comments) &&
                  comments.map((c, index) => (
                    <li
                      key={c._id || index}
                      className="border border-gray-200 rounded p-2 bg-gray-50 flex justify-between items-center"
                    >
                      {/* <div>
                        <span className="font-bold">{c.user}You: </span>
                        {c.comment}
                      </div> */}
                      <div key={c._id}>
                        <p>{c.comment}</p>
                        <small>By: {c.user?.username}</small>
                      </div>
                      {c.user?._id === user?.id && (
                        <button
                          onClick={() => commentDeleted(c._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenPost;
