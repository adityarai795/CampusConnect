import React from 'react';
import ResourceSection from '../component/ResourceSection';

function Notes() {
  // 📝 Notes Section
const notes = [
  { id: 1, title: "DBMS Unit 1 Notes", meta: "CSE | Sem 3", link: "/notes/dbms-unit1.pdf" },
  { id: 2, title: "OOPs Concepts Summary", meta: "CSE | Sem 3", link: "/notes/oops-summary.pdf" },
  { id: 3, title: "Operating System - Process Management", meta: "CSE | Sem 4", link: "/notes/os-process.pdf" },
  { id: 4, title: "Computer Networks - Layers Explained", meta: "CSE | Sem 5", link: "/notes/cn-layers.pdf" },
];

// 📄 Previous Year Papers
const papers = [
  { id: 5, title: "DBMS - 2023 Mid Sem Paper", meta: "CSE | Sem 3", link: "/papers/dbms-2023-mid.pdf" },
  { id: 6, title: "OOPs - 2022 End Sem Paper", meta: "CSE | Sem 3", link: "/papers/oops-2022-end.pdf" },
  { id: 7, title: "COA - 2021 Previous Year", meta: "CSE | Sem 4", link: "/papers/coa-2021.pdf" },
  { id: 8, title: "DAA - 2022 Question Paper", meta: "CSE | Sem 5", link: "/papers/daa-2022.pdf" },
];

// ❓ Important Questions
const impQuestions = [
  { id: 9, title: "Top 20 DBMS Questions", meta: "CSE | Sem 3", link: "/imp/dbms-top20.pdf" },
  { id: 10, title: "OOPs Repeated Questions", meta: "CSE | Sem 3", link: "/imp/oops-repeated.pdf" },
  { id: 11, title: "OS Important Theory", meta: "CSE | Sem 4", link: "/imp/os-theory.pdf" },
  { id: 12, title: "DAA VVI Questions", meta: "CSE | Sem 5", link: "/imp/daa-vvi.pdf" },
];

// 📚 Books
const books = [
  { id: 13, title: "Operating System by Galvin (PDF)", meta: "Reference Book", link: "/books/os-galvin.pdf" },
  { id: 14, title: "Object Oriented Programming in C++ - Balagurusamy", meta: "Textbook", link: "/books/oops-bala.pdf" },
  { id: 15, title: "Database System Concepts – Silberschatz", meta: "Textbook", link: "/books/dbms-silberschatz.pdf" },
  { id: 16, title: "Computer Networks – Tanenbaum", meta: "Reference Book", link: "/books/cn-tanenbaum.pdf" },
];

  return (
    <div className='bg-gray-100 pt-10'>
      <div className="min-h-screen  p-4 flex flex-col items-center justify-start mt-[80px]">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">

    {/* Header */}
    <h2 className="text-4xl font-bold text-blue-600 text-center mb-2"> Study Material Hub</h2>
    <p className="text-center text-gray-600 mb-6">Find and download notes, previous papers, important questions, and books.</p>

    {/* Search and Filters */}
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input
        type="text"
        placeholder="Search notes, books, papers..."
        className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      />

      <select required className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
        <option value="">Select University</option>
        <option value="university1">University 1</option>
        <option value="university2">University 2</option>
      </select>

      <select required className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
        <option value="">Select Branch</option>
        <option value="cse">Computer Science</option>
        <option value="ece">Electronics</option>
      </select>

      <select required className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
        <option value="">Select Year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>

      <select required className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
        <option value="">Select Semester</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
        <option value="5">Semester 5</option>
        <option value="6">Semester 6</option>
        <option value="7">Semester 7</option>
        <option value="8">Semester 8</option>
      </select>

      <input
        type="text"
        placeholder="Subject (Optional)"
        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="col-span-1 md:col-span-2 bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
      >
        🔍 Search Materials
      </button>
    </form>

    {/* Notes List (Static Sample Data for now) */}
   
  </div>
</div>
   <ResourceSection title="Books" resources={books} />
    <ResourceSection title="📝 Notes" resources={notes} />
      <ResourceSection title="📄 Previous Year Papers" resources={papers} />
      <ResourceSection title="❓ Important Questions" resources={impQuestions} />
    </div>
    
  )
}

export default Notes
