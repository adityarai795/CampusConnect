import React, { useEffect, useState } from "react";
import { myAppliedJobs } from "../../api/job";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyJobs = async () => {
    try {
      const response = await myAppliedJobs();
      console.log("My Applied Jobs:", response.data);

      setJobs(response.data.applications || []);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
      setError("Failed to load applied jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  // 🔄 Loading State
  if (loading) {
    return <p>Loading your applied jobs...</p>;
  }

  // ❌ Error State
  if (error) {
    return <p>{error}</p>;
  }

  // 📭 Empty State
  if (jobs.length === 0) {
    return <p>You haven’t applied to any jobs yet.</p>;
  }

  return (
    <div>
      <h2>My Applied Jobs</h2>

      {jobs.map((application) => (
        <div
          key={application._id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <h3>{application.job?.title || "No Title"}</h3>
          <p>
            <strong>Company:</strong> {application.job?.company || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {application.job?.location || "N/A"}
          </p>
          <p>
            <strong>Job Type:</strong>{" "}
            {application.job?.jobType || application.job?.JobType || "N/A"}
          </p>
          <p>
            <strong>Applied On:</strong>{" "}
            {application.appliedAt
              ? new Date(application.appliedAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {application.status || "Applied"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyJobs;
