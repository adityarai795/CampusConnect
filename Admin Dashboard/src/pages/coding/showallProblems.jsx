import React, { useEffect, useState } from 'react';
import { showallProblem ,deleteProblem} from '../../api/codingProblem';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShowAllProblems() {
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    try {
       const response = await showallProblem();
      setData(response.data.problem);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   
  };

  const handleDelete = async (id) => {
    try {
    const response = await deleteProblem(id);
      console.log(response)
      toast.success(response.data.message)
      fetchdata()
    } catch (error) {
       console.log(error);
           toast.error(error.message)

    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="mt-20 max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          All Coding Problems
        </h1>
        <Link
          to="/addProblems"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          ➕ Add Problem
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wider">Problem</th>
              <th className="py-3 px-6 text-left uppercase tracking-wider">Topic</th>
              <th className="py-3 px-6 text-center uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No problems found.
                </td>
              </tr>
            ) : (
              data.map((v) => (
                <tr
                  key={v._id}
                  className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap text-gray-800">{v.problem}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-gray-600">{v.topic}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                      onClick={() => handleDelete(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowAllProblems;
