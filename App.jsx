import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./HomePage";
import InternshipForm from "./Internship";
import Reg from "./Reg";
import Login from "./Login"
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminCreateCourse from "./AdminCreateCourse";
import  Allusers  from "./AllUser";
import Uploadcourse  from "./UploadCourse"
import PaymentSuccess from "./PaymentSuccess";
import CourseAction from "./CourseAction";
import LessonsPage from "./LessonAction";
import UpdatePassword from "./UpdatePassword";
import Announcement from "./Announcement";
import GeneralAnnoucement from "./GeneralAnnouncement";
import AskAi from "./AskAi"
import AllInformation from "./AllNotification";
import Userprofile from "./Userprofile";

import GetAllregisterd from "./Getallregistered";

import CourseUploaded from "./Listedcourses"

import Instructor from "./Instructor";
import ErrorPage from "./Error";
import Courses from "./Courses";
import Registration from "./Companyhiring";
import CourseList from "./CoursesUploded";
import  CourseDetailinfo from "./CourseDetailinfo";
import Contactus from "./Contactus"

import Calnder from "./calender";
import UserTable from "./RegisteredUsers";

import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ListOfpaidusers  from "./Listofpaidusers"
import CourseDetailHome from "./HomeComponent/courseList";  
    
import CoursesData from "./HomeComponent/CourseDetail";
import Talents from "./Talents/talents"
import GetAlljobsAdmin from "./GetAlljobsAdmin";
import AdminCREATEBLOGS from "./Admincreateblogs";
import BlogList from "./Publicbloglist/BlogList";
import BlogDetail from "./Publicbloglist/BlogDetail";
import ActiveCourse from "./Activecourse";

import RegistrationForm from "./Regixtration";
import Dashboard from "./StudentDashboard"
import TalentsList from "./Adminsection/GetTalentlist";
import Users from "./Users"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/InternshipForm" element={<InternshipForm />} />
        <Route path="/Reg" element={<Reg />}  />
        <Route path="/Login" element={<Login/>} />
    <Route path="/student-dashboard" element={<StudentDashboard/>}/>
       <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
   <Route path="/uploadcourse" element={<Uploadcourse/>}/>
    
     <Route path="/Courses" element={ <Courses/>}/>
  <Route path="/Registration" element={ <Registration/>}/>
   <Route path="/Instructor"  element={ <Instructor/>}/>
<Route path="/Calnder" element={<Calnder/>}/>
< Route path="/UserTable" element={<UserTable/>}/>
<Route path="/course/:id" element={<CourseUploaded />} />
<Route path="/AdminCreateCourse" element={<AdminCreateCourse/>}/>
 

 <Route path="/CourseList" element={<CourseList />} />
          <Route path="/CourseList/:id" element={<CourseDetailinfo />} />
<Route path="/ActiveCourse" element={<ActiveCourse/>}/>


  <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:token" element={<ResetPassword />} />
<Route path="/GetAllregisterd" element={<GetAllregisterd/>}/>
   <Route path="/payment-success" element={<PaymentSuccess/>}/>
<Route path="/Alluser" element={<Allusers/>}/>
<Route path="/CourseAction" element={<CourseAction/>}/>
   <Route path="/LessonsPage" element={<LessonsPage/>}/>
   <Route path="*" element={<ErrorPage/>}/>
  <Route path="/Updatepassword" element={<UpdatePassword/>}/>
<Route path="/Announcement"  element={<Announcement/>}/>    
    <Route path="/GeneralAnnoucement" element={<GeneralAnnoucement/>}/>
    <Route path="/AskAi" element={<AskAi/>}/>
      <Route path="/AllInformation" element={<AllInformation/>}/>
    <Route path="/Userprofile" element={<Userprofile/>}/>
    <Route path="/ListOfpaidusers" element={<ListOfpaidusers/>}/>
<Route path="/AdminCREATEBLOGS" element={<AdminCREATEBLOGS/>}/>
  <Route path="/courses" element={<CourseDetailHome />} />
        <Route path="/courses/:id" element={<CoursesData />} />

<Route path="/Talents" element={<Talents/>}/>
<Route path="/contactus" element={<Contactus/>}/>
<Route path="/GetAlljobsAdmin" element={<GetAlljobsAdmin/>}/>



 <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
<Route path="/RegistrationForm" element={<RegistrationForm/>}/>
<Route path="/TalentsList" element={<TalentsList/>}/>

      </Routes>
    </Router>
  );
}

export default App;
