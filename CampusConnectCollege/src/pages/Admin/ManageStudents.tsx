import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import type { Student } from "../../types";
import api from "../../api/api";
import AddStudentModal from "../../components/AddStudentModal";
import { useNavigate } from "react-router-dom";

const ManageStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const fetchStudents = async () => {
    const response = await api.get("auth/showalluser");
    console.log(response.data.users);
    setStudents(response.data.users);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="min-h-screen mt-20 ml-50 px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Students</h1>
          <p className="text-gray-600 mt-2">
            Total Students: {students.length}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            console.log("Add Student Modal Opened");
            setShowAddStudent(true);
          }}
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>
      {showAddStudent && (
        <AddStudentModal onClose={() => setShowAddStudent(false)} />
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
                  Roll No.
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Department
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
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td
                    className="px-6 py-4"
                    onClick={() => {
                      // navigate(`/students/${student.id}`);
                      navigate(`/students/123`)
                    }}
                  >
                    <p className="font-medium text-gray-900 cursor-pointer">
                      {student.username}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.class}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.department}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => {
                          navigate(`/students/editStudent/${student.id}`);
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
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
      {students.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No students found</p>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
