import React, { useState } from "react";
import { toast } from "react-toastify";
import CommunityHeader from "./communityHeader";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
import {addPost} from '../api/community.js'
const CreatePost = () => {

  const navigate = useNavigate();

const [formData, setFormData] = useState({
  title: "",
  description: "",
  image: null,
  college: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleImageChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    image: e.target.files[0],
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("image", formData.image);
  data.append("college", formData.college);
  try {
    const res = await addPost(data);
    toast.success("Post uploaded successfully!");
    navigate("/community");
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

  return (
    <div className="mt-20">
      <CommunityHeader />
      <div className="max-w-2xl mx-auto mt-10 mb-10 bg-white p-6 rounded-xl shadow ">
        <h2 className="text-2xl font-bold text-center mb-6">Create Post</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block font-medium">Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter post title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              rows="3"
              placeholder="Optional description..."
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Collage */}
          <div>
            <label className="block font-medium">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="e.g. Bansal Institute"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Upload Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
