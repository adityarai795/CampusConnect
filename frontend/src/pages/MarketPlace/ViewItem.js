import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Calendar, X, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMarketPlaceItemById } from "../../api/marketPlace.js";
import axios from "axios";

function ViewItem() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const fetchItem = async (id) => {
  try {
    const res = await fetchMarketPlaceItemById(id);
    console.log(res);
    setItem(res);
  } catch (err) {
    setError("Item not found");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    

    fetchItem(id);
  }, [id]);

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading item...</p>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/marketplace")}
          className="text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/marketplace")}
        className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <X size={20} /> Back to Marketplace
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Item Image */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full md:w-1/3 h-auto rounded-lg object-cover"
        />

        {/* Item Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{item.title}</h2>

          <p className="text-xl text-green-600 font-semibold mb-4">
            ₹{item.price.toLocaleString()}
          </p>

          <p className="mb-4">{item.description}</p>

          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
              {item.category}
            </span>
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {item.condition}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-600" />
              <span>{item.owner.username ? item.owner.username : "NA"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-600" />
              <span>{item.owner.contact ? item.owner.contact : "NA"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-600" />
              <span>{item.owner.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-600" />
              <span>{item.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-600" />
              <span>Posted: {item.postedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;
