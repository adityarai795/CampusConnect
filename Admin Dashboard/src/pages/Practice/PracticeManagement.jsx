import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import AdminModal from "../../component/shared/AdminModal";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import LoadingSpinner from "../../component/shared/LoadingSpinner";
import { Search, Plus, Edit2, Trash2, BookMarked } from "lucide-react";
import { toast } from "react-toastify";

const PracticeManagement = () => {
  const [activeTab, setActiveTab] = useState("quiz"); // quiz, projects, problems
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
    points: "",
    options: "",
    correctAnswer: "",
  });

  // Fetch data based on active tab
  useEffect(() => {
    fetchItems();
  }, [activeTab, page, search]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      let response;

      if (activeTab === "quiz") {
        response = await adminAPI.practice.quizQuestions.getAll(page, 10);
      } else if (activeTab === "projects") {
        response = await adminAPI.practice.projects.getAll(page, 10);
      } else {
        response = await adminAPI.practice.codingProblems.getAll(page, 10);
      }

      setItems(response.data.data || response.data);
      setTotal(response.data.total || response.data.length);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      toast.error(`Failed to fetch ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setSelectedItem(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      difficulty: "easy",
      points: "",
      options: "",
      correctAnswer: "",
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setSelectedItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      difficulty: item.difficulty || "easy",
      points: item.points || "",
      options: item.options?.join(", ") || "",
      correctAnswer: item.correctAnswer || "",
    });
    setShowModal(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      let api;
      if (activeTab === "quiz") {
        api = adminAPI.practice.quizQuestions.delete(itemToDelete._id);
      } else if (activeTab === "projects") {
        api = adminAPI.practice.projects.delete(itemToDelete._id);
      } else {
        api = adminAPI.practice.codingProblems.delete(itemToDelete._id);
      }

      await api;
      toast.success(`${activeTab.slice(0, -1)} deleted successfully`);
      setShowDeleteModal(false);
      setItemToDelete(null);
      fetchItems();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Title is required");
      return;
    }

    try {
      setLoading(true);
      const dataToSend = {
        ...formData,
        options: formData.options
          ? formData.options.split(",").map((o) => o.trim())
          : [],
      };

      let api;
      if (isEditing) {
        if (activeTab === "quiz") {
          api = adminAPI.practice.quizQuestions.update(
            selectedItem._id,
            dataToSend,
          );
        } else if (activeTab === "projects") {
          api = adminAPI.practice.projects.update(selectedItem._id, dataToSend);
        } else {
          api = adminAPI.practice.codingProblems.update(
            selectedItem._id,
            dataToSend,
          );
        }
      } else {
        if (activeTab === "quiz") {
          api = adminAPI.practice.quizQuestions.create(dataToSend);
        } else if (activeTab === "projects") {
          api = adminAPI.practice.projects.create(dataToSend);
        } else {
          api = adminAPI.practice.codingProblems.create(dataToSend);
        }
      }

      await api;
      toast.success(
        `${activeTab.slice(0, -1)} ${isEditing ? "updated" : "created"} successfully`,
      );
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "easy",
        points: "",
        options: "",
        correctAnswer: "",
      });
      fetchItems();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getColumns = () => {
    if (activeTab === "quiz") {
      return [
        {
          header: "Question",
          render: (item) => (
            <div>
              <span className="font-medium text-gray-800 block">
                {item.title}
              </span>
              <span className="text-xs text-gray-500">{item.category}</span>
            </div>
          ),
        },
        {
          header: "Difficulty",
          render: (item) => (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : item.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {item.difficulty}
            </span>
          ),
        },
        {
          header: "Points",
          render: (item) => (
            <span className="font-semibold text-gray-800">
              {item.points || "N/A"}
            </span>
          ),
        },
        {
          header: "Options",
          render: (item) => (
            <span className="text-gray-600 text-sm">
              {item.options?.length || 0} options
            </span>
          ),
        },
      ];
    } else if (activeTab === "projects") {
      return [
        {
          header: "Project Title",
          render: (item) => (
            <div>
              <span className="font-medium text-gray-800 block">
                {item.title}
              </span>
              <span className="text-xs text-gray-500">{item.category}</span>
            </div>
          ),
        },
        {
          header: "Difficulty",
          render: (item) => (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : item.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {item.difficulty}
            </span>
          ),
        },
        {
          header: "Description",
          render: (item) => (
            <span className="text-gray-600 text-sm truncate">
              {item.description || "N/A"}
            </span>
          ),
        },
      ];
    } else {
      return [
        {
          header: "Problem Title",
          render: (item) => (
            <div>
              <span className="font-medium text-gray-800 block">
                {item.title}
              </span>
              <span className="text-xs text-gray-500">{item.category}</span>
            </div>
          ),
        },
        {
          header: "Difficulty",
          render: (item) => (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : item.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {item.difficulty}
            </span>
          ),
        },
        {
          header: "Points",
          render: (item) => (
            <span className="font-semibold text-gray-800">
              {item.points || "N/A"}
            </span>
          ),
        },
      ];
    }
  };

  const actions = [
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

  const getTabLabel = (tab) => {
    if (tab === "quiz") return "Quiz Questions";
    if (tab === "projects") return "Projects";
    return "Coding Problems";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
            <BookMarked className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Practice Management
            </h1>
            <p className="text-gray-600">
              Manage practice questions, projects, and problems
            </p>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus size={20} />
          Add {getTabLabel(activeTab).slice(0, -1)}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex border-b">
          {["quiz", "projects", "problems"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`flex-1 py-4 font-semibold transition ${
                activeTab === tab
                  ? "border-b-2 border-cyan-600 text-cyan-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Search Filter */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${getTabLabel(activeTab).toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Alert */}
        {error && <Alert type="error" message={error} />}

        {/* Loading */}
        {loading ? (
          <LoadingSpinner
            message={`Loading ${getTabLabel(activeTab).toLowerCase()}...`}
          />
        ) : (
          <>
            {/* Data Table */}
            <div className="overflow-hidden">
              {items.length > 0 ? (
                <DataTable
                  columns={getColumns()}
                  data={items}
                  actions={actions}
                />
              ) : (
                <div className="p-12 text-center">
                  <BookMarked
                    className="mx-auto text-gray-300 mb-4"
                    size={48}
                  />
                  <p className="text-gray-500">
                    No {getTabLabel(activeTab).toLowerCase()} found
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t">
              <Pagination
                current={page}
                total={Math.ceil(total / 10)}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setSelectedItem(null);
        }}
        title={
          isEditing
            ? `Edit ${getTabLabel(activeTab).slice(0, -1)}`
            : `Add New ${getTabLabel(activeTab).slice(0, -1)}`
        }
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          {activeTab !== "projects" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {activeTab === "quiz" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options (comma-separated)
                </label>
                <input
                  type="text"
                  name="options"
                  value={formData.options}
                  onChange={handleChange}
                  placeholder="e.g., Option 1, Option 2, Option 3, Option 4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correct Answer
                </label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </>
          )}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setSelectedItem(null);
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        title="Confirm Delete"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <strong>{itemToDelete?.title}</strong>? This action cannot be
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
                setItemToDelete(null);
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

export default PracticeManagement;
