import { Link } from "react-router-dom";
import { BookOpen, Users, BarChart3, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: Users,
      title:
        user?.role === "admin"
          ? "Manage Students & Teachers"
          : "Access Study Materials",
      description:
        user?.role === "admin"
          ? "Complete control over student and teacher records"
          : "Access all study materials and notes",
      link: user?.role === "admin" ? "/admin/students" : "/notes",
      color: "bg-blue-600",
    },
    {
      icon: BookOpen,
      title: "Notes & Resources",
      description: "Upload, share, and manage educational materials",
      link: "/notes",
      color: "bg-green-600",
    },
    {
      icon: BarChart3,
      title: "Results & Analytics",
      description: "Track student performance and grades",
      link: "/results",
      color: "bg-purple-600",
    },
    {
      icon: Calendar,
      title: "Events & Calendar",
      description: "Manage college events and important dates",
      link: "/events",
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Welcome Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to CampusConnect
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Comprehensive college management platform for{" "}
          {user?.role === "admin" ? "Administrators" : "Teachers"}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div
                className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              <div className="mt-6 flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-4 transition-all">
                Get Started
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Additional Quick Links */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Jobs", link: "/jobs" },
            { name: "Community", link: "/community" },
            // { name: "Settings", link: "/settings" },
            {
              name: user?.role === "admin" ? "Dashboard" : "My Classes",
              link:
                user?.role === "admin"
                  ? "/admin/dashboard"
                  : "/teacher/dashboard",
            },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="bg-white p-4 rounded-lg text-center hover:bg-indigo-50 transition border border-gray-200"
            >
              <p className="font-semibold text-gray-900">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
