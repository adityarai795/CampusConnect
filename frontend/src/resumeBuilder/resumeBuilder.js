// ResumeBuilder.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeBuilder() {
  const [data, setData] = useState({
    name: "",
    email: "",
    carrerObjective:"",
    skills: "",
    education: "",
    experience: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
    <div className="p-4 pt-[80px] flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-600">📝 Resume Form</h2>
        {["name", "email","carrerObjective", "skills", "education", "experience"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block font-medium capitalize mb-1">{field}</label>
            <input
              type="text"
              placeholder={`Enter your ${field}`}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name={field}
              value={data[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button
          onClick={downloadPDF}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg"
        >
          📄 Download PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div
        id="resume"
        className="lg:w-1/2 bg-white p-8 rounded-lg shadow max-w-[800px] mx-auto"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <h1 className="text-3xl font-bold text-gray-800">
          {data.name || "Your Name"}
        </h1>
        <p className="text-gray-600">{data.email || "your@email.com"}</p>
        <span>{data.carrerObjective }</span>
        <hr className="my-4" />

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-blue-600">Skills</h2>
          <p>{data.skills || "List your skills here..."}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-blue-600">Education</h2>
          <p>{data.education || "Your education details..."}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-blue-600">Experience</h2>
          <p>{data.experience || "Your work experience..."}</p>
        </section>
      </div>
    </div>
  );
}
