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
    role: "all",
    status: "all",
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Fetch users
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.data || [];
      state.pagination.total = action.payload.total || 0;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create user
    createUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update user
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      const index = state.items.findIndex((u) => u._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete user
    deleteUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((u) => u._id !== action.payload);
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Set selected user
    selectUser: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedItem = null;
    },

    // Pagination and filters
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },

    // Status update
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },

    // Clear state
    clearUserState: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  selectUser,
  clearSelectedUser,
  setPage,
  setFilter,
  setUserLoading,
  setUserError,
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer;
