import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateResult = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    University: "AKTU",
    link: "",
  });

  const [customUniversity, setCustomUniversity] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
    const payload = {
      ...formData,
      University: formData.University === "OTHER" ? customUniversity : formData.University,
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/result/uploadResultLink", payload); // adjust API path
      alert("Result link submitted successfully!");
      console.log(res.data);
      navigate("/result")
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit result!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Submit University Result Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">University</label>
          <select
            name="University"
            value={formData.University}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="AKTU">AKTU</option>
            <option value="BBD">BBD</option>
            <option value="DDU">DDU</option>
            <option value="DU">DU</option>
            <option value="CBSE">CBSE</option>
            <option value="UPBOARD">UPBOARD</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
         {formData.University === "OTHER" && (
          <div>
            <label className="block mb-1 font-medium">Custom University Name</label>
            <input
              type="text"
              value={customUniversity}
              onChange={(e) => setCustomUniversity(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter university name"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1 font-medium">Result Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/result"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateResult;
