import { useEffect, useState } from "react";
import { showallProblem } from '../api/codingProblem.js'
function ShowCoding() {
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([
    {
      sn: 1,
      problem: "Selection Sort",
      topic: "Sorting",
      link: "https://takeuforward.org/plus/dsa/problems/selection-sort",
      status: false,
      difficulty: "Easy",
    },
    {
      sn: 2,
      problem: "Binary Search",
      topic: "Searching",
      link: "https://takeuforward.org/plus/dsa/problems/binary-search",
      status: true,
      difficulty: "Medium",
    },
    {
      sn: 3,
      problem: "DP - Knapsack",
      topic: "Dynamic Programming",
      link: "https://takeuforward.org/plus/dsa/problems/knapsack",
      status: false,
      difficulty: "Hard",
    },
  ]);
  const fetchData = async () => {
    const response = await showallProblem();
    console.log(response.data.problem);
    setData(response.data.problem);
  }
  // Filter search result
  const filteredData = data.filter(
    (item) =>
      item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle status
  const toggleStatus = (sn) => {
    setData((prev) =>
      prev.map((item) =>
        item.sn === sn ? { ...item, status: !item.status } : item
      )
    );
  };
  useEffect(() => {
    fetchData();
  },[])
  return (
    <div className="bg-gray-100 min-h-screen pt-[100px] px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        📚 Coding Practice Tracker
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search problem or topic..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full mb-4 focus:ring focus:ring-blue-300"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white text-center">
            <tr>
              <th className="px-4 py-2">Problem</th>
              <th className="px-4 py-2">Topic</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Difficulty</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{item.problem}</td>
                <td className="px-4 py-2">{item.topic}</td>
                <td className="px-4 py-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => toggleStatus(item.sn)}
                  />
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    item.difficulty === "Easy"
                      ? "text-green-600"
                      : item.difficulty === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {item.level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Data */}
      {filteredData.length === 0 && (
        <p className="mt-4 text-gray-500 text-center">😢 No problems found.</p>
      )}
    </div>
  );
}

export default ShowCoding;
