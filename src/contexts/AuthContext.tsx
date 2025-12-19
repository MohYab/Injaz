import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as mockAuth from "../services/mockAuth";

export interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; message?: string }>;
  signup: (fullName: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from storage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check sessionStorage first, then localStorage
        const sessionToken = sessionStorage.getItem("injaz_token");
        const localToken = localStorage.getItem("injaz_token");
        const currentToken = sessionToken || localToken;

        if (currentToken) {
          // Validate token
          const userId = mockAuth.validateToken(currentToken);
          if (userId) {
            // Get user data from storage
            const sessionUser = sessionStorage.getItem("injaz_user");
            const localUser = localStorage.getItem("injaz_user");
            const userData = sessionUser || localUser;

            if (userData) {
              try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setToken(currentToken);
              } catch (e) {
                console.error("Failed to parse user data:", e);
                // Clear invalid data
                sessionStorage.removeItem("injaz_token");
                sessionStorage.removeItem("injaz_user");
                localStorage.removeItem("injaz_token");
                localStorage.removeItem("injaz_user");
              }
            }
          } else {
            // Token is invalid, clear storage
            sessionStorage.removeItem("injaz_token");
            sessionStorage.removeItem("injaz_user");
            localStorage.removeItem("injaz_token");
            localStorage.removeItem("injaz_user");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
    remember: boolean = false
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await mockAuth.login(email, password);
      if (result) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("injaz_token", result.token);
        storage.setItem("injaz_user", JSON.stringify(result.user));
        setUser(result.user);
        setToken(result.token);
        return { success: true };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await mockAuth.signup(fullName, email, password);
      if (result) {
        // Signup always uses sessionStorage (no remember option)
        sessionStorage.setItem("injaz_token", result.token);
        sessionStorage.setItem("injaz_user", JSON.stringify(result.user));
        setUser(result.user);
        setToken(result.token);
        return { success: true };
      } else {
        return { success: false, message: "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Signup failed",
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("injaz_token");
    sessionStorage.removeItem("injaz_user");
    localStorage.removeItem("injaz_token");
    localStorage.removeItem("injaz_user");
    setUser(null);
    setToken(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

