import React,{ useEffect, useState} from "react";
import ResourceSection from "../component/ResourceSection";
import { viewResource, showall } from "../api/resource";
import { toast } from "react-toastify";
function Notes() {
  const SelectResouces = [
    "Select Resource Type",
    "Notes",
    "Question Paper",
    "Youtube",
    "Important Courses",
  ];

  const [title, setTitle] = useState("");
  const [Resource, setResource] = useState("Show all");
   const [resources, setResources] = useState([]);
  const [allresources, setAllResources] = useState([]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const inputData = { title: title, type: Resource };
      const response = await viewResource(inputData);
      // toast.success("This is good");
      // toast.success("This is good");
      toast.success("Fetched resources!");
      console.log("This is the notes page data:",response.data)
      setResources(response.data);
    } catch (error) {
     toast.error(error?.response?.data?.message || "Failed to fetch resources");
      console.error("Error fetching resource:", error);
    }
  }
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const inputData = { title, type: Resource };
    //     const data = await viewResource(inputData); // data is already res.data
    //   console.log("✅ FULL API RESPONSE:", data.data); // 🔍 log this!

    //   if (data?.message && Array.isArray(data.data)) {
    //     setResources(data.data);
    //   } else {
    //     console.warn("⚠️ No message array in response");
    //     setResources([]);
    //   }  console.log("This is the notes page data:", data.message);
    //     setResources(Array.isArray(data.message) ? data.message : []);
    //   } catch (error) {
    //     console.error("Error fetching resource:", error);
    //   }
    // };

  const fetchData = async () => {
    const res = await showall();
    setAllResources(res.data.message)
  }
  useEffect(() => {
    fetchData();
  },[])
  return (
    <div className="bg-gray-100 pt-10 pb-10">
      <div className=" p-4 flex flex-col items-center justify-start mt-[80px] mb-[100px]">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-2">
            {" "}
            Study Material Hub
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Find and download notes, previous papers, important questions, and
            books.
          </p>

          {/* Search and Filters */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              value={title}
              type="text"
              placeholder="Search notes, books, papers..."
              className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={Resource}
              onChange={(e) => setResource(e.target.value)}
              required
              className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              {SelectResouces.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
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
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-5">
        <h2 className="text-3xl font-bold text-blue-600 bg-blue-100 py-3 px-6 rounded-lg shadow text-center">
          {Resource}
        </h2>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 mb-10">
        {(resources.length > 0 ? resources : allresources).map((item) => (
          <ResourceSection key={item._id} item={item} />
        ))}
      </div>

      {resources.length === 0 && allresources.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No resources available.
        </p>
      )}
    </div>
  );
}

export default Notes;
