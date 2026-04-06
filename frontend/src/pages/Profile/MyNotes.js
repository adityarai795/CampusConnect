import React, { useEffect, useState } from "react";
import { FileText, Download, Calendar, BookOpen } from "lucide-react";
// import { myUsedNotes } from "../../api/notes"; // your api

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      // const res = await myUsedNotes();
      // setNotes(res.data.notes || []);

      // temp demo data
      setNotes([
        {
          _id: "1",
          title: "DBMS Notes",
          type: "PDF",
          subject: "Database",
          downloadedAt: new Date(),
        },
        {
          _id: "2",
          title: "React Interview Notes",
          type: "DOC",
          subject: "React",
          downloadedAt: new Date(),
        },
      ]);
    } catch (err) {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return "bg-red-100 text-red-600";
      case "doc":
        return "bg-blue-100 text-blue-600";
      case "ppt":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading your notes...
      </div>
    );
  }

  // Error
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  // Empty
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <BookOpen size={50} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold">No Notes Used Yet</h2>
        <p className="text-gray-500">You haven’t accessed any notes.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Notes</h2>
        <span className="text-sm text-gray-500">{notes.length} notes used</span>
      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white border shadow-sm rounded-xl p-5 hover:shadow-md transition duration-300"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>

            {/* Subject */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <FileText size={16} />
              {note.subject || "General"}
            </div>

            {/* Downloaded Date */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <Calendar size={16} />
              {note.downloadedAt
                ? new Date(note.downloadedAt).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeColor(
                  note.type,
                )}`}
              >
                {note.type}
              </span>

              <Download
                size={18}
                className="text-gray-400 hover:text-black cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyNotes;
