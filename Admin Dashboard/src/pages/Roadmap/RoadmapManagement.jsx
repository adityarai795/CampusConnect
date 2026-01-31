import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoadmapsRequest,
  fetchRoadmapsSuccess,
  fetchRoadmapsFailure,
  createRoadmapRequest,
  createRoadmapSuccess,
  createRoadmapFailure,
  updateRoadmapRequest,
  updateRoadmapSuccess,
  updateRoadmapFailure,
  deleteRoadmapRequest,
  deleteRoadmapSuccess,
  deleteRoadmapFailure,
  setPage,
  setFilter,
} from "../../redux/reducers/roadmapReducer";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import AdminModal from "../../component/shared/AdminModal";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import LoadingSpinner from "../../component/shared/LoadingSpinner";
import { Search, Plus, Edit2, Trash2, Map, Eye } from "lucide-react";
import { toast } from "react-toastify";

const RoadmapManagement = () => {
  const dispatch = useDispatch();
  const {
    items: roadmaps,
    loading,
    error,
    pagination,
    filters,
  } = useSelector((state) => state.roadmaps);

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [selectedRoadmapDetail, setSelectedRoadmapDetail] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roadmapToDelete, setRoadmapToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    duration: "",
    skills: "",
    topics: "",
    resources: "",
  });

  useEffect(() => {
    fetchRoadmaps();
  }, [pagination.page, filters.search, filters.difficulty]);

  const fetchRoadmaps = async () => {
    try {
      dispatch(fetchRoadmapsRequest());
      const response = await adminAPI.roadmaps.getAll(
        pagination.page,
        pagination.limit,
      );
      dispatch(
        fetchRoadmapsSuccess({
          data: response.data.data || response.data,
          total: response.data.total || response.data.length,
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(fetchRoadmapsFailure(errorMsg));
      toast.error("Failed to fetch roadmaps");
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setEditingRoadmap(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      difficulty: "beginner",
      duration: "",
      skills: "",
      topics: "",
      resources: "",
    });
    setShowModal(true);
  };

  const handleEdit = (roadmap) => {
    setIsEditing(true);
    setEditingRoadmap(roadmap);
    setFormData({
      title: roadmap.title || "",
      description: roadmap.description || "",
      category: roadmap.category || "",
      difficulty: roadmap.difficulty || "beginner",
      duration: roadmap.duration || "",
      skills: roadmap.skills?.join(", ") || "",
      topics: roadmap.topics?.join(", ") || "",
      resources: roadmap.resources?.join(", ") || "",
    });
    setShowModal(true);
  };

  const handleViewDetail = (roadmap) => {
    setSelectedRoadmapDetail(roadmap);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (roadmap) => {
    setRoadmapToDelete(roadmap);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      dispatch(deleteRoadmapRequest());
      await adminAPI.roadmaps.delete(roadmapToDelete._id);
      dispatch(deleteRoadmapSuccess(roadmapToDelete._id));
      toast.success("Roadmap deleted successfully");
      setShowDeleteModal(false);
      setRoadmapToDelete(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(deleteRoadmapFailure(errorMsg));
      toast.error("Failed to delete roadmap");
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category) {
      toast.error("Title and category are required");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
        topics: formData.topics
          ? formData.topics.split(",").map((t) => t.trim())
          : [],
        resources: formData.resources
          ? formData.resources.split(",").map((r) => r.trim())
          : [],
      };

      if (isEditing) {
        dispatch(updateRoadmapRequest());
        const response = await adminAPI.roadmaps.update(
          editingRoadmap._id,
          dataToSend,
        );
        dispatch(updateRoadmapSuccess(response.data));
        toast.success("Roadmap updated successfully");
      } else {
        dispatch(createRoadmapRequest());
        const response = await adminAPI.roadmaps.create(dataToSend);
        dispatch(createRoadmapSuccess(response.data));
        toast.success("Roadmap created successfully");
      }
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "beginner",
        duration: "",
        skills: "",
        topics: "",
        resources: "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      if (isEditing) {
        dispatch(updateRoadmapFailure(errorMsg));
      } else {
        dispatch(createRoadmapFailure(errorMsg));
      }
      toast.error(errorMsg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    {
      header: "Roadmap Title",
      render: (roadmap) => (
        <div>
          <span className="font-medium text-gray-800 block">
            {roadmap.title}
          </span>
          <span className="text-xs text-gray-500">{roadmap.category}</span>
        </div>
      ),
    },
    {
      header: "Difficulty",
      render: (roadmap) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            roadmap.difficulty === "beginner"
              ? "bg-green-100 text-green-800"
              : roadmap.difficulty === "intermediate"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {roadmap.difficulty}
        </span>
      ),
    },
    {
      header: "Duration",
      render: (roadmap) => (
        <span className="text-gray-600 text-sm">
          {roadmap.duration || "N/A"}
        </span>
      ),
    },
    {
      header: "Topics",
      render: (roadmap) => (
        <div className="flex flex-wrap gap-1">
          {roadmap.topics?.slice(0, 2).map((topic, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
            >
              {topic}
            </span>
          ))}
          {roadmap.topics?.length > 2 && (
            <span className="text-gray-600 text-xs">
              +{roadmap.topics.length - 2} more
            </span>
          )}
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleViewDetail,
      color: "text-green-600",
    },
    {
      label: "Edit",
      icon: Edit2,
      onClick: handleEdit,
      color: "text-blue-600",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDeleteClick,
      color: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
            <Map className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Roadmap Management
            </h1>
            <p className="text-gray-600">Manage learning roadmaps and paths</p>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus size={20} />
          Add Roadmap
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search roadmaps..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.search}
              onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.difficulty}
            onChange={(e) =>
              dispatch(setFilter({ difficulty: e.target.value }))
            }
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Alert */}
      {error && <Alert type="error" message={error} />}

      {/* Loading */}
      {loading ? (
        <LoadingSpinner message="Loading roadmaps..." />
      ) : (
        <>
          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {roadmaps.length > 0 ? (
              <DataTable columns={columns} data={roadmaps} actions={actions} />
            ) : (
              <div className="p-12 text-center">
                <Map className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">No roadmaps found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            current={pagination.page}
            total={Math.ceil(pagination.total / pagination.limit)}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </>
      )}

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setEditingRoadmap(null);
        }}
        title={isEditing ? "Edit Roadmap" : "Add New Roadmap"}
        size="lg"
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (e.g., 12 weeks)
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topics (comma-separated)
            </label>
            <input
              type="text"
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              placeholder="e.g., Basics, Advanced, Projects"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resources (comma-separated URLs)
            </label>
            <input
              type="text"
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              placeholder="e.g., https://example.com, https://docs.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Roadmap"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setEditingRoadmap(null);
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Detail View Modal */}
      {selectedRoadmapDetail && (
        <AdminModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedRoadmapDetail(null);
          }}
          title={selectedRoadmapDetail.title}
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">
                {selectedRoadmapDetail.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                <p className="text-gray-600">
                  {selectedRoadmapDetail.category}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Duration</h3>
                <p className="text-gray-600">
                  {selectedRoadmapDetail.duration || "N/A"}
                </p>
              </div>
            </div>
            {selectedRoadmapDetail.skills && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoadmapDetail.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedRoadmapDetail.topics && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoadmapDetail.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setShowDetailModal(false);
                setSelectedRoadmapDetail(null);
              }}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </AdminModal>
      )}

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setRoadmapToDelete(null);
        }}
        title="Confirm Delete"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <strong>{roadmapToDelete?.title}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmDelete}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setRoadmapToDelete(null);
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default RoadmapManagement;
