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
  category: "",
  price: "",
  description: "",
  location: "",
  imageUrl: "",
};

function MarketplaceManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.marketplace.getAll(page, limit);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.message || [];
      setProducts(Array.isArray(data) ? data : []);
      setTotal(response.data?.total || data.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      category: product.category || "",
      price: product.price ?? "",
      description: product.description || "",
      location: product.location || "",
      imageUrl: product.imageUrl || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
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
      price: Number(formData.price),
    };

    try {
      if (editingProduct) {
        await adminAPI.marketplace.update(editingProduct._id, payload);
        toast.success("Product updated successfully");
      } else {
        await adminAPI.marketplace.create(payload);
        toast.success("Product created successfully");
      }

      closeModal();
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await adminAPI.marketplace.delete(product._id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => {
      const searchableText = [
        product.title,
        product.category,
        product.location,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [products, search]);

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      render: (imageUrl, product) => (
        <img
          src={imageUrl}
          alt={product.title}
          className="h-12 w-12 rounded-lg object-cover"
        />
      ),
    },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (price) => `₹${price}`,
    },
    { key: "location", label: "Location" },
    {
      key: "createdAt",
      label: "Created",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && products.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Marketplace Management
            </h1>
            <p className="text-slate-500">
              Manage marketplace product listings.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search products"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <DataTable
          columns={columns}
          data={filteredProducts}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          noDataMessage="No products found"
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
        title={editingProduct ? "Edit Product" : "Add Product"}
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
              {editingProduct ? "Update" : "Create"}
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
            <Field
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <Field
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              min="0"
              required
            />
            <Field
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <Field
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
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
              placeholder="Product description"
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

export default MarketplaceManagement;
