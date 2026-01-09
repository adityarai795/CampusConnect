import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageOrganization() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/organization/list");
      setOrganizations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await axios.delete(`/api/organization/${id}`);
        setOrganizations(organizations.filter((org) => org._id !== id));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to delete organization"
        );
      }
    }
  };

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-[70px] px-6 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Manage Organizations
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by organization name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchOrganizations}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 py-12">
            Loading organizations...
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            No organizations found
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Admin Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org) => (
                  <tr key={org._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800">
                      {org.organizationName}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {org.email}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {org.phone}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {org.city}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {org.adminName}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(org._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageOrganization;
