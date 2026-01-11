import { useState } from "react";
import { Plus, Edit, Trash2, Search, Download } from "lucide-react";
import type { Result } from "../../types";

const ManageResults = () => {
  const [results, setResults] = useState<Result[]>([
    {
      id: "1",
      studentId: "1",
      studentName: "Aarav Singh",
      rollNumber: "CSE001",
      class: "3rd Year",
      section: "A",
      examType: "midterm",
      subjects: [
        {
          subject: "Data Structures",
          maxMarks: 100,
          obtainedMarks: 85,
          grade: "A",
        },
        { subject: "Algorithms", maxMarks: 100, obtainedMarks: 78, grade: "A" },
        { subject: "Web Dev", maxMarks: 100, obtainedMarks: 88, grade: "A" },
      ],
      totalMarks: 300,
      obtainedMarks: 251,
      percentage: 83.67,
      grade: "A",
      rank: 3,
      remarks: "Good performance",
      publishedAt: "2024-01-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = results.filter(
    (result) =>
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setResults(results.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Results</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage student results
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          Upload Results
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-6">
        {filteredResults.map((result) => (
          <div key={result.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {result.studentName}
                </h3>
                <p className="text-gray-600 mt-1">
                  Roll No: {result.rollNumber} | {result.class} {result.section}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">
                  {result.percentage.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Grade:{" "}
                  <span className="font-bold text-green-600">
                    {result.grade}
                  </span>
                </p>
              </div>
            </div>

            {/* Subject Results */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Subject Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.subjects.map((sub, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900">{sub.subject}</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Max: {sub.maxMarks}</p>
                      <p className="font-bold text-indigo-600">
                        Obtained: {sub.obtainedMarks}
                      </p>
                      <p>
                        Grade:{" "}
                        <span className="font-bold text-green-600">
                          {sub.grade}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(result.id)}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResults.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No results found</p>
        </div>
      )}
    </div>
  );
};

export default ManageResults;
