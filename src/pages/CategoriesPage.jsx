import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaNewspaper,
  FaLaptopCode,
  FaChartLine,
  FaGamepad,
  FaMobileAlt,
  FaRobot,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Technology",
    description: "Latest updates and breaking news from the tech world",
    icon: FaNewspaper,
    color: "bg-blue-500",
    slug: "technology",
  },
  {
    id: 2,
    name: "Travel",
    description: "Travel guides, tips, and destination insights",
    icon: FaLaptopCode,
    color: "bg-purple-500",
    slug: "travel",
  },
  {
    id: 3,
    name: "Fitness",
    description: "Health, fitness, and wellness content",
    icon: FaChartLine,
    color: "bg-green-500",
    slug: "fitness",
  },
  {
    id: 4,
    name: "Politics",
    description: "Political analysis and current affairs",
    icon: FaGamepad,
    color: "bg-red-500",
    slug: "politics",
  },
  {
    id: 5,
    name: "Programming",
    description: "Coding tutorials and development insights",
    icon: FaMobileAlt,
    color: "bg-yellow-500",
    slug: "programming",
  },
  {
    id: 6,
    name: "AI & ML",
    description: "Artificial Intelligence and Machine Learning",
    icon: FaRobot,
    color: "bg-indigo-500",
    slug: "ai-ml",
  },
  {
    id: 7,
    name: "Security",
    description: "Cybersecurity and digital safety",
    icon: FaShieldAlt,
    color: "bg-pink-500",
    slug: "security",
  },
  {
    id: 8,
    name: "Cloud",
    description: "Cloud computing and infrastructure",
    icon: FaCloud,
    color: "bg-teal-500",
    slug: "cloud",
  },
];

const CategoriesPage = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen mt-14 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Explore Categories
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover content tailored to your interests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/categories/${category.slug}`}
                className={`block p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.name}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
