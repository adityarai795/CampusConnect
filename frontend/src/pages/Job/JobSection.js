import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showall } from "../../api/job.js";
import Pagination from "../../component/Pagination.js";
import { useUser } from "../../context/UserContext";
import { applyJob } from "../../api/job.js";
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
          {job.category}
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
          {job.salary || "Not Specified"}
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
  const { user } = useUser();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    category: "",
    location: "",
    subject: "",
  });

  // Fetch jobs from backend
  const getBackendData = async () => {
    try {
      setLoading(true);
      const response = await showall(page);
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
  }, [page]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const handleSubmit = (e) => {
    e.preventDefault();
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
      applyJob(job._id, { userId: user._id })
        .then(() => {
          toast.success(
            `Applied for ${job.title} at ${job.company} successfully!`,
          );
        })
        .catch((error) => {
          toast.error(
            `Failed to apply for ${job.title} at ${job.company}: ${error.message}`,
          );
        });
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Page from child:", newPage);
    setPage(newPage);
  };

  const jobType = [
    "Internship",
    "Full-Time",
    "Remote",
    "Part-Time",
    "Contract",
  ];
  const departments = [
    "Software Development",
    "Data Science",
    "UI/UX",
    "Cloud",
    "Cyber Security",
    "Marketing",
    "Sales",
    "Finance",
    "Human Resources",
    "Construction",
    "Education",
    "Healthcare",
  ];

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

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-6"
        >
          {/* 🔍 Search Bar */}
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
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
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

          {/* 🎯 Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Job Type */}
            <div className="flex flex-col gap-1">
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              >
                <option value="">All Job Types</option>
                {jobType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1">
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 md:items-end">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                🔍 Apply Filters
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 md:flex-none px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
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

      {/* Pagination */}
      <Pagination onPageChange={setPage} />
    </div>
  );
}

export default JobSection;
