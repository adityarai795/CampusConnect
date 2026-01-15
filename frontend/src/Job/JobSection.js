import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showall } from "../api/job.js";

// Mock API - Replace with your actual API
// const showall = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 800));
//   return {
//     data: {
//       message: [
//         {
//           _id: "1",
//           title: "Frontend Developer",
//           company: "Tech Corp",
//           jobType: "Full-Time",
//           department: "Web Development",
//           location: "Bangalore",
//           salary: "₹8-12 LPA",
//           experience: "2-4 years",
//           description: "Looking for experienced React developer",
//           postedDate: "2025-01-10",
//           link: "https://example.com/job1",
//         },
//         {
//           _id: "2",
//           title: "Data Science Intern",
//           company: "AI Solutions",
//           jobType: "Internship",
//           department: "Data Science",
//           location: "Remote",
//           salary: "₹15k/month",
//           experience: "Fresher",
//           description: "Learn and grow with our data science team",
//           postedDate: "2025-01-12",
//           link: "https://example.com/job2",
//         },
//         {
//           _id: "3",
//           title: "UI/UX Designer",
//           company: "Design Studio",
//           jobType: "Full-Time",
//           department: "UI/UX",
//           location: "Delhi",
//           salary: "₹6-10 LPA",
//           experience: "1-3 years",
//           description: "Create beautiful user experiences",
//           postedDate: "2025-01-14",
//           link: "https://example.com/job3",
//         },
//         {
//           _id: "4",
//           title: "Cloud Engineer",
//           company: "Cloud Systems",
//           jobType: "Remote",
//           department: "Cloud",
//           location: "Pune",
//           salary: "₹10-15 LPA",
//           experience: "3-5 years",
//           description: "Manage cloud infrastructure",
//           postedDate: "2025-01-15",
//           link: "https://example.com/job4",
//         },
//       ],
//     },
//   };
// };

// Job Card Component
function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
          <p className="text-blue-600 font-semibold">{job.company}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            job.jobType === "Internship"
              ? "bg-green-100 text-green-700"
              : job.jobType === "Remote"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {job.jobType}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {job.department}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {job.salary}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {job.experience}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-500">
          Posted:{" "}
          {new Date(job.postedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <button
          onClick={() => onApply(job)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
        >
          Apply Now
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    department: "",
    location: "",
    subject: "",
  });

  // Fetch jobs from backend
  const getBackendData = async () => {
    try {
      setLoading(true);
      const response = await showall();
      const jobsData = response.data.message;
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      // toast.success("Jobs loaded successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to load jobs");
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBackendData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const handleSubmit = (e) => {
    e.preventDefault();

    let filtered = [...jobs];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    // Department filter
    if (filters.department) {
      filtered = filtered.filter(
        (job) => job.department === filters.department
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    setFilteredJobs(filtered);
    toast.info(`Found ${filtered.length} jobs matching your criteria`);
  };

  // Reset filters
  const handleReset = () => {
    setFilters({
      search: "",
      jobType: "",
      department: "",
      location: "",
      subject: "",
    });
    setFilteredJobs(jobs);
    toast.info("Filters reset");
  };

  // Handle job application
  const handleApply = (job) => {
    if (job.link) {
      window.open(job.link, "_blank", "noopener,noreferrer");
    } else {
      toast.info(`Applying for ${job.title} at ${job.company}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10">
      {/* Search & Filter Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-6xl mx-auto mb-10 mt-20">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Jobs & Internships
          </h2>
          <p className="text-gray-600">
            Find your dream job or internship opportunity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by job title or company name..."
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              <option value="">All Job Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
              value={filters.location}
              onChange={handleFilterChange}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              placeholder="Subject (Optional)"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
            >
              🔍 Apply Filters
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Stats Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="text-gray-600">
              <strong className="text-blue-600">{filteredJobs.length}</strong>{" "}
              jobs found
            </span>
            <span className="text-gray-600">
              <strong className="text-green-600">
                {jobs.filter((j) => j.jobType === "Internship").length}
              </strong>{" "}
              internships
            </span>
            <span className="text-gray-600">
              <strong className="text-purple-600">
                {jobs.filter((j) => j.jobType === "Remote").length}
              </strong>{" "}
              remote positions
            </span>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">💼 Latest Jobs</h3>
          <button
            onClick={getBackendData}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            <p className="text-gray-600 mt-4 text-lg">
              Loading amazing opportunities...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} onApply={handleApply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSection;
