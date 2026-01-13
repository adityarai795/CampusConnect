import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import type { Teacher } from "../../types";
import api from "../../api/api";
import AddTeacherModal from "../../components/AddTeacherModal";
import { useNavigate } from "react-router-dom";

const ManageTeachers = () => {
  const navigator=useNavigate()
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [addTeacherModalOpen, setAddTeacherModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [department, setDepartment] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const fetchTeachers = async() => {
    // Placeholder for fetching teachers from an API
    const response = await api.get("/Teacher/all");
    console.log("This is response.data", response.data.data);
    setTeachers(response.data.data);
  };

  useEffect(() => {
    fetchTeachers();
  },[])

  return (
    <div className="min-h-screen mt-20 ml-50 px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Teachers</h1>
          <p className="text-gray-600 mt-2">
            Total Teachers: {teachers.length}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            setAddTeacherModalOpen(true);
          }}
        >
          <Plus className="w-5 h-5" />
          Add Teacher
        </button>
      </div>
      {addTeacherModalOpen && (
        <AddTeacherModal onClose={() => setAddTeacherModalOpen(false)} />
      )}
      {/* Search */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-62">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {/* Department Filter */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">
              Business Administration
            </option>
          </select>

          {/* Class Filter */}
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">All Classes</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          {/* Status */}
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <option value="">Status</option>
            <option value="1">Active</option>
            <option value="2">Retired</option>
            <option value="2">Leav</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Employee ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-sm text-gray-600">{teacher.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {teacher.employeeId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {teacher.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {teacher.designation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {teacher.experience}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        teacher.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => {
                          navigator(`/admin/editTeacher/${teacher.id}`);
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {teachers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No teachers found</p>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;
