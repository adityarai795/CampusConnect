import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: Record<string, User & { password: string }> = {
  "admin@college.com": {
    id: "1",
    name: "Dr. Rajesh Kumar",
    email: "admin@college.com",
    role: "admin",
    department: "Administration",
    phone: "9876543210",
    password: "admin123",
  },
  "teacher@college.com": {
    id: "2",
    name: "Prof. Anita Sharma",
    email: "teacher@college.com",
    role: "teacher",
    department: "Computer Science",
    phone: "9876543211",
    password: "teacher123",
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    // Mock authentication - replace with actual API call
    const mockUser = mockUsers[email];

    if (mockUser && mockUser.password === password && mockUser.role === role) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
