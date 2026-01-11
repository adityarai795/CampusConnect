import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import type { Student } from "../../types";
import api from "../../api/api";

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Aarav Singh",
      email: "aarav@college.com",
      rollNumber: "CSE001",
      class: "3rd Year",
      section: "A",
      department: "Computer Science",
      phone: "9876543210",
      address: "New Delhi",
      guardianName: "Rajesh Singh",
      guardianPhone: "9876543200",
      dateOfBirth: "2003-05-15",
      admissionDate: "2021-07-01",
      status: "active",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@college.com",
      rollNumber: "CSE002",
      class: "3rd Year",
      section: "A",
      department: "Computer Science",
      phone: "9876543211",
      address: "Mumbai",
      guardianName: "Amit Sharma",
      guardianPhone: "9876543201",
      dateOfBirth: "2003-08-22",
      admissionDate: "2021-07-01",
      status: "active",
    },
  ]);



  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const fetchStudents = async () => {
    const response = await api.get("/students");
    console.log(response.data);
  }
  useEffect(()=>{
    fetchStudents();
  },[]) 
  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Students</h1>
          <p className="text-gray-600 mt-2">
            Total Students: {students.length}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
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
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{student.name}</p>
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
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
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
      {filteredStudents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No students found</p>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
