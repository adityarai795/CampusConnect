import React, { useEffect, useState } from 'react';
import axios from "axios";
import {toast} from 'react-toastify'

const ShowallPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/community/post/viewall');
      console.log(res.data.posts);
      setPosts(res.data.posts);
      toast.success("Fetching all Data")
    } catch (error) {
      toast.error("Something went wrong");
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/community/post/${postId}/delete`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        toast.success("Post deleted");
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      toast.error("Something error")
      console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">All Posts</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">S.No</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Likes</th>
              <th className="p-2 border">Comments</th>
              <th className="p-2 border">Owner</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{post.title}</td>
                <td className="p-2 border">
                  {post.image?.url ? (
                    <img
                      // src={p}
                      src={post.image.url}
                      alt="Post"
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="p-2 border">{post.likes?.length || 0}</td>
                <td className="p-2 border">{post.reviews?.length || 0}</td>
                <td className="p-2 border">
                  {post.owner?.name || 'Anonymous'}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No posts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowallPost;
