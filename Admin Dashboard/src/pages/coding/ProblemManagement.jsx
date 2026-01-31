import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search } from "lucide-react";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import AdminModal from "../../component/shared/AdminModal";
import {
  fetchProblemsRequest,
  fetchProblemsSuccess,
  fetchProblemsFailure,
  setProblemSearchFilter,
  setProblemDifficultyFilter,
  setProblemPage,
} from "../../redux/reducers/problemReducer";

const ProblemManagement = () => {
  const dispatch = useDispatch();
  const { items, loading, pagination, filters } = useSelector(
    (state) => state.problems,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: "success", message: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "medium",
    category: "",
    examples: "",
    constraints: "",
    solution: "",
  });

  useEffect(() => {
    loadProblems();
  }, [pagination.page, filters.search, filters.difficulty]);

  const loadProblems = async () => {
    dispatch(fetchProblemsRequest());
    try {
      const response = await adminAPI.problems.getAll(
        pagination.page,
        pagination.limit,
        filters.difficulty,
      );
      dispatch(
        fetchProblemsSuccess({
          problems: response.data.data || [],
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: response.data.total || 0,
          },
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load problems";
      dispatch(fetchProblemsFailure(errorMsg));
      showErrorAlert(errorMsg);
    }
  };

  const showErrorAlert = (message) => {
    setAlertData({ type: "error", message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const showSuccessAlert = (message) => {
    setAlertData({ type: "success", message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleOpenModal = (problem = null) => {
    if (problem) {
      setEditingItem(problem);
      setFormData({
        title: problem.title || "",
        description: problem.description || "",
        difficulty: problem.difficulty || "medium",
        category: problem.category || "",
        examples: problem.examples || "",
        constraints: problem.constraints || "",
        solution: problem.solution || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        difficulty: "medium",
        category: "",
        examples: "",
        constraints: "",
        solution: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await adminAPI.problems.update(editingItem._id, formData);
        showSuccessAlert("Problem updated successfully");
      } else {
        await adminAPI.problems.create(formData);
        showSuccessAlert("Problem created successfully");
      }
      handleCloseModal();
      loadProblems();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to save problem");
    }
  };

  const handleDelete = async (problem) => {
    if (!window.confirm("Are you sure you want to delete this problem?"))
      return;
    try {
      await adminAPI.problems.delete(problem._id);
      showSuccessAlert("Problem deleted successfully");
      loadProblems();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to delete problem");
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "difficulty",
      label: "Difficulty",
      render: (diff) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            diff === "easy"
              ? "bg-green-100 text-green-800"
              : diff === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {diff}
        </span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (desc) => desc?.substring(0, 40) + "..." || "-",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  if (loading && items.length === 0) {
    return <PageLoader />;
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Coding Problem Management
          </h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Problem
          </button>
        </div>

        {/* Alerts */}
        {showAlert && (
          <Alert
            type={alertData.type}
            message={alertData.message}
            onClose={() => setShowAlert(false)}
          />
        )}

        {/* Filters */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              value={filters.search}
              onChange={(e) => dispatch(setProblemSearchFilter(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              dispatch(setProblemDifficultyFilter(e.target.value))
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={items}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          noDataMessage="No problems found"
        />

        {/* Pagination */}
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setProblemPage(page))}
          loading={loading}
        />
      </div>

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        title={editingItem ? "Edit Problem" : "Add New Problem"}
        onClose={handleCloseModal}
        size="2xl"
        footer={
          <>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingItem ? "Update" : "Add"} Problem
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Problem title"
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
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Arrays, Strings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Problem description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Examples
            </label>
            <textarea
              name="examples"
              value={formData.examples}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Examples (e.g., Input/Output)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Constraints
            </label>
            <textarea
              name="constraints"
              value={formData.constraints}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Problem constraints"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Solution (Optional)
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Solution or hints"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default ProblemManagement;
