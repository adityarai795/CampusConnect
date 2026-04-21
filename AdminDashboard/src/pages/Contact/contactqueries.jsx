import React, { useMemo, useState } from "react";

function ContactQueries() {
  // 🔹 Dummy data (replace with API later)
  const [queries, setQueries] = useState([
    {
      id: "Q001",
      name: "Aditya Rai",
      email: "aditya@gmail.com",
      subject: "Issue with Login",
      message: "I am unable to login to my account.",
      status: "Pending",
      date: "2026-04-17",
    },
    {
      id: "Q002",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      subject: "Feature Request",
      message: "Please add dark mode.",
      status: "Resolved",
      date: "2026-04-16",
    },
    {
      id: "Q003",
      name: "Priya Singh",
      email: "priya@gmail.com",
      subject: "Bug Report",
      message: "Quiz not submitting properly.",
      status: "Pending",
      date: "2026-04-15",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // 🔍 Filter + search
  const filteredQueries = useMemo(() => {
    return queries.filter((q) => {
      const matchesSearch =
        q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.email.toLowerCase().includes(search.toLowerCase()) ||
        q.subject.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = filterStatus === "All" || q.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [queries, search, filterStatus]);

  // 🔄 Mark as resolved
  const markResolved = (id) => {
    setQueries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Resolved" } : q)),
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📩 Contact Queries (Admin)
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email, subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-lg"
        />

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredQueries.length > 0 ? (
              filteredQueries.map((q) => (
                <tr key={q.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{q.name}</p>
                    <p className="text-xs text-gray-500">{q.email}</p>
                  </td>

                  <td className="px-4 py-3">{q.subject}</td>

                  <td className="px-4 py-3 max-w-xs truncate">{q.message}</td>

                  <td className="px-4 py-3">{q.date}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        q.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {q.status === "Pending" && (
                      <button
                        onClick={() => markResolved(q.id)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No queries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactQueries;
  