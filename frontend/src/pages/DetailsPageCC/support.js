import React, { useState } from "react";
import {
  Headphones,
  Mail,
  MessageCircle,
  HelpCircle,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    category: "General",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this to backend / email service later
    alert(
      "Your message has been sent! Our support team will contact you soon.",
    );
    setForm({ name: "", email: "", message: "", category: "General" });
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-4">
          <Headphones className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CampusConnect Support Center
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Need help? We’re here for you. Browse help topics, contact our support
          team, or explore our knowledge base for quick answers.
        </p>
      </section>

      {/* SUPPORT CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <HelpCircle className="w-8 h-8 text-blue-600" />,
            title: "General Help",
            desc: "Questions about accounts, login, or using CampusConnect.",
          },
          {
            icon: <BookOpen className="w-8 h-8 text-purple-600" />,
            title: "Resources & Learning",
            desc: "Issues related to notes, videos, uploads, and downloads.",
          },
          {
            icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
            title: "Privacy & Security",
            desc: "Concerns about data, account safety, and permissions.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-2"
          >
            {card.icon}
            <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Contact Support</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>General</option>
                <option>Resources & Learning</option>
                <option>Privacy & Security</option>
                <option>Careers & Community</option>
                <option>Technical Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Describe your issue or question..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* SUPPORT INFO */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center gap-4">
            <Mail className="w-8 h-8 text-blue-600" />
            <div>
              <h4 className="font-bold">Email Support</h4>
              <p className="text-gray-600">support@campusconnect.in</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-bold">Live Chat</h4>
              <p className="text-gray-600">Available 9 AM – 6 PM (Mon – Fri)</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl shadow">
            <h4 className="font-bold mb-2">Average Response Time</h4>
            <ul className="text-gray-600 space-y-1">
              <li>⚡ Live Chat: Under 5 minutes</li>
              <li>📩 Email: Within 24 hours</li>
              <li>🛠 Technical Issues: 24–48 hours</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl shadow">
            <h4 className="font-bold mb-2">Quick Help Links</h4>
            <ul className="text-blue-600 space-y-2">
              <li className="hover:underline cursor-pointer">
                Account Setup Guide
              </li>
              <li className="hover:underline cursor-pointer">
                Uploading Resources
              </li>
              <li className="hover:underline cursor-pointer">
                Community Guidelines
              </li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">We’re Always Here to Help</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            CampusConnect support team is dedicated to making your learning
            journey smooth, secure, and successful.
          </p>

          <button className="mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition">
            Go to Help Center
          </button>
        </div>
      </section> */}
    </div>
  );
}
