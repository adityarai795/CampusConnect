import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Flag, Trash2 } from "lucide-react";
import adminAPI from "../../api/adminAPI";
import DataTable from "../../component/shared/DataTable";
import Pagination from "../../component/shared/Pagination";
import Alert from "../../component/shared/Alert";
import { PageLoader } from "../../component/shared/LoadingSpinner";
import AdminModal from "../../component/shared/AdminModal";
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  setPostStatusFilter,
  setPostPage,
} from "../../redux/reducers/communityReducer";

const CommunityManagement = () => {
  const dispatch = useDispatch();
  const { posts, loading, pagination, filters } = useSelector(
    (state) => state.community,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: "success", message: "" });
  const [flagReason, setFlagReason] = useState("");

  useEffect(() => {
    loadPosts();
  }, [pagination.page, filters.status]);

  const loadPosts = async () => {
    dispatch(fetchPostsRequest());
    try {
      const response = await adminAPI.community.getAll(
        pagination.page,
        pagination.limit,
      );
      dispatch(
        fetchPostsSuccess({
          posts: response.data.data || [],
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: response.data.total || 0,
          },
        }),
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load posts";
      dispatch(fetchPostsFailure(errorMsg));
      showErrorAlert(errorMsg);
    }
  };

  const showErrorAlert = (message) => {
    setAlertData({ type: "error", message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const showSuccessAlert = (message) => {
    setAlertData({ type: "success", message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleApprove = async (post) => {
    try {
      await adminAPI.community.approvePending(post._id);
      showSuccessAlert("Post approved");
      loadPosts();
    } catch (err) {
      showErrorAlert("Failed to approve post");
    }
  };

  const handleFlag = async (post) => {
    if (!flagReason.trim()) {
      showErrorAlert("Please provide a reason for flagging");
      return;
    }

    try {
      await adminAPI.community.flagPost(post._id, flagReason);
      showSuccessAlert("Post flagged");
      setIsModalOpen(false);
      setFlagReason("");
      loadPosts();
    } catch (err) {
      showErrorAlert("Failed to flag post");
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await adminAPI.community.delete(post._id);
      showSuccessAlert("Post deleted");
      loadPosts();
    } catch (err) {
      showErrorAlert("Failed to delete post");
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (title) => title || "Untitled",
    },
    {
      key: "author",
      label: "Author",
      render: (author) => author?.name || "Anonymous",
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "approved"
              ? "bg-green-100 text-green-800"
              : status === "flagged"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "content",
      label: "Preview",
      render: (content) => content?.substring(0, 50) + "..." || "-",
    },
    {
      key: "createdAt",
      label: "Posted",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  if (loading && posts.length === 0) {
    return <PageLoader />;
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Community Moderation
        </h1>

        {/* Alerts */}
        {showAlert && (
          <Alert
            type={alertData.type}
            message={alertData.message}
            onClose={() => setShowAlert(false)}
          />
        )}

        {/* Filters */}
        <div className="mb-6">
          <select
            value={filters.status}
            onChange={(e) => dispatch(setPostStatusFilter(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Posts</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={posts}
          loading={loading}
          onView={handleViewPost}
          noDataMessage="No posts found"
        />

        {/* Pagination */}
        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setPostPage(page))}
          loading={loading}
        />
      </div>

      {/* Post Detail Modal */}
      <AdminModal
        isOpen={isModalOpen}
        title="Post Details"
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
          setFlagReason("");
        }}
        size="lg"
        footer={
          selectedPost && (
            <>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedPost(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedPost.status === "pending" && (
                <button
                  onClick={() => handleApprove(selectedPost)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDelete(selectedPost)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </>
          )
        }
      >
        {selectedPost && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedPost.title}
              </h2>
              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span>By {selectedPost.author?.name || "Anonymous"}</span>
                <span>
                  {new Date(selectedPost.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900">{selectedPost.content}</p>
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedPost.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : selectedPost.status === "flagged"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedPost.status}
              </span>
            </div>

            {selectedPost.status !== "approved" && (
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flag Reason (if flagging)
                </label>
                <textarea
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Reason for flagging (optional)"
                />
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default CommunityManagement;
