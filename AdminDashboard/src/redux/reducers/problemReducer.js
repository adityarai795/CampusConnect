import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
  name: "problems",
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
      difficulty: "all", // easy, medium, hard
      category: "",
    },
  },
  reducers: {
    fetchProblemsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProblemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.problems;
      state.pagination = action.payload.pagination;
    },
    fetchProblemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setProblemLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProblemError: (state, action) => {
      state.error = action.payload;
    },

    selectProblem: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedProblem: (state) => {
      state.selectedItem = null;
    },

    setProblemPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setProblemSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    setProblemDifficultyFilter: (state, action) => {
      state.filters.difficulty = action.payload;
      state.pagination.page = 1;
    },

    clearProblemState: (state) => {
      state.items = [];
      state.selectedItem = null;
      state.error = null;
      state.filters = { search: "", difficulty: "all", category: "" };
      state.pagination = { page: 1, limit: 10, total: 0 };
    },
  },
});

export const {
  fetchProblemsRequest,
  fetchProblemsSuccess,
  fetchProblemsFailure,
  setProblemLoading,
  setProblemError,
  selectProblem,
  clearSelectedProblem,
  setProblemPage,
  setProblemSearchFilter,
  setProblemDifficultyFilter,
  clearProblemState,
} = problemSlice.actions;

export default problemSlice.reducer;
