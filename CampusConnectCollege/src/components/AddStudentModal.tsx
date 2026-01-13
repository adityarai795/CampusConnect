const AddStudentModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between">
          <div className="pb-3">
            <h2 className="text-xl font-semibold ">Add Student</h2>
            <p className="font-bold">Form to add a new student goes here.</p>
          </div>
          <div>
            {" "}
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
        <div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student ABC Id */}
            <div>
              <label className="block text-gray-700 mb-2">Student ABC Id</label>
              <input
                type="text"
                placeholder="Enter ABC Id"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            {/* Student Name */}
            <div>
              <label className="block text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-gray-700 mb-2">Roll Number</label>
              <input
                type="text"
                placeholder="Enter roll number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-gray-700 mb-2">Class</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Select Class</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block text-gray-700 mb-2">Section</label>
              <input
                type="text"
                placeholder="e.g. A, B, C"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                // rows="3"
                placeholder="Enter address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            {/* Parent Name */}
            <div>
              <label className="block text-gray-700 mb-2">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                placeholder="Enter parent name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Parent Contact */}
            <div>
              <label className="block text-gray-700 mb-2">
                Parent Contact Number
              </label>
              <input
                type="tel"
                placeholder="Enter parent contact"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-4 gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
