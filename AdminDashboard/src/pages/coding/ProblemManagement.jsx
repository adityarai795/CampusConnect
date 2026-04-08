import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import AdminModal from "../../component/shared/AdminModal";
import { PageLoader } from "../../component/shared/LoadingSpinner";

const initialFormState = {
  problem: "",
  topic: "",
  link: "",
  level: "easy",
  status: true,
  tags: "",
};

const ProblemManagement = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadProblems();
  }, [page]);

  const loadProblems = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.problems.getAll(page, limit);
      const data = response.data?.problem || response.data?.data || [];
      setProblems(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProblem(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (problem) => {
    setEditingProblem(problem);
    setFormData({
      problem: problem.problem || "",
      topic: problem.topic || "",
      link: problem.link || "",
      level: problem.level || "easy",
      status: Boolean(problem.status),
      tags: Array.isArray(problem.tags) ? problem.tags.join(", ") : "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProblem(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (editingProblem) {
        await adminAPI.problems.update(editingProblem._id, payload);
        toast.success("Problem updated successfully");
      } else {
        await adminAPI.problems.create(payload);
        toast.success("Problem created successfully");
      }

      closeModal();
      loadProblems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save problem");
    }
  };

  const handleDelete = async (problem) => {
    if (!window.confirm("Delete this problem?")) return;

    try {
      await adminAPI.problems.delete(problem._id);
      toast.success("Problem deleted successfully");
      loadProblems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete problem");
    }
  };

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return problems;
    return problems.filter((problem) => {
      const searchableText = [
        problem.problem,
        problem.topic,
        problem.level,
        problem.link,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [problems, search]);

  const columns = [
    { key: "problem", label: "Problem" },
    { key: "topic", label: "Topic" },
    { key: "level", label: "Level" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
        >
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "link",
      label: "Link",
      render: (link) => (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 underline"
        >
          Open
        </a>
      ),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && problems.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Coding Problem Management
            </h1>
            <p className="text-slate-500">
              Create and manage coding challenge records.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Problem
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search problems"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredProblems}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          noDataMessage="No coding problems found"
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
        title={editingProblem ? "Edit Problem" : "Add Problem"}
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
              {editingProblem ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            />
            <Field
              label="Topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            />
            <Field
              label="Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
            <SelectField
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={["easy", "medium", "hard"]}
            />
          </div>
          <Field
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="comma separated tags"
          />
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            Active
          </label>
        </form>
      </AdminModal>
    </div>
  );
};

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

export default ProblemManagement;
