import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    items: [],
    selectedItem: null,
    applicants: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
    filters: {
      search: "",
      status: "all", // active, expired, draft
      company: "",
    },
  },
  reducers: {
    fetchJobsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.jobs;
      state.pagination = action.payload.pagination;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setJobLoading: (state, action) => {
      state.loading = action.payload;
    },
    setJobError: (state, action) => {
      state.error = action.payload;
    },

    selectJob: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedItem = null;
    },

    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },

    setJobPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setJobSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    setJobStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.page = 1;
    },

    clearJobState: (state) => {
      state.items = [];
      state.selectedItem = null;
      state.applicants = [];
      state.error = null;
      state.filters = { search: "", status: "all", company: "" };
      state.pagination = { page: 1, limit: 10, total: 0 };
    },
  },
});

export const {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
  setJobLoading,
  setJobError,
  selectJob,
  clearSelectedJob,
  setApplicants,
  setJobPage,
  setJobSearchFilter,
  setJobStatusFilter,
  clearJobState,
} = jobSlice.actions;

export default jobSlice.reducer;
