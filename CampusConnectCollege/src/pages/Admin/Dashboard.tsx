import { useState } from "react";
import { Users, BookOpen, BarChart3, Calendar, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [stats] = useState({
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 45,
    totalDepartments: 8,
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
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's your college overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={Users}
          label="Total Students"
          value={stats.totalStudents}
          color="bg-blue-600"
        />
        <StatCard
          icon={BookOpen}
          label="Total Teachers"
          value={stats.totalTeachers}
          color="bg-green-600"
        />
        <StatCard
          icon={BarChart3}
          label="Total Classes"
          value={stats.totalClasses}
          color="bg-purple-600"
        />
        <StatCard
          icon={Calendar}
          label="Departments"
          value={stats.totalDepartments}
          color="bg-orange-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/students"
              className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition border border-blue-200"
            >
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Students</h3>
              <p className="text-sm text-gray-600">
                Add, edit, or remove students
              </p>
            </a>
            <a
              href="/admin/teachers"
              className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition border border-green-200"
            >
              <BookOpen className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Teachers</h3>
              <p className="text-sm text-gray-600">Manage teacher accounts</p>
            </a>
            <a
              href="/admin/departments"
              className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition border border-purple-200"
            >
              <Calendar className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Departments</h3>
              <p className="text-sm text-gray-600">Manage departments</p>
            </a>
            <a
              href="/notes"
              className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-md transition border border-orange-200"
            >
              <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-semibold text-gray-900">View Notes</h3>
              <p className="text-sm text-gray-600">Check all college notes</p>
            </a>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            System Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Server
                </span>
                <span className="text-sm font-semibold text-green-600">
                  Operational
                </span>
              </div>
              <div className="h-2 bg-green-200 rounded-full"></div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Database
                </span>
                <span className="text-sm font-semibold text-green-600">
                  Connected
                </span>
              </div>
              <div className="h-2 bg-green-200 rounded-full"></div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">API</span>
                <span className="text-sm font-semibold text-green-600">
                  Running
                </span>
              </div>
              <div className="h-2 bg-green-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
