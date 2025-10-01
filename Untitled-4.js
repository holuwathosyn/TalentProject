import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Registration from "./Regixtration";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLaptop,
  FaBriefcase,
  FaCogs,
  FaCertificate,
  FaGlobe,
  FaRegChartBar,
  FaUsers,
  FaWhatsapp ,
  FaArrowLeft,
  FaArrowRight,
   
} from "react-icons/fa";
import { title } from "framer-motion/client";
const MonthTwo=[
    {
        id:1,
        Image:"fulltox.jpg",
       Second :"Full Stack Development",
Description:"Description Learn frontend and backend technologies including React, Node.js, and MongoDB.",
Curriculum:"Curriculum Summary Frontend development, backend development, database management, and full-stack projects.",
Requirements:"Requirements Laptop, Book, pen and your determination.",
    },
    {
        id:2,
        Image:"DataAnayst2.webp",
    Second:"Data science / Machine Learning",
Description:"Description Dive into machine learning algorithms, TensorFlow, and real-world AI applications.",
Curriculum:"Curriculum Summary: Python for ML, supervised and unsupervised learning, neural networks, and capstone projects.",
Requirements:"Requirements: Laptop, Book, pen and your determination",
    },
    {
        id:3,
        Image:"MobileAppdev2.jpg",
       Second:" Mobile Application Development",
Description:"Description Master mobile app development for both Android and iOS using React Native and Flutter. Learn to build cross-platform applications, manage APIs, and publish your apps to the Google Play Store and Apple App Store.",
Requirements:" Laptop, Android/iOS device for testing, Internet connection, and a passion for mobile app development.",
    },
    { id:4,
      Image:"cloud two.jpg",
Second:"Cloud Computing with AWS / Google Cloud/ MS Azure.",
Description:"Description: Learn cloud infrastructure, AWS services, and deployment strategies.",

Curriculum:" CurriculumSummary: AWS fundamentals, cloud architecture, and hands-on projects.",

Requirements:"Requirements: Laptop, Book, pen and your determination"

    }
  ]


const MonthOne = [
  {
    id: 1,
    imgaerx: "output (1).jpg",
    First: "Frontend Development",
    Description:
      "Description: Learn HTML, CSS, JavaScript, and React to build responsive websites.",
    Curriculum:
      "Curriculum Summary: Basics of HTML & CSS, JavaScript fundamentals, React basics, and project-based learning.",
    Requirements: "Requirements: Laptop, Book, pen and your determination",
  },
  {
    id: 2,
    imgaerx: "PYTHONanalyxix.jpg",
    First: "Data Analysis with Python",
    Description:
      "Master Python, Pandas, NumPy, and data visualization tools like Matplotlib and Seaborn.",
    Curriculum:
      "Curriculum Summary: Python basics, data manipulation, visualization, and real-world data analysis projects.",
    Requirements: "Requirements: Laptop, Book, pen and your determination",
  },
  {
    id: 3,
    imgaerx: "figmaIkeieror.webp",
    First: "UI/UX Design",
    Description:
      "Description: Learn user interface and user experience design principles, tools like Figma, and prototyping.",
    Curriculum:
      "Curriculum Summary: Design thinking, wireframing, prototyping, and usability testing.",
    Requirements: "Requirements: Laptop, Book, pen and your determination",
  },
  {
    id: 4,
    imgaerx: "GoogleCloud.jpeg",
    First: "Cloud Computing with AWS / Google Cloud/ MS Azure",
    Description: "Learn cloud infrastructure, AWS services, and deployment strategies.",
    Curriculum: "Summary: AWS fundamentals, cloud architecture, and hands-on projects.",
    Requirements: "Requirements: Laptop, Book, pen and your determination",
  },
];



const OverView = [
  {
    id: 1,
    icon: FaUser,
    Heading: "Register",
    Paragrapher:
      "Students register for the program and get access to the community / mentor / physical class / online platform.",
  },
  {
    id: 2,
    icon: FaLaptop,
    Heading: "Get Trained",
    Paragrapher: "Receive world-class training from experienced instructors.",
  },
  {
    id: 3,
    icon: FaBriefcase,
    Heading: "Internship",
    Paragrapher:
      "Gain real-world experience through internships with top companies.",
  },
  {
    id: 4,
    icon: FaCogs,
    Heading: "Develop Products",
    Paragrapher:
      "Work on real projects and develop products to showcase your skills.",
  },
  {
    id: 5,
    icon: FaCertificate,
    Heading: "Get Certified",
    Paragrapher:
      "Receive a certificate upon successful completion of the program.",
  },
  {
    id: 6,
    icon: FaRegChartBar,
    Heading: "Track Progress",
    Paragrapher: "Monitor your progress through the online platform.",
  },
  {
    id:7,
    icon:FaGlobe,
    Heading:"International certicate",
    Paragrapher:"International certificate in view."
  }
];

const ImageTech = [
  { id: 1, Imagex: "javascript image.png" },
  { id: 2, Imagex: "pythonImage.webp" },
  { id: 3, Imagex: "django-original-icon-2048x874-iws4p6y8.png" },
  { id: 4, Imagex: "sqlImage.png" },
  { id: 5, Imagex: "phpIamge.png" },
  { id: 6, Imagex: "RustImage.png" },
];

const Courses = [
  {
    id: 1,
    word:"Data",
    Picture: "nnn.jpeg",
    Course: "Data Analysis",
  },
  {
    id: 2,

    Picture: "fukkk2.jpeg",
    word:"Technology",
    Course: "Full Stack Development",
  },
  {
    id: 3,  
    word:"Design",
    Picture: "uiuxuu.jpeg",
    Course: "UI/UX Design",
  },
  {
    id: 4,
    word:"cross platform",
    Picture: "MobileApp.jpg",
    Course: "Mobile Application Development ",
  },
  {
    id: 5,
    word:"cloud computing",
    Picture: "360_F_462107714_aTGwFGQ8tSwLmmoKnjXuAVspXfiKGl8D.jpg",
    Course: "Cloud Computing with AWS / Google Cloud/ MS Azure",
  },
  {
    id: 6,
    word:"Statistics",
    Picture: "african-american-business-data-analyst-600nw-1787773664.webp",
    Course: "Data science",
  },
];

 const dataElemtn = [
  {
    title: "What is Talent Pool Africa?",
    content: "We help you build tech skills and connect you to global jobs.",
  },
  {
    title: "Are courses beginner friendly?",
    content: "Yes, we offer beginner to advanced courses.",
  },
  {
    title: "What is the duration for a typical program?",
    content: "There are 6-month and 3-month courses.",
  },
  {
    title: "Where are you located?",
    content: "Ikeja, Lagos, Nigeria",
  },
  {
    title: "Do I need a laptop?",
    content:
      "Yes, you will need a laptop. All our classes are hands-on and practical.",
  },
];
export default function Application() {


 const [OpeningItem, setOpeningItem]=useState(null);
 function OnclickingItem(index){
setOpeningItem(OpeningItem === index ? null : index)
 }
  
  const [xelection, setxelection] = useState(0);
  

  function PrevThree() {
   
    setxelection((prev) => (prev + 1) % MonthOne.length);
  
}

  function NextThree() {
     
    setxelection((prev) =>
      (prev - 1 + MonthOne.length) % MonthOne.length
    );
  
}
const leftToRight = {
  offscreen: { x: -100, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

const rightToLeft = {
  offscreen: { x: 100, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};


  return (
    <>
      <div className="now px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "FontTwo" }}
          className="text-2xl lg:text-3xl text-center font-bold mb-4"
        >
          Talent Pool Africa – Join the Future of Tech: Build, Innovate & Become
          a Global Star!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mt-2 font-light text-gray-700 max-w-xl mx-auto"
        >
          Dive into a world of opportunities where you can enhance your skills,
          collaborate with innovators, and take your career to new heights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="flex justify-center mt-6"
        >
          <Link to="/InternshipForm">
          <button className="bg-blue-950
           hover:bg-blue-700 text-white rounded-xl px-6 py-3 shadow-md transition-all duration-300">
        Discover Emerging Talent
          </button>
          </Link>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
         
        >   
        <div class="relative w-full h-[600px] md:h-[700px] flex items-center justify-center bg-white overflow-hidden">

  <svg viewBox="0 0 400 400" class="absolute w-[80%] h-[80%] md:w-[400px] md:h-[400px] z-0 max-w-[400px] max-h-[400px]">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a9dce3" />
      </marker>
    </defs>
    <circle cx="200" cy="200" r="190" stroke="#a9dce3" stroke-width="3" fill="none" class="moving-dash" marker-end="url(#arrow)" />

    <circle cx="200" cy="10" r="8" fill="blue" class="font-bold" />

    <circle cx="200" cy="390" r="8" fill="pink" />

    <circle cx="10" cy="200" r="8" fill="pink" />

  </svg>

  <div class="relative w-[80%] h-[80%] md:w-[480px] md:h-[480px] max-w-[480px] max-h-[480px]">

    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
      <p class="font-semibold text-sm md:text-base mb-2">Full Stack Development</p>
      <img src="fullstackdev.jpg" alt="Software Dev"
        class="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-blue-400 mx-auto" />
      <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs md:text-sm mt-2">NodeJS</span>
    </div>

    <div class="absolute top-1/2 right-0 transform translate-x-[calc(50%-0.8rem)] -translate-y-1/2 text-center flex flex-col items-center">
      <p class="font-semibold text-sm md:text-base mb-2 mr-8">Mobile Engineer</p>
      <img src="mobileEnginere.jpeg" alt="Mobile Engineer"
        class="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-yellow-400 mx-auto" />
      <span class="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs md:text-sm mt-2">Flutter</span>
    </div>

    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
      <p class="font-semibold text-sm md:text-base mb-2"> SQL</p>
      <img src="  DatabaseAdmin.jpeg" alt="Database SQL"
        className ="w-16 h-16 md:w-24 md:h-24 rounded-full border-4  border-pink-500 mx-auto" />
      <span class="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs md:text-sm mt-2">Database SQL</span>
    </div>

    <div class="absolute top-1/2 left-0 transform -translate-x-[calc(50%-0.8rem)] -translate-y-1/2 text-center flex flex-col items-center">
      <p class="font-semibold text-sm md:text-base mb-2">Data Analysis</p>
      <img src="Data-analysis-career-in-abuja-nigeria.jpg" alt="Data Analysis"s
        class="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-green-500 mx-auto" />
      <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs md:text-sm mt-2">Python</span>
    </div>
  </div>
</div> 
        </motion.div>
      </div>

     
      <div className="mt-16">
        <h1 className="text-center lg:p-5 lg:m-10 p-3 m-2 font-bold text-sm lg:text-3xl">
          Build a Versatile Skillset with Industry-Leading Tools & Technologies
        </h1>

        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15,
          }}
          className="p-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-center space-x-8 whitespace-nowrap">
            {ImageTech.map((imagex) => (
              <div key={imagex.id}>
                <img
                  src={imagex.Imagex}
                  alt={`Tech ${imagex.id}`}
                  className="w-28 lg:w-20 h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>


   
      <div className="mt-20 px-4">
        <h1 style={{fontFamily:"FontOne"}} className="text-center text-2xl lg:text-3xl font-bold mb-6">
          Program Overview
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 ">
          {OverView.map((now) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, threshold: 0.5 });

            return (
              <motion.div
                key={now.id}
                ref={ref}
                className="shadow-xl m-2 p-5 flex flex-col items-center rounded-xl bg-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: inView ? 1 : 0,
                  y: inView ? 0 : 50,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-blue-950 text-5xl font-bold mb-4">
                  <now.icon />
                </div>
                <h2 style={{fontFamily:"FontOne"}}  className="text-xl font-semibold text-black text-center mb-2">
                  {now.Heading}
                </h2>
                <p className="text-center text-gray-700">{now.Paragrapher}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

<div className="bg-gray-50 p-5 m-4" data-aos="fade-in">
 
  <button
    style={{ fontFamily: "sans-serif" }}
    className="bg-blue-200 text-blue-950 p-2 rounded m-10"
    data-aos="fade-right"
  >
    Popular Courses
  </button>

  
  <div className="block lg:flex justify-between items-center" data-aos="fade-left">
    <div>
      <h1
        style={{ fontFamily: "sans-serif" }}
        className="font-extrabold text-2xl lg:text-4xl "
      >
        Featured Courses
      </h1>
    </div>
    <Link to="/CourseList">
    <p 
      className="text-blue-600 m-2  p-1 font-bold"
      data-aos="fade-up"
    >
      View All Active Courses
    </p></Link>
  </div>

  
  <p className=" mb-6" data-aos="fade-up">
    Check out our most in-demand courses to take your career to the next level.
  </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {Courses.map((engine, index) => (
        <motion.div
          key={engine.id}
          className="bg-white rounded-2xl shadow-lg p-4 transition-transform transform hover:scale-105"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={index % 2 === 0 ? leftToRight : rightToLeft}
        >
          <motion.img
            src={engine.Picture}
            alt={engine.Course}
            className="w-full h-48 object-cover rounded-xl mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="flex items-center justify-between mb-2">
            <motion.div
              className="bg-transparent border border-blue-100 text-gray-450 text-xs p-2 rounded shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {engine.word}
            </motion.div>
          </div>

          <motion.h1
            style={{ fontFamily: "FontOne" }}
            className="text-lg font-semibold text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {engine.Course}
          </motion.h1>

          <motion.div
            className="flex items-center border-t border-t-gray-300 shadow-lg rounded p-2 justify-between mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gray-600">
              <FaUsers />
            </span>
            <div className="text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
   
   </div>

<div className="bg-blue-950 p-9 space-y-6">
  <div>
    <h1
      style={{ fontFamily: "FontOne" }}
      className="text-center text-3xl lg:text-4xl text-gray-50"
    >
      Ready to transform your career?
    </h1>

    <p
      style={{ fontFamily: "sans-serif" }}
      className="text-center text-1xl lg:text-2xl text-gray-50 mt-4"
    >
      At <span className="font-semibold">Talent Pool Africa</span>, we're dedicated to empowering you with the industry-ready skills essential for success in the tech world. Whether you're looking to advance your current career or embark on a new journey in technology, we've got you covered. We connect you to amazing job opportunities—both in Nigeria and across the globe—ensuring you are well-prepared for the future of work.
    </p>

    <div className="flex justify-center mt-6">
      <Link to="/Registration">
      <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 px-6 py-3 rounded text-white font-medium">
       Register for our course
      </button></Link>
    </div>
  </div>
</div>

 <div className="bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto rounded">
        <h1  style={{fontFamily:"FontOne"}}  className="text-center text-2xl lg:text-3xl font-bold text-blue-900 p-4">
          FAQs
        </h1>
        {dataElemtn.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded m-2 p-3 transition-all duration-300"
          >
            <button
              onClick={() => OnclickingItem(index)}
              className="w-full text-left"
            >
              <div className="flex justify-between items-center text-blue-900 font-semibold">
                <h2>{item.title}</h2>
                <span className="text-xl">
                  {OpeningItem === index ? "-" : "+"}
                </span>
              </div>
            </button>
            {OpeningItem === index && (
              <p className="mt-2 text-black"  style={{ fontFamily: "sans-serif" }}>{item.content}</p>
            )}
          </div>
        ))}
      </div>
      
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://wa.me/234801234567erioerioei8" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
      >
        <FaWhatsapp className="text-2xl" />
        Chat with us
      </a>
    </div>
    </div>

  

    </>
  );
}
