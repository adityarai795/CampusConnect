import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Calendar,
  Link,
  Edit2,
  Trash2,
  BookMarked,
  FileText,
  Briefcase,
  Camera,
} from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Aditya Rai",
    email: "adityarai@gmail.com",
    phone: "123654789",
    university: "university1",
    branch: "branch1",
    semester: "semester3",
    bio: "Passionate about technology and innovation. Always eager to learn new things and connect with like-minded individuals.",
    portfolio: "https://linkedin.com/in/aditya-rai",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add your API call here
    console.log("Profile updated:", profileData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      {/* Header with Cover Photo */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="w-20 h-20 text-gray-400" />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all">
              <Camera className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-24">
        {/* Name and Edit Button */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {profileData.name}
          </h1>
          <p className="text-gray-600">{profileData.email}</p>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div>
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Academic Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Building2 className="w-4 h-4" />
                  University
                </label>
                <select
                  name="university"
                  value={profileData.university}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                >
                  <option value="">Select your university</option>
                  <option value="university1">
                    Indian Institute of Technology
                  </option>
                  <option value="university2">
                    National Institute of Technology
                  </option>
                  <option value="university3">Delhi University</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={profileData.branch}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  >
                    <option value="">Select your branch</option>
                    <option value="branch1">
                      Computer Science Engineering
                    </option>
                    <option value="branch2">Information Technology</option>
                    <option value="branch3">Electronics & Communication</option>
                  </select>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={profileData.semester}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  >
                    <option value="">Select semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={`semester${sem}`}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">About Me</h2>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all resize-none`}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Link className="w-4 h-4" />
                  LinkedIn / Portfolio
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={profileData.portfolio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">My Notes</h3>
              <p className="text-sm text-gray-500 mt-1">View all notes</p>
            </div>
          </button>

          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                <BookMarked className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Bookmarked</h3>
              <p className="text-sm text-gray-500 mt-1">Saved items</p>
            </div>
          </button>

          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <Briefcase className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Applications</h3>
              <p className="text-sm text-gray-500 mt-1">Job applications</p>
            </div>
          </button>
        </div>

        {/* Danger Zone */}
        {!isEditing && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
