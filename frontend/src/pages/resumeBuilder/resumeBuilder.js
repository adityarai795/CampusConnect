import React, { useState, useRef } from "react";
import {
  Plus,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Briefcase,
  GraduationCap,
  User,
  Mail,
  Phone,
  FileText,
  Code,
  Award,
  FolderGit2,
  Info,
} from "lucide-react";
import html2pdf from "html2pdf.js";

function ResumeBuilder() {
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    name: "Alex Johnson",
    role: "Senior Frontend Developer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    summary:
      "Results-driven Frontend Developer with 6+ years of experience building responsive web applications. Expertise in React, TypeScript, and modern CSS frameworks.",
  });

  // Skills
  const [skills, setSkills] = useState(
    "React.js, TypeScript, Node.js, Tailwind CSS, Next.js, GraphQL, Jest, Docker",
  );

  // Experiences
  const [experiences, setExperiences] = useState([
    {
      id: "exp1",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      startDate: "2021",
      endDate: "Present",
      description:
        "Lead frontend development for enterprise dashboard, improved performance by 40%, mentored 3 junior developers, implemented component library.",
    },
    {
      id: "exp2",
      title: "Frontend Developer",
      company: "Creative Digital Agency",
      startDate: "2018",
      endDate: "2021",
      description:
        "Developed responsive websites for 20+ clients, collaborated with design team, implemented SEO best practices, reduced load time by 25%.",
    },
  ]);

  // Educations
  const [educations, setEducations] = useState([
    {
      id: "edu1",
      degree: "B.Sc. in Computer Science",
      institution: "University of Technology",
      startDate: "2014",
      endDate: "2018",
      description: "Graduated with Honors, GPA: 3.8/4.0",
    },
  ]);

  // Certifications
  const [certifications, setCertifications] = useState([
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-12345",
    },
    {
      id: "cert2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2022",
      credentialId: "PSM-98765",
    },
  ]);

  // Projects
  const [projects, setProjects] = useState([
    {
      id: "proj1",
      name: "E-Commerce Dashboard",
      technologies: "React, Redux, Node.js, MongoDB",
      description:
        "Built a full-stack admin dashboard with real-time inventory tracking, sales analytics, and user management. Reduced page load time by 35%.",
      link: "",
      date: "2023",
    },
    {
      id: "proj2",
      name: "Portfolio Generator",
      technologies: "Next.js, Tailwind CSS, Framer Motion",
      description:
        "Developed a dynamic portfolio generator for developers with drag-and-drop sections and one-click PDF export. Used by 500+ users.",
      link: "",
      date: "2024",
    },
  ]);

  const previewRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Personal Info Handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Skills Handler
  const handleSkillsChange = (e) => setSkills(e.target.value);

  // ---- Experience Handlers ----
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };
  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };
  const moveExperience = (id, direction) => {
    const index = experiences.findIndex((exp) => exp.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === experiences.length - 1)
    )
      return;
    const newExperiences = [...experiences];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newExperiences[index], newExperiences[swapIndex]] = [
      newExperiences[swapIndex],
      newExperiences[index],
    ];
    setExperiences(newExperiences);
  };

  // ---- Education Handlers ----
  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const updateEducation = (id, field, value) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };
  const removeEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };
  const moveEducation = (id, direction) => {
    const index = educations.findIndex((edu) => edu.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === educations.length - 1)
    )
      return;
    const newEducations = [...educations];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newEducations[index], newEducations[swapIndex]] = [
      newEducations[swapIndex],
      newEducations[index],
    ];
    setEducations(newEducations);
  };

  // ---- Certification Handlers ----
  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: Date.now().toString(),
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
      },
    ]);
  };
  const updateCertification = (id, field, value) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    );
  };
  const removeCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };
  const moveCertification = (id, direction) => {
    const index = certifications.findIndex((cert) => cert.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === certifications.length - 1)
    )
      return;
    const newCerts = [...certifications];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newCerts[index], newCerts[swapIndex]] = [
      newCerts[swapIndex],
      newCerts[index],
    ];
    setCertifications(newCerts);
  };

  // ---- Project Handlers ----
  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        technologies: "",
        description: "",
        link: "",
        date: "",
      },
    ]);
  };
  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj,
      ),
    );
  };
  const removeProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };
  const moveProject = (id, direction) => {
    const index = projects.findIndex((proj) => proj.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === projects.length - 1)
    )
      return;
    const newProjects = [...projects];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newProjects[index], newProjects[swapIndex]] = [
      newProjects[swapIndex],
      newProjects[index],
    ];
    setProjects(newProjects);
  };

  // PDF Download
  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPDF(true);
    const element = previewRef.current;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${personalInfo.name.replace(/\s/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Helper for skills array
  const skillsArray = skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <FileText className="text-white" size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            ATS-Friendly Resume Builder
          </h1>
        </div>
        <button
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md disabled:opacity-70"
        >
          <Download size={18} />
          {isGeneratingPDF ? "Generating PDF..." : "Download Resume (PDF)"}
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8">
        {/* LEFT SIDE - FORMS */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-200">
              <User size={20} className="text-blue-600" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <div className="grid gap-4">
              <input
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalChange}
                placeholder="Full Name"
                className="input-field"
              />
              <input
                name="role"
                value={personalInfo.role}
                onChange={handlePersonalChange}
                placeholder="Professional Title (e.g., Senior Frontend Developer)"
                className="input-field"
              />
              <input
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalChange}
                placeholder="Email"
                className="input-field"
              />
              <input
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalChange}
                placeholder="Phone"
                className="input-field"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-200">
              <FileText size={20} className="text-blue-600" />
              <h2 className="text-xl font-semibold">Professional Summary</h2>
            </div>
            <textarea
              name="summary"
              value={personalInfo.summary}
              onChange={handlePersonalChange}
              rows={4}
              placeholder="Write a compelling summary (include keywords relevant to your target role)..."
              className="input-field resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Use keywords from job descriptions to improve ATS score.
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-200">
              <Code size={20} className="text-blue-600" />
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>
            <input
              value={skills}
              onChange={handleSkillsChange}
              placeholder="React, Node.js, Python, AWS, ..."
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-2">
              Separate skills with commas. Include both hard and soft skills.
            </p>
          </div>

          {/* Work Experience */}
          <SectionCard
            title="Work Experience"
            icon={<Briefcase size={20} />}
            onAdd={addExperience}
            items={experiences}
            renderItem={(exp, idx) => (
              <DynamicCard
                item={exp}
                idx={idx}
                total={experiences.length}
                onUpdate={updateExperience}
                onRemove={removeExperience}
                onMoveUp={() => moveExperience(exp.id, "up")}
                onMoveDown={() => moveExperience(exp.id, "down")}
                fields={[
                  { name: "title", placeholder: "Job Title", type: "text" },
                  {
                    name: "company",
                    placeholder: "Company Name",
                    type: "text",
                  },
                  {
                    name: "startDate",
                    placeholder: "Start Year",
                    type: "text",
                  },
                  {
                    name: "endDate",
                    placeholder: "End Year (or Present)",
                    type: "text",
                  },
                  {
                    name: "description",
                    placeholder: "Key achievements & responsibilities",
                    type: "textarea",
                    rows: 3,
                  },
                ]}
              />
            )}
          />

     
          {/* Education */}
          <SectionCard
            title="Education"
            icon={<GraduationCap size={20} />}
            onAdd={addEducation}
            items={educations}
            renderItem={(edu, idx) => (
              <DynamicCard
                item={edu}
                idx={idx}
                total={educations.length}
                onUpdate={updateEducation}
                onRemove={removeEducation}
                onMoveUp={() => moveEducation(edu.id, "up")}
                onMoveDown={() => moveEducation(edu.id, "down")}
                fields={[
                  {
                    name: "degree",
                    placeholder: "Degree / Certification",
                    type: "text",
                  },
                  {
                    name: "institution",
                    placeholder: "Institution Name",
                    type: "text",
                  },
                  {
                    name: "startDate",
                    placeholder: "Start Year",
                    type: "text",
                  },
                  { name: "endDate", placeholder: "End Year", type: "text" },
                  {
                    name: "description",
                    placeholder: "Honors, GPA, relevant coursework",
                    type: "textarea",
                    rows: 2,
                  },
                ]}
              />
            )}
          />

          {/* Certifications */}
          <SectionCard
            title="Certifications"
            icon={<Award size={20} />}
            onAdd={addCertification}
            items={certifications}
            renderItem={(cert, idx) => (
              <DynamicCard
                item={cert}
                idx={idx}
                total={certifications.length}
                onUpdate={updateCertification}
                onRemove={removeCertification}
                onMoveUp={() => moveCertification(cert.id, "up")}
                onMoveDown={() => moveCertification(cert.id, "down")}
                fields={[
                  {
                    name: "name",
                    placeholder: "Certification Name",
                    type: "text",
                  },
                  {
                    name: "issuer",
                    placeholder: "Issuing Organization",
                    type: "text",
                  },
                  {
                    name: "date",
                    placeholder: "Date Obtained (e.g., 2023)",
                    type: "text",
                  },
                  {
                    name: "credentialId",
                    placeholder: "Credential ID (optional)",
                    type: "text",
                  },
                ]}
              />
            )}
          />

          {/* Projects */}
          <SectionCard
            title="Projects"
            icon={<FolderGit2 size={20} />}
            onAdd={addProject}
            items={projects}
            renderItem={(proj, idx) => (
              <DynamicCard
                item={proj}
                idx={idx}
                total={projects.length}
                onUpdate={updateProject}
                onRemove={removeProject}
                onMoveUp={() => moveProject(proj.id, "up")}
                onMoveDown={() => moveProject(proj.id, "down")}
                fields={[
                  { name: "name", placeholder: "Project Name", type: "text" },
                  {
                    name: "technologies",
                    placeholder: "Technologies used (comma separated)",
                    type: "text",
                  },
                  { name: "date", placeholder: "Year / Period", type: "text" },
                  {
                    name: "description",
                    placeholder: "Project description, your role, outcomes",
                    type: "textarea",
                    rows: 3,
                  },
                  {
                    name: "link",
                    placeholder: "Live demo / GitHub link (optional)",
                    type: "text",
                  },
                ]}
              />
            )}
          />

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex gap-2 items-start">
              <Info size={18} className="text-blue-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">ATS-Friendly Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>
                    Use standard section headings (e.g., "Work Experience",
                    "Education")
                  </li>
                  <li>
                    Include keywords from job descriptions in your summary and
                    skills
                  </li>
                  <li>Avoid images, tables, and columns in your resume</li>
                  <li>
                    Use bullet points for achievements (start with action verbs)
                  </li>
                  <li>Save as PDF (this tool does it for you)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - PREVIEW */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3">
              <h2 className="text-white font-semibold">
                Live Resume Preview (ATS Optimized)
              </h2>
            </div>
            <div
              ref={previewRef}
              className="p-8 bg-white"
              style={{
                fontFamily: "'Inter', 'Arial', 'Helvetica', sans-serif",
              }}
            >
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center border-b-2 border-blue-600 pb-4 mb-5">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {personalInfo.name || "Your Name"}
                  </h1>
                  <p className="text-lg text-blue-600 font-medium mt-1">
                    {personalInfo.role || "Professional Title"}
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-gray-600 mt-3 flex-wrap">
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                </div>

                {/* Summary */}
                {personalInfo.summary && (
                  <div className="mb-5">
                    <h2 className="text-md font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-2">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {skillsArray.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-md font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-2">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Experience */}
                {experiences.filter((e) => e.title || e.company).length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-md font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-3">
                      Work Experience
                    </h2>
                    {experiences.map(
                      (exp) =>
                        (exp.title || exp.company) && (
                          <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                              <h3 className="font-semibold">
                                {exp.title} {exp.company && `at ${exp.company}`}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                            {exp.description && (
                              <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        ),
                    )}
                  </div>
                )}

                {/* Projects */}
                {projects.filter((p) => p.name).length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-md font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-3">
                      Projects
                    </h2>
                    {projects.map(
                      (proj) =>
                        proj.name && (
                          <div key={proj.id} className="mb-4">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                              <h3 className="font-semibold">{proj.name}</h3>
                              <span className="text-xs text-gray-500">
                                {proj.date}
                              </span>
                            </div>
                            {proj.technologies && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                Tech: {proj.technologies}
                              </p>
                            )}
                            {proj.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {proj.description}
                              </p>
                            )}
                            {proj.link && (
                              <a
                                href={proj.link}
                                className="text-xs text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {proj.link}
                              </a>
                            )}
                          </div>
                        ),
                    )}
                  </div>
                )}

                {/* Education */}
                {educations.filter((e) => e.degree || e.institution).length >
                  0 && (
                  <div className="mb-5">
                    <h2 className="text-md font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-3">
                      Education
                    </h2>
                    {educations.map(
                      (edu) =>
                        (edu.degree || edu.institution) && (
                          <div key={edu.id} className="mb-4">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                              <h3 className="font-semibold">
                                {edu.degree}{" "}
                                {edu.institution && `- ${edu.institution}`}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {edu.startDate} - {edu.endDate}
                              </span>
                            </div>
                            {edu.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ),
                    )}
                  </div>
                )}

                {/* Certifications */}
                {certifications.filter((c) => c.name).length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-md font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-3">
                      Certifications
                    </h2>
                    {certifications.map(
                      (cert) =>
                        cert.name && (
                          <div key={cert.id} className="mb-2">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                              <span className="font-medium text-sm">
                                {cert.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {cert.date}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              {cert.issuer}{" "}
                              {cert.credentialId &&
                                `· ID: ${cert.credentialId}`}
                            </p>
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for cleaner code
const SectionCard = ({ title, icon, onAdd, items, renderItem }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-200">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
      >
        <Plus size={16} /> Add
      </button>
    </div>
    <div className="space-y-4">
      {items.map((item, idx) => renderItem(item, idx))}
      {items.length === 0 && (
        <p className="text-center text-gray-400 py-4">
          No {title.toLowerCase()} added.
        </p>
      )}
    </div>
  </div>
);

const DynamicCard = ({
  item,
  idx,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  fields,
}) => (
  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm font-medium text-gray-500">#{idx + 1}</span>
      <div className="flex gap-1">
        <button
          onClick={onMoveUp}
          disabled={idx === 0}
          className="p-1 disabled:opacity-30"
        >
          <ArrowUp size={16} className="text-gray-500 hover:text-blue-600" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={idx === total - 1}
          className="p-1 disabled:opacity-30"
        >
          <ArrowDown size={16} className="text-gray-500 hover:text-blue-600" />
        </button>
        <button onClick={onRemove} className="p-1">
          <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
        </button>
      </div>
    </div>
    <div className="grid gap-3">
      {fields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.name}
            value={item[field.name] || ""}
            onChange={(e) => onUpdate(item.id, field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 2}
            className="input-field resize-none"
          />
        ) : (
          <input
            key={field.name}
            type={field.type}
            value={item[field.name] || ""}
            onChange={(e) => onUpdate(item.id, field.name, e.target.value)}
            placeholder={field.placeholder}
            className="input-field"
          />
        ),
      )}
    </div>
  </div>
);

// Global input styles (add to your global CSS or use Tailwind)
// The classes below assume Tailwind CSS is configured.
// If not, replace with regular CSS classes.
const style = document.createElement("style");
style.textContent = `
  .input-field {
    width: 100%;
    padding: 0.625rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;
    transition: all 0.2s;
  }
  .input-field:focus {
    border-color: #3b82f6;
    ring: 2px solid #3b82f6;
  }
`;
document.head.appendChild(style);

export default ResumeBuilder;
