import axios from "axios";
import api from "./api";
// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: api.apiUrl,
  timeout: api.timeout || 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Admin API Service
const adminAPI = {
  // ============ RESOURCES ============
  resources: {
    getAll: (page = 1, limit = 10, search = "") =>
      axiosInstance.get(`/resource`, {
        params: { page, limit, search },
      }),
    getById: (id) => axiosInstance.get(`/resource/${id}`),
    create: (data) => axiosInstance.post(`/resource`, data),
    update: (id, data) => axiosInstance.put(`/resource/${id}`, data),
    delete: (id) => axiosInstance.delete(`/resource/${id}`),
    upload: (formData) =>
      axiosInstance.post(`/resource/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  },

  // ============ JOBS ============
  jobs: {
    getAll: (page = 1, limit = 10, status = "") =>
      axiosInstance.get(`/job`, {
        params: { page, limit, status },
      }),
    getById: (id) => axiosInstance.get(`/job/${id}`),
    create: (data) => axiosInstance.post(`/job`, data),
    update: (id, data) => axiosInstance.put(`/job/${id}`, data),
    delete: (id) => axiosInstance.delete(`/job/${id}`),
    getApplicants: (jobId) => axiosInstance.get(`/job/${jobId}/applicants`),
  },

  // ============ RESULTS ============
  results: {
    getAll: (page = 1, limit = 10) =>
      axiosInstance.get(`/result`, {
        params: { page, limit },
      }),
    getById: (id) => axiosInstance.get(`/result/${id}`),
    create: (data) => axiosInstance.post(`/result`, data),
    update: (id, data) => axiosInstance.put(`/result/${id}`, data),
    delete: (id) => axiosInstance.delete(`/result/${id}`),
    upload: (formData) =>
      axiosInstance.post(`/result/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  },

  // ============ COMMUNITY/POSTS ============
  community: {
    getAll: (page = 1, limit = 10) =>
      axiosInstance.get(`/community`, {
        params: { page, limit },
      }),
    getById: (id) => axiosInstance.get(`/community/${id}`),
    delete: (id) => axiosInstance.delete(`/community/${id}`),
    flagPost: (id, reason) =>
      axiosInstance.post(`/community/${id}/flag`, { reason }),
    approvePending: (id) => axiosInstance.post(`/community/${id}/approve`),
  },

  // ============ CODING PROBLEMS ============
  problems: {
    getAll: (page = 1, limit = 10, difficulty = "") =>
      axiosInstance.get(`/problem`, {
        params: { page, limit, difficulty },
      }),
    getById: (id) => axiosInstance.get(`/problem/${id}`),
    create: (data) => axiosInstance.post(`/problem`, data),
    update: (id, data) => axiosInstance.put(`/problem/${id}`, data),
    delete: (id) => axiosInstance.delete(`/problem/${id}`),
  },

  // ============ ORGANIZATION/COLLEGE ============
  organization: {
    getAll: () => axiosInstance.get(`/organization`),
    getById: (id) => axiosInstance.get(`/organization/${id}`),
    create: (data) => axiosInstance.post(`/organization`, data),
    update: (id, data) => axiosInstance.put(`/organization/${id}`, data),
    delete: (id) => axiosInstance.delete(`/organization/${id}`),
  },

  // ============ TEACHERS ============
  teachers: {
    getAll: (page = 1, limit = 10) =>
      axiosInstance.get(`/teacher`, {
        params: { page, limit },
      }),
    getById: (id) => axiosInstance.get(`/teacher/${id}`),
    create: (data) => axiosInstance.post(`/teacher`, data),
    update: (id, data) => axiosInstance.put(`/teacher/${id}`, data),
    delete: (id) => axiosInstance.delete(`/teacher/${id}`),
  },

  // ============ STATISTICS/DASHBOARD ============
  dashboard: {
    getStats: () => axiosInstance.get(`/admin/stats`),
    getUsersCount: () => axiosInstance.get(`/admin/users-count`),
    getRecentActivity: () => axiosInstance.get(`/admin/activity`),
  },

  // ============ USERS/AMBASSADORS ============
  users: {
    getAll: (page = 1, limit = 10, role = "") =>
      axiosInstance.get(`/auth/showalluser`, {
        params: { page, limit, role },
      }),
    getById: (id) => axiosInstance.get(`/auth/getuser/${id}`),
    update: (id, data) => axiosInstance.put(`/auth/user/${id}`, data),
    delete: (id) => axiosInstance.delete(`/auth/user/${id}`),
    createAmbassador: (data) => axiosInstance.post(`/auth/ambassadors`, data),
    getAmbassadors: () => axiosInstance.get(`/auth/ambassadors`),
    approveAmbassador: (id) =>
      axiosInstance.patch(`/auth/ambassadors/${id}`, { approved: true }),
  },

  // ============ MARKETPLACE/PRODUCTS ============
  marketplace: {
    getAll: (page = 1, limit = 10) =>
      axiosInstance.get(`/marketPlace/ShowAllProducts`, {
        params: { page, limit },
      }),
    getById: (id) => axiosInstance.get(`/marketPlace/GetProduct/${id}`),
    create: (data) => axiosInstance.post(`/marketPlace/AddProduct`, data),
    update: (id, data) => axiosInstance.put(`/marketPlace/product/${id}`, data),
    delete: (id) => axiosInstance.delete(`/marketPlace/product/${id}`),
  },

  // ============ ROADMAPS ============
  roadmaps: {
    getAll: (page = 1, limit = 10) =>
      axiosInstance.get(`/roadmap/getAll`, {
        params: { page, limit },
      }),
    getById: (id) => axiosInstance.get(`/roadmap/get/${id}`),
    create: (data) => axiosInstance.post(`/roadmap/create`, data),
    update: (id, data) => axiosInstance.put(`/roadmap/update/${id}`, data),
    delete: (id) => axiosInstance.delete(`/roadmap/delete/${id}`),
  },

  // ============ PRACTICE (Quiz, Projects, Coding Problems) ============
  practice: {
    // Quiz Questions
    quizQuestions: {
      getAll: (page = 1, limit = 10) =>
        axiosInstance.get(`/practice/GetQuizQuestions`, {
          params: { page, limit },
        }),
      create: (data) => axiosInstance.post(`/practice/AddQuizQuestion`, data),
      update: (id, data) =>
        axiosInstance.patch(`/practice/UpdateQuizQuestion`, {
          _id: id,
          ...data,
        }),
      delete: (id) => axiosInstance.delete(`/practice/quiz/${id}`),
    },
    // Project Ideas
    projects: {
      getAll: (page = 1, limit = 10) =>
        axiosInstance.get(`/practice/GetProjectIdeas`, {
          params: { page, limit },
        }),
      create: (data) => axiosInstance.post(`/practice/AddProjectIdea`, data),
      update: (id, data) => axiosInstance.put(`/practice/project/${id}`, data),
      delete: (id) => axiosInstance.delete(`/practice/project/${id}`),
    },
    // Coding Problems
    codingProblems: {
      getAll: (page = 1, limit = 10) =>
        axiosInstance.get(`/practice/GetCodingProblem`, {
          params: { page, limit },
        }),
      create: (data) => axiosInstance.post(`/practice/AddCodingProblem`, data),
      update: (id, data) =>
        axiosInstance.patch(`/practice/UpdateCodingProblem`, {
          _id: id,
          ...data,
        }),
      delete: (id) => axiosInstance.delete(`/practice/coding/${id}`),
    },
  },
};

export default adminAPI;
