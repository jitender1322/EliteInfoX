import React from "react";
import { motion } from "framer-motion";

const HomePage = ({
  darkMode,
  categories,
  articles,
  setSelectedCategory,
  setCurrentPage,
}) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Hero Section */}
      <div
        className={`${darkMode ? "bg-gray-800" : "bg-white"} py-20 text-center`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Bite-sized info,
            <br />
            on demand.
          </h1>
          <p
            className={`text-xl mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Quick, snappy insights across various topics.
          </p>
          <button
            onClick={() => {
              const randomCat =
                categories[Math.floor(Math.random() * categories.length)];
              setSelectedCategory(randomCat.id);
              setCurrentPage("articles");
            }}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition inline-flex items-center space-x-2"
          >
            <span>💎</span>
            <span>Surprise Me!</span>
          </button>
        </div>
      </div>

      {/* Category Cards with animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage("articles");
                }}
                className={`cursor-pointer rounded-lg p-6 shadow-sm transition ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`${cat.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className={`h-6 w-6 ${cat.color}`} />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {cat.name}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {cat.id === "travel" &&
                    "Get tips and inspiration for your next adventure."}
                  {cat.id === "fitness" &&
                    "Discover ways to stay fit and healthy."}
                  {cat.id === "politics" &&
                    "Stay updated with the latest politics."}
                  {cat.id === "technology" &&
                    "Learn about the newest tech trends and innovations."}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Articles with animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2
          className={`text-3xl font-bold mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              onClick={() => setCurrentPage("article-" + article.id)}
              className={`cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{article.image}</div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {article.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {article.readTime}
                  </span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      categories.find((c) => c.id === article.category)
                        ?.color || "text-gray-500"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
