import { useState } from "react";
import { Save, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setSuccessMessage("Password changed successfully!");
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setShowPasswordForm(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300">
          {successMessage}
        </div>
      )}

      {/* Settings Container */}
      <div className="max-w-2xl">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Profile Picture</p>
                <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  Upload Photo
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  disabled
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

          <div className="space-y-4">
            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                <Lock className="w-5 h-5" />
                Change Password
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => setShowPasswordForm(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <p className="text-gray-600 mb-4">
              Add an extra layer of security to your account
            </p>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
