import React, { useEffect } from "react";
import API from "../../api/api";

function ManageCollege() {
  const [colleges, setColleges] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get("/organization/all");
      setColleges(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Colleges</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">S.No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((college, index) => (
              <tr key={college._id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{college.name}</td>
                <td className="p-2 border">{college.orgType}</td>
                <td className="p-2 border">{college.email}</td>
                <td className="p-2 border">{college.mobileno}</td>
                <td className="p-2 border">
                  {college.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-2 border">
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {colleges.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No colleges available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCollege;
