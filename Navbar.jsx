// src/components/Navbar.jsx 
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChevronDown, FaTachometerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Play click sound
  const playClickSound = () => {
    const audio = new Audio("/ui-pop-up-1-197886.mp3");
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
  const checkUserStatus = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUserEmail(email);
      await fetchUserProfile(token);
    } else {
      setUserEmail(null);
      setUserProfile(null);
    }
    setIsLoading(false);
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

  // Toggle dropdown - only for chevron click
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    playClickSound();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!userProfile && !userEmail) return "/";
    return userProfile?.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
  };

  // Handle profile click - navigate to dashboard (for both desktop and mobile)
  const handleProfileClick = () => {
    playClickSound();
    const dashboardPath = getDashboardPath();
    navigate(dashboardPath);
    setProfileDropdownOpen(false);
    setIsOpen(false);
  };

  // Handle dashboard click from dropdown
  const handleDashboardClick = () => {
    playClickSound();
    const dashboardPath = getDashboardPath();
    navigate(dashboardPath);
    setProfileDropdownOpen(false);
    setIsOpen(false);
  };

  // Handle desktop profile area click - navigate OR toggle dropdown based on click target
  const handleDesktopProfileClick = (e) => {
    // If clicking the chevron icon, toggle dropdown
    if (e.target.closest('.dropdown-chevron') || e.target.classList.contains('dropdown-chevron')) {
      toggleProfileDropdown(e);
    } else {
      // If clicking anywhere else in the profile area, navigate to dashboard
      handleProfileClick();
    }
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

  // Render profile with clickable area
  const renderProfile = (isMobile = false) => {
    const baseClasses = isMobile ? `rounded-lg p-4 space-y-3 ${scrolled ? "bg-blue-800" : "bg-gray-100"}` : "";
    
    // Show loading state or user data
    const displayName = userProfile?.name || userEmail?.split('@')[0] || "User";
    const displayRole = userProfile?.role || "user";
    const displayInitial = displayName.charAt(0).toUpperCase();

    return (
      <div 
        className={`${baseClasses} cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md`}
        onClick={isMobile ? handleProfileClick : undefined}
      >
        <div className="flex items-center space-x-3">
          <div className={`${isMobile ? "w-10 h-10" : "w-12 h-12"} rounded-full flex items-center justify-center ${scrolled ? "bg-blue-700" : "bg-blue-100"}`}>
            <span className={`${scrolled ? "text-blue-200" : "text-blue-700"} font-semibold`}>
              {displayInitial}
            </span>
          </div>
          <div>
            <p className={`${scrolled ? "text-white" : "text-gray-800"} font-medium`}>{displayName}</p>
            <p className={`text-xs ${scrolled ? "text-blue-200" : "text-gray-600"}`}>
              {isMobile ? `Click to view ${displayRole === "admin" ? "Admin" : "Student"} Dashboard` : "View Dashboard"}
            </p>
          </div>
        </div>
        {isMobile && (
          <div className="pt-2 space-y-2">
            <p className={`${scrolled ? "text-blue-200" : "text-gray-700"} text-sm`}>
              <span className="font-medium">Role:</span> {displayRole}
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
          {!isLoading && userEmail ? (
            <div className="hidden md:flex items-center space-x-4 relative">
              {/* Desktop Profile Area - Clickable for Dashboard */}
              <div
                ref={dropdownRef}
                className={`flex items-center space-x-2 rounded-full px-4 py-2 cursor-pointer ${scrolled ? "bg-blue-800 hover:bg-blue-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors group`}
                onClick={handleDesktopProfileClick}
              >
                <FaUserCircle className={scrolled ? "text-blue-200" : "text-gray-600"} />
                <span className={`font-medium text-sm truncate max-w-xs ${scrolled ? "text-white" : "text-gray-700"}`}>
                  {userProfile?.name || userEmail?.split('@')[0] || "User"}
                </span>
                {/* Chevron only for dropdown - separate click handler */}
                <div 
                  className="dropdown-chevron flex items-center"
                  onClick={toggleProfileDropdown}
                >
                  <FaChevronDown className={`transition-transform ${profileDropdownOpen ? "rotate-180" : ""} ${scrolled ? "text-blue-200" : "text-gray-600"} group-hover:scale-110`} size={14} />
                </div>
              </div>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-14 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-gray-50">
                    <h3 className="font-semibold text-gray-800 text-lg">Profile Menu</h3>
                    <p className="text-sm text-gray-600 mt-1">Quick actions</p>
                  </div>
                  
                  {/* Main Dashboard Action - Prominent */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white"
                    onClick={handleDashboardClick}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 border border-blue-200">
                        <span className="text-blue-700 font-semibold text-lg">
                          {(userProfile?.name || userEmail?.charAt(0) || "U").toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{userProfile?.name || userEmail?.split('@')[0] || "User"}</p>
                        <p className="text-sm text-gray-600 capitalize">{userProfile?.role || "user"}</p>
                      </div>
                      <FaTachometerAlt className="text-blue-600 text-xl" />
                    </div>
                    <p className="text-xs text-blue-600 font-medium mt-2 text-center bg-blue-100 py-1 rounded">
                      🚀 Go to {userProfile?.role === "admin" ? "Admin" : "Student"} Dashboard
                    </p>
                  </div>

                  {/* Additional Dashboard Quick Action */}
                  <div 
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center space-x-3 border-b border-gray-100"
                    onClick={handleDashboardClick}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaTachometerAlt className="text-blue-600 text-sm" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Dashboard</span>
                      <p className="text-xs text-gray-500">Manage your account and activities</p>
                    </div>
                  </div>

                  {/* Logout Section - FIXED WITH stopPropagation */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to parent
                        handleLogout();
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaSignOutAlt size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : !isLoading ? (
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
          ) : (
            <div className="hidden md:flex">
              <div className="animate-pulse rounded-full px-4 py-2 bg-gray-200 w-24"></div>
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

            {!isLoading && userEmail ? (
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
            ) : !isLoading ? (
              <>
                <Link to="/Login" onClick={toggleMenu} className={`block w-full text-center font-medium rounded-lg px-4 py-3 transition-all duration-300 ${scrolled ? "border border-white/70 text-white hover:bg-white/10" : "border border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
                  Log in
                </Link>
                <Link to="/Reg" onClick={toggleMenu} className={`block w-full text-center font-medium rounded-lg px-4 py-3 transition-all duration-300 ${scrolled ? "bg-white text-blue-900 hover:bg-blue-100" : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"}`}>
                  Sign up
                </Link>
              </>
            ) : (
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;