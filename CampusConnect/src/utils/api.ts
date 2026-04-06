// API utility functions
import axios, { AxiosInstance, AxiosError } from "axios";
import { API_BASE_URL } from "../constants";
import { authStorage } from "./storage";

let apiInstance: AxiosInstance;

export const createApiInstance = async () => {
  const token = await authStorage.getToken();

  apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // Add response interceptor
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Token expired or unauthorized
        await authStorage.clearAuth();
        // Redirect to login
      }
      return Promise.reject(error);
    },
  );

  return apiInstance;
};

export const getApiInstance = () => {
  if (!apiInstance) {
    throw new Error("API instance not initialized");
  }
  return apiInstance;
};

// API error handler
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An error occurred. Please try again.";
};

// Generic API call wrapper
export const apiCall = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  data?: any,
  config?: any,
): Promise<T> => {
  try {
    const api = getApiInstance();
    const response = await api({
      method,
      url: endpoint,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
