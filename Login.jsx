import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("Attempting login with:", formData.email);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        { 
          email: formData.email, 
          password: formData.password 
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Login response:", response.data);

      if (response.data.token) {
        const { token, role, name, user } = response.data;
        
        // Handle different response structures
        const userRole = role || user?.role;
        const userName = name || user?.name || formData.email;

        // Store in sessionStorage for security
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("name", userName);

        // Also store in localStorage for navbar (optional)
        localStorage.setItem("token", token);
        localStorage.setItem("email", formData.email);

        // Store remembered email in localStorage if checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        await MySwal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to your dashboard...",
          timer: 2000,
          showConfirmButton: false,
        });

        // Navigate based on role
        if (userRole === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else {
          navigate("/student-dashboard", { replace: true });
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      
      let errorMsg = "Login failed. Please try again.";
      
      if (err.response) {
        // Server responded with error status
        errorMsg = err.response.data?.message || 
                  err.response.data?.error || 
                  `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request made but no response received
        errorMsg = "No response from server. Please check your connection.";
      }
      
      await MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMsg,
        confirmButtonColor: "#3085d6",
      });
    } finally {
      setLoading(false);
    }
  };

  // Test API connection
  const testAPI = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/health`);
      console.log("API health check:", response.data);
    } catch (error) {
      console.error("API health check failed:", error);
    }
  };

  // Uncomment to test API on component mount
  // useEffect(() => {
  //   testAPI();
  // }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 lg:right-10 bg-white text-blue-900 font-bold p-3 rounded-xl hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
      >
        <AiOutlineClose className="w-5 h-5" />
      </button>

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Login to Your Account
          </h2>
        </div>

        <div className="p-8 sm:p-10 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/ForgotPassword")}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Register */}
          <div className="text-center text-sm text-gray-600 pt-2">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/Reg")}
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
            >
              Register here
            </button>
          </div>

          {/* Debug info (remove in production) */}
          <div className="text-xs text-gray-500 text-center mt-4">
            API URL: {import.meta.env.VITE_API_BASE_URL}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;