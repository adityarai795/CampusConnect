import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  setPage,
  setFilter,
} from "../../redux/reducers/marketplaceReducer";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import AdminModal from "../../component/shared/AdminModal";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import LoadingSpinner from "../../component/shared/LoadingSpinner";
import { Search, Plus, Edit2, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

const MarketplaceManagement = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
    pagination,
    filters,
  } = useSelector((state) => state.marketplace);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    seller: "",
    image: "",
    status: "active",
  });

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, filters.search, filters.category]);

  const fetchProducts = async () => {
    try {
      dispatch(fetchProductsRequest());
      const response = await adminAPI.marketplace.getAll(
        pagination.page,
        pagination.limit,
      );
      dispatch(
        fetchProductsSuccess({
          data: response.data.data || response.data,
          total: response.data.total || response.data.length,
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(fetchProductsFailure(errorMsg));
      toast.error("Failed to fetch products");
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      seller: "",
      image: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price || "",
      quantity: product.quantity || "",
      seller: product.seller || "",
      image: product.image || "",
      status: product.status || "active",
    });
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      dispatch(deleteProductRequest());
      await adminAPI.marketplace.delete(productToDelete._id);
      dispatch(deleteProductSuccess(productToDelete._id));
      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(deleteProductFailure(errorMsg));
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      toast.error("Name and price are required");
      return;
    }

    try {
      if (isEditing) {
        dispatch(updateProductRequest());
        const response = await adminAPI.marketplace.update(
          editingProduct._id,
          formData,
        );
        dispatch(updateProductSuccess(response.data));
        toast.success("Product updated successfully");
      } else {
        dispatch(createProductRequest());
        const response = await adminAPI.marketplace.create(formData);
        dispatch(createProductSuccess(response.data));
        toast.success("Product created successfully");
      }
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        seller: "",
        image: "",
        status: "active",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      if (isEditing) {
        dispatch(updateProductFailure(errorMsg));
      } else {
        dispatch(createProductFailure(errorMsg));
      }
      toast.error(errorMsg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    {
      header: "Product",
      render: (product) => (
        <div className="flex items-center gap-2">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-8 h-8 rounded object-cover"
            />
          )}
          <div>
            <span className="font-medium text-gray-800 block">
              {product.name}
            </span>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      render: (product) => (
        <span className="font-semibold text-gray-800">₹{product.price}</span>
      ),
    },
    {
      header: "Quantity",
      render: (product) => (
        <span className="text-gray-600 text-sm">
          {product.quantity || "N/A"}
        </span>
      ),
    },
    {
      header: "Seller",
      render: (product) => (
        <span className="text-gray-600 text-sm">{product.seller || "N/A"}</span>
      ),
    },
    {
      header: "Status",
      render: (product) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {product.status}
        </span>
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
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
            <ShoppingCart className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Marketplace Products
            </h1>
            <p className="text-gray-600">Manage all marketplace products</p>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filters.search}
              onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
            />
          </div>
          <input
            type="text"
            placeholder="Filter by category..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={filters.category}
            onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
          />
        </div>
      </div>

      {/* Alert */}
      {error && <Alert type="error" message={error} />}

      {/* Loading */}
      {loading ? (
        <LoadingSpinner message="Loading products..." />
      ) : (
        <>
          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {products.length > 0 ? (
              <DataTable columns={columns} data={products} actions={actions} />
            ) : (
              <div className="p-12 text-center">
                <ShoppingCart
                  className="mx-auto text-gray-300 mb-4"
                  size={48}
                />
                <p className="text-gray-500">No products found</p>
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

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setEditingProduct(null);
        }}
        title={isEditing ? "Edit Product" : "Add New Product"}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seller
            </label>
            <input
              type="text"
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setEditingProduct(null);
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
          setProductToDelete(null);
        }}
        title="Confirm Delete"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <strong>{productToDelete?.name}</strong>? This action cannot be
            undone.
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
                setProductToDelete(null);
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

export default MarketplaceManagement;
