import React, { useEffect, useState } from "react";
import axios from "axios";
import { showall, deleteJob } from '../api/job'
import {toast} from 'react-toastify'

const JobView = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await showall();
      setJobs(res.data.message || []);
      toast.success("fetch all Successfully")
    } catch (err) {
      toast.error("Error fetching Jobs")
      console.error("Error fetching jobs:", err);
    }
  };

  const deleteJobfunction = async (id) => {
    try {
      // await axios.delete(`http://localhost:3000/job/deletePost/${id}`); // 🔁 Update with your DELETE endpoint
      await deleteJob(id);
      toast.success("Job deleted successfully");
      fetchJobs(); // Refresh jobs list
    } catch (err) {
      toast.error("Error Deleting Job")
      console.error("Error deleting job:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pt-10">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Job Listings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border text-left">Title</th>
              <th className="px-4 py-2 border">Link</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={job._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border text-left">{job.title}</td>
                  <td className="px-4 py-2 border"></td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        alert("Edit functionality not implemented yet")
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteJobfunction(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No jobs found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobView;
