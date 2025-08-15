// JobCardSection.jsx
import React from "react";

const JobCardSection = ({ title, jobs = [] }) => {
// 🎓 Internships
console.log(jobs)

  return (
    <div className="mt-[200px]">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        {title}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {jobs.length ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33%-0.75rem)] bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {job.JobType}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{job.title}</p>
              <p className="text-sm text-gray-500">
                📍 {job.city} {job.location}| 💰 {job.stipend || job.salary}
              </p>
              <span>{job.description}</span>

              <div className="flex gap-3 mt-3">
                {/* Upload Details Button */}
                <a
                  // href={job.uploadLink} // uncomment and replace when ready
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300"
                >
                  Upload Details
                </a>

                {/* Apply Now Button */}
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-black text-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-300"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No opportunities found!</p>
        )}
      </div>
    </div>
  );
};

export default JobCardSection;
