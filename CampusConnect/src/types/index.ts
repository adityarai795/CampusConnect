// User Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: "student" | "teacher" | "admin" | "ambassador";
  phoneNumber?: string;
  bio?: string;
  location?: string;
  college?: string;
  branch?: string;
  semester?: number;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Community Types
export interface Post {
  _id: string;
  author: User;
  title: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  author: User;
  content: string;
  createdAt: string;
}

// Job Types
export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary?: string;
  jobType: "fulltime" | "parttime" | "internship" | "contract";
  requirements: string[];
  postedAt: string;
  deadline: string;
  applicants: JobApplicant[];
}

export interface JobApplicant {
  _id: string;
  user: User;
  resume: string;
  appliedAt: string;
  status: "applied" | "shortlisted" | "rejected" | "selected";
}

// Product Types
export interface Product {
  _id: string;
  seller: User;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: Review[];
  inStock: boolean;
  createdAt: string;
}

export interface Review {
  _id: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
}

// Coding Problem Types
export interface CodingProblem {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  examples: CodeExample[];
  constraints: string[];
  testCases: TestCase[];
  solutions?: Solution[];
  submissions: number;
  acceptanceRate: number;
}

export interface CodeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface Solution {
  _id: string;
  code: string;
  language: string;
  accepted: boolean;
  timeComplexity?: string;
  spaceComplexity?: string;
}

// Learning Resources
export interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: "video" | "article" | "tutorial" | "documentation";
  url: string;
  duration?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  creator: User;
  likes: string[];
  views: number;
  createdAt: string;
}

// Roadmap Types
export interface Roadmap {
  _id: string;
  title: string;
  description: string;
  skills: SkillNode[];
  prerequisites?: string[];
  duration: number;
  difficulty: string;
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  resources?: Resource[];
  projects?: string[];
  completed: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}
