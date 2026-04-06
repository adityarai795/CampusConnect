import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthResponse } from "../types";
import { authStorage } from "../utils/storage";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await authStorage.getToken();
        const storedUser = await authStorage.getUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // API call would go here
      // const response: AuthResponse = await loginAPI(email, password);
      // Mock response for now
      const response: AuthResponse = {
        token: "mock-token",
        user: {
          _id: "1",
          email,
          firstName: "Mock",
          lastName: "User",
          role: "student",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      setToken(response.token);
      setUser(response.user);
      await authStorage.setToken(response.token);
      await authStorage.setUser(response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      setIsLoading(true);
      // API call would go here
      // const response: AuthResponse = await signupAPI(email, password, firstName, lastName);
      // Mock response for now
      const response: AuthResponse = {
        token: "mock-token",
        user: {
          _id: "1",
          email,
          firstName,
          lastName,
          role: "student",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      setToken(response.token);
      setUser(response.user);
      await authStorage.setToken(response.token);
      await authStorage.setUser(response.user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setToken(null);
      setUser(null);
      await authStorage.clearAuth();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    authStorage.setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
