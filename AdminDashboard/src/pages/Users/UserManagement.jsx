import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { toast } from "react-toastify";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import AdminModal from "../../component/shared/AdminModal";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import axios from "axios";

const initialFormState = {
  name: "",
  email: "",
  mobileno: "",
  role: "user",
  studentCategory: "college",
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.users.getAll(page, limit);
      // const response = await axios.get(
      //   "http://localhost:3000/auth/showalluser",
      //   {
      //     params: { page, limit },
      //   },
      // );
      const data = response.data?.users || response.data?.data || [];
      setUsers(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobileno: user.mobileno || "",
      role: user.role || "user",
      studentCategory: user.studentCategory || "college",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingUser) {
        await adminAPI.users.update(editingUser._id, formData);
        toast.success("User updated successfully");
      } else {
        await adminAPI.users.create(formData);
        toast.success("User created successfully");
      }

      closeModal();
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save user");
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await adminAPI.users.delete(user._id);
      toast.success("User deleted successfully");
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) => {
      const searchableText = [
        user.name,
        user.email,
        user.mobileno,
        user.role,
        user.studentCategory,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [users, search]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobileno", label: "Mobile" },
    { key: "role", label: "Role" },
    { key: "studentCategory", label: "Category" },
    {
      key: "authProviders",
      label: "Login",
      render: (authProviders) =>
        authProviders?.local?.enabled
          ? "Local"
          : authProviders?.google?.enabled
            ? "Google"
            : "-",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && users.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              User Management
            </h1>
            <p className="text-slate-500">Edit and remove platform users.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search users"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredUsers}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          noDataMessage="No users found"
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
        title={editingUser ? "Edit User" : "Add User"}
        onClose={closeModal}
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
              {editingUser ? "Update" : "Create"}
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
              label="Mobile"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
            />
            <Field
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            <SelectField
              label="Category"
              name="studentCategory"
              value={formData.studentCategory}
              onChange={handleChange}
              options={["school", "college"]}
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
