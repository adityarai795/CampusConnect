import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";

function Result() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch all results on mount
  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        setInitialLoading(true);
        const response = await API.get("/result/showall");
        console.log("All results response:", response.data.showall);
        setAllResults(response.data.showall || []);
      } catch (error) {
        console.error("Error fetching all results:", error);
        toast.error("Failed to load results");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAllResults();
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await API.get(
          `/result/searchResultQuery?university=${encodeURIComponent(query)}`
        );
        setSearchResults(response.data.results || []);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
        toast.error("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // Handle result click
  const handleResultClick = (link) => {
    if (!link) {
      toast.error("No result link available");
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Handle input blur
  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  // Clear search
  const handleClear = () => {
    setQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto mt-20">
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                University Result Portal
              </h1>
              <p className="text-gray-600">
                Search and access university results instantly
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by university name (e.g., DDU, Delhi University)..."
                  className="w-full px-4 py-3 pr-20 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query && setShowDropdown(true)}
                  onBlur={handleBlur}
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {query && (
                    <button
                      onClick={handleClear}
                      className="text-gray-400 hover:text-gray-600 transition"
                      aria-label="Clear search"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Search Dropdown */}
              {showDropdown && (
                <div className="absolute w-full mt-2 border-2 border-gray-200 rounded-lg bg-white shadow-xl max-h-80 overflow-y-auto z-10">
                  {loading && (
                    <div className="p-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <p className="text-gray-500 mt-2">Searching...</p>
                    </div>
                  )}

                  {!loading && searchResults.length === 0 && query && (
                    <div className="p-6 text-center">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-300 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-red-500 font-medium">
                        No results found
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Try a different university name
                      </p>
                    </div>
                  )}

                  {!loading && searchResults.length > 0 && (
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => handleResultClick(item.link)}
                          className="p-4 cursor-pointer hover:bg-blue-50 transition group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                                {item.University}
                              </p>
                              <p className="text-sm text-gray-500 mt-1 truncate">
                                {item.link}
                              </p>
                            </div>
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition flex-shrink-0 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* All Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                All University Results
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {allResults.length} Universities
              </span>
            </div>

            {initialLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-500 mt-4">Loading results...</p>
              </div>
            ) : allResults.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-20 h-20 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-gray-500 font-medium">
                  No results available
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allResults.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleResultClick(item.link)}
                    className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:shadow-lg transition group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">
                        {item.University}
                      </h3>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-sm text-gray-500 truncate mb-2"
                      title={item.link}
                    >
                      {item.link}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Click to view results</span>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-blue-500 text-3xl font-bold mb-2">
                  {allResults.length}+
                </div>
                <p className="text-gray-600 text-sm">Universities Available</p>
              </div>
              <div className="p-4">
                <div className="text-indigo-500 text-3xl font-bold mb-2">
                  24/7
                </div>
                <p className="text-gray-600 text-sm">Always Accessible</p>
              </div>
              <div className="p-4">
                <div className="text-purple-500 text-3xl font-bold mb-2">
                  Instant
                </div>
                <p className="text-gray-600 text-sm">Real-time Results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
