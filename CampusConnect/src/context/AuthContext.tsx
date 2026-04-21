// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { authStorage } from "../utils/storage";
import api from "../services/api";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load stored auth
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await authStorage.getToken();
        const storedUser = await authStorage.getUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (err) {
        console.log("Auth Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // 🔹 Login
  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const { token, user } = res.data;

    setToken(token);
    setUser(user);

    await authStorage.setToken(token);
    await authStorage.setUser(user);
  };
  // 🔹 Signup
  const signup = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    const { token, user } = res.data;

    setToken(token);
    setUser(user);

    await authStorage.setToken(token);
    await authStorage.setUser(user);
  };
  // 🔹 Logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    await authStorage.clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};;

// 🔹 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
