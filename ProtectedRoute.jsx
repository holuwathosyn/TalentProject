import React from "react";
import { Navigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminCourseUpload from "./UploadCourse";
import AdminCreateCourse from "./AdminCreateCourse";
const Dashboard = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email"); // Store email on login if not done yet

  if (!role) return <Navigate to="/login" />; // redirect if not logged in

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {role === "admin" ? (
        <>
        <AdminDashboard email={email} role={role} />
        <AdminCourseUpload email={email} role={role}/>
        <AdminCreateCourse email={email} role={role}/>
        
      </>
      ) : (
        <StudentDashboard email={email} role={role} />
      )}
    </div>
  );
};

export default Dashboard;
