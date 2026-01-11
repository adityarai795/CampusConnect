import { useState } from "react";
import { Search, Download } from "lucide-react";
import type { Result } from "../../types";

const Results = () => {
  const [results] = useState<Result[]>([
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
    {
      id: "2",
      studentId: "2",
      studentName: "Priya Sharma",
      rollNumber: "CSE002",
      class: "3rd Year",
      section: "A",
      examType: "midterm",
      subjects: [
        {
          subject: "Data Structures",
          maxMarks: 100,
          obtainedMarks: 92,
          grade: "A+",
        },
        { subject: "Algorithms", maxMarks: 100, obtainedMarks: 89, grade: "A" },
        { subject: "Web Dev", maxMarks: 100, obtainedMarks: 94, grade: "A+" },
      ],
      totalMarks: 300,
      obtainedMarks: 275,
      percentage: 91.67,
      grade: "A+",
      rank: 1,
      remarks: "Excellent performance",
      publishedAt: "2024-01-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("all");

  const examTypes = ["all", ...new Set(results.map((r) => r.examType))];

  const filteredResults = results.filter(
    (result) =>
      (result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedExam === "all" || result.examType === selectedExam)
  );

  const getGradeColor = (grade: string) => {
    if (grade.includes("A+")) return "text-green-600";
    if (grade.includes("A")) return "text-green-600";
    if (grade.includes("B")) return "text-blue-600";
    if (grade.includes("C")) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Results & Performance
        </h1>
        <p className="text-gray-600 mt-2">
          View student exam results and performance analytics
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Search */}
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

        {/* Exam Type Filter */}
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {examTypes.map((exam) => (
            <option key={exam} value={exam}>
              {exam === "all"
                ? "All Exam Types"
                : exam.replace("-", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {filteredResults.map((result) => (
          <div key={result.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {result.studentName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Roll: {result.rollNumber}
                </p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">
                  {result.percentage.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Overall Score</p>
              </div>

              <div className="text-center">
                <p
                  className={`text-3xl font-bold ${getGradeColor(
                    result.grade
                  )}`}
                >
                  {result.grade}
                </p>
                <p className="text-sm text-gray-600 mt-1">Grade</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  #{result.rank}
                </p>
                <p className="text-sm text-gray-600 mt-1">Rank</p>
              </div>
            </div>

            {/* Subjects */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Subject Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.subjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg"
                  >
                    <p className="font-semibold text-gray-900">{sub.subject}</p>
                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-gray-600">Max Marks: {sub.maxMarks}</p>
                      <p className="font-bold text-indigo-600">
                        Obtained: {sub.obtainedMarks}
                      </p>
                      <p
                        className={`font-semibold ${getGradeColor(sub.grade)}`}
                      >
                        Grade: {sub.grade}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              {result.remarks && (
                <div className="flex-1 bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Remarks</p>
                  <p className="text-sm font-medium text-green-700">
                    {result.remarks}
                  </p>
                </div>
              )}
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

export default Results;
