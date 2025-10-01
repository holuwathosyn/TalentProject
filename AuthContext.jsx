import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true,
  });

  // Attach token
  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  });

  // Refresh token on 401
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        }
      }
      return Promise.reject(error);
    }
  );

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/login", { email, password });
      setAccessToken(res.data.token);
      await loadProfile(res.data.token);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/refresh-token`, {}, { withCredentials: true });
      if (res.data?.token) {
        setAccessToken(res.data.token);
        return res.data.token;
      }
      return null;
    } catch (err) {
      console.error("Refresh token failed:", err);
      setUser(null);
      setAccessToken(null);
      return null;
    }
  };

  const loadProfile = async (token) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const res = await axiosInstance.get("/profile", { headers });
      setUser(res.data);
    } catch (err) {
      console.error("Load profile failed:", err.response?.data || err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const token = await refreshToken();
      if (token) await loadProfile(token);
      else setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
};
