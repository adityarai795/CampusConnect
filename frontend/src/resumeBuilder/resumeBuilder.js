import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FaEnvelope,
  FaUserTie,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaProjectDiagram,
  FaCertificate,
  FaLink,
  FaMinus,
} from "react-icons/fa";

export default function ResumeBuilder() {
  const [data, setData] = useState({
    name: "",
    email: "",
    carrerObjective: "",
    skills: [""],
    education: [""],
    experience: [""],
    projects: [{ title: "", link: "" }],
    certificates: [{ title: "", link: "" }],
  });

  const handleArrayChange = (field, index, value, subField) => {
    const updated = [...data[field]];
    if (typeof updated[index] === "object" && subField) {
      updated[index][subField] = value;
    } else {
      updated[index] = value;
    }
    setData({ ...data, [field]: updated });
  };

  const addField = (field, objTemplate) => {
    setData({
      ...data,
      [field]: [...data[field], objTemplate || ""],
    });
  };

  const removeField = (field, index) => {
    const updated = [...data[field]];
    updated.splice(index, 1);
    setData({ ...data, [field]: updated });
  };
  const resetForm = () => {
    setData({
      name: "",
      email: "",
      carrerObjective: "",
      skills: [""],
      education: [""],
      experience: [""],
      projects: [{ title: "", link: "" }],
      certificates: [{ title: "", link: "" }],
    });
  }
  const downloadPDF = () => {
    const resume = document.getElementById("resume");
    html2canvas(resume, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.name || "my"}_resume.pdf`);
    });
  };


  return (
    <div className="p-4 pt-[80px] flex flex-col lg:flex-row gap-6 bg-gray-50 min-h-screen">
      {/* Form */}
      <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-blue-600">
          📝 Build Your Resume
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your full name"
          className="border p-2 w-full rounded-lg mb-3 text-sm sm:text-base"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full rounded-lg mb-3 text-sm sm:text-base"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        {/* Career Objective */}
        <textarea
          placeholder="Write your career objective"
          className="border p-2 w-full rounded-lg mb-3 text-sm sm:text-base min-h-[80px]"
          value={data.carrerObjective}
          onChange={(e) =>
            setData({ ...data, carrerObjective: e.target.value })
          }
        />

        {/* Dynamic Sections (Skills, Education, Experience, Projects, Certificates) */}
        {[
          {
            label: "Skills",
            key: "skills",
            placeholder: "Skill",
            type: "text",
          },
          {
            label: "Education",
            key: "education",
            placeholder: "Education detail",
            type: "text",
          },
          {
            label: "Experience",
            key: "experience",
            placeholder: "Experience detail",
            type: "text",
          },
        ].map((section) => (
          <div key={section.key}>
            <h3 className="font-bold text-gray-700 mt-4 mb-1">
              {section.label}
            </h3>
            {data[section.key].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type={section.type}
                  placeholder={section.placeholder}
                  className="border p-2 flex-1 rounded-lg text-sm sm:text-base"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(section.key, idx, e.target.value)
                  }
                />
                <button
                  onClick={() => removeField(section.key, idx)}
                  className="bg-red-500 text-white p-2 rounded w-full sm:w-auto"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            <button
              onClick={() => addField(section.key)}
              className="bg-green-500 text-white px-3 py-1 rounded mb-3 w-full sm:w-auto"
            >
             Add {section.label}
            </button>
          </div>
        ))}

        {/* Projects */}
        <h3 className="font-bold text-gray-700 mt-4 mb-1">Projects</h3>
        {data.projects.map((proj, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Project title"
              className="border p-2 flex-1 rounded-lg text-sm sm:text-base"
              value={proj.title}
              onChange={(e) =>
                handleArrayChange("projects", idx, e.target.value, "title")
              }
            />
            <input
              type="text"
              placeholder="Project link"
              className="border p-2 flex-1 rounded-lg text-sm sm:text-base"
              value={proj.link}
              onChange={(e) =>
                handleArrayChange("projects", idx, e.target.value, "link")
              }
            />
            <button
              onClick={() => removeField("projects", idx)}
              className="bg-red-500 text-white p-2 rounded w-full sm:w-auto"
            >
              <FaMinus />
            </button>
          </div>
        ))}
        <button
          onClick={() => addField("projects", { title: "", link: "" })}
          className="bg-green-500 text-white px-3 py-1 rounded mb-3 w-full sm:w-auto"
        >
           Add Project
        </button>

        {/* Certificates */}
        <h3 className="font-bold text-gray-700 mt-4 mb-1">Certificates</h3>
        {data.certificates.map((cert, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Certificate title"
              className="border p-2 flex-1 rounded-lg text-sm sm:text-base"
              value={cert.title}
              onChange={(e) =>
                handleArrayChange("certificates", idx, e.target.value, "title")
              }
            />
            <input
              type="text"
              placeholder="Certificate link"
              className="border p-2 flex-1 rounded-lg text-sm sm:text-base"
              value={cert.link}
              onChange={(e) =>
                handleArrayChange("certificates", idx, e.target.value, "link")
              }
            />
            <button
              onClick={() => removeField("certificates", idx)}
              className="bg-red-500 text-white p-2 rounded w-full sm:w-auto"
            >
              <FaMinus />
            </button>
          </div>
        ))}
        <button
          onClick={() => addField("certificates", { title: "", link: "" })}
          className="bg-green-500 text-white px-3 py-1 rounded mb-3 w-full sm:w-auto"
        >
          Add Certificate
        </button>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={downloadPDF}
            className="flex-1 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg shadow-lg"
          >
            📄 Download PDF
          </button>
          <button
            onClick={resetForm}
            className="flex-1 px-6 py-2 bg-white hover:bg-black transition hover:text-white text-black rounded-lg shadow-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      <div
        id="resume"
        className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      >
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaUserTie /> {data.name || "Your Name"}
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2 mt-1">
            <FaEnvelope /> {data.email || "your@email.com"}
          </p>
        </div>

        {/* Career Objective */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <FaUserTie /> Career Objective
          </h2>
          <p className="text-gray-700 mt-1">
            {data.carrerObjective || "Write a brief career objective..."}
          </p>
        </section>

        {/* Skills */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <FaTools /> Skills
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {data.skills.filter(Boolean).map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <FaGraduationCap /> Education
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {data.education.filter(Boolean).map((edu, idx) => (
              <li key={idx}>{edu}</li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <FaBriefcase /> Experience
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {data.experience.filter(Boolean).map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <FaProjectDiagram /> Projects
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {data.projects
              .filter((p) => p.title)
              .map((proj, idx) => (
                <li key={idx}>
                  {proj.title}{" "}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <FaLink className="inline" /> Link
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
            <FaCertificate /> Certificates
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {data.certificates
              .filter((c) => c.title)
              .map((cert, idx) => (
                <li key={idx}>
                  {cert.title}{" "}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <FaLink className="inline" /> View
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
