import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  studentsCount: number;
  teachersCount: number;
}

const ManageDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Computer Science",
      code: "CS",
      head: "Prof. Anita Sharma",
      studentsCount: 250,
      teachersCount: 12,
    },
    {
      id: "2",
      name: "Electronics & Communication",
      code: "ECE",
      head: "Dr. Vikram Patel",
      studentsCount: 200,
      teachersCount: 10,
    },
    {
      id: "3",
      name: "Mechanical Engineering",
      code: "ME",
      head: "Prof. Rajesh Gupta",
      studentsCount: 220,
      teachersCount: 11,
    },
  ]);

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Departments
          </h1>
          <p className="text-gray-600 mt-2">
            Total Departments: {departments.length}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Department
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Code: {dept.code}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Head:</span> {dept.head}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {dept.studentsCount}
                  </p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {dept.teachersCount}
                  </p>
                  <p className="text-xs text-gray-600">Teachers</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDepartments;
