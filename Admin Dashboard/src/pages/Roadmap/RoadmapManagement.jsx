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
  description: "",
  category: "Frontend",
  level: "Beginner",
  thumbnail: "",
  tags: "",
  steps: "[]",
};

function RoadmapManagement() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadRoadmaps();
  }, [page]);

  const loadRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.roadmaps.getAll(page, limit);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.message || [];
      setRoadmaps(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load roadmaps");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingRoadmap(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (roadmap) => {
    setEditingRoadmap(roadmap);
    setFormData({
      title: roadmap.title || "",
      description: roadmap.description || "",
      category: roadmap.category || "Frontend",
      level: roadmap.level || "Beginner",
      thumbnail: roadmap.thumbnail || "",
      tags: Array.isArray(roadmap.tags) ? roadmap.tags.join(", ") : "",
      steps: JSON.stringify(roadmap.steps || [], null, 2),
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingRoadmap(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const parseSteps = (value) => {
    if (!value.trim()) return [];
    return JSON.parse(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        steps: parseSteps(formData.steps),
      };

      if (editingRoadmap) {
        await adminAPI.roadmaps.update(editingRoadmap._id, payload);
        toast.success("Roadmap updated successfully");
      } else {
        await adminAPI.roadmaps.create(payload);
        toast.success("Roadmap created successfully");
      }

      closeModal();
      loadRoadmaps();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save roadmap",
      );
    }
  };

  const handleDelete = async (roadmap) => {
    if (!window.confirm("Delete this roadmap?")) return;

    try {
      await adminAPI.roadmaps.delete(roadmap._id);
      toast.success("Roadmap deleted successfully");
      loadRoadmaps();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete roadmap");
    }
  };

  const filteredRoadmaps = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return roadmaps;
    return roadmaps.filter((roadmap) => {
      const searchableText = [
        roadmap.title,
        roadmap.description,
        roadmap.category,
        roadmap.level,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [roadmaps, search]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "level", label: "Level" },
    {
      key: "steps",
      label: "Steps",
      render: (steps) => steps?.length || 0,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && roadmaps.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Roadmap Management
            </h1>
            <p className="text-slate-500">
              Create structured learning roadmaps.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Roadmap
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search roadmaps"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredRoadmaps}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          noDataMessage="No roadmaps found"
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
        title={editingRoadmap ? "Edit Roadmap" : "Add Roadmap"}
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
              {editingRoadmap ? "Update" : "Create"}
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
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "Frontend",
                "Backend",
                "Full Stack",
                "DSA",
                "DevOps",
                "Mobile",
                "AI/ML",
              ]}
            />
            <SelectField
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={["Beginner", "Intermediate", "Advanced"]}
            />
            <Field
              label="Thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
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
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Roadmap description"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Steps JSON
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="10"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-indigo-500"
              placeholder='[{"title":"Step 1","description":"Learn basics","order":1}]'
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

export default RoadmapManagement;
