import React from "react";

const trendingSkills = [
  "React.js",
  "Node.js",
  "UI/UX Design",
  "Python",
  "Data Analysis",
  "AWS",
  "Figma",
  "TypeScript",
  "Digital Marketing",
  "Cybersecurity",
];

const TrendingSkills = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-16 mt-10 shadow-inner rounded-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        🔍 Top Skills in Demand
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {trendingSkills.map((skill, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 text-sm font-medium shadow"
          >
            {skill}
          </button>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        Click a skill to explore jobs or learn more!
      </p>
    </div>
  );
};

export default TrendingSkills;
