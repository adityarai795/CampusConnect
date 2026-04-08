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
    department: "all",
    status: "all",
  },
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    fetchTeachersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTeachersSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.data || [];
      state.pagination.total = action.payload.total || 0;
    },
    fetchTeachersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createTeacherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTeacherSuccess: (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    },
    createTeacherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTeacherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTeacherSuccess: (state, action) => {
      state.loading = false;
      const index = state.items.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateTeacherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTeacherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTeacherSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((t) => t._id !== action.payload);
    },
    deleteTeacherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    selectTeacher: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedTeacher: (state) => {
      state.selectedItem = null;
    },

    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },

    setTeacherLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTeacherError: (state, action) => {
      state.error = action.payload;
    },

    clearTeacherState: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchTeachersRequest,
  fetchTeachersSuccess,
  fetchTeachersFailure,
  createTeacherRequest,
  createTeacherSuccess,
  createTeacherFailure,
  updateTeacherRequest,
  updateTeacherSuccess,
  updateTeacherFailure,
  deleteTeacherRequest,
  deleteTeacherSuccess,
  deleteTeacherFailure,
  selectTeacher,
  clearSelectedTeacher,
  setPage,
  setFilter,
  setTeacherLoading,
  setTeacherError,
  clearTeacherState,
} = teacherSlice.actions;

export default teacherSlice.reducer;
