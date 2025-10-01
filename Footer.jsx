import React from "react";
import { 
  FaHome, 
  FaEnvelope, 
  FaUserPlus, 
  FaBlog, 
  FaBriefcase, 
  FaUserTie,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Talent Pool</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Connecting top talent with leading companies to build the future 
              of technology and innovation together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <FaLinkedinIn className="text-sm" />
              </a>
              <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-700">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <FaHome className="mr-3 text-blue-300" />
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <FaEnvelope className="mr-3 text-blue-300" />
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <FaUserPlus className="mr-3 text-blue-300" />
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <FaBlog className="mr-3 text-blue-300" />
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-700">Opportunities</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <FaBriefcase className="mr-3 text-blue-300" />
                  Hire Intern
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <FaUserTie className="mr-3 text-blue-300" />
                  Join as Talent
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-700">Stay Updated</h4>
            <p className="text-blue-100 mb-4">
              Subscribe to our newsletter for the latest opportunities and updates.
            </p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-blue-800 border border-blue-700 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-white text-blue-900 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © {currentYear} Talent Pool. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

        </div>
      <p className="justify-center p-2 mb-1">Powered by Edmoss </p>
      </div>
    </footer>
  );
};

export default Footer;