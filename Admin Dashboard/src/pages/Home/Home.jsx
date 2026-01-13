import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Home() {
  const authState = useSelector((state) => state.auth);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Monthly Activity",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgba(79, 70, 229, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen mt-[70px] px-6 py-10 bg-gray-50">
      {/* Welcome Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700">
          Welcome CampusConnect Admin page
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your coding problems with ease.
        </p>
      </div>

      {/* Chart Section */}
      <div className="max-w-4xl mx-auto mb-12 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Monthly Overview
        </h2>
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/showallProblems"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center border"
        >
          <h3 className="mt-4 text-xl font-semibold">Show All Problems</h3>
          <p className="text-gray-500 text-sm mt-2">
            View and manage all your coding problems.
          </p>
        </Link>

        <Link
          to="/addProblems"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center border"
        >
          <h3 className="mt-4 text-xl font-semibold">Add Coding Problem</h3>
          <p className="text-gray-500 text-sm mt-2">
            Add a new coding problem to your collection.
          </p>
        </Link>

        <Link
          to="/notfound"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center border"
        >
          <h3 className="mt-4 text-xl font-semibold">
            🔍 Top Skills in Demand
          </h3>
        </Link>

        <Link
          to="/notfound"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center border"
        >
          <h3 className="mt-4 text-xl font-semibold">Great Thoughts</h3>
        </Link>
      </div>
    </div>
  );
}

export default Home;
