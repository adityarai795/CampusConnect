import React from 'react';
import { Link } from 'react-router-dom';// optional: install lucide-react

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 px-4">
      <div className="text-7xl font-bold mb-4 text-blue-600">404</div>
      

      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
        Oops! Page not found
      </h1>

      <p className="mb-6 text-center text-gray-600 max-w-md">
        The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
      >
        ⬅ Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
