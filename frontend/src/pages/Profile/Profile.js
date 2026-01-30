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
  Plus,
  LogOut,
  X,
  Linkedin,
  Github,
  Code,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import { getProfile, updateProfile } from "../../api/profile";
import { useNavigate } from "react-router-dom";

const EMPTY_ACADEMIC = {
  institutionType: "college",
  institutionName: "",
  status: "active",
  grade: "",
  section: "",
  branch: "",
  semester: "",
  rollNumber: "",
  startYear: "",
  endYear: "",
  performanceMetric: "Percentage",
  score: "",
};

function Profile() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const [profileData, setProfileData] = useState({
    abcId: "",
    name: "",
    email: "",
    mobileno: "",
    studentCategory: "college",
    academicDetails: [],
    socialLinks: {
      linkedin: "",
      github: "",
      leetcode: "",
    },
    skills: [],
    certifications: [],
  });

  // ================= FETCH =================
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const data = res.data.data;

      setProfileData({
        ...data,
        academicDetails: data.academicDetails || [],
        socialLinks: data.socialLinks || {
          linkedin: "",
          github: "",
          leetcode: "",
        },
        skills: data.skills || [],
        certifications: data.certifications || [],
      });
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= BASIC INPUT =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= ACADEMIC =================
  const handleAcademicChange = (index, field, value) => {
    setProfileData((prev) => {
      const updated = [...prev.academicDetails];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, academicDetails: updated };
    });
  };

  const handleAddAcademic = () => {
    setProfileData((prev) => ({
      ...prev,
      academicDetails: [...prev.academicDetails, { ...EMPTY_ACADEMIC }],
    }));
  };

  const handleDeleteAcademic = (index) => {
    setProfileData((prev) => ({
      ...prev,
      academicDetails: prev.academicDetails.filter((_, i) => i !== index),
    }));
  };

  // ================= SKILLS =================
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };

  const handleRemoveSkill = (index) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // ================= CERTIFICATIONS =================
  const handleAddCertification = () => {
    if (!newCertification.trim()) return;
    setProfileData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification.trim()],
    }));
    setNewCertification("");
  };

  const handleRemoveCertification = (index) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // ================= SOCIAL =================
  const handleSocialLinkChange = (platform, value) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  // ================= UI =================
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
            {profileData.name || "Your Name"}
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
                  disabled={true}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:outline-none transition-all"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="mobileno"
                  value={profileData.mobileno}
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Academic Details
              </h2>
            </div>
            {isEditing && (
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={handleAddAcademic}
              >
                + Add one more
              </button>
            )}
          </div>

          {profileData.academicDetails.map((item, index) => (
            <div key={index} className="mb-8 border-b pb-6 last:border-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Institution {index + 1}
                </h3>
                {isEditing && profileData.academicDetails.length > 1 && (
                  <button
                    className="text-red-600 hover:underline text-sm flex items-center gap-1"
                    onClick={() => handleDeleteAcademic(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>

              {/* Institution Type */}
              <div className="group mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Building2 className="w-4 h-4" />
                  Institution Type
                </label>
                <select
                  value={item.institutionType}
                  onChange={(e) =>
                    handleAcademicChange(index, "institutionType", e.target.value)
                  }
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                >
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                </select>
              </div>

              {/* Institution Name */}
              <div className="group mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Building2 className="w-4 h-4" />
                  Institution Name
                </label>
                <input
                  type="text"
                  value={item.institutionName}
                  onChange={(e) =>
                    handleAcademicChange(index, "institutionName", e.target.value)
                  }
                  disabled={!isEditing}
                  placeholder="Enter institution name"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                />
              </div>

              {/* Branch and Semester */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    Branch
                  </label>
                  <input
                    type="text"
                    value={item.branch}
                    onChange={(e) =>
                      handleAcademicChange(index, "branch", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., Computer Science"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    Semester
                  </label>
                  <input
                    type="text"
                    value={item.semester}
                    onChange={(e) =>
                      handleAcademicChange(index, "semester", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 5th Semester"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Roll Number and Score */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <FileText className="w-4 h-4" />
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={item.rollNumber}
                    onChange={(e) =>
                      handleAcademicChange(index, "rollNumber", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter roll number"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <FileText className="w-4 h-4" />
                    Score / CGPA
                  </label>
                  <input
                    type="text"
                    value={item.score}
                    onChange={(e) =>
                      handleAcademicChange(index, "score", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 8.5 CGPA"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isEditing
                        ? "border-blue-300 bg-white focus:border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Code className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
          </div>

          <div className="space-y-4">
            {/* Display existing skills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {profileData.skills && profileData.skills.length > 0 ? (
                profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No skills added yet</p>
              )}
            </div>

            {/* Add new skill */}
            {isEditing && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-300 bg-white focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="Add a skill (e.g., React, Python)..."
                />
                <button
                  onClick={handleAddSkill}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Professional Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Link className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Professional Links</h2>
          </div>

          <div className="space-y-4">
            {/* Certifications Section */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <FileText className="w-4 h-4" />
                Certifications
              </label>

              {/* Display existing certifications */}
              <div className="space-y-2 mb-3">
                {profileData.certifications && profileData.certifications.length > 0 ? (
                  profileData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-purple-50 px-4 py-2 rounded-lg"
                    >
                      <a
                        href={cert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline text-sm truncate flex-1"
                      >
                        {cert}
                      </a>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveCertification(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No certifications added yet</p>
                )}
              </div>

              {/* Add new certification */}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCertification()}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-300 bg-white focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="https://certificate-url.com"
                  />
                  <button
                    onClick={handleAddCertification}
                    className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={profileData.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={profileData.socialLinks.github}
                  onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                  placeholder="https://github.com/your-username"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <Code className="w-4 h-4" />
                  LeetCode
                </label>
                <input
                  type="url"
                  value={profileData.socialLinks.leetcode}
                  onChange={(e) => handleSocialLinkChange("leetcode", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isEditing
                      ? "border-blue-300 bg-white focus:border-blue-500"
                      : "border-gray-200 bg-gray-50"
                  } focus:outline-none transition-all`}
                  placeholder="https://leetcode.com/your-username"
                />
              </div>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 group"
            onClick={() => navigate("/profile/mynotes")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">My Notes</h3>
              <p className="text-sm text-gray-500 mt-1">View all notes</p>
            </div>
          </button>

          <button
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 group"
            onClick={() => navigate("/profile/bookmarked")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                <BookMarked className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Bookmarked</h3>
              <p className="text-sm text-gray-500 mt-1">Saved items</p>
            </div>
          </button>

          <button
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 group"
            onClick={() => navigate("/profile/myjobs")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <Briefcase className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Applications</h3>
              <p className="text-sm text-gray-500 mt-1">Job applications</p>
            </div>
          </button>
        </div>

        {/* Logout Section */}
        {!isEditing && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
