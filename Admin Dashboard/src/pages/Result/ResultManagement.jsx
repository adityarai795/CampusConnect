import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search, Download } from "lucide-react";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import AdminModal from "../../component/shared/AdminModal";
import {
  fetchResultsRequest,
  fetchResultsSuccess,
  fetchResultsFailure,
  setResultSearchFilter,
  setResultPage,
} from "../../redux/reducers/resultReducer";

const ResultManagement = () => {
  const dispatch = useDispatch();
  const { items, loading, error, pagination, filters } = useSelector(
    (state) => state.results,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: "success", message: "" });
  const [formData, setFormData] = useState({
    studentId: "",
    semester: "",
    gpa: "",
    totalMarks: "",
    remarks: "",
    file: null,
  });

  useEffect(() => {
    loadResults();
  }, [pagination.page, filters.search]);

  const loadResults = async () => {
    dispatch(fetchResultsRequest());
    try {
      const response = await adminAPI.results.getAll(
        pagination.page,
        pagination.limit,
      );
      dispatch(
        fetchResultsSuccess({
          results: response.data.data || [],
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: response.data.total || 0,
          },
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load results";
      dispatch(fetchResultsFailure(errorMsg));
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

  const handleOpenModal = (result = null) => {
    if (result) {
      setEditingItem(result);
      setFormData({
        studentId: result.studentId || "",
        semester: result.semester || "",
        gpa: result.gpa || "",
        totalMarks: result.totalMarks || "",
        remarks: result.remarks || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        studentId: "",
        semester: "",
        gpa: "",
        totalMarks: "",
        remarks: "",
        file: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
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
        await adminAPI.results.update(editingItem._id, data);
        showSuccessAlert("Result updated successfully");
      } else {
        await adminAPI.results.upload(data);
        showSuccessAlert("Result uploaded successfully");
      }

      handleCloseModal();
      loadResults();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to save result");
    }
  };

  const handleDelete = async (result) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    try {
      await adminAPI.results.delete(result._id);
      showSuccessAlert("Result deleted successfully");
      loadResults();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to delete result");
    }
  };

  const columns = [
    {
      key: "studentId",
      label: "Student ID",
      render: (id) => id || "-",
    },
    { key: "semester", label: "Semester" },
    {
      key: "gpa",
      label: "GPA",
      render: (gpa) => (gpa ? gpa.toFixed(2) : "-"),
    },
    {
      key: "totalMarks",
      label: "Total Marks",
      render: (marks) => marks || "-",
    },
    {
      key: "remarks",
      label: "Remarks",
      render: (remark) => remark || "-",
    },
    {
      key: "createdAt",
      label: "Uploaded",
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
            Result Management
          </h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Upload Result
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
              placeholder="Search results..."
              value={filters.search}
              onChange={(e) => dispatch(setResultSearchFilter(e.target.value))}
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
          noDataMessage="No results found"
        />

        {/* Pagination */}
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setResultPage(page))}
          loading={loading}
        />
      </div>

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        title={editingItem ? "Edit Result" : "Upload New Result"}
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
              <Download size={18} />
              {editingItem ? "Update" : "Upload"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID *
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Student ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester *
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA
              </label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 8.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Marks
              </label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 850"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional remarks"
            />
          </div>

          {!editingItem && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Result File
              </label>
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf,.xls,.xlsx,.csv"
              />
            </div>
          )}
        </form>
      </AdminModal>
    </div>
  );
};

export default ResultManagement;
