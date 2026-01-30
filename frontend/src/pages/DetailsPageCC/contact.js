import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { submitContactForm } from "../../api/home.js";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll get back to you shortly.");
    const response = await submitContactForm(form);
    console.log("Contact Form Response:", response.data);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-4">
          <MessageSquare className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get in Touch with CampusConnect
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Have a question, feedback, or partnership idea? We’d love to hear from
          you. Reach out and our team will respond as soon as possible.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Mail className="w-8 h-8 text-blue-600" />,
            title: "Email Us",
            desc: "support@campusconnect.in",
          },
          {
            icon: <Phone className="w-8 h-8 text-green-600" />,
            title: "Call Us",
            desc: "+91 90000 00000",
          },
          {
            icon: <MapPin className="w-8 h-8 text-purple-600" />,
            title: "Visit Us",
            desc: "Lucknow, Uttar Pradesh, India",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-2 text-center"
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* FORM + MAP */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
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
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* MAP / INFO */}
        <div className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden">
          <iframe
            title="CampusConnect Location"
            src="https://maps.google.com/maps?q=Lucknow%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[400px] border-0"
            loading="lazy"
          />
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Let’s Build the Future of Learning Together
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Whether you’re a student, educator, or institution, CampusConnect is
            here to collaborate and grow with you.
          </p>

          <button className="mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition">
            Join CampusConnect
          </button>
        </div>
      </section> */}
    </div>
  );
}
