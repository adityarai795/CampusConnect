import React from "react";
import { Link } from "react-router-dom";
function Card({ title, icon, link }) {
  return (
    <div className="w-[300px] border-2 rounded-lg p-4 m-6 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      {/* Card Content */}
      <Link to={link}>
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center">
            {icon && <div className="mb-4">{icon}</div>}
          </div>

          {/* Text Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
