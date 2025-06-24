/* ---------- ResourceSection.jsx ---------- */
import React from "react";

const ResourceSection = ({ title, resources = [] }) => (
  <div className="mt-20">
    {/* Section Heading */}
    <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
      {title}
    </h2>

    {/* Cards Container */}
    <div className="flex flex-wrap gap-4 justify-center">
      {resources.length ? (
        resources.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.5rem)] bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {item.meta} {/* e.g. “CSE | Sem 3” */}
            </p>

            <a
              href={item.link}
              download
              className="inline-block bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              📥 Download
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No material found!</p>
      )}
    </div>
  </div>
);

export default ResourceSection;
