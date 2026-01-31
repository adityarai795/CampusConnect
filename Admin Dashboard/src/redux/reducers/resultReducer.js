import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "results",
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
      branch: "",
      year: "",
      semester: "",
    },
  },
  reducers: {
    fetchResultsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchResultsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.results;
      state.pagination = action.payload.pagination;
    },
    fetchResultsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setResultLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResultError: (state, action) => {
      state.error = action.payload;
    },

    selectResult: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedResult: (state) => {
      state.selectedItem = null;
    },

    setResultPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setResultSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },

    clearResultState: (state) => {
      state.items = [];
      state.selectedItem = null;
      state.error = null;
      state.filters = { search: "", branch: "", year: "", semester: "" };
      state.pagination = { page: 1, limit: 10, total: 0 };
    },
  },
});

export const {
  fetchResultsRequest,
  fetchResultsSuccess,
  fetchResultsFailure,
  setResultLoading,
  setResultError,
  selectResult,
  clearSelectedResult,
  setResultPage,
  setResultSearchFilter,
  clearResultState,
} = resultSlice.actions;

export default resultSlice.reducer;
