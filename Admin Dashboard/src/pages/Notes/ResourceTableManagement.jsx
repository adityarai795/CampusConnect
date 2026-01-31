import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search, Upload } from "lucide-react";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import AdminModal from "../../component/shared/AdminModal";
import {
  fetchResourcesRequest,
  fetchResourcesSuccess,
  fetchResourcesFailure,
  setSearchFilter,
  setPage,
} from "../../redux/reducers/resourceReducer";

const ResourceManagement = () => {
  const dispatch = useDispatch();
  const { items, loading, error, pagination, filters } = useSelector(
    (state) => state.resources,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: "success", message: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    branch: "",
    year: "",
    semester: "",
    subject: "",
    file: null,
  });

  // Fetch resources
  useEffect(() => {
    loadResources();
  }, [pagination.page, filters.search]);

  const loadResources = async () => {
    dispatch(fetchResourcesRequest());
    try {
      const response = await adminAPI.resources.getAll(
        pagination.page,
        pagination.limit,
        filters.search,
      );
      dispatch(
        fetchResourcesSuccess({
          resources: response.data.data || [],
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: response.data.total || 0,
          },
        }),
      );
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load resources";
      dispatch(fetchResourcesFailure(errorMsg));
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

  const handleOpenModal = (resource = null) => {
    if (resource) {
      setEditingItem(resource);
      setFormData({
        title: resource.title || "",
        description: resource.description || "",
        category: resource.category || "",
        branch: resource.branch || "",
        year: resource.year || "",
        semester: resource.semester || "",
        subject: resource.subject || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        branch: "",
        year: "",
        semester: "",
        subject: "",
        file: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      branch: "",
      year: "",
      semester: "",
      subject: "",
      file: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      if (editingItem) {
        await adminAPI.resources.update(editingItem._id, data);
        showSuccessAlert("Resource updated successfully");
      } else {
        await adminAPI.resources.upload(data);
        showSuccessAlert("Resource uploaded successfully");
      }

      handleCloseModal();
      loadResources();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to save resource");
    }
  };

  const handleDelete = async (resource) => {
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;

    try {
      await adminAPI.resources.delete(resource._id);
      showSuccessAlert("Resource deleted successfully");
      loadResources();
    } catch (err) {
      showErrorAlert(
        err.response?.data?.message || "Failed to delete resource",
      );
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "branch", label: "Branch" },
    {
      key: "year",
      label: "Year",
      render: (year) => year || "-",
    },
    {
      key: "semester",
      label: "Semester",
      render: (sem) => sem || "-",
    },
    {
      key: "subject",
      label: "Subject",
      render: (subject) => subject || "-",
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
            Resource Management
          </h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Upload Resource
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

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={filters.search}
              onChange={(e) => dispatch(setSearchFilter(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={items}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          noDataMessage="No resources found"
        />

        {/* Pagination */}
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setPage(page))}
          loading={loading}
        />
      </div>

      {/* Modal for Create/Edit */}
      <AdminModal
        isOpen={isModalOpen}
        title={editingItem ? "Edit Resource" : "Upload New Resource"}
        onClose={handleCloseModal}
        size="lg"
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Upload size={18} />
              {editingItem ? "Update" : "Upload"}
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
              placeholder="Resource title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Resource description"
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
                placeholder="e.g., Notes, Books"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CSE, ECE"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Semester</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Data Structures"
              />
            </div>
          </div>

          {!editingItem && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File *
              </label>
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
              />
            </div>
          )}
        </form>
      </AdminModal>
    </div>
  );
};

export default ResourceManagement;
