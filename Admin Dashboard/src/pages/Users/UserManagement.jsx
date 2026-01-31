import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  selectUser,
  clearSelectedUser,
  setPage,
  setFilter,
} from "../../redux/reducers/userReducer";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import AdminModal from "../../component/shared/AdminModal";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import LoadingSpinner from "../../component/shared/LoadingSpinner";
import { Search, Edit2, Trash2, Users } from "lucide-react";
import { toast } from "react-toastify";

const UserManagement = () => {
  const dispatch = useDispatch();
  const {
    items: users,
    loading,
    error,
    pagination,
    filters,
    selectedItem,
  } = useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    branch: "",
    semester: "",
  });

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filters.search, filters.role]);

  const fetchUsers = async () => {
    try {
      dispatch(fetchUsersRequest());
      const response = await adminAPI.users.getAll(
        pagination.page,
        pagination.limit,
        filters.role,
      );
      dispatch(
        fetchUsersSuccess({
          data: response.data.users || response.data,
          total: response.data.total || response.data.length,
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(fetchUsersFailure(errorMsg));
      toast.error("Failed to fetch users");
    }
  };

  // Open modal for edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      branch: user.branch || "",
      semester: user.semester || "",
    });
    setShowModal(true);
  };

  // Open modal for delete confirmation
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    try {
      dispatch(deleteUserRequest());
      await adminAPI.users.delete(userToDelete._id);
      dispatch(deleteUserSuccess(userToDelete._id));
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(deleteUserFailure(errorMsg));
      toast.error("Failed to delete user");
    }
  };

  // Handle update
  const handleUpdate = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      dispatch(updateUserRequest());
      const response = await adminAPI.users.update(editingUser._id, formData);
      dispatch(updateUserSuccess(response.data));
      toast.success("User updated successfully");
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        role: "user",
        branch: "",
        semester: "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(updateUserFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    {
      header: "Name",
      render: (user) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <span className="font-medium text-gray-800">{user.name}</span>
        </div>
      ),
    },
    {
      header: "Email",
      render: (user) => (
        <span className="text-gray-600 text-sm">{user.email}</span>
      ),
    },
    {
      header: "Role",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.role === "admin"
              ? "bg-red-100 text-red-800"
              : user.role === "teacher"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {user.role}
        </span>
      ),
    },
    {
      header: "Branch",
      render: (user) => (
        <span className="text-gray-600 text-sm">{user.branch || "N/A"}</span>
      ),
    },
    {
      header: "Semester",
      render: (user) => (
        <span className="text-gray-600 text-sm">{user.semester || "N/A"}</span>
      ),
    },
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-gray-600">Manage all registered users</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.search}
              onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.role}
            onChange={(e) => dispatch(setFilter({ role: e.target.value }))}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Alert */}
      {error && <Alert type="error" message={error} />}

      {/* Loading */}
      {loading ? (
        <LoadingSpinner message="Loading users..." />
      ) : (
        <>
          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {users.length > 0 ? (
              <DataTable
                columns={columns}
                data={users}
                actions={actions}
                onRowClick={(user) => dispatch(selectUser(user))}
              />
            ) : (
              <div className="p-12 text-center">
                <Users className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">No users found</p>
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

      {/* Edit Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
          setFormData({
            name: "",
            email: "",
            role: "user",
            branch: "",
            semester: "",
          });
        }}
        title="Edit User"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setEditingUser(null);
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
          setUserToDelete(null);
        }}
        title="Confirm Delete"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>? This action cannot be undone.
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
                setUserToDelete(null);
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

export default UserManagement;
