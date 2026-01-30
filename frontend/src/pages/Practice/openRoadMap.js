import { useState } from "react";
import {
  BookOpen,
  Layers,
  Tag,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Circle,
  Trophy,
  Target,
  Sparkles,
  Clock,
  Award,
} from "lucide-react";

const staticRoadmaps = [
  {
    _id: "frontend",
    title: "Frontend Development Roadmap",
    description:
      "Learn how to build beautiful and responsive websites using modern frontend technologies.",
    category: "Frontend",
    level: "Beginner",
    tags: ["HTML", "CSS", "JavaScript", "React", "UI"],
    estimatedTime: "3-6 months",
    steps: [
      {
        _id: "f1",
        order: 1,
        title: "HTML Basics",
        description: "Learn the structure of web pages using semantic HTML.",
        duration: "2 weeks",
        difficulty: "Easy",
        resources: [
          {
            type: "Article",
            title: "MDN HTML Guide",
            link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          },
          {
            type: "Video",
            title: "HTML Crash Course",
            link: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          },
        ],
        usefulLinks: [
          {
            title: "HTML Cheat Sheet",
            link: "https://htmlcheatsheet.com/",
          },
        ],
      },
      {
        _id: "f2",
        order: 2,
        title: "CSS Fundamentals",
        description:
          "Style your websites using Flexbox, Grid, and responsive layouts.",
        duration: "3 weeks",
        difficulty: "Medium",
        resources: [
          {
            type: "Docs",
            title: "MDN CSS Docs",
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          },
          {
            type: "Practice",
            title: "Flexbox Froggy",
            link: "https://flexboxfroggy.com/",
          },
        ],
      },
      {
        _id: "f3",
        order: 3,
        title: "JavaScript Essentials",
        description: "Master the fundamentals of JavaScript programming.",
        duration: "4 weeks",
        difficulty: "Medium",
        resources: [
          {
            type: "Article",
            title: "JavaScript.info",
            link: "https://javascript.info/",
          },
        ],
      },
    ],
  },
];

export default function OpenRoadMap() {
  const [roadmap] = useState(staticRoadmaps[0]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedStep, setExpandedStep] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps((prev) => {
      const newCompleted = prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId];

      if (
        newCompleted.length === roadmap.steps.length &&
        prev.length !== roadmap.steps.length
      ) {
        setShowCelebration(true);
      }
      return newCompleted;
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-100 text-green-700 border-green-200",
      Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Hard: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getResourceIcon = (type) => {
    const icons = {
      Article: "📄",
      Video: "🎥",
      Docs: "📚",
      Practice: "💻",
      Course: "🎓",
    };
    return icons[type] || "🔗";
  };

  const progress = (completedSteps.length / roadmap.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border border-indigo-100"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Roadmaps</span>
        </button>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 p-8 sm:p-10 shadow-2xl border border-white/50">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-indigo-600 text-white shadow-lg">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">
                Your Learning Journey
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {roadmap.title}
            </h1>

            <p className="text-lg text-gray-700 mb-6 max-w-2xl">
              {roadmap.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-md border border-indigo-100">
                <Layers size={16} className="text-indigo-600" />
                <span className="font-semibold text-indigo-700">
                  {roadmap.category}
                </span>
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-md border border-pink-100">
                <Target size={16} className="text-pink-600" />
                <span className="font-semibold text-pink-700">
                  {roadmap.level}
                </span>
              </span>
              {roadmap.estimatedTime && (
                <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-md border border-purple-100">
                  <Clock size={16} className="text-purple-600" />
                  <span className="font-semibold text-purple-700">
                    {roadmap.estimatedTime}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {roadmap.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 text-sm font-medium border border-gray-200 shadow-sm"
                >
                  <Tag size={12} className="text-gray-600" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-inner border border-white/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-600" />
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-indigo-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 text-center">
                {completedSteps.length} of {roadmap.steps.length} steps
                completed
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-indigo-600" size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learning Path
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 rounded-full" />

            {roadmap.steps
              .sort((a, b) => a.order - b.order)
              .map((step, index) => {
                const isCompleted = completedSteps.includes(step._id);
                const isExpanded = expandedStep === step._id;

                return (
                  <div
                    key={step._id}
                    className="mb-8 relative pl-16"
                    style={{
                      animation: `fadeInLeft 0.6s ease-out ${0.1 * index}s both`,
                    }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-4 top-6 h-5 w-5 rounded-full border-4 border-white shadow-lg cursor-pointer transition-all hover:scale-125 ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-400 to-emerald-500"
                          : "bg-gradient-to-br from-gray-300 to-gray-400"
                      }`}
                      onClick={() => toggleStepCompletion(step._id)}
                    />

                    {/* Step Card */}
                    <div
                      className={`rounded-2xl bg-white p-6 shadow-xl border-2 transition-all hover:scale-[1.02] hover:-translate-y-1 ${
                        isCompleted
                          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
                          : "border-indigo-100"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white shadow-lg">
                              {step.order}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleStepCompletion(step._id)}
                          className={`ml-4 flex-shrink-0 transition-all hover:scale-110 active:scale-90 ${
                            isCompleted ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={28} fill="currentColor" />
                          ) : (
                            <Circle size={28} />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {step.duration && (
                          <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium border border-indigo-200">
                            ⏱️ {step.duration}
                          </span>
                        )}
                        {step.difficulty && (
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium border ${getDifficultyColor(step.difficulty)}`}
                          >
                            {step.difficulty}
                          </span>
                        )}
                      </div>

                      {/* Resources Section */}
                      {step.resources?.length > 0 && (
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              setExpandedStep(isExpanded ? null : step._id)
                            }
                            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 mb-3 transition-colors"
                          >
                            <BookOpen size={16} />
                            Resources ({step.resources.length})
                            <span
                              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            >
                              ▼
                            </span>
                          </button>

                          {isExpanded && (
                            <div className="space-y-2">
                              {step.resources.map((res, i) => (
                                <a
                                  key={i}
                                  href={res.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between rounded-xl bg-gradient-to-r from-gray-50 to-white px-4 py-3 transition-all hover:shadow-md hover:scale-[1.02] border border-gray-200 group"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-lg">
                                      {getResourceIcon(res.type)}
                                    </span>
                                    <span className="font-medium text-gray-800">
                                      {res.title}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                      {res.type}
                                    </span>
                                  </span>
                                  <ExternalLink
                                    size={16}
                                    className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                                  />
                                </a>
                              ))}

                              {step.usefulLinks?.length > 0 && (
                                <div className="pt-2 mt-2 border-t border-gray-200">
                                  <p className="text-xs font-semibold text-gray-500 mb-2">
                                    🔗 Additional Links
                                  </p>
                                  {step.usefulLinks.map((link, i) => (
                                    <a
                                      key={i}
                                      href={link.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm transition-all hover:bg-indigo-50 hover:scale-[1.02] border border-gray-100 group mb-1"
                                    >
                                      {link.title}
                                      <ExternalLink
                                        size={14}
                                        className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                                      />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Completion Celebration */}
        {showCelebration && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
            onClick={() => setShowCelebration(false)}
          >
            <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl animate-bounce-in">
              <div className="text-6xl mb-4 animate-wiggle">🎉</div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Congratulations!
              </h3>
              <p className="text-gray-600 mb-6">
                You've completed the entire roadmap! Keep up the great work! 🚀
              </p>
              <button
                onClick={() => {
                  setShowCelebration(false);
                  setCompletedSteps([]);
                }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Start Again
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out 3;
        }
      `}</style>
    </div>
  );
}
