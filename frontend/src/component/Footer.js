import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  Award,
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
} from "lucide-react";
import Logo from "../assets/logo.png";
import { subscribeEmailFunction } from "../api/home.js";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Notes", path: "/notes", icon: BookOpen },
    { name: "Results", path: "/result", icon: Award },
    { name: "Community", path: "/community", icon: Users },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "GitHub", icon: Github, url: "#" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  const [subscribeEmail, setSubscribeEmail] = React.useState("");
  const CallsubscribeEmail = async () => { 
    try {
      const response = await subscribeEmailFunction({ email: subscribeEmail });
      alert(response.data.message);
      setSubscribeEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred. Please try again later.");
    }
  }
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  src={Logo}
                  alt="CampusConnect Logo"
                  className="h-10 w-10 rounded-full relative z-10 ring-2 ring-white shadow-lg"
                />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CampusConnect
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Your one-stop solution for academic excellence. Discover results,
              notes, community support, and job opportunities—tailored for
              university students across India.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
                    >
                      <Icon
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-2"></span>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/cc/about"
                  className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/cc/about"
                  className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/cc/faq"
                  className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/cc/support"
                  className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/cc/contact"
                  className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-2"></span>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@campusconnect.com"
                  className="flex items-start space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm">info@campusconnect.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-start space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <Phone
                    size={18}
                    className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm">+91 12345 67890</span>
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm">New Delhi, India</span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">
                Subscribe to our newsletter
              </p>
              <div className="flex">
                <input
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg hover:shadow-lg transition-all duration-200 text-sm font-medium" onClick={()=>{CallsubscribeEmail()}}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>© {currentYear} CampusConnect. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className=" md:inline flex items-center">
                Made with{" "}
                <Heart size={14} className="mx-1 text-red-500 fill-current" />{" "}
                for students
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-400">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
