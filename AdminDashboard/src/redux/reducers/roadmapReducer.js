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
    difficulty: "all",
  },
};

const roadmapSlice = createSlice({
  name: "roadmaps",
  initialState,
  reducers: {
    fetchRoadmapsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoadmapsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.data || [];
      state.pagination.total = action.payload.total || 0;
    },
    fetchRoadmapsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createRoadmapRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRoadmapSuccess: (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    },
    createRoadmapFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateRoadmapRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRoadmapSuccess: (state, action) => {
      state.loading = false;
      const index = state.items.findIndex((r) => r._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateRoadmapFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteRoadmapRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRoadmapSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((r) => r._id !== action.payload);
    },
    deleteRoadmapFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    selectRoadmap: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedRoadmap: (state) => {
      state.selectedItem = null;
    },

    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },

    setRoadmapLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRoadmapError: (state, action) => {
      state.error = action.payload;
    },

    clearRoadmapState: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchRoadmapsRequest,
  fetchRoadmapsSuccess,
  fetchRoadmapsFailure,
  createRoadmapRequest,
  createRoadmapSuccess,
  createRoadmapFailure,
  updateRoadmapRequest,
  updateRoadmapSuccess,
  updateRoadmapFailure,
  deleteRoadmapRequest,
  deleteRoadmapSuccess,
  deleteRoadmapFailure,
  selectRoadmap,
  clearSelectedRoadmap,
  setPage,
  setFilter,
  setRoadmapLoading,
  setRoadmapError,
  clearRoadmapState,
} = roadmapSlice.actions;

export default roadmapSlice.reducer;
