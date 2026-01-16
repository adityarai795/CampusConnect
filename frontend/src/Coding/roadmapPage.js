import { useState } from "react";
import { Search, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const techFields = [
  {
    title: "Web Development",
    description: "Frontend + Backend + Deployment roadmap",
    topics: [
      "HTML, CSS, JavaScript",
      "React / Next.js",
      "Node.js & Express",
      "MongoDB / SQL",
      "Auth & Security",
      "Deployment (Vercel, Render, AWS)",
    ],
  },
  {
    title: "Mobile Development",
    description: "Android, iOS & Cross-platform",
    topics: [
      "Java / Kotlin",
      "Swift",
      "React Native",
      "Flutter",
      "App Publishing",
    ],
  },
  {
    title: "Data Science",
    description: "Data analysis to ML pipelines",
    topics: [
      "Python",
      "Pandas & NumPy",
      "Data Visualization",
      "Machine Learning",
      "Model Deployment",
    ],
  },
  {
    title: "Cyber Security",
    description: "Security fundamentals & tools",
    topics: [
      "Networking Basics",
      "Linux",
      "Ethical Hacking",
      "Web Security",
      "CTFs",
    ],
  },
  {
    title: "Cloud & DevOps",
    description: "Build, deploy, and scale apps",
    topics: ["Linux & Git", "Docker", "CI/CD", "AWS / GCP", "Monitoring"],
  },
];

export default function RoadmapPage() {
  const [search, setSearch] = useState("");

  const filteredFields = techFields.filter((field) =>
    field.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
      {/* Floating Sketch Blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-pink-300 opacity-20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-300 opacity-20 blur-3xl" />

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
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="group"
          >
            <div className="relative h-full rounded-3xl border-2 border-dashed border-gray-400 bg-white/70 p-6 shadow-lg backdrop-blur transition hover:shadow-2xl">
              {/* Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-400 to-indigo-400 opacity-0 blur-xl transition group-hover:opacity-30" />

              <div className="relative">
                <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <Sparkles size={20} className="text-pink-500" />
                  {field.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {field.description}
                </p>

                <ul className="space-y-1 text-sm text-gray-700">
                  {field.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {topic}
                    </li>
                  ))}
                </ul>

                <button className="mt-6 flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium transition hover:bg-gray-100">
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
