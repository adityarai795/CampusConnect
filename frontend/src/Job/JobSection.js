import React,{useEffect, useState} from 'react';
import JobCardSection from '../component/JobCardSection';
import {showall} from '../api/job.js';
import { toast } from 'react-toastify';
function JobSection() {
  const [jobs, setJobs] = useState([]);
 const getBackendData = async () => {
   try {
     const response = await showall();
     toast.success("Data Fetch Successfully")
     setJobs(response.data.message);
     console.log(response.data.message); // log the actual data
   } catch (error) {
     toast.error(error || "Something went Wrong");
     console.error("Error fetching posts:", error); // handle errors
   }
 };


  useEffect(() => {
    getBackendData();
    },[])



  const handleSubmit = (e) => {
    e.preventDefault();
     // Send data to parent
  };
  return (
    <div className="bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto mb-10 mt-[80px]">
        <h2 className="text-4xl font-bold text-blue-600 text-center mb-2">
          {" "}
          Jobs & Internships
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search title or company..."
            className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="jobType"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Job Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Remote">Remote</option>
          </select>

          <select
            name="department"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Departments</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Cloud">Cloud</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>

          <select
            name="location"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Noida">Noida</option>
          </select>
          <input
            type="text"
            placeholder="Subject (Optional)"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Apply Filters
          </button>
        </form>
      </div>
      <div className=" flex flex-wrap mx-6">
      
      <JobCardSection  title="💼 Latest Jobs" jobs={jobs} />
        
      </div>
    </div>
  );
}

export default JobSection
