import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "community",
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
    filters: {
      search: "",
      status: "all", // pending, approved, flagged
    },
  },
  reducers: {
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.pagination = action.payload.pagination;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setPostLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostError: (state, action) => {
      state.error = action.payload;
    },

    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },

    setPostPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setPostStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.page = 1;
    },

    clearCommunityState: (state) => {
      state.posts = [];
      state.selectedPost = null;
      state.error = null;
      state.filters = { search: "", status: "all" };
      state.pagination = { page: 1, limit: 10, total: 0 };
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  setPostLoading,
  setPostError,
  selectPost,
  clearSelectedPost,
  setPostPage,
  setPostStatusFilter,
  clearCommunityState,
} = communitySlice.actions;

export default communitySlice.reducer;
