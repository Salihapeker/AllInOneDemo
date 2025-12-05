import React, { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      // Mock test modu - localStorage'dan user bilgisi al
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("User parse hatası:", e);
      }
      setLoading(false);
    } else if (token) {
      // Gerçek API modu
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, access, refresh, user: userData } = response.data;
      
      // Handle both token formats (simple token or JWT access/refresh)
      const authToken = token || access;
      localStorage.setItem("token", authToken);
      if (access) localStorage.setItem("access_token", access);
      if (refresh) localStorage.setItem("refresh_token", refresh);
      
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } else {
        // If user data not returned, fetch it
        await fetchUser();
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, access, refresh, user: newUser } = response.data;
      
      const authToken = token || access;
      localStorage.setItem("token", authToken);
      if (access) localStorage.setItem("access_token", access);
      if (refresh) localStorage.setItem("refresh_token", refresh);
      
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      } else {
        await fetchUser();
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/";
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await authAPI.resetPassword(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout,
        forgotPassword,
        resetPassword,
        fetchUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
