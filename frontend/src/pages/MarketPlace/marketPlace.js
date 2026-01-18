import React, { useState } from "react";
import { Search, Plus, X, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CATEGORIES = [
  "All",
  "Laptops",
  "Phones",
  "Tablets",
  "Accessories",
  "Gaming",
  "Audio",
];

const INITIAL_ITEMS = [
  {
    id: 1,
    title: "MacBook Pro 2020",
    price: 45000,
    category: "Laptops",
    condition: "Like New",
    description:
      "M1 chip, 8GB RAM, 256GB SSD. Excellent condition with original box and charger.",
    seller: "Rahul Kumar",
    contact: "+91 98765 43210",
    email: "rahul@example.com",
    location: "Gomti Nagar, Lucknow",
    postedDate: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "iPhone 13 Pro",
    price: 55000,
    category: "Phones",
    condition: "Good",
    description:
      "128GB, Graphite color. Minor scratches on back, screen is perfect. Battery health 87%.",
    seller: "Priya Sharma",
    contact: "+91 87654 32109",
    email: "priya@example.com",
    location: "Hazratganj, Lucknow",
    postedDate: "5 days ago",
    image:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "iPad Air 2022",
    price: 38000,
    category: "Tablets",
    condition: "Like New",
    description:
      "64GB, Wi-Fi only. Comes with Apple Pencil 2nd gen and smart folio case.",
    seller: "Amit Verma",
    contact: "+91 76543 21098",
    email: "amit@example.com",
    location: "Indira Nagar, Lucknow",
    postedDate: "1 week ago",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Sony WH-1000XM4",
    price: 15000,
    category: "Audio",
    condition: "Excellent",
    description:
      "Noise cancelling headphones. Used for 6 months, all accessories included.",
    seller: "Sneha Gupta",
    contact: "+91 65432 10987",
    email: "sneha@example.com",
    location: "Aliganj, Lucknow",
    postedDate: "3 days ago",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
  },
];

function MarketPlace() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Laptops",
    condition: "Good",
    description: "",
    seller: "",
    contact: "",
    email: "",
    location: "",
  });

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: items.length + 1,
      ...formData,
      price: parseFloat(formData.price),
      postedDate: "Just now",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    };
    setItems([newItem, ...items]);
    setShowUploadForm(false);
    setFormData({
      title: "",
      price: "",
      category: "Laptops",
      condition: "Good",
      description: "",
      seller: "",
      contact: "",
      email: "",
      location: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-gradient-to-br  p-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold p-2">Student Gadget Marketplace</h1>
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
              key={item.id}
              onClick={() => navigate(`/marketplace/viewItem/${item.id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={item.image}
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
                  <span>{item.postedDate}</span>
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

// import React from 'react'

// function marketPlace() {
//   return (
//     <div>marketPlace</div>
//   )
// }

// export default marketPlace