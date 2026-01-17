import {Link} from "react-router-dom";
function TrendingSkills() {
  const trendingSkills = [
    { name: "React.js", color: "from-cyan-500 to-blue-500" },
    { name: "Node.js", color: "from-green-500 to-emerald-500" },
    { name: "UI/UX Design", color: "from-purple-500 to-pink-500" },
    { name: "Python", color: "from-blue-500 to-indigo-500" },
    { name: "Data Analysis", color: "from-orange-500 to-red-500" },
    { name: "AWS", color: "from-yellow-500 to-orange-500" },
    { name: "Figma", color: "from-pink-500 to-rose-500" },
    { name: "TypeScript", color: "from-blue-600 to-cyan-600" },
    { name: "Digital Marketing", color: "from-purple-600 to-indigo-600" },
    { name: "Cybersecurity", color: "from-red-500 to-pink-500" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-6 md:px-16 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <span className="text-4xl">🔥</span>
            Top Skills in Demand
            <span className="text-4xl">🚀</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Master these skills to boost your career prospects
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {trendingSkills.map((skill, idx) => (
            <button
              key={idx}
              className={`group relative px-6 py-3 bg-gradient-to-r ${skill.color} text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 overflow-hidden`}
            >
              <span className="relative z-10">{skill.name}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Click a skill to explore jobs, courses, and resources!
          </p>
          <Link to="roadmap">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              View All Skills
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default TrendingSkills;