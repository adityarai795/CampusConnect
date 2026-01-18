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
];

function ViewItem() {
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

  // 🔍 Filter Logic
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 📝 Form Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ➕ Add Item
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      postedDate: "Just now",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    };

    setItems((prev) => [newItem, ...prev]); // ✅ safe update
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/marketplace")}
        className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <X size={20} /> Back to Marketplace
      </button>

      {/* 📦 Item List */}
      {!selectedItem && (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="font-bold mt-2">{item.title}</h3>
              <p className="text-green-600 font-semibold">
                ₹{item.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* 📄 Item Detail View */}
      {selectedItem && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
                {selectedItem.category}
              </span>

              <h1 className="text-3xl font-bold mb-2">{selectedItem.title}</h1>

              <p className="text-3xl font-bold text-green-600 mb-4">
                ₹{selectedItem.price.toLocaleString()}
              </p>

              <div className="mb-4">
                <span className="px-3 py-1 bg-yellow-100 rounded text-sm">
                  {selectedItem.condition}
                </span>
              </div>

              <div className="border-t border-b py-4 mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span>{selectedItem.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <span>Posted {selectedItem.postedDate}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Seller Info</h3>
                <p className="font-medium">{selectedItem.seller}</p>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <a href={`tel:${selectedItem.contact}`}>
                      {selectedItem.contact}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href={`mailto:${selectedItem.email}`}>
                      {selectedItem.email}
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewItem;
