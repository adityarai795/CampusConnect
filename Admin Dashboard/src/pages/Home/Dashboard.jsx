import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  BookOpen,
  Briefcase,
  MessageSquare,
  Code,
  TrendingUp,
} from "lucide-react";
import adminAPI from "../../api/adminAPI";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import Alert from "../../component/shared/Alert";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call when ready
      const mockStats = {
        totalUsers: 1250,
        totalResources: 450,
        totalJobs: 85,
        totalProblems: 320,
        totalCommunityPosts: 5600,
        pendingApprovals: 42,
        flaggedPosts: 8,
        recentActivity: [
          { date: "Mon", resources: 12, jobs: 5, problems: 8 },
          { date: "Tue", resources: 15, jobs: 7, problems: 10 },
          { date: "Wed", resources: 18, jobs: 4, problems: 12 },
          { date: "Thu", resources: 14, jobs: 6, problems: 9 },
          { date: "Fri", resources: 20, jobs: 8, problems: 15 },
          { date: "Sat", resources: 10, jobs: 3, problems: 5 },
          { date: "Sun", resources: 8, jobs: 2, problems: 3 },
        ],
        contentBreakdown: [
          { name: "Resources", value: 450 },
          { name: "Jobs", value: 85 },
          { name: "Problems", value: 320 },
          { name: "Posts", value: 5600 },
        ],
      };

      setStats(mockStats);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div
      className="bg-white rounded-lg shadow p-6 border-l-4"
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div
          style={{ backgroundColor: `${color}20` }}
          className="p-3 rounded-full"
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to the Campus Connect Admin Panel
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats?.totalUsers || 0}
            color="#3B82F6"
          />
          <StatCard
            icon={BookOpen}
            label="Resources"
            value={stats?.totalResources || 0}
            color="#10B981"
          />
          <StatCard
            icon={Briefcase}
            label="Job Postings"
            value={stats?.totalJobs || 0}
            color="#F59E0B"
          />
          <StatCard
            icon={Code}
            label="Coding Problems"
            value={stats?.totalProblems || 0}
            color="#8B5CF6"
          />
          <StatCard
            icon={MessageSquare}
            label="Community Posts"
            value={stats?.totalCommunityPosts || 0}
            color="#EC4899"
          />
          <StatCard
            icon={TrendingUp}
            label="Pending Approvals"
            value={stats?.pendingApprovals || 0}
            color="#EF4444"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.recentActivity || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="resources"
                  stroke="#10B981"
                  name="Resources Added"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="#F59E0B"
                  name="Jobs Posted"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="problems"
                  stroke="#8B5CF6"
                  name="Problems Added"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Content Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Content Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.contentBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              icon={BookOpen}
              label="Upload Resource"
              color="bg-blue-100 text-blue-700"
              href="/uploadnotes"
            />
            <QuickActionCard
              icon={Briefcase}
              label="Post Job"
              color="bg-amber-100 text-amber-700"
              href="/createJob"
            />
            <QuickActionCard
              icon={Code}
              label="Add Problem"
              color="bg-purple-100 text-purple-700"
              href="/addProblems"
            />
            <QuickActionCard
              icon={MessageSquare}
              label="Review Posts"
              color="bg-pink-100 text-pink-700"
              href="/community"
            />
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              System Status
            </h2>
            <div className="space-y-3">
              <StatusItem
                label="API Server"
                status="Online"
                statusColor="text-green-600"
              />
              <StatusItem
                label="Database"
                status="Online"
                statusColor="text-green-600"
              />
              <StatusItem
                label="File Storage"
                status="Online"
                statusColor="text-green-600"
              />
              <StatusItem
                label="Email Service"
                status="Online"
                statusColor="text-green-600"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Moderation Overview
            </h2>
            <div className="space-y-3">
              <ModItem
                label="Pending Approvals"
                count={stats?.pendingApprovals || 0}
                color="text-yellow-600"
              />
              <ModItem
                label="Flagged Posts"
                count={stats?.flaggedPosts || 0}
                color="text-red-600"
              />
              <ModItem
                label="Users Reported"
                count="5"
                color="text-orange-600"
              />
              <ModItem
                label="Resolved Issues"
                count="28"
                color="text-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon: Icon, label, color, href }) => (
  <a
    href={href}
    className={`${color} p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer`}
  >
    <Icon className="w-6 h-6 mb-2" />
    <p className="text-sm font-medium">{label}</p>
  </a>
);

const StatusItem = ({ label, status, statusColor }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <span className="text-gray-700">{label}</span>
    <span className={`font-medium ${statusColor}`}>{status}</span>
  </div>
);

const ModItem = ({ label, count, color }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <span className="text-gray-700">{label}</span>
    <span className={`font-bold text-lg ${color}`}>{count}</span>
  </div>
);

export default Dashboard;
