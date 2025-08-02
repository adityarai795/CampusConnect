import React from 'react'

function Card({ title, image }) {
  return (
    <div className="w-[300px] border-2 rounded-lg p-4 m-6 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      {/* Card Content */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center">
          {image && <div className="mb-4">{image}</div>}
        </div>

        {/* Text Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card
