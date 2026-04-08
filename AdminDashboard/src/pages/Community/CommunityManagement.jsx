import React, { useEffect, useMemo, useState } from "react";
import { Eye, Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import AdminModal from "../../component/shared/AdminModal";
import { PageLoader } from "../../component/shared/LoadingSpinner";

const initialFormState = {
  title: "",
  description: "",
  collage: "",
};

function CommunityManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.community.getAll(page, limit);
      const data = response.data?.posts || response.data?.data || [];
      setPosts(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || "",
      description: post.description || "",
      collage: post.collage || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPost(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingPost) {
        await adminAPI.community.update(editingPost._id, formData);
        toast.success("Post updated successfully");
      } else {
        await adminAPI.community.create(formData);
        toast.success("Post created successfully");
      }

      closeModal();
      loadPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save post");
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await adminAPI.community.delete(post._id);
      toast.success("Post deleted successfully");
      loadPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) => {
      const searchableText = [post.title, post.description, post.collage]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [posts, search]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "collage", label: "College" },
    {
      key: "like",
      label: "Likes",
      render: (likes) => likes?.length || 0,
    },
    {
      key: "comment",
      label: "Comments",
      render: (comments) => comments?.length || 0,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && posts.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Community Management
            </h1>
            <p className="text-slate-500">
              Moderate posts and manage community content.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Post
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search posts"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredPosts}
          loading={loading}
          onView={(post) => setViewingPost(post)}
          onEdit={openEditModal}
          onDelete={handleDelete}
          noDataMessage="No posts found"
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
        title={editingPost ? "Edit Post" : "Add Post"}
        onClose={closeModal}
        size="xl"
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
              {editingPost ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Field
            label="College"
            name="collage"
            value={formData.collage}
            onChange={handleChange}
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Post description"
            />
          </div>
        </form>
      </AdminModal>

      <AdminModal
        isOpen={Boolean(viewingPost)}
        title={viewingPost?.title || "Post Details"}
        onClose={() => setViewingPost(null)}
        size="xl"
        footer={
          <button
            type="button"
            onClick={() => setViewingPost(null)}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Close
          </button>
        }
      >
        {viewingPost && (
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-semibold">College:</span>{" "}
              {viewingPost.collage || "-"}
            </p>
            <p>
              <span className="font-semibold">Likes:</span>{" "}
              {viewingPost.like?.length || 0}
            </p>
            <p>
              <span className="font-semibold">Comments:</span>{" "}
              {viewingPost.comment?.length || 0}
            </p>
            <p className="whitespace-pre-wrap">
              <span className="font-semibold">Description:</span>{" "}
              {viewingPost.description || "-"}
            </p>
          </div>
        )}
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

export default CommunityManagement;
