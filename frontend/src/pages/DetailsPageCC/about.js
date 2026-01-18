import React from "react";
import { Users, BookOpen, Rocket, ShieldCheck, Star } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About CampusConnect
        </h1>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
          CampusConnect is your all-in-one digital platform designed to connect
          students, educators, and institutions into one smart learning
          ecosystem. From resources and collaboration to career growth — we
          empower students to thrive in the modern academic world.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Explore Resources
          </button>
          <button className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
            Join Community
          </button>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Students", value: "5,000+" },
            { label: "Study Resources", value: "10,000+" },
            { label: "Universities", value: "50+" },
            { label: "Community Mentors", value: "200+" },
          ].map((stat, index) => (
            <div key={index} className="hover:scale-105 transition transform">
              <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-blue-600" />
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to bridge the gap between students and opportunities
            by providing a centralized digital platform for learning, sharing
            resources, collaboration, and career growth — all in one place.
          </p>
        </div>

        <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-white">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-purple-600" />
            <h2 className="text-2xl font-bold">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To become India’s most trusted and innovative EdTech ecosystem that
            empowers every student — from rural campuses to top universities —
            with equal access to quality education and mentorship.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CampusConnect?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="text-blue-600 w-8 h-8" />,
                title: "Smart Learning Resources",
                desc: "Access curated notes, videos, and study materials shared by top students and mentors.",
              },
              {
                icon: <Users className="text-purple-600 w-8 h-8" />,
                title: "Campus Community",
                desc: "Connect, collaborate, and grow with students and educators across universities.",
              },
              {
                icon: <Star className="text-yellow-500 w-8 h-8" />,
                title: "Career Growth",
                desc: "Explore internships, jobs, mentorship programs, and real-world projects.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white shadow hover:shadow-xl transition hover:-translate-y-2"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Aman Sharma",
              text: "CampusConnect helped me find study resources and mentors that boosted my placement preparation.",
            },
            {
              name: "Priya Verma",
              text: "The community feature is amazing. I collaborated with students from other colleges on real projects!",
            },
            {
              name: "Rahul Singh",
              text: "This platform feels like a digital campus. Everything I need is in one place.",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition"
            >
              <p className="text-gray-600 italic">“{review.text}”</p>
              <h4 className="mt-4 font-bold text-blue-600">— {review.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">Ready to Join CampusConnect?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Be part of a growing academic ecosystem where learning meets
            innovation, collaboration, and career success.
          </p>

          <button className="mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </div>
      </section> */}
    </div>
  );
}
