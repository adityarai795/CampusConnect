import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  MessageSquare,
  BookOpen,
  Award,
  ArrowUpRight,
  Calendar,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: "12,847",
      change: "+12.5%",
      icon: Users,
      color: "#6366f1",
    },
    {
      label: "Active Sessions",
      value: "3,421",
      change: "+8.2%",
      icon: TrendingUp,
      color: "#ec4899",
    },
    {
      label: "Messages Today",
      value: "8,934",
      change: "+23.1%",
      icon: MessageSquare,
      color: "#f59e0b",
    },
    {
      label: "Courses Active",
      value: "156",
      change: "+5.4%",
      icon: BookOpen,
      color: "#10b981",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Priya Sharma",
      action: "joined Computer Science program",
      time: "2 hours ago",
      avatar: "👩‍💻",
    },
    {
      id: 2,
      user: "Rajesh Kumar",
      action: "completed course modules",
      time: "4 hours ago",
      avatar: "👨‍🎓",
    },
    {
      id: 3,
      user: "Aarav Patel",
      action: "posted in discussion forum",
      time: "6 hours ago",
      avatar: "💬",
    },
    {
      id: 4,
      user: "Neha Singh",
      action: "earned Achievement Badge",
      time: "8 hours ago",
      avatar: "🏆",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Placement Drive 2024",
      date: "Apr 15",
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 2,
      title: "Tech Symposium",
      date: "Apr 22",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      title: "Alumni Meet",
      date: "May 5",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-slate-700/50 backdrop-blur-xl bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CollegeConnect</h1>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-300 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome back, Admin
          </h2>
          <p className="text-slate-400">
            Here's what's happening with your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/10 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        color: stat.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                      <ArrowUpRight className="w-4 h-4" />
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Recent Activity
                </h3>
                <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 text-sm font-semibold">
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/20 hover:border-slate-600/30 group cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">
                        {activity.user}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {activity.action}
                      </p>
                    </div>
                    <span className="text-slate-500 text-xs whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 p-8 backdrop-blur-xl h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Upcoming Events
              </h3>

              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group cursor-pointer rounded-xl overflow-hidden"
                  >
                    <div
                      className={`bg-gradient-to-r ${event.color} p-4 rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform group-hover:scale-105`}
                    >
                      <p className="text-white font-semibold text-sm">
                        {event.title}
                      </p>
                      <p className="text-white/70 text-xs mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <button className="w-full py-3 px-4 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-xl text-indigo-300 font-semibold transition-all duration-200 hover:text-indigo-200">
                  Manage Events
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-left text-white hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Users className="w-8 h-8 mb-3 text-indigo-200" />
              <h4 className="font-bold mb-2">Manage Users</h4>
              <p className="text-sm text-indigo-100">
                View and manage student & faculty accounts
              </p>
            </div>
          </button>

          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-left text-white hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <BookOpen className="w-8 h-8 mb-3 text-purple-200" />
              <h4 className="font-bold mb-2">Courses & Content</h4>
              <p className="text-sm text-purple-100">
                Create and manage course materials
              </p>
            </div>
          </button>

          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 to-pink-700 p-6 text-left text-white hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Award className="w-8 h-8 mb-3 text-pink-200" />
              <h4 className="font-bold mb-2">Analytics & Reports</h4>
              <p className="text-sm text-pink-100">
                View detailed engagement metrics
              </p>
            </div>
          </button>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
