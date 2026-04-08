import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {addProblem, showallProblem ,deleteProblem} from '../../api/codingProblem';
import { toast } from "react-toastify";

function AddProblem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    problem: "",
    topic: "",
    link: "",
    status: false,
    level: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:5000/api/problems", formData); // update your backend route
      const response = await addProblem(formData)
      console.log(response);
      toast.success("add")
      navigate("/showallProblems"); // redirect back to problems list
    } catch (error) {
      console.error(error);
      alert("Error adding problem");
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Add New Coding Problem
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-5"
      >
        {/* Problem Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Problem
          </label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            placeholder="Enter problem name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Enter topic"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Problem Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          >
            <option value="">Select level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="text-gray-700">Solved</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Add Problem
        </button>
      </form>
    </div>
  );
}

export default AddProblem;


