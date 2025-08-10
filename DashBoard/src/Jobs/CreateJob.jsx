import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createJob } from '../api/job';
import {toast} from 'react-toastify'

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "IT",
    city: "",
    location: "",
    JobType: "Full Time",
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await createJob(formData);
    // const res = await axios.post("https://campusconnectbackend-q596.onrender.com/job/addJob", formData);
    toast.success("Job created successfully!");
    console.log(res.data);
    // Optionally reset the form
    setFormData({
      title: "",
      description: "",
      category: "IT",
      city: "",
      location: "",
      JobType: "Full Time",
    });
    
    navigate("/viewalljobsjobs")
  } catch (err) {
    console.error("Error creating job:", err);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow pt-10">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Create a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Title*</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description*</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            name="JobType"
            value={formData.JobType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Full Time">Full Time</option>
            <option value="Part time">Part Time</option>
            <option value="InternShip">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
