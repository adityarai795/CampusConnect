import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Hero() {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "500+", label: "Universities" },
    { number: "10K+", label: "Resources" },
    { number: "5K+", label: "Job Listings" },
  ];

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Study Resources",
      description: "Access notes, papers, and courses",
      color: "from-blue-500 to-cyan-500",
      link: "/notes",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Job Portal",
      description: "Find internships and placements",
      color: "from-purple-500 to-pink-500",
      link: "/jobs",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Community",
      description: "Connect with fellow students",
      color: "from-green-500 to-emerald-500",
      link: "/community",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      title: "Results Portal",
      description: "Check university results instantly",
      color: "from-orange-500 to-red-500",
      link: "/result",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (link) => {
    console.log(`Navigating to: ${link}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Desktop Hero Section */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
          <div className="flex items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="inline-block animate-bounce">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    🎓 India's #1 Campus Platform
                  </span>
                </div>
                <h1 className="text-6xl font-extrabold leading-tight animate-fade-in">
                  One Stop Solution for{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Students
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect, Learn, and Grow with CampusConnect – Your ultimate
                  companion for academic success, career opportunities, and
                  community building.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/result">
                  <button
                    onClick={() => handleNavigation("/result")}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <span>Explore Results</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </Link>
                <Link to="/community">
                  <button
                    onClick={() => handleNavigation("/community")}
                    className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold border-2 border-blue-600 shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                  >
                    Join Community
                  </button>
                </Link>
                <Link to="/jobs">
                  <button
                    onClick={() => handleNavigation("/jobs")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Browse Jobs
                  </button>
                </Link>
              </div>

              {/* Animated Stats */}
              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      currentStat === index
                        ? "scale-110 opacity-100"
                        : "scale-100 opacity-60"
                    }`}
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex-1 relative">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white rounded-2xl p-8 h-96 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <svg
                          className="w-32 h-32 mx-auto text-blue-600 animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Your Campus Hub
                      </h3>
                      <p className="text-gray-600">
                        Everything you need in one place
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div
                  className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl p-4"
                  style={{ animation: "float 3s ease-in-out infinite" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">50K+</div>
                      <div className="text-xs text-gray-500">Active Users</div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -left-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-4 text-white"
                  style={{ animation: "float 3s ease-in-out infinite 1.5s" }}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div>
                      <div className="font-bold">Fast & Easy</div>
                      <div className="text-xs opacity-90">Quick Access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero Section */}
      <div className="md:hidden px-4 pt-24 pb-16">
        <div className="text-center space-y-6">
          <div className="inline-block animate-bounce">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
              🎓 India's #1 Campus Platform
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight">
            One Stop Solution for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Students
            </span>
          </h1>

          <p className="text-gray-600 text-lg px-2">
            Connect, Learn, and Grow with CampusConnect – Your ultimate campus
            companion.
          </p>

          {/* Mobile Stats */}
          <div className="grid grid-cols-2 gap-4 py-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mobile CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleNavigation("/result")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold shadow-xl active:scale-95 transition-transform"
            >
              Explore University Results
            </button>
            <button
              onClick={() => handleNavigation("/community")}
              className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold border-2 border-blue-600 shadow-lg active:scale-95 transition-transform"
            >
              Join Community
            </button>
            <button
              onClick={() => handleNavigation("/jobs")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold shadow-xl active:scale-95 transition-transform"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our powerful features designed for student success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(feature.link)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-2 cursor-pointer"
            >
              <div
                className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              <div className="mt-4 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm">Learn more</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center transform hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-green-600">10K+</div>
              <div className="text-gray-600">Resources</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-orange-600">5K+</div>
              <div className="text-gray-600">Job Listings</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Hero;
