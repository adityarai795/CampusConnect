
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log(res.data)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/logout"
    );
    return response.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});