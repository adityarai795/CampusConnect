import { useEffect, useState } from "react";
import { Search, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { fetchRoadMap } from "../../api/roadMap.js";
import { useNavigate } from "react-router-dom";

export default function RoadmapPage() {
  const [search, setSearch] = useState("");
  const [techFields, setTechFields] = useState([]);
  const navigate = useNavigate();

  const filteredFields = techFields.filter((field) =>
    field.title.toLowerCase().includes(search.toLowerCase()),
  );

  const fetchData = async () => {
    try {
      const response = await fetchRoadMap();
      setTechFields(response.data);
    } catch (error) {
      console.error("Error fetching roadmap data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/roadmap/${id}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          ✏️ Student Career Roadmaps
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Pick your tech path, follow a guided roadmap, and grow step-by-step
          toward your dream career.
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative z-10 max-w-md mx-auto mb-12">
        <div className="flex items-center gap-2 rounded-2xl border border-dashed border-gray-400 bg-white/70 px-4 py-2 shadow-md backdrop-blur">
          <Search className="text-gray-400" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search your tech field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFields.map((field, index) => (
          <motion.div
            key={field._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="group cursor-pointer"
            onClick={() => handleCardClick(field._id)}
          >
            <div className="relative h-full rounded-3xl border-2 border-dashed border-gray-400 bg-white/70 p-6 shadow-lg backdrop-blur transition hover:shadow-2xl">
              {/* Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-400 to-indigo-400 opacity-0 blur-xl transition group-hover:opacity-30" />

              <div className="relative">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <Sparkles size={20} className="text-pink-500" />
                  {field.title}
                </h2>

                {/* Category + Level */}
                <div className="flex gap-2 text-xs mb-3">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">
                    {field.category}
                  </span>
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-pink-700">
                    {field.level}
                  </span>
                </div>

                {/* Description (Short) */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {field.description}
                </p>

                {/* Tags (First 3 only) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Steps Count */}
                <p className="text-sm text-gray-700 mb-4">
                  📌 {field.steps?.length || 0} Learning Steps
                </p>

                <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium transition hover:bg-gray-100">
                  Explore Roadmap
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
