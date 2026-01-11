import { useState } from "react";
import { Users, BookOpen, BarChart3, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    myClasses: 4,
    myStudents: 120,
    notesUploaded: 28,
    resultsPublished: 5,
  });

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ComponentType<{ className: string }>;
    label: string;
    value: number;
    color: string;
  }) => (
    <div className={`${color} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-12 h-12 opacity-50" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Manage your classes and students.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={Users}
          label="My Classes"
          value={stats.myClasses}
          color="bg-blue-600"
        />
        <StatCard
          icon={BarChart3}
          label="My Students"
          value={stats.myStudents}
          color="bg-green-600"
        />
        <StatCard
          icon={BookOpen}
          label="Notes Uploaded"
          value={stats.notesUploaded}
          color="bg-purple-600"
        />
        <StatCard
          icon={Award}
          label="Results Published"
          value={stats.resultsPublished}
          color="bg-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">My Classes</h2>
          <div className="space-y-4">
            {[
              { name: "Data Structures - 3rd Year A", students: 45 },
              { name: "Algorithms - 3rd Year A", students: 45 },
              { name: "Web Development - 2nd Year B", students: 38 },
              { name: "Database Systems - 4th Year A", students: 32 },
            ].map((cls, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {cls.students} students enrolled
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
          <div className="space-y-3">
            <a
              href="/teacher/notes"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition border border-blue-200"
            >
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900">Upload Notes</h4>
              <p className="text-xs text-gray-600">28 notes uploaded</p>
            </a>
            <a
              href="/teacher/results"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition border border-green-200"
            >
              <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-semibold text-gray-900">Upload Results</h4>
              <p className="text-xs text-gray-600">Manage student grades</p>
            </a>
            <a
              href="/notes"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition border border-purple-200"
            >
              <Award className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-semibold text-gray-900">View All Notes</h4>
              <p className="text-xs text-gray-600">College wide resources</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
