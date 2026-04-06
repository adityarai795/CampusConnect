// API Configuration
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";

// App Colors
export const COLORS = {
  primary: "#3B82F6",
  secondary: "#10B981",
  accent: "#F59E0B",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Grays
  gray100: "#F9FAFB",
  gray200: "#F3F4F6",
  gray300: "#E5E7EB",
  gray400: "#D1D5DB",
  gray500: "#9CA3AF",
  gray600: "#6B7280",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Semantic
  background: "#FFFFFF",
  surface: "#F3F4F6",
  text: "#111827",
  textSecondary: "#6B7280",
};

// Font Sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
};

// Border Radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  full: 999,
};

// Job Types
export const JOB_TYPES = [
  { label: "Full Time", value: "fulltime" },
  { label: "Part Time", value: "parttime" },
  { label: "Internship", value: "internship" },
  { label: "Contract", value: "contract" },
];

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { label: "Easy", value: "easy", color: "#10B981" },
  { label: "Medium", value: "medium", color: "#F59E0B" },
  { label: "Hard", value: "hard", color: "#EF4444" },
];

// Categories
export const CATEGORIES = {
  coding: [
    "DSA",
    "Web Dev",
    "Mobile Dev",
    "DevOps",
    "Database",
    "System Design",
  ],
  resources: ["Tutorial", "Article", "Video", "Documentation", "Course"],
  marketplace: ["Books", "Notes", "Tools", "Services", "Other"],
  jobs: [
    "Software Engineer",
    "Frontend Dev",
    "Backend Dev",
    "Fullstack Dev",
    "Data Scientist",
    "DevOps Engineer",
  ],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  token: "@auth_token",
  user: "@user_data",
  theme: "@app_theme",
  language: "@app_language",
};

// Navigation Routes
export const ROUTES = {
  auth: {
    login: "/(auth)/login",
    signup: "/(auth)/signup",
    forgot: "/(auth)/forgot-password",
  },
  main: {
    home: "/(main)",
    community: "/(main)/community",
    jobs: "/(main)/stack/job",
    marketplace: "/(main)/stack/marketplace",
    placementkit: "/(main)/stack/placementkit",
    profile: "/(main)/stack/profile",
    resources: "/(main)/stack/resources",
    learning: "/(main)/stack/learning",
    roadmap: "/(main)/stack/roadmap",
    helps: "/(main)/stack/supports",
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  networkError: "Network error. Please check your internet connection.",
  serverError: "Server error. Please try again later.",
  unauthorized: "Please log in to continue.",
  notFound: "Resource not found.",
  validation: "Please check your input.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  loginSuccess: "Login successful!",
  signupSuccess: "Account created successfully!",
  updateSuccess: "Updated successfully!",
  deleteSuccess: "Deleted successfully!",
  postSuccess: "Posted successfully!",
};
