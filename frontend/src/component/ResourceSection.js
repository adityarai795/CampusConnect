
import React from "react";

const ResourceSection = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300 flex flex-col justify-between h-full mb-4 pb-10">
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>

      {/* Type + Meta */}
      <div className="text-sm text-gray-500 mb-1">
        📘 <span className="capitalize">{item.type}</span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        🎓 {item.university} | {item.branch} | Sem {item.semester}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {item.description}
      </p>

      {/* Link */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
      >
        📥 View & Download
      </a>
    </div>
  );
};


export default ResourceSection;
