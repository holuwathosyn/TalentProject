import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Shield, Edit3, Calendar, Clock } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        
        // Get last login time from localStorage if available
        const loginTime = localStorage.getItem("lastLogin");
        if (loginTime) {
          setLastLogin(new Date(parseInt(loginTime)).toLocaleString());
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [BASE_URL, navigate]);

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "instructor":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-red-600 mb-4 flex flex-col items-center">
              <Shield size={48} className="mb-2" />
              {error}
            </div>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
       

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-14">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white text-blue-600 text-3xl font-bold mr-4">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleBadgeColor(user?.role)}`}>
                  <Shield size={14} className="mr-1" />
                  {user?.role || "Unknown Role"}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user?.name || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{user?.email || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium capitalize">{user?.role?.toLowerCase() || "Not specified"}</p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Account Information
                </h3>
                
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                {lastLogin && (
                  <div className="flex items-center">
                    <Clock size={18} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Last Login</p>
                      <p className="font-medium">{lastLogin}</p>
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <Link
                    to="/Updatepassword"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Update Password
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section (if needed in the future) */}
          {/* <div className="bg-gray-50 p-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Courses Taken</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-yellow-600">4</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-purple-600">24</p>
                <p className="text-sm text-gray-600">Hours Learned</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;