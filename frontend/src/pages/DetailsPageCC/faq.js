import React, { useState } from "react";
import { ChevronDown, HelpCircle, Search, Mail } from "lucide-react";

const FAQ_DATA = [
  {
    category: "General",
    questions: [
      {
        q: "What is CampusConnect?",
        a: "CampusConnect is a digital platform designed to connect students, educators, and institutions. It provides learning resources, collaboration tools, mentorship, and career opportunities in one unified ecosystem.",
      },
      {
        q: "Is CampusConnect free to use?",
        a: "Yes, CampusConnect is free for students. Some premium features and institutional tools may be available for colleges and organizations.",
      },
    ],
  },
  {
    category: "Accounts",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on the 'Sign Up' button on the homepage, fill in your academic and personal details, and verify your email to get started.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email.",
      },
    ],
  },
  {
    category: "Resources",
    questions: [
      {
        q: "Who can upload study materials?",
        a: "Verified students, mentors, and educators can upload resources. All uploads go through a quality review process to ensure accuracy and relevance.",
      },
      {
        q: "Can I download resources for offline use?",
        a: "Yes, most resources can be downloaded and accessed offline depending on the content provider’s permissions.",
      },
    ],
  },
  {
    category: "Community & Careers",
    questions: [
      {
        q: "How can I find internships and jobs?",
        a: "Visit the Careers section to explore internships, job listings, and mentorship programs shared by recruiters and partner organizations.",
      },
      {
        q: "Can I collaborate with students from other colleges?",
        a: "Absolutely! CampusConnect is built to encourage cross-campus collaboration through groups, projects, and discussion forums.",
      },
    ],
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredData = FAQ_DATA.map((section) => ({
    ...section,
    questions: section.questions.filter((item) =>
      item.q.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter(
    (section) =>
      (activeCategory === "All" || section.category === activeCategory) &&
      section.questions.length > 0,
  );

  const categories = ["All", ...FAQ_DATA.map((s) => s.category)];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-4">
          <HelpCircle className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Find quick answers to common questions about CampusConnect, your
          learning resources, community, and career growth.
        </p>

        {/* SEARCH */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(null);
              }}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500">
            No questions found. Try a different search.
          </p>
        )}

        {filteredData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {section.category}
            </h2>

            <div className="space-y-4">
              {section.questions.map((item, index) => {
                const globalIndex = `${sectionIndex}-${index}`;
                const isOpen = activeIndex === globalIndex;

                return (
                  <div
                    key={globalIndex}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => toggleFAQ(globalIndex)}
                      className="w-full flex justify-between items-center p-6 text-left"
                    >
                      <span className="font-semibold text-gray-800">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`transition-transform ${
                          isOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-4xl font-bold">Still Have Questions?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Our support team is always here to help you. Reach out and we’ll get
            back to you as soon as possible.
          </p>

          <button className="mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition">
            Contact Support
          </button>
        </div>
      </section> */}
    </div>
  );
}
