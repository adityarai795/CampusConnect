import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import AdminModal from "../../component/shared/AdminModal";
import { PageLoader } from "../../component/shared/LoadingSpinner";

const initialFormState = {
  University: "",
  link: "",
};

function ResultManagement() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadResults();
  }, [page]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.results.getAll(page, limit);
      const data =
        response.data?.showall ||
        response.data?.results ||
        response.data?.data ||
        [];
      setResults(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingResult(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (result) => {
    setEditingResult(result);
    setFormData({
      University: result.University || "",
      link: result.link || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingResult(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingResult) {
        await adminAPI.results.update(editingResult._id, formData);
        toast.success("Result updated successfully");
      } else {
        await adminAPI.results.create(formData);
        toast.success("Result created successfully");
      }

      closeModal();
      loadResults();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save result");
    }
  };

  const handleDelete = async (result) => {
    if (!window.confirm("Delete this result link?")) return;

    try {
      await adminAPI.results.delete(result._id);
      toast.success("Result deleted successfully");
      loadResults();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete result");
    }
  };

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return results;
    return results.filter((result) => {
      const searchableText = [result.University, result.link]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [results, search]);

  const columns = [
    { key: "University", label: "University" },
    {
      key: "link",
      label: "Result Link",
      render: (link) => (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 underline"
        >
          View Result
        </a>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && results.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Result Management
            </h1>
            <p className="text-slate-500">Manage result links by university.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Result
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search university or link"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredResults}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onView={(result) =>
            result.link && window.open(result.link, "_blank", "noreferrer")
          }
          noDataMessage="No result links found"
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
        title={editingResult ? "Edit Result" : "Add Result"}
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
              {editingResult ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field
            label="University"
            name="University"
            value={formData.University}
            onChange={handleChange}
            required
          />
          <Field
            label="Result Link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
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

export default ResultManagement;
