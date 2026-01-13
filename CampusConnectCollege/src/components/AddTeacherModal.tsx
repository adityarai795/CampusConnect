function AddTeacherModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add Teacher</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              placeholder="Enter teacher name"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              placeholder="10 digit mobile number"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">Select Category</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="university">University</option>
            </select>
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              placeholder="EMP-1023"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              placeholder="Assistant Professor"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 mb-1">Department</label>
            <input
              type="text"
              placeholder="Computer Science"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-gray-700 mb-1">Subjects</label>
            <input
              type="text"
              placeholder="Maths, Physics"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>


          {/* Account Status */}
          <div>
            <label className="block text-gray-700 mb-1">Account Status</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Teacher
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherModal;
