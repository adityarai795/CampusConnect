import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
    filters: {
      search: "",
      category: "",
    },
  },
  reducers: {
    // Fetch actions
    fetchResourcesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchResourcesSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.resources;
      state.pagination = action.payload.pagination;
    },
    fetchResourcesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create/Update/Delete actions
    setResourceLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResourceError: (state, action) => {
      state.error = action.payload;
    },

    // Selection
    selectResource: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedResource: (state) => {
      state.selectedItem = null;
    },

    // Pagination & Filters
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
      state.pagination.page = 1;
    },

    // Clear state
    clearResourceState: (state) => {
      state.items = [];
      state.selectedItem = null;
      state.error = null;
      state.filters = { search: "", category: "" };
      state.pagination = { page: 1, limit: 10, total: 0 };
    },
  },
});

export const {
  fetchResourcesRequest,
  fetchResourcesSuccess,
  fetchResourcesFailure,
  setResourceLoading,
  setResourceError,
  selectResource,
  clearSelectedResource,
  setPage,
  setSearchFilter,
  setCategoryFilter,
  clearResourceState,
} = resourceSlice.actions;

export default resourceSlice.reducer;
