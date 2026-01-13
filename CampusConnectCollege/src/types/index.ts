// User Types
export type UserRole = "admin" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
}

// Student Type (managed by admin/teacher)
export interface Student {
  id: string;
  username: string;
  email: string;
  rollNumber: string;
  class: string;
  section: string;
  department: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  avatar?: string;
  dateOfBirth: string;
  admissionDate: string;
  status: "active" | "inactive" | "graduated";
}

// Teacher Type
export interface Teacher {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  phone: string;
  address: string;
  qualification: string;
  experience: string;
  subjects: string[];
  avatar?: string;
  joiningDate: string;
  status: "active" | "inactive";
}

// Notes Type
export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  section: string;
  fileUrl: string;
  fileType: "pdf" | "doc" | "ppt" | "image";
  uploadedBy: string;
  uploadedAt: string;
}

// Result Type
export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  class: string;
  section: string;
  examType: "midterm" | "final" | "unit-test" | "practical";
  subjects: SubjectResult[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  remarks?: string;
  publishedAt: string;
}

export interface SubjectResult {
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
}

// Event Type
export interface CollegeEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: "academic" | "cultural" | "sports" | "seminar" | "other";
  organizer: string;
  status: "upcoming" | "ongoing" | "completed";
}

// Job Type
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "internship";
  salary: string;
  description: string;
  requirements: string[];
  applicationDeadline: string;
  postedAt: string;
  status: "active" | "closed";
}

// Announcement Type
export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  targetAudience: "all" | "teachers" | "students";
  createdBy: string;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalDepartments: number;
  activeEvents: number;
  pendingResults: number;
}

// Sidebar Item Type
export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  roles: UserRole[] | readonly UserRole[];
}
