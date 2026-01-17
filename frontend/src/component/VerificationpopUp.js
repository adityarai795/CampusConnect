import React from "react";

function VerificationpopUp({ show, onClose }) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Login is Required</h2>
        <p className="text-gray-600 mb-4">Please log in to continue.</p>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default VerificationpopUp;
