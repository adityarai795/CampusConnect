import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const UploadResource = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "Notes",
    description: "",
    link: "",
    branch: "",
    semester: "",
    university: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/resource/uploadResource", formData);
      toast.success("✅ Resource uploaded successfully!");
      setFormData({
        title: "",
        type: "Notes",
        description: "",
        link: "",
        branch: "",
        semester: "",
        university: "",
      });
      navigate("/uploadnotes")
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload resource");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">📤 Upload New Resource</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="border rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Notes">Notes</option>
          <option value="Question Paper">Question Paper</option>
          <option value="Youtube">YouTube</option>
          <option value="Important Courses">Important Courses</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
          rows={3}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Optional: https://example.com"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Branch (e.g., CSE, ECE)"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester (e.g., 5th)"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          placeholder="University Name"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload Resource"}
        </button>
      </form>
    </div>
  );
};

export default UploadResource;
