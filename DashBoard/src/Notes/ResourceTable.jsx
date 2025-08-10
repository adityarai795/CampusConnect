import React, { useEffect, useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify'
// import { getAllResources, deleteResource } from "../api/resourceApi";

const ShowAllResources = () => {
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const res=await axios.get("http://localhost:3000/resource/showall");
      // const res = await getAllResources();
       toast.success("fetch all Successfully")
      setResources(res.data.message|| []);
    } catch (err) {
      toast.error("Failed to fetch resources")
      console.error("Failed to fetch resources:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      // await deleteResource(id);
      // alert("Resource deleted successfully");
      // fetchResources();
    } catch (err) {
      console.error("Failed to delete resource:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="p-6 pt-20">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">All Uploaded Resources</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-700">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Link</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <tr key={resource._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{resource.title}</td>
                  <td className="px-4 py-2 border">{resource.type}</td>
                  <td className="px-4 py-2 border">
                    {resource.link ? (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No Link</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => alert("Edit feature coming soon")}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(resource._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No resources found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowAllResources;
