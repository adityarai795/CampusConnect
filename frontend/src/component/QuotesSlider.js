import React, { useState } from "react";

const quotes = [
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    quote:
      "Your time is limited, so don’t waste it living someone else’s life.",
    author: "Steve Jobs",
  },
];

const QuotesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        🌟 Great Thoughts
      </h2>

      <div className="relative flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-4 text-blue-600 hover:text-blue-800 text-2xl font-bold"
        >
          ⬅️
        </button>

        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transition duration-500 ease-in-out">
            <p className="text-lg italic text-gray-700 mb-4">
              “{quotes[currentIndex].quote}”
            </p>
            <p className="text-sm font-semibold text-blue-600 text-right">
              — {quotes[currentIndex].author}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 text-blue-600 hover:text-blue-800 text-2xl font-bold"
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default QuotesSlider;
