import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../constants";
import { authStorage } from "../utils/storage";
import { User, Post, Job, Product, CodingProblem, Resource } from "../types";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      async (config) => {
        const token = await authStorage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        if (error.response?.status === 401) {
          await authStorage.clearAuth();
          // Trigger login redirect here
        }
        return Promise.reject(error);
      },
    );
  }

  // Auth APIs
  async login(email: string, password: string) {
    return this.api.post("/auth/login", { email, password });
  }

  async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    return this.api.post("/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
  }

  async logout() {
    return this.api.post("/auth/logout");
  }

  async verifyToken() {
    return this.api.post("/auth/verify");
  }

  // User APIs
  async getProfile(): Promise<User> {
    return this.api.get("/users/profile");
  }

  async updateProfile(data: Partial<User>) {
    return this.api.put("/users/profile", data);
  }

  async getUserById(id: string): Promise<User> {
    return this.api.get(`/users/${id}`);
  }

  // Post APIs
  async getPosts(page: number = 1, limit: number = 10) {
    return this.api.get(`/posts?page=${page}&limit=${limit}`);
  }

  async getPostById(id: string): Promise<Post> {
    return this.api.get(`/posts/${id}`);
  }

  async createPost(data: { title: string; content: string; image?: string }) {
    return this.api.post("/posts", data);
  }

  async updatePost(id: string, data: Partial<Post>) {
    return this.api.put(`/posts/${id}`, data);
  }

  async deletePost(id: string) {
    return this.api.delete(`/posts/${id}`);
  }

  // Job APIs
  async getJobs(page: number = 1, limit: number = 10) {
    return this.api.get(`/jobs?page=${page}&limit=${limit}`);
  }

  async getJobById(id: string): Promise<Job> {
    return this.api.get(`/jobs/${id}`);
  }

  async applyForJob(jobId: string, resume: string) {
    const formData = new FormData();
    formData.append("resume", resume);
    return this.api.post(`/jobs/${jobId}/apply`, formData);
  }

  // Marketplace APIs
  async getProducts(page: number = 1, limit: number = 10) {
    return this.api.get(`/marketplace/products?page=${page}&limit=${limit}`);
  }

  async getProductById(id: string): Promise<Product> {
    return this.api.get(`/marketplace/products/${id}`);
  }

  async createProduct(data: Partial<Product>) {
    return this.api.post("/marketplace/products", data);
  }

  // Coding Problems APIs
  async getProblems(page: number = 1, limit: number = 10) {
    return this.api.get(`/problems?page=${page}&limit=${limit}`);
  }

  async getProblemById(id: string): Promise<CodingProblem> {
    return this.api.get(`/problems/${id}`);
  }

  async submitSolution(problemId: string, code: string, language: string) {
    return this.api.post(`/problems/${problemId}/submit`, { code, language });
  }

  // Resources APIs
  async getResources(page: number = 1, limit: number = 10) {
    return this.api.get(`/resources?page=${page}&limit=${limit}`);
  }

  async getResourceById(id: string): Promise<Resource> {
    return this.api.get(`/resources/${id}`);
  }

  async createResource(data: Partial<Resource>) {
    return this.api.post("/resources", data);
  }

  // Search
  async search(query: string, type: string) {
    return this.api.get(`/search?q=${query}&type=${type}`);
  }
}

export default new ApiService();
