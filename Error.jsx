import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Application() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white px-6">
      
      <motion.div
        className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="404dog.jpg"
          alt="Lost Dog"
          className="max-w-sm w-full rounded-lg shadow-lg"
        />
      </motion.div>

    
      <motion.div
        className="text-center lg:text-left lg:ml-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1
          className="text-5xl font-extrabold text-blue-900 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Oops!
        </motion.h1>

        <motion.p
          className="text-xl text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Looks like you're lost...
        </motion.p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-950 text-white rounded px-6 py-3 hover:bg-blue-900 transition duration-300 shadow-md"
          >
            Go back home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
