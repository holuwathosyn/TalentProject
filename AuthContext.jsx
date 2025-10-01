import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Create axios instance with token
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
  });

  // Add token to requests
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle 401 responses
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        setUser(null);
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  // LOGIN function
  const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });
    
    if (response.data.token) {
      const { token, role, name } = response.data;
      
      // Store user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name || email);
      
      setUser({
        email,
        role,
        name: name || email,
        token
      });
      
      return response.data;
    }
  };

  // LOGOUT function
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      setUser(null);
    }
  };

  // LOAD USER PROFILE
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    if (token && email) {
      try {
        // Verify token is still valid by making an API call
        const response = await axiosInstance.get("/profile");
        setUser({
          ...response.data,
          token,
          email,
          role,
          name
        });
      } catch (error) {
        console.error("Failed to load user profile:", error);
        // Clear invalid tokens
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  // Check if user is logged in on app start
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      axiosInstance,
      loadUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;