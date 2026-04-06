import React, { useEffect, useState } from "react";
import { myAppliedJobs } from "../../api/job";
import { Briefcase, MapPin, Building2, Calendar } from "lucide-react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyJobs = async () => {
    try {
      const response = await myAppliedJobs();
      setJobs(response.data.applications || []);
    } catch (err) {
      setError("Failed to load applied jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      case "interview":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500 animate-pulse">
          Loading your applications...
        </p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  // Empty UI
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen ">
        <Briefcase size={50} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold">No Applications Yet</h2>
        <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Applications</h2>
        <span className="text-sm text-gray-500">
          {jobs.length} jobs applied
        </span>
      </div>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((application) => (
          <div
            key={application._id}
            className="bg-white shadow-sm border rounded-xl p-5 hover:shadow-md transition duration-300"
          >
            {/* Job Title */}
            <h3 className="text-lg font-semibold mb-2">
              {application.job?.title || "No Title"}
            </h3>

            {/* Company */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Building2 size={16} />
              {application.job?.company || "N/A"}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <MapPin size={16} />
              {application.job?.location || "N/A"}
            </div>

            {/* Applied Date */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <Calendar size={16} />
              {application.appliedAt
                ? new Date(application.appliedAt).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium">
                {application.job?.jobType || "N/A"}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                  application.status,
                )}`}
              >
                {application.status || "Applied"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs;
