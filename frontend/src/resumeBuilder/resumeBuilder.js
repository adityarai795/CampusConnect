import React, { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Linkedin, Github, Globe, 
  Plus, Minus, Download, RotateCcw, Layout, Palette,
  Briefcase, GraduationCap, Award, Code, FileText
} from "lucide-react";

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [colorScheme, setColorScheme] = useState("blue");
  
  const [data, setData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    
    // Career
    careerObjective: "",
    
    // Arrays
    skills: [""],
    education: [{ degree: "", institution: "", year: "", gpa: "" }],
    experience: [{ title: "", company: "", duration: "", description: "" }],
    projects: [{ title: "", tech: "", description: "", link: "" }],
    certificates: [{ title: "", issuer: "", date: "", link: "" }],
  });

  const colorSchemes = {
    blue: { primary: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-600" },
    purple: { primary: "bg-purple-600", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-600" },
    green: { primary: "bg-green-600", light: "bg-green-50", text: "text-green-600", border: "border-green-600" },
    orange: { primary: "bg-orange-600", light: "bg-orange-50", text: "text-orange-600", border: "border-orange-600" },
    gray: { primary: "bg-gray-700", light: "bg-gray-50", text: "text-gray-700", border: "border-gray-700" }
  };

  const currentColor = colorSchemes[colorScheme];

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleArrayChange = (field, index, value, subField) => {
    const updated = [...data[field]];
    if (subField) {
      updated[index][subField] = value;
    } else {
      updated[index] = value;
    }
    setData({ ...data, [field]: updated });
  };

  const addField = (field, template) => {
    setData({ ...data, [field]: [...data[field], template || ""] });
  };

  const removeField = (field, index) => {
    const updated = [...data[field]];
    updated.splice(index, 1);
    setData({ ...data, [field]: updated });
  };

  const resetForm = () => {
    setData({
      name: "", email: "", phone: "", location: "", linkedin: "", github: "", portfolio: "",
      careerObjective: "",
      skills: [""],
      education: [{ degree: "", institution: "", year: "", gpa: "" }],
      experience: [{ title: "", company: "", duration: "", description: "" }],
      projects: [{ title: "", tech: "", description: "", link: "" }],
      certificates: [{ title: "", issuer: "", date: "", link: "" }],
    });
  };

  const downloadPDF = () => {
    window.print();
  };

  // Modern Template
  const ModernTemplate = () => (
    <div className="bg-white p-8 min-h-[297mm]">
      {/* Header */}
      <div className={`${currentColor.primary} text-white p-8 -m-8 mb-6`}>
        <h1 className="text-4xl font-bold mb-2">{data.name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.email}</span>}
          {data.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.phone}</span>}
          {data.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.location}</span>}
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {data.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.linkedin}</span>}
          {data.github && <span className="flex items-center gap-1"><Github className="w-4 h-4" />{data.github}</span>}
          {data.portfolio && <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.portfolio}</span>}
        </div>
      </div>

      {/* Career Objective */}
      {data.careerObjective && (
        <section className="mb-6">
          <h2 className={`text-xl font-bold ${currentColor.text} mb-2 pb-1 border-b-2 ${currentColor.border}`}>
            Career Objective
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.careerObjective}</p>
        </section>
      )}

      {/* Education */}
      {data.education.some(e => e.degree) && (
        <section className="mb-6">
          <h2 className={`text-xl font-bold ${currentColor.text} mb-3 pb-1 border-b-2 ${currentColor.border}`}>
            Education
          </h2>
          {data.education.filter(e => e.degree).map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                </div>
                <div className="text-right text-sm">
                  {edu.year && <p className="text-gray-600">{edu.year}</p>}
                  {edu.gpa && <p className="text-gray-700 font-semibold">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.experience.some(e => e.title) && (
        <section className="mb-6">
          <h2 className={`text-xl font-bold ${currentColor.text} mb-3 pb-1 border-b-2 ${currentColor.border}`}>
            Experience
          </h2>
          {data.experience.filter(e => e.title).map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{exp.title}</h3>
                <span className="text-sm text-gray-600">{exp.duration}</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{exp.company}</p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.some(p => p.title) && (
        <section className="mb-6">
          <h2 className={`text-xl font-bold ${currentColor.text} mb-3 pb-1 border-b-2 ${currentColor.border}`}>
            Projects
          </h2>
          {data.projects.filter(p => p.title).map((proj, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{proj.title}</h3>
                {proj.link && <span className="text-xs text-blue-600">{proj.link}</span>}
              </div>
              {proj.tech && <p className="text-sm text-gray-600 italic">Tech: {proj.tech}</p>}
              <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.some(s => s) && (
        <section className="mb-6">
          <h2 className={`text-xl font-bold ${currentColor.text} mb-2 pb-1 border-b-2 ${currentColor.border}`}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.filter(Boolean).map((skill, idx) => (
              <span key={idx} className={`${currentColor.light} ${currentColor.text} px-3 py-1 rounded-full text-sm font-medium`}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {data.certificates.some(c => c.title) && (
        <section className="mb-6">
          <h2 className={`text-xl font-bold ${currentColor.text} mb-3 pb-1 border-b-2 ${currentColor.border}`}>
            Certifications
          </h2>
          {data.certificates.filter(c => c.title).map((cert, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );

  // Classic Template
  const ClassicTemplate = () => (
    <div className="bg-white p-8 min-h-[297mm]">
      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.name || "Your Name"}</h1>
        <div className="text-sm text-gray-600 space-x-3">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>•</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        <div className="text-sm text-gray-600 mt-1 space-x-3">
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && data.linkedin && <span>•</span>}
          {data.github && <span>{data.github}</span>}
        </div>
      </div>

      {data.careerObjective && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-2 border-b border-gray-400">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm">{data.careerObjective}</p>
        </section>
      )}

      {data.education.some(e => e.degree) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-3 border-b border-gray-400">
            Education
          </h2>
          {data.education.filter(e => e.degree).map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{edu.degree}</span>
                <span className="text-sm">{edu.year}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{edu.institution}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.experience.some(e => e.title) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-3 border-b border-gray-400">
            Experience
          </h2>
          {data.experience.filter(e => e.title).map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-bold">{exp.title}</span>
                <span className="text-sm">{exp.duration}</span>
              </div>
              <p className="text-sm italic text-gray-600 mb-1">{exp.company}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.projects.some(p => p.title) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-3 border-b border-gray-400">
            Projects
          </h2>
          {data.projects.filter(p => p.title).map((proj, idx) => (
            <div key={idx} className="mb-3">
              <h3 className="font-bold">{proj.title}</h3>
              {proj.tech && <p className="text-xs text-gray-600 italic">{proj.tech}</p>}
              <p className="text-sm text-gray-700">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.skills.some(s => s) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-2 border-b border-gray-400">
            Skills
          </h2>
          <p className="text-sm text-gray-700">{data.skills.filter(Boolean).join(" • ")}</p>
        </section>
      )}

      {data.certificates.some(c => c.title) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-3 border-b border-gray-400">
            Certifications
          </h2>
          {data.certificates.filter(c => c.title).map((cert, idx) => (
            <div key={idx} className="mb-2 flex justify-between">
              <div>
                <span className="font-semibold">{cert.title}</span>
                <span className="text-sm text-gray-600"> - {cert.issuer}</span>
              </div>
              <span className="text-sm text-gray-600">{cert.date}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create your professional resume in minutes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="lg:w-5/12">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              {/* Customization */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Customize
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTemplate("modern")}
                      className={`flex-1 py-2 px-3 rounded-lg border-2 transition ${
                        activeTemplate === "modern" 
                          ? "border-blue-500 bg-blue-50 text-blue-700" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      Modern
                    </button>
                    <button
                      onClick={() => setActiveTemplate("classic")}
                      className={`flex-1 py-2 px-3 rounded-lg border-2 transition ${
                        activeTemplate === "classic" 
                          ? "border-blue-500 bg-blue-50 text-blue-700" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      Classic
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
                  <div className="flex gap-2">
                    {Object.keys(colorSchemes).map(color => (
                      <button
                        key={color}
                        onClick={() => setColorScheme(color)}
                        className={`w-10 h-10 rounded-lg ${colorSchemes[color].primary} transition transform hover:scale-110 ${
                          colorScheme === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {/* Personal Info */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg mb-2 focus:border-blue-400 focus:outline-none"
                    value={data.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg mb-2 focus:border-blue-400 focus:outline-none"
                    value={data.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      value={data.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      value={data.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg mt-2 mb-2 focus:border-blue-400 focus:outline-none"
                    value={data.linkedin}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="GitHub"
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      value={data.github}
                      onChange={(e) => handleChange("github", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Portfolio"
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      value={data.portfolio}
                      onChange={(e) => handleChange("portfolio", e.target.value)}
                    />
                  </div>
                </div>

                {/* Career Objective */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Career Objective
                  </h3>
                  <textarea
                    placeholder="Brief career objective or professional summary..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
                    rows="3"
                    value={data.careerObjective}
                    onChange={(e) => handleChange("careerObjective", e.target.value)}
                  />
                </div>

                {/* Education */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </h3>
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <input
                        type="text"
                        placeholder="Degree"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange("education", idx, e.target.value, "degree")}
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange("education", idx, e.target.value, "institution")}
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Year"
                          className="px-3 py-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
                          value={edu.year}
                          onChange={(e) => handleArrayChange("education", idx, e.target.value, "year")}
                        />
                        <input
                          type="text"
                          placeholder="GPA"
                          className="px-3 py-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
                          value={edu.gpa}
                          onChange={(e) => handleArrayChange("education", idx, e.target.value, "gpa")}
                        />
                      </div>
                      <button
                        onClick={() => removeField("education", idx)}
                        className="text-red-600 text-sm flex items-center gap-1 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addField("education", { degree: "", institution: "", year: "", gpa: "" })}
                    className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Experience
                  </h3>
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <input
                        type="text"
                        placeholder="Job Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={exp.title}
                        onChange={(e) => handleArrayChange("experience", idx, e.target.value, "title")}
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={exp.company}
                        onChange={(e) => handleArrayChange("experience", idx, e.target.value, "company")}
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2023 - Present)"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={exp.duration}
                        onChange={(e) => handleArrayChange("experience", idx, e.target.value, "duration")}
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none resize-none"
                        rows="2"
                        value={exp.description}
                        onChange={(e) => handleArrayChange("experience", idx, e.target.value, "description")}
                      />
                      <button
                        onClick={() => removeField("experience", idx)}
                        className="text-red-600 text-sm flex items-center gap-1 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addField("experience", { title: "", company: "", duration: "", description: "" })}
                    className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>

                {/* Projects */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Projects
                  </h3>
                  {data.projects.map((proj, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <input
                        type="text"
                        placeholder="Project Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={proj.title}
                        onChange={(e) => handleArrayChange("projects", idx, e.target.value, "title")}
                      />
                      <input
                        type="text"
                        placeholder="Technologies Used"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={proj.tech}
                        onChange={(e) => handleArrayChange("projects", idx, e.target.value, "tech")}
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none resize-none"
                        rows="2"
                        value={proj.description}
                        onChange={(e) => handleArrayChange("projects", idx, e.target.value, "description")}
                      />
                      <input
                        type="text"
                        placeholder="Project Link (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={proj.link}
                        onChange={(e) => handleArrayChange("projects", idx, e.target.value, "link")}
                      />
                      <button
                        onClick={() => removeField("projects", idx)}
                        className="text-red-600 text-sm flex items-center gap-1 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addField("projects", { title: "", tech: "", description: "", link: "" })}
                    className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Skills
                  </h3>
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Skill (e.g., React, Python)"
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                        value={skill}
                        onChange={(e) => handleArrayChange("skills", idx, e.target.value)}
                      />
                      <button
                        onClick={() => removeField("skills", idx)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addField("skills")}
                    className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add Skill
                  </button>
                </div>

                {/* Certificates */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications
                  </h3>
                  {data.certificates.map((cert, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <input
                        type="text"
                        placeholder="Certificate Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={cert.title}
                        onChange={(e) => handleArrayChange("certificates", idx, e.target.value, "title")}
                      />
                      <input
                        type="text"
                        placeholder="Issuing Organization"
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:border-blue-400 focus:outline-none"
                        value={cert.issuer}
                        onChange={(e) => handleArrayChange("certificates", idx, e.target.value, "issuer")}
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Date"
                          className="px-3 py-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
                          value={cert.date}
                          onChange={(e) => handleArrayChange("certificates", idx, e.target.value, "date")}
                        />
                        <input
                          type="text"
                          placeholder="Link (optional)"
                          className="px-3 py-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
                          value={cert.link}
                          onChange={(e) => handleArrayChange("certificates", idx, e.target.value, "link")}
                        />
                      </div>
                      <button
                        onClick={() => removeField("certificates", idx)}
                        className="text-red-600 text-sm flex items-center gap-1 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addField("certificates", { title: "", issuer: "", date: "", link: "" })}
                    className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add Certificate
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t flex gap-3">
                <button
                  onClick={downloadPDF}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:w-7/12">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  <span className="font-semibold">Preview</span>
                </div>
                <span className="text-sm opacity-90">{activeTemplate === "modern" ? "Modern" : "Classic"} Template</span>
              </div>
              <div id="resume-preview" className="overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {activeTemplate === "modern" ? <ModernTemplate /> : <ClassicTemplate />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}