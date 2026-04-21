import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizByTopic } from "../../api/practice";

function OpenQuize() {
  const { topic } = useParams();

  const [quizData, setQuizData] = useState([]);
  const [selectedCount, setSelectedCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copyCount, setCopyCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // 🔥 Fetch data
  const fetchData = async () => {
    try {
      const response = await getQuizByTopic(topic);
      setQuizData(response?.quizQuestions || []);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [topic]);

  // 🔥 Update questions when data changes
  useEffect(() => {
    setQuestions(quizData.slice(0, selectedCount));
  }, [quizData, selectedCount]);

  // 🔥 Timer
  useEffect(() => {
    if (submitted) return;

    if (timeLeft === 0) {
      alert("⏰ Time's up! Auto submitting...");
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // 🔥 Answer select
  const handleAnswer = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  // 🔥 Score calculation
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      const selected = answers[index];
      if (selected !== undefined && q.options[selected].isCorrect) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = calculateScore();

  // 🔥 Copy protection
  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      const count = copyCount + 1;
      setCopyCount(count);

      if (count >= 3) {
        alert("🚫 Too many copy attempts! Auto submitting...");
        handleSubmit();
      } else {
        alert(`Copy not allowed (${count}/3)`);
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [copyCount]);

  // 🔥 Disable right click
  useEffect(() => {
    const disable = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disable);
    return () => document.removeEventListener("contextmenu", disable);
  }, []);

  // 🔥 RESULT POPUP
  if (submitted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            🎉 Quiz Submitted!
          </h1>

          <p className="text-xl font-semibold text-gray-800 mb-2">
            Your Score: {score} / {questions.length}
          </p>

          <p className="text-gray-600 mb-6">
            📩 Your result has been sent to your email and is also available inw
            your profile.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Go Back
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ← Back
        </button>
      </div>
      {/* Select Questions */}
      <div className="mb-4">
        <select
          value={selectedCount}
          onChange={(e) => setSelectedCount(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={5}>5 Questions</option>
          <option value={10}>10 Questions</option>
        </select>

        <span className="ml-4 text-sm text-gray-500">
          (Copy disabled, auto submit after 3 attempts)
        </span>
      </div>

      {/* Timer */}
      <div className="mb-6 text-right text-sm text-gray-500">
        Time Remaining:
        <span
          className={`font-mono ml-2 ${timeLeft < 60 ? "text-red-600 font-bold" : ""}`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Questions */}
      {questions?.length > 0 ? (
        questions.map((q, index) => (
          <div key={q._id || index} className="mb-4 border p-4 rounded">
            <h2 className="font-semibold mb-2">
              {index + 1}. {q.question}
            </h2>

            {q.options.map((opt, i) => (
              <label key={opt._id || i} className="block mb-1">
                <input
                  type="radio"
                  name={`q-${index}`}
                  checked={answers[index] === i}
                  onChange={() => handleAnswer(index, i)}
                />
                <span className="ml-2">{opt.text}</span>
              </label>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading questions...</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default OpenQuize;
