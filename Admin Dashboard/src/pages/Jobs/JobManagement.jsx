import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search, Users } from "lucide-react";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import AdminModal from "../../component/shared/AdminModal";
import {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
  setJobSearchFilter,
  setJobStatusFilter,
  setJobPage,
  setApplicants,
} from "../../redux/reducers/jobReducer";

const JobManagement = () => {
  const dispatch = useDispatch();
  const { items, loading, error, pagination, filters, applicants } =
    useSelector((state) => state.jobs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: "success", message: "" });
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    status: "active",
  });

  useEffect(() => {
    loadJobs();
  }, [pagination.page, filters.search, filters.status]);

  const loadJobs = async () => {
    dispatch(fetchJobsRequest());
    try {
      const response = await adminAPI.jobs.getAll(
        pagination.page,
        pagination.limit,
        filters.status,
      );
      dispatch(
        fetchJobsSuccess({
          jobs: response.data.data || [],
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: response.data.total || 0,
          },
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load jobs";
      dispatch(fetchJobsFailure(errorMsg));
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

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingItem(job);
      setFormData({
        title: job.title || "",
        company: job.company || "",
        description: job.description || "",
        requirements: job.requirements || "",
        salary: job.salary || "",
        location: job.location || "",
        jobType: job.jobType || "Full-time",
        status: job.status || "active",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        company: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "Full-time",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleViewApplicants = async (job) => {
    try {
      const response = await adminAPI.jobs.getApplicants(job._id);
      dispatch(setApplicants(response.data.data || []));
      setApplicantsModalOpen(true);
    } catch (err) {
      showErrorAlert("Failed to load applicants");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setApplicantsModalOpen(false);
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
        await adminAPI.jobs.update(editingItem._id, formData);
        showSuccessAlert("Job updated successfully");
      } else {
        await adminAPI.jobs.create(formData);
        showSuccessAlert("Job created successfully");
      }
      handleCloseModal();
      loadJobs();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to save job");
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await adminAPI.jobs.delete(job._id);
      showSuccessAlert("Job deleted successfully");
      loadJobs();
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Failed to delete job");
    }
  };

  const columns = [
    { key: "title", label: "Job Title" },
    { key: "company", label: "Company" },
    { key: "location", label: "Location" },
    { key: "jobType", label: "Type" },
    {
      key: "salary",
      label: "Salary",
      render: (salary) => (salary ? `₹${salary}` : "Not specified"),
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "expired"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Posted",
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
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Post New Job
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
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => dispatch(setJobSearchFilter(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => dispatch(setJobStatusFilter(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={items}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          onView={(job) => handleViewApplicants(job)}
          noDataMessage="No jobs found"
        />

        {/* Pagination */}
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setJobPage(page))}
          loading={loading}
        />
      </div>

      {/* Job Form Modal */}
      <AdminModal
        isOpen={isModalOpen}
        title={editingItem ? "Edit Job" : "Post New Job"}
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
              {editingItem ? "Update" : "Post"} Job
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City/Remote"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary (Optional)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5-8 LPA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
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
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Required skills and qualifications (comma-separated)"
            />
          </div>
        </form>
      </AdminModal>

      {/* Applicants Modal */}
      <AdminModal
        isOpen={applicantsModalOpen}
        title="Job Applicants"
        onClose={handleCloseModal}
        size="lg"
      >
        <div className="space-y-4">
          {applicants.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No applicants yet</p>
          ) : (
            <div className="space-y-3">
              {applicants.map((applicant) => (
                <div
                  key={applicant._id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {applicant.name}
                      </h3>
                      <p className="text-sm text-gray-600">{applicant.email}</p>
                      <p className="text-sm text-gray-600">{applicant.phone}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {applicant.status || "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminModal>
    </div>
  );
};

export default JobManagement;
