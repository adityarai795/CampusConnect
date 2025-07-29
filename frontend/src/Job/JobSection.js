import React,{useEffect, useState} from 'react';
import JobCardSection from '../component/JobCardSection';
import {showall} from '../api/job.js';

function JobSection() {
  const [jobs, setJobs] = useState([]);
 const getBackendData = async () => {
   try {
     const response = await showall();// call to API function
     setJobs(response.data.message);
     console.log(response.data.message); // log the actual data
   } catch (error) {
     console.error("Error fetching posts:", error); // handle errors
   }
 };


  useEffect(() => {
    getBackendData();
    },[])
// const internships = [
//   {
//     id: 1,
//     position: "Frontend Intern",
//     company: "PixelSoft Pvt. Ltd.",
//     location: "Remote",
//     stipend: "₹7,000/month",
//     type: "Internship",
//     department: "Web Development",
//     link: "https://example.com/apply/frontend",
//   },
//   {
//     id: 2,
//     position: "Data Analyst Intern",
//     company: "DataVibes Analytics",
//     location: "Delhi",
//     stipend: "₹10,000/month",
//     type: "Internship",
//     department: "Data Science",
//     link: "https://example.com/apply/data-analyst",
//   },
//   {
//     id: 3,
//     position: "Cyber Security Intern",
//     company: "SecureNet Ltd.",
//     location: "Bangalore",
//     stipend: "₹8,000/month",
//     type: "Internship",
//     department: "Cyber Security",
//     link: "https://example.com/apply/security",
//   },
//   {
//     id: 4,
//     position: "UI/UX Design Intern",
//     company: "Creatify Studio",
//     location: "Remote",
//     stipend: "₹6,000/month",
//     type: "Internship",
//     department: "UI/UX",
//     link: "https://example.com/apply/uiux",
//   },
// ];

// const jobs = [
//   {
//     id: 101,
//     position: "Full Stack Developer",
//     company: "TechNova Inc.",
//     location: "Pune",
//     salary: "₹8.5 LPA",
//     type: "Full-Time",
//     department: "Web Development",
//     link: "https://example.com/apply/fullstack",
//   },
//   {
//     id: 102,
//     position: "Machine Learning Engineer",
//     company: "AI Matrix",
//     location: "Hyderabad",
//     salary: "₹10.2 LPA",
//     type: "Full-Time",
//     department: "Data Science",
//     link: "https://example.com/apply/ml-engineer",
//   },
//   {
//     id: 103,
//     position: "Cloud DevOps Engineer",
//     company: "CloudSky Technologies",
//     location: "Remote",
//     salary: "₹9.8 LPA",
//     type: "Full-Time",
//     department: "Cloud",
//     link: "https://example.com/apply/cloud-devops",
//   },
//   {
//     id: 104,
//     position: "UI/UX Designer",
//     company: "DesignHub",
//     location: "Noida",
//     salary: "₹7.2 LPA",
//     type: "Full-Time",
//     department: "UI/UX",
//     link: "https://example.com/apply/uiux-designer",
//   },
// ];

    const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    department: "",
    location: "",
  });

  const handleChange = (e) => {
  };

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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
