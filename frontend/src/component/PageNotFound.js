import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="text-center max-w-lg">
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
          CollegeConnect
        </h1>

        {/* 404 */}
        <h2 className="text-6xl font-bold text-gray-900 mb-4">404</h2>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>

        {/* Extra Help */}
        <p className="text-sm text-gray-400 mt-6">
          Need help? Check your dashboard or explore available resources.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
