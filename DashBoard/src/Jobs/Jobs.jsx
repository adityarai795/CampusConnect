// import React from 'react'
// import CreateJob from './CreateJob'
// import { Link } from 'react-router-dom'
// function Jobs() {
//   return (
//       <div className="col-span-9 p-6 mt-10">
//       <h2 className="text-2xl font-semibold">This is the Job Page</h2>
//       <Link to={"/createJob"}>createJob</Link>
//       <br />
//       <Link to={"/viewalljobs"}>viewall</Link>
//     </div>
//   )
// }

// export default Jobs


import React from 'react';
import { Link } from 'react-router-dom';

function Jobs() {
  return (
    <div className="col-span-9 p-6 mt-10 pt-10">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">💼 Job Management Portal</h2>
      <div className="space-y-4">

        {/* Create Job */}
        <Link
          to="/createJob"
          className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition duration-200 shadow-md"
        >
          ➕ Create New Job
        </Link>

        {/* View All Jobs */}
        <br />
        <Link
          to="/viewalljobs"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200 shadow-md"
        >
          📄 View All Jobs
        </Link>
      </div>
    </div>
  );
}

export default Jobs;
