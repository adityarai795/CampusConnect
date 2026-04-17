import { useState, useEffect } from "react";
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
import { fetchRoadMapByField } from "../../api/roadMap.js";
import { useParams } from "react-router-dom";

export default function OpenRoadMap() {
  const [roadmap, setRoadmap] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedStep, setExpandedStep] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const { id } = useParams();

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetchRoadMapByField(id);
      setRoadmap(response.data);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading State
  if (!roadmap) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  // Progress Calculation
  const progress =
    roadmap.steps?.length > 0
      ? (completedSteps.length / roadmap.steps.length) * 100
      : 0;

  // Toggle Step Completion
  const toggleStepCompletion = (stepId) => {
    setCompletedSteps((prev) => {
      const newCompleted = prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId];

      if (
        roadmap.steps &&
        newCompleted.length === roadmap.steps.length &&
        prev.length !== roadmap.steps.length
      ) {
        setShowCelebration(true);
      }

      return newCompleted;
    });
  };

  // Resource Icon
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow hover:shadow-md border"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Hero Section */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border">
          {/* Thumbnail */}
          {roadmap.thumbnail && (
            <img
              src={roadmap.thumbnail}
              alt={roadmap.title}
              className="w-full h-56 object-cover rounded-xl mb-6"
            />
          )}

          <h1 className="text-3xl font-bold mb-3">{roadmap.title}</h1>

          <p className="text-gray-600 mb-4">{roadmap.description}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
              <Layers size={14} />
              {roadmap.category}
            </span>

            <span className="flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
              <Target size={14} />
              {roadmap.level}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {roadmap.tags?.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {completedSteps.length} / {roadmap.steps.length} completed
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award /> Learning Path
          </h2>

          {roadmap.steps
            ?.slice()
            .sort((a, b) => a.order - b.order)
            .map((step) => {
              const isCompleted = completedSteps.includes(step._id);
              const isExpanded = expandedStep === step._id;

              return (
                <div
                  key={step._id}
                  className={`bg-white p-6 rounded-xl shadow border ${
                    isCompleted ? "border-green-300 bg-green-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {step.order}. {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>

                    <button onClick={() => toggleStepCompletion(step._id)}>
                      {isCompleted ? (
                        <CheckCircle className="text-green-600" />
                      ) : (
                        <Circle />
                      )}
                    </button>
                  </div>

                  {/* Resources */}
                  {step.resources?.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          setExpandedStep(isExpanded ? null : step._id)
                        }
                        className="text-indigo-600 text-sm flex items-center gap-1"
                      >
                        <BookOpen size={14} />
                        Resources ({step.resources.length})
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-2">
                          {step.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex justify-between items-center bg-gray-50 p-3 rounded border hover:bg-gray-100"
                            >
                              <span className="flex items-center gap-2">
                                {getResourceIcon(res.type)}
                                {res.title}
                              </span>
                              <ExternalLink size={14} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Celebration */}
        {showCelebration && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            onClick={() => setShowCelebration(false)}
          >
            <div className="bg-white p-8 rounded-xl text-center shadow-lg">
              <h3 className="text-2xl font-bold mb-2">🎉 Completed!</h3>
              <p className="text-gray-600 mb-4">You finished the roadmap 🚀</p>
              <button
                onClick={() => {
                  setShowCelebration(false);
                  setCompletedSteps([]);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
