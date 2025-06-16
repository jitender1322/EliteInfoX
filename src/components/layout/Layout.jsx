import React from "react";
import { motion } from "framer-motion";
import Navigation from "../Navigation";
import Footer from "../Footer";

const Layout = ({
  children,
  darkMode,
  setDarkMode,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="pt-16" // Add padding-top to account for fixed navbar
      >
        {children}
      </motion.main>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Layout;
