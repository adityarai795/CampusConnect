// JobCardSection.jsx
import React from "react";

const JobCardSection = ({ title, jobs = [] }) => {
// 🎓 Internships


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
              {job.position}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{job.company}</p>
            <p className="text-sm text-gray-500">
              📍 {job.location} | 💰 {job.stipend || job.salary}
            </p>

            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Apply Now
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No opportunities found!</p>
      )}
    </div>
  </div>
  )
};

export default JobCardSection;
