import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const Navigation = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => {
  const navItems = ["home", "articles", "about", "contact"];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 10 }}
      className={`px-6 py-4 flex justify-between items-center shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="font-bold text-xl"
      >
        EliteInfoX
      </motion.div>

      <div className="flex items-center space-x-6">
        {navItems.map((page, index) => (
          <motion.button
            key={page}
            onClick={() => setCurrentPage(page)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`capitalize hover:underline transition ${
              currentPage === page ? "font-bold" : ""
            }`}
          >
            {page}
          </motion.button>
        ))}

        <motion.button
          whileTap={{ rotate: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun /> : <Moon />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
