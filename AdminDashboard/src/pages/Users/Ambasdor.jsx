import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, Plus, Search, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import AdminModal from "../../component/shared/AdminModal";
import { PageLoader } from "../../component/shared/LoadingSpinner";

const initialFormState = {
  name: "",
  email: "",
  mobileNumber: "",
  graduationYear: "",
  weeklyAvailabilityHours: "",
  status: "pending",
  academicDetails: {
    institutionName: "",
    course: "",
    branch: "",
    year: "",
  },
};

function Ambasdor() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAmbassador, setEditingAmbassador] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadAmbassadors();
  }, [page]);

  const loadAmbassadors = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.users.getAmbassadors();
      const data = response.data?.ambassadors || [];
      setAmbassadors(Array.isArray(data) ? data : []);
      setTotal(data.length || 0);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load ambassadors",
      );
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingAmbassador(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (ambassador) => {
    setEditingAmbassador(ambassador);
    setFormData({
      name: ambassador.name || "",
      email: ambassador.email || "",
      mobileNumber: ambassador.mobileNumber || "",
      graduationYear: ambassador.graduationYear || "",
      weeklyAvailabilityHours: ambassador.weeklyAvailabilityHours || "",
      status: ambassador.status || "pending",
      academicDetails: {
        institutionName: ambassador.academicDetails?.institutionName || "",
        course: ambassador.academicDetails?.course || "",
        branch: ambassador.academicDetails?.branch || "",
        year: ambassador.academicDetails?.year || "",
      },
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingAmbassador(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleAcademicChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      academicDetails: {
        ...previous.academicDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      graduationYear: Number(formData.graduationYear),
      weeklyAvailabilityHours: Number(formData.weeklyAvailabilityHours),
      academicDetails: {
        ...formData.academicDetails,
      },
    };

    try {
      if (editingAmbassador) {
        await adminAPI.users.updateAmbassador(editingAmbassador._id, payload);
        toast.success("Ambassador updated successfully");
      } else {
        await adminAPI.users.createAmbassador(payload);
        toast.success("Ambassador created successfully");
      }

      closeModal();
      loadAmbassadors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save ambassador");
    }
  };

  const approveAmbassador = async (ambassador) => {
    try {
      await adminAPI.users.approveAmbassador(ambassador._id);
      toast.success("Ambassador approved");
      loadAmbassadors();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve ambassador",
      );
    }
  };

  const rejectAmbassador = async (ambassador) => {
    try {
      await adminAPI.users.rejectAmbassador(ambassador._id);
      toast.success("Ambassador rejected");
      loadAmbassadors();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject ambassador",
      );
    }
  };

  const deleteAmbassador = async (ambassador) => {
    if (!window.confirm("Delete this ambassador record?")) return;

    try {
      await adminAPI.users.deleteAmbassador(ambassador._id);
      toast.success("Ambassador deleted successfully");
      loadAmbassadors();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete ambassador",
      );
    }
  };

  const filteredAmbassadors = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return ambassadors;
    return ambassadors.filter((ambassador) => {
      const searchableText = [
        ambassador.name,
        ambassador.email,
        ambassador.mobileNumber,
        ambassador.academicDetails?.institutionName,
        ambassador.academicDetails?.branch,
        ambassador.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [ambassadors, search]);

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "academicDetails",
      label: "College",
      render: (details) => details?.institutionName || "-",
    },
    {
      key: "academicDetails",
      label: "Branch",
      render: (details) => details?.branch || "-",
    },
    { key: "email", label: "Email" },
    { key: "mobileNumber", label: "Phone" },
    {
      key: "weeklyAvailabilityHours",
      label: "Hours",
      render: (hours) => `${hours || 0} hrs`,
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "approved" ? "bg-green-100 text-green-700" : status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
        >
          {status}
        </span>
      ),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && ambassadors.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Ambassador Management
            </h1>
            <p className="text-slate-500">
              Approve, reject, edit, or remove ambassador applications.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Ambassador
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search ambassadors"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredAmbassadors}
          loading={loading}
          onEdit={openEditModal}
          onDelete={deleteAmbassador}
          actions={[
            {
              label: "Approve",
              icon: CheckCircle,
              color: "text-green-600",
              onClick: approveAmbassador,
            },
            {
              label: "Reject",
              icon: XCircle,
              color: "text-red-600",
              onClick: rejectAmbassador,
            },
          ]}
          noDataMessage="No ambassadors found"
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        loading={loading}
      />

      <AdminModal
        isOpen={modalOpen}
        title={editingAmbassador ? "Edit Ambassador" : "Add Ambassador"}
        onClose={closeModal}
        size="2xl"
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              {editingAmbassador ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Field
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <Field
              label="Graduation Year"
              name="graduationYear"
              type="number"
              value={formData.graduationYear}
              onChange={handleChange}
            />
            <Field
              label="Weekly Availability Hours"
              name="weeklyAvailabilityHours"
              type="number"
              value={formData.weeklyAvailabilityHours}
              onChange={handleChange}
            />
            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["pending", "approved", "rejected"]}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Institution Name"
              name="institutionName"
              value={formData.academicDetails.institutionName}
              onChange={handleAcademicChange}
            />
            <Field
              label="Course"
              name="course"
              value={formData.academicDetails.course}
              onChange={handleAcademicChange}
            />
            <Field
              label="Branch"
              name="branch"
              value={formData.academicDetails.branch}
              onChange={handleAcademicChange}
            />
            <Field
              label="Year"
              name="year"
              value={formData.academicDetails.year}
              onChange={handleAcademicChange}
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

const Field = ({ label, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      {label}
    </label>
    <select
      {...props}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Ambasdor;
