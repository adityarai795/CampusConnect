// import React from 'react'
// import { Link } from 'react-router-dom';

// function result() {
//   return (
//     <div className="col-span-9 p-6 mt-10">
//       <h2 className="text-2xl font-semibold">This is the Result Page</h2>
//       <Link to={"/createResult"}>create Another Result</Link>
//             <br />
//       <Link to={"/showallResult"}>viewall result</Link>
//     </div>
//   )
// }

// export default result

import React from 'react';
import { Link } from 'react-router-dom';

function Result() {
  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        📊 University Result Panel
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Create Result */}
        <Link
          to="/createResult"
          className="flex items-center justify-between bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg shadow transition"
        >
          <div className="flex items-center space-x-3">
            <span>Create New Result</span>
          </div>
        </Link>

        {/* View All Results */}
        <Link
          to="/showallResult"
          className="flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg shadow transition"
        >
          <div className="flex items-center space-x-3">
      
            <span>View All Results</span>
          </div>
        </Link>

        {/* Dummy Edit Link */}
        <Link
          to="/editResult/123"
          className="flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg shadow transition"
        >
          <div className="flex items-center space-x-3">
          
            <span>Edit a Result</span>
          </div>
        </Link>

        {/* Dummy Delete Link */}
        <Link
          to="/deleteResult/123"
          className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg shadow transition"
        >
          <div className="flex items-center space-x-3">
          
            <span>Delete a Result</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Result;
