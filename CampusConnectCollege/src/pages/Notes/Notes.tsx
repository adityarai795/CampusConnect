import { useState } from "react";
import { Search, Download } from "lucide-react";
import type { Note } from "../../types";

const Notes = () => {
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Arrays and Linked Lists",
      description:
        "Complete guide on array operations and linked list implementation",
      subject: "Data Structures",
      class: "3rd Year",
      section: "A",
      fileUrl: "/notes/arrays.pdf",
      fileType: "pdf",
      uploadedBy: "Prof. Anita Sharma",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Graph Theory Basics",
      description:
        "Introduction to graphs, traversal techniques, and applications",
      subject: "Algorithms",
      class: "3rd Year",
      section: "A",
      fileUrl: "/notes/graphs.pdf",
      fileType: "pdf",
      uploadedBy: "Prof. Anita Sharma",
      uploadedAt: "2024-01-14",
    },
    {
      id: "3",
      title: "Digital Electronics Fundamentals",
      description: "Logic gates, circuits, and digital logic design basics",
      subject: "Digital Electronics",
      class: "2nd Year",
      section: "B",
      fileUrl: "/notes/digital.ppt",
      fileType: "ppt",
      uploadedBy: "Dr. Vikram Patel",
      uploadedAt: "2024-01-13",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");

  const subjects = ["all", ...new Set(notes.map((n) => n.subject))];
  const classes = ["all", ...new Set(notes.map((n) => n.class))];

  const filteredNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSubject === "all" || note.subject === selectedSubject) &&
      (selectedClass === "all" || note.class === selectedClass)
  );

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Study Notes & Resources
        </h1>
        <p className="text-gray-600 mt-2">
          Browse and download study materials
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject === "all" ? "All Subjects" : subject}
            </option>
          ))}
        </select>

        {/* Class Filter */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls === "all" ? "All Classes" : cls}
            </option>
          ))}
        </select>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{note.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{note.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {note.subject}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                {note.class}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                {note.fileType.toUpperCase()}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 mb-4">
                By {note.uploadedBy} •{" "}
                {new Date(note.uploadedAt).toLocaleDateString()}
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No notes found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
