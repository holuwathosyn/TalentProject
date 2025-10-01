import { useState } from "react";
import { Link } from "react-router-dom";

const MonthOne = [
  {
    id: 1,
    Month: "3-Month Courses",
    imgaerx: "CodingFront.jpg",
    First: "Frontend Development",
    Description: "Learn HTML, CSS, JavaScript, and React to build responsive websites.",
    Curriculum: "Basics of HTML & CSS, JavaScript fundamentals, React basics, and project-based learning.",
    Requirements: "Laptop, Book, pen and your determination",
  },
  {
    id: 2,
    
    imgaerx: "PYTHONanalyxix.jpg",
    First: "Data Analysis with Python",
    Description: "Master Python, Pandas, NumPy, and data visualization tools like Matplotlib and Seaborn.",
    Curriculum: "Python basics, data manipulation, visualization, and real-world data analysis projects.",
    Requirements: "Laptop, Book, pen and your determination",
  },
  {
    id: 3,
   
    imgaerx: "figmaIkeieror.webp",
    First: "UI/UX Design",
    Description: "Learn UI and UX design principles, tools like Figma, and prototyping.",
    Curriculum: "Design thinking, wireframing, prototyping, and usability testing.",
    Requirements: "Laptop, Book, pen and your determination",
  },
  {
    id: 4,
   
    imgaerx: "GoogleCloud.jpeg",
    First: "Cloud Computing with AWS / Google Cloud/ MS Azure",
    Description: "Learn cloud infrastructure, AWS services, and deployment strategies.",
    Curriculum: "AWS fundamentals, cloud architecture, and hands-on projects.",
    Requirements: "Laptop, Book, pen and your determination",
  },
  {
    id:5,
    imgaerx:"cyberxecurityImage.jpeg ",
First:"Cyber security/ Ethical hacking",
Description:"Learn how to protect systems, stop cyber threats, and become a certified ethical hacker! ",
  Curriculum:"Hands-on Training,  Real-World Hacking Techniques, Hands-on Training",
  Requirements: "Laptop, Book, pen and your determination",
}
];

const MonthTwo = [
  {
    id: 1,
    Monthx: "6-Month Courses",
    Image: "fulltox.jpg",
    Second: "Full Stack Development",
    Description: "Learn frontend and backend technologies including React, Node.js, and MongoDB.",
    Curriculum: "Frontend development, backend development, database management, and full-stack projects.",
    Requirements: "Laptop, Book, pen and your determination.",
  },
  {
    id: 2,
     
    Image: "DataAnayst2.webp",
    Second: "Data science / Machine Learning",
    Description: "Dive into machine learning algorithms, TensorFlow, and real-world AI applications.",
    Curriculum: "Python for ML, supervised and unsupervised learning, neural networks, and capstone projects.",
    Requirements: "Laptop, Book, pen and your determination",
  },
  {
    id: 3,
     
    Image: "MobileAppdev2.jpg",
    Second: "Mobile Application Development",
    Description: "Master mobile app development for Android and iOS using React Native and Flutter.",
    Curriculum: "Cross-platform app building, API management, app publishing.",
    Requirements: "Laptop, Android/iOS device, Internet, and a passion for mobile development.",
  },
  {
    id: 4,
   
    Image: "clouComputing.jpeg",
    Second: "Cloud Computing with AWS / Google Cloud/ MS Azure.",
    Description: "Learn cloud infrastructure, AWS services, and deployment strategies.",
    Curriculum: "AWS fundamentals, cloud architecture, and hands-on projects.",
    Requirements: "Laptop, Book, pen and your determination",
  },
  {
    id:5,
  Image:"Web3.png",
  Second:"Blockchain / Web 3",
  Description:"Master the skills to build decentralized apps (dApps), create smart contracts, and understand the core of Web3 technologies.",
  Curriculum:"Introduction to Web3 & Decentralization, How Blockchain Works ",
 Requirements: "Laptop, Book, pen and your determination",
  }
];

export default function Courses() {
  const [ItemListing, setItemListing] = useState(1);
  const [preload, setpreload] = useState(false);
  const ListingApplication = ItemListing === 1 ? MonthOne : MonthTwo;

  function PreviousOne() {
    setpreload(true);
    setTimeout(() => {
      setpreload(false);
      setItemListing(1);
    }, 3000);
  }

  function NextOne() {
    setpreload(true);
    setTimeout(() => {
      setpreload(false);
      setItemListing(2);
    }, 3000);
  }

  return (
    <>
      <div className="CourHone bg-blue-950 py-8 px-4 md:px-10">
        <div className="mb-6">
          <Link to="/">
            <button className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline">
              Home
            </button>
          </Link>
        </div>

        <div className="py-4">
          <h1
            style={{ fontFamily: "FontOne" }}
            className="text-white font-bold text-xl sm:text-3xl lg:text-4xl mb-4 text-center"
          >
            Explore Our Learning Programmes
          </h1>
          <p className="text-white text-lg leading-relaxed text-center">
            Unlock a wide array of career-focused training courses, thoughtfully
            designed to support your professional development and prepare you for
            future opportunities.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 Thremonth">
        {preload ? (
          <div className="flex justify-center items-center h-40">
            <div className="border-4 border-blue-500 rounded-full animate-spin w-12 h-12 border-t-transparent"></div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3 m-2">
            
              {ListingApplication.map((Item) => (
                <>
              <div key={Item.id} className="shadow-xl bg-white rounded-lg overflow-hidden">
              
                  <img
                    src={Item.Image || Item.imgaerx}
                    alt={Item.First || Item.Second}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h1 style={{fontFamily:"FontOne"}} className="text-center text-2xl font-bold text-blue-950 mb-2">
                      {Item.First || Item.Second}
                    </h1>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="text-blue-950 font-bold">Description: </span>
                      {Item.Description}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="text-blue-950 font-bold">Curriculum: </span>
                      {Item.Curriculum}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-blue-950 font-bold">Requirements: </span>
                      {Item.Requirements}
                    </p>
                  </div>
                </div>
              </>))}
            </div>

            <div className="flex justify-center items-center gap-9 mt-6">
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                onClick={PreviousOne}
              >
                1
              </button>
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                onClick={NextOne}
              >
                2
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
