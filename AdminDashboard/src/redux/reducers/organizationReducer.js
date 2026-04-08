import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    status: "all",
  },
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    fetchOrganizationsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrganizationsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.data || [];
      state.pagination.total = action.payload.total || 0;
    },
    fetchOrganizationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createOrganizationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrganizationSuccess: (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    },
    createOrganizationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateOrganizationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrganizationSuccess: (state, action) => {
      state.loading = false;
      const index = state.items.findIndex((o) => o._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateOrganizationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteOrganizationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteOrganizationSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((o) => o._id !== action.payload);
    },
    deleteOrganizationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    selectOrganization: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedOrganization: (state) => {
      state.selectedItem = null;
    },

    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },

    setOrganizationLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrganizationError: (state, action) => {
      state.error = action.payload;
    },

    clearOrganizationState: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchOrganizationsRequest,
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
  updateOrganizationRequest,
  updateOrganizationSuccess,
  updateOrganizationFailure,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  deleteOrganizationFailure,
  selectOrganization,
  clearSelectedOrganization,
  setPage,
  setFilter,
  setOrganizationLoading,
  setOrganizationError,
  clearOrganizationState,
} = organizationSlice.actions;

export default organizationSlice.reducer;
