import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ResourceCard } from "./ResourceCard";
import { viewResource, showall } from "../../api/resource.js";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TopicBar from "./TopicBar";
export default function Notes() {
  const RESOURCE_TYPES = [
    "Show all",
    "Notes",
    "Question Paper",
    "Youtube",
    "Important Courses",
  ];

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Show all");
  const [subject, setSubject] = useState("");
  const [resources, setResources] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setInitialLoading(true);
      const res = await showall();
      setAllResources(res.data.message || []);
    } catch {
      toast.error("Failed to load resources");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSearch = async () => {
    if (!title.trim()) {
      toast.warning("Enter a search term");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: title.trim(),
        type: type === "Show all" ? "" : type,
        subject: subject.trim(),
      };

      const res = await viewResource(payload);
      setResources(res.data.message || []);
    } catch {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setType("Show all");
    setSubject("");
    setResources([]);
  };

  const display =
    resources.length > 0
      ? resources
      : type === "Show all"
      ? allResources
      : allResources.filter((r) => r.type === type);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <TopicBar />
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Study Resources
            </h1>
            <p className="text-gray-500 mt-1">
              Search notes, papers, courses and learning links
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Search by title or topic"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {RESOURCE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject (optional)"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Results */}
          {initialLoading ? (
            <div className="text-center py-20 text-gray-500">
              Loading resources...
            </div>
          ) : display.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border">
              <h3 className="font-semibold text-gray-700 mb-1">
                No resources found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your filters or keywords
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                <span>{display.length} results</span>
                <span>Showing: {type}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {display.map((item) => (
                  <ResourceCard key={item._id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
