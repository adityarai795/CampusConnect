import React, { useState, useEffect } from "react";

function QuotesSlider() {
  const quotes = [
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill ",
    },
    {
      quote: "Opportunities don't happen. You create them.",
      author: "Chris Grosser",
    },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      quote:
        "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12 flex items-center justify-center gap-3">
          <span className="text-4xl">✨</span>
          Words of Wisdom
          <span className="text-4xl">💡</span>
        </h2>

        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-10 bg-white text-purple-600 hover:bg-purple-600 hover:text-white w-12 h-12 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="w-full max-w-3xl px-4 md:px-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-500 hover:scale-105">
              <svg
                className="w-12 h-12 text-purple-300 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl italic text-gray-700 mb-6 leading-relaxed">
                "{quotes[currentIndex].quote}"
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {quotes[currentIndex].author}
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "bg-purple-600 w-8"
                      : "bg-purple-300 hover:bg-purple-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-10 bg-white text-purple-600 hover:bg-purple-600 hover:text-white w-12 h-12 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
export default QuotesSlider;
