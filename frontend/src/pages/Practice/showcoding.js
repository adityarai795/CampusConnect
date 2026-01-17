import React, { useEffect, useState } from "react";
import { showallProblem } from "../../api/codingProblem.js";
import {
  Code,
  Building2,
  Trophy,
  Target,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  Flame,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Zap,
  Brain,
  Calendar,
} from "lucide-react";

function PlacementPrep() {
  const [activeTab, setActiveTab] = useState("problems"); // problems, companies, quizzes, progress
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample companies data
  const companies = [
    { name: "Google", logo: "🔵", problems: 156, difficulty: "Hard" },
    { name: "Microsoft", logo: "🟦", problems: 142, difficulty: "Medium" },
    { name: "Amazon", logo: "🟧", problems: 198, difficulty: "Medium" },
    { name: "Meta", logo: "🔷", problems: 124, difficulty: "Hard" },
    { name: "Apple", logo: "🍎", problems: 89, difficulty: "Medium" },
    { name: "Netflix", logo: "🔴", problems: 67, difficulty: "Hard" },
    { name: "Adobe", logo: "🔺", problems: 78, difficulty: "Medium" },
    { name: "Uber", logo: "⚫", problems: 92, difficulty: "Medium" },
  ];

  // Sample quizzes data
  const quizzes = [
    {
      title: "Data Structures Fundamentals",
      questions: 25,
      duration: "30 min",
      difficulty: "Easy",
      topic: "DSA",
      completed: false,
    },
    {
      title: "Algorithm Design Patterns",
      questions: 30,
      duration: "45 min",
      difficulty: "Medium",
      topic: "Algorithms",
      completed: true,
    },
    {
      title: "System Design Basics",
      questions: 20,
      duration: "40 min",
      difficulty: "Hard",
      topic: "System Design",
      completed: false,
    },
    {
      title: "SQL & Database Queries",
      questions: 35,
      duration: "50 min",
      difficulty: "Medium",
      topic: "Database",
      completed: false,
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await showallProblem();
      setProblems(response.data.problem || []);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get unique topics
  const topics = ["All", ...new Set(problems.map((p) => p.topic))];

  // Filter problems
  const filteredProblems = problems.filter((item) => {
    const matchesSearch =
      item.problem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topic?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic =
      selectedTopic === "All" || item.topic === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === "All" || item.level === selectedDifficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  // Calculate stats
  const solvedCount = problems.filter((p) => p.status).length;
  const totalCount = problems.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  const toggleStatus = (id) => {
    setProblems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🎯 Placement Preparation Hub
          </h1>
          <p className="text-gray-600">
            Master coding problems, ace company interviews, and track your
            progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Problems
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalCount}</p>
              </div>
              <Code className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Solved</p>
                <p className="text-3xl font-bold text-gray-900">
                  {solvedCount}
                </p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Progress</p>
                <p className="text-3xl font-bold text-gray-900">
                  {progressPercentage}%
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Streak</p>
                <p className="text-3xl font-bold text-gray-900">7 🔥</p>
              </div>
              <Flame className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              { id: "problems", label: "Coding Problems", icon: Code },
              { id: "companies", label: "Top Companies", icon: Building2 },
              { id: "quizzes", label: "Quizzes", icon: Brain },
              { id: "progress", label: "My Progress", icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Problems Tab */}
        {activeTab === "problems" && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search problems or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Topic Filter */}
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>

                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Problems Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Problem
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Topic
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Difficulty
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProblems.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`border-b hover:bg-blue-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleStatus(item._id)}
                            className="focus:outline-none"
                          >
                            {item.status ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-300" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.problem}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {item.topic}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(item.level)}`}
                          >
                            {item.level}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                          >
                            <span>Solve</span>
                            <ExternalLink size={16} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No problems found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === "companies" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <div
                key={company.name}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{company.logo}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(company.difficulty)}`}
                  >
                    {company.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {company.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {company.problems} Problems
                </p>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium group-hover:shadow-lg transition-all">
                  <span>View Problems</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600">{quiz.topic}</p>
                  </div>
                  {quiz.completed && (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <BookOpen size={18} />
                    <span className="text-sm">{quiz.questions} Questions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={18} />
                    <span className="text-sm">{quiz.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(quiz.difficulty)}`}
                  >
                    {quiz.difficulty}
                  </span>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    {quiz.completed ? "Retake" : "Start Quiz"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Your Progress Overview
              </h3>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">
                    Overall Completion
                  </span>
                  <span className="text-gray-900 font-bold">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {
                      problems.filter((p) => p.level === "Easy" && p.status)
                        .length
                    }
                  </p>
                  <p className="text-gray-600">Easy Solved</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">
                    {
                      problems.filter((p) => p.level === "Medium" && p.status)
                        .length
                    }
                  </p>
                  <p className="text-gray-600">Medium Solved</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-3xl font-bold text-red-600">
                    {
                      problems.filter((p) => p.level === "Hard" && p.status)
                        .length
                    }
                  </p>
                  <p className="text-gray-600">Hard Solved</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {problems
                  .filter((p) => p.status)
                  .slice(0, 5)
                  .map((problem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-900">
                          {problem.problem}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.level)}`}
                      >
                        {problem.level}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacementPrep;
