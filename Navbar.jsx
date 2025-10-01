// src/components/Navbar.jsx 
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Play click sound
  const playClickSound = () => {
    const audio = new Audio("/sounds/ui-pop-up-1-197886.mp3");
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    playClickSound();
    setIsOpen(!isOpen);
  };

  // Scroll handler
  const handleScroll = () => setScrolled(window.scrollY > 10);

  // On mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    checkUserStatus();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check user login status
  const checkUserStatus = () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUserEmail(email);
      fetchUserProfile(token);
    } else {
      setUserEmail(null);
      setUserProfile(null);
    }
  };

  // Fetch profile from API
  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUserProfile(res.data.user || res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      localStorage.clear();
      setUserEmail(null);
      setUserProfile(null);
    }
  };

  // Toggle dropdown
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!userProfile) return "/";
    return userProfile.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
  };

  // Handle profile click
  const handleProfileClick = () => {
    playClickSound();
    const dashboardPath = getDashboardPath();
    navigate(dashboardPath);
    setProfileDropdownOpen(false);
    setIsOpen(false);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setUserEmail(null);
      setUserProfile(null);
      setProfileDropdownOpen(false);
      setIsOpen(false);
      navigate("/Login", { replace: true });
    }
  };

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contactus" },
    { name: "Blog", path: "/blog" },
    { name: "Hire Talent", path: "/Registration" },
  ];

  // Render profile
  const renderProfile = (isMobile = false) => {
    const baseClasses = isMobile ? `rounded-lg p-4 space-y-3 ${scrolled ? "bg-blue-800" : "bg-gray-100"}` : "";
    if (!userProfile) return null;

    return (
      <div 
        className={`${baseClasses} cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md`}
        onClick={handleProfileClick}
      >
        <div className="flex items-center space-x-3">
          <div className={`${isMobile ? "w-10 h-10" : "w-12 h-12"} rounded-full flex items-center justify-center ${scrolled ? "bg-blue-700" : "bg-blue-100"}`}>
            <span className={`${scrolled ? "text-blue-200" : "text-blue-700"} font-semibold`}>
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : userEmail?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className={`${scrolled ? "text-white" : "text-gray-800"} font-medium`}>{userProfile.name || "User"}</p>
            <p className={`text-xs ${scrolled ? "text-blue-200" : "text-gray-600"}`}>
              Click to view {userProfile.role === "admin" ? "Admin" : "Student"} Dashboard
            </p>
          </div>
        </div>
        {isMobile && (
          <div className="pt-2 space-y-2">
            <p className={`${scrolled ? "text-blue-200" : "text-gray-700"} text-sm`}>
              <span className="font-medium">Role:</span> {userProfile.role || "User"}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-blue-900 text-white shadow-lg" : "bg-white text-gray-800 border-b border-gray-200"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
            <img src="WhatsApp_Image_2025-04-13_at_19.51.10-removebg-preview.png" alt="Logo" className="w-9 h-9 object-contain" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {menuLinks.map((link, i) => (
            <Link key={i} to={link.path} className={`transition-colors ${scrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-700"}`}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* User/Auth + Mobile Button */}
        <div className="flex items-center space-x-4">
          {userProfile ? (
            <div className="hidden md:flex items-center space-x-4 relative">
              <div
                ref={dropdownRef}
                className={`flex items-center space-x-2 rounded-full px-4 py-2 cursor-pointer ${scrolled ? "bg-blue-800 hover:bg-blue-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
                onClick={toggleProfileDropdown}
              >
                <FaUserCircle className={scrolled ? "text-blue-200" : "text-gray-600"} />
                <span className={`font-medium text-sm truncate max-w-xs ${scrolled ? "text-white" : "text-gray-700"}`}>
                  {userProfile.name}
                </span>
                <FaChevronDown className={`transition-transform ${profileDropdownOpen ? "rotate-180" : ""} ${scrolled ? "text-blue-200" : "text-gray-600"}`} size={14} />
              </div>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-14 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Profile Details</h3>
                  </div>
                  <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleProfileClick}>
                    {renderProfile()}
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaSignOutAlt size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/Login">
                <button className={`rounded-lg px-4 py-2 font-medium transition-all duration-300 ${scrolled ? "text-white hover:text-blue-200 border border-white/50 hover:bg-white/10" : "text-blue-700 hover:text-blue-800 border border-blue-200 hover:border-blue-300 hover:bg-blue-50"}`}>
                  Log in
                </button>
              </Link>
              <Link to="/Reg">
                <button className={`rounded-lg px-4 py-2 font-medium transition-all duration-300 shadow-sm ${scrolled ? "bg-white text-blue-900 hover:bg-blue-100" : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200 hover:shadow-md"}`}>
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className={`md:hidden rounded-full p-2 transition-colors ${scrolled ? "hover:bg-blue-800" : "hover:bg-gray-100"}`}>
            {isOpen ? <FaTimes className={scrolled ? "text-white text-2xl" : "text-gray-700 text-2xl"} /> : <FaBars className={scrolled ? "text-white text-2xl" : "text-gray-700 text-2xl"} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden transition-all duration-300 ease-in-out border-t shadow-lg ${scrolled ? "bg-blue-900 border-blue-800" : "bg-white border-gray-200"}`}>
          <div className="px-6 py-5 space-y-5">
            {menuLinks.map((link, i) => (
              <Link key={i} to={link.path} onClick={toggleMenu} className={`block text-lg font-medium transition-colors ${scrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-700"}`}>
                {link.name}
              </Link>
            ))}

            {userProfile ? (
              <>
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <h3 className={`font-semibold mb-3 ${scrolled ? "text-white" : "text-gray-800"}`}>Profile Details</h3>
                  <div onClick={handleProfileClick}>
                    {renderProfile(true)}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/Login" onClick={toggleMenu} className={`block w-full text-center font-medium rounded-lg px-4 py-3 transition-all duration-300 ${scrolled ? "border border-white/70 text-white hover:bg-white/10" : "border border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
                  Log in
                </Link>
                <Link to="/Reg" onClick={toggleMenu} className={`block w-full text-center font-medium rounded-lg px-4 py-3 transition-all duration-300 ${scrolled ? "bg-white text-blue-900 hover:bg-blue-100" : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"}`}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;