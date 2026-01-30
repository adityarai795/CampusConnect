import  { useEffect, useState } from "react";
import { Search, Plus,  MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchMarketPlaceItems } from "../../api/marketPlace.js";
const CATEGORIES = [
  "All",
  "Laptops",
  "Phones",
  "Tablets",
  "Accessories",
  "Gaming",
  "Audio",
];

function MarketPlace() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fetchItems = async () => {
    try {
      const data = await fetchMarketPlaceItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching marketplace items:", error);
    }
  }
  useEffect(() => { 
    fetchItems();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-gradient-to-br  p-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold p-2">
                Student Gadget Marketplace
              </h1>
              <span className="flow p-1">
                Buy, sell, and trade with fellow students in your campus
                community
              </span>
            </div>
            <button
              onClick={() => navigate("/marketplace/uploadItem")}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              <Plus size={20} /> Sell Item
            </button>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/marketplace/viewItem/${item._id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs text-blue-600 font-semibold">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  ₹{item.price.toLocaleString()}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {item.location.split(",")[0]}
                  </span>
                  <span>{item.createdAt}</span>
                </div>
                <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                  {item.condition}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
