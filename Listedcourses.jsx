import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaGraduationCap, 
  FaBookOpen, 
  FaTag, 
  FaLock,
  FaRegFileAlt,
  FaPlayCircle,
  FaSearch,
  FaFilter
} from "react-icons/fa";
//import Footer from ""
import { useNavigate } from "react-router-dom";

const CoursesUploaded = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses`);
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          setError(response.data.message || "Failed to load courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Unable to connect to server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    navigate(`/login?courseId=${courseId}`);
  };

  // Get unique categories for filter
  const categories = ["All", ...new Set(courses.map(course => course.category || "General"))];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen m-56 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse mb-8">
            <div className="h-10 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-80"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md text-center border border-gray-200">
          <div className="text-red-400 mb-4">
            <FaBookOpen className="text-5xl mx-auto" />
          </div>
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Our Courses</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover a world of knowledge with our expertly crafted courses designed to help you grow.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="appearance-none pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory !== "All" 
                ? "Try adjusting your search or filter criteria" 
                : "We'll be adding new courses soon. Please check back later!"}
            </p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                {/* Course Thumbnail Placeholder */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <FaPlayCircle className="text-white text-5xl opacity-80" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{course.title}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                      {course.category || "General"}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                    <div className="flex items-center">
                      <FaGraduationCap className="mr-2 text-gray-400" />
                  
                    </div>
                    <div className="flex items-center">
                      <FaRegFileAlt className="mr-2 text-gray-400" />
                      <span>{course.videos?.length || 0} lessons</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FaRegFileAlt className="mr-2 text-gray-500" />
                      Course Content
                    </h3>
                    {course.videos?.length > 0 ? (
                      <div className="space-y-3">
                        {course.videos.slice(0, 3).map((video) => (
                          <div key={video.id} className="flex items-center text-sm text-gray-600">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <FaLock className="text-gray-400 text-xs" />
                            </div>
                            <span className="truncate">{video.title}</span>
                          </div>
                        ))}
                        {course.videos.length > 3 && (
                          <div className="text-xs text-gray-500 mt-2">
                            +{course.videos.length - 3} more lessons
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No content available yet</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full py-3 text-sm font-medium bg-gradient-to-r from-blue-900 to-indigo-800 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesUploaded;