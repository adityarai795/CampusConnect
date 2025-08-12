import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  const authState = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen mt-[70px] px-6 py-10 bg-gray-50">
      {/* Welcome Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700">
          Welcome {authState?.user?.name || 'Guest'} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your coding problems with ease.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Show All Problems */}
        <Link
          to="/showallProblems"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-200"
        >
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Show All Problems
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            View and manage all your coding problems.
          </p>
        </Link>

        {/* Add Problem */}
        <Link
          to="/addProblems"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-200"
        >
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Add Coding Problem
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Add a new coding problem to your collection.
          </p>
        </Link>

        <Link
          to="/notfound"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-200"
        >
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            🔍 Top Skills in Demand
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            View and manage all your coding problems.
          </p>
        </Link>

        <Link
          to="/notfound"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-200"
        >
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
             Great Thoughts
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            View and manage all your coding problems.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
