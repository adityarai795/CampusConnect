import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import AdminModal from "../../component/shared/AdminModal";
import { PageLoader } from "../../component/shared/LoadingSpinner";

const initialFormState = {
  title: "",
  type: "Notes",
  description: "",
  link: "",
  branch: "",
  semester: "",
  university: "",
  tags: "",
};

function ResourceTableManagement() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadResources();
  }, [page]);

  const loadResources = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.resources.getAll(page, limit, search);
      const data =
        response.data?.message ||
        response.data?.resources ||
        response.data?.data ||
        [];
      setResources(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingResource(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title || "",
      type: resource.type || "Notes",
      description: resource.description || "",
      link: resource.link || "",
      branch: resource.branch || "",
      semester: resource.semester || "",
      university: resource.university || "",
      tags: Array.isArray(resource.tags) ? resource.tags.join(", ") : "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingResource(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      semester: formData.semester,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (editingResource) {
        await adminAPI.resources.update(editingResource._id, payload);
        toast.success("Resource updated successfully");
      } else {
        await adminAPI.resources.create(payload);
        toast.success("Resource created successfully");
      }

      closeModal();
      loadResources();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save resource");
    }
  };

  const handleDelete = async (resource) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      await adminAPI.resources.delete(resource._id);
      toast.success("Resource deleted successfully");
      loadResources();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resource");
    }
  };

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return resources;
    return resources.filter((resource) => {
      const searchableText = [
        resource.title,
        resource.type,
        resource.branch,
        resource.university,
        resource.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [resources, search]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "branch", label: "Branch" },
    {
      key: "semester",
      label: "Semester",
      render: (semester) => (semester ? `Sem ${semester}` : "-"),
    },
    { key: "university", label: "University" },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && resources.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Resource Management
            </h1>
            <p className="text-slate-500">
              Manage notes, question papers, and learning resources.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Resource
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search resources"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredResources}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onView={(resource) =>
            resource.link && window.open(resource.link, "_blank", "noreferrer")
          }
          noDataMessage="No resources found"
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
        title={editingResource ? "Edit Resource" : "Add Resource"}
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
              {editingResource ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <SelectField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                "Notes",
                "Question Paper",
                "Youtube",
                "Important Courses",
              ]}
            />
            <Field
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
            <Field
              label="Semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            />
            <Field
              label="University"
              name="university"
              value={formData.university}
              onChange={handleChange}
            />
            <Field
              label="Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <Field
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="comma separated tags"
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Resource description"
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

export default ResourceTableManagement;
