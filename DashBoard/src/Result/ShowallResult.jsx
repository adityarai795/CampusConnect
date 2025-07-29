import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowAllResults = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:3000/result/showall");
      setResults(res.data.showall || []);
    } catch (err) {
      console.error("Failed to fetch results:", err);
    }
  };

  const deleteResult = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    try {
      await axios.delete(`http://localhost:3000/results/delete/${id}`);
      alert("Result deleted successfully");
      fetchResults();
    } catch (err) {
      console.error("Failed to delete result:", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="p-6 pt-20">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">All University Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-700">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">University Name</th>
              <th className="px-4 py-2 border">Result Link</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={result._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{result.University}</td>
                  <td className="px-4 py-2 border">
                    {result.link ? (
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Link
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
                      onClick={() => deleteResult(result._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowAllResults;
