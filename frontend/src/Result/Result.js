import React, { useState } from 'react'
import axios from 'axios'
import {viewResultLink} from '../api/result.js'
function Result() {
  const [University, setUniversity] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await viewResultLink({University})
      const resultLink = response.data.message;

      if (resultLink) {
        window.location.href = resultLink; 
      } else {
        alert("No result link found.");
      }
    } catch (error) {
      console.log("this is Error", error);
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen  p-4 flex flex-col items-center justify-start">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 mt-[80px]">
          <h1 className="text-4xl font-bold text-blue-500 text-center mb-2">
            University Result Finder
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Quickly access your university results in one click.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                University
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={University}
                onChange={e => setUniversity(e.target.value)}
                required
              >
                <option value="">Select University</option>
                <option value="AKTU">AKTU</option>
                <option value="BBD">BBD</option>
                <option value="DU">DU</option>
                <option value="CBSE">CBSE</option>
                <option value="UPBOARD">UPBOARD</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div  >
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Branch
              </label>
              <select disabled className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select Branch</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
                <option value="branch3">Branch 3</option>
              </select>
            </div>

            <div>
              <label disabled className="block text-sm font-semibold text-gray-700 mb-1">
                Semester
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select Semester</option>
                <option value="semester1">Semester 1</option>
                <option value="semester2">Semester 2</option>
                <option value="semester3">Semester 3</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Get Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Result
