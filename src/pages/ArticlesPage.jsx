import React from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ArticlesPage = ({
  darkMode,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  articles,
  setCurrentPage,
}) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          <motion.select
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </motion.select>
        </motion.div>

        {/* Article Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <AnimatePresence>
            {articles.map((article) => (
              <motion.div
                key={article.id}
                onClick={() => setCurrentPage("article-" + article.id)}
                className={`cursor-pointer rounded-lg p-6 shadow-sm hover:shadow-md transition ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", damping: 15 }}
              >
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{article.readTime}</span>
                  <span
                    className={`font-medium capitalize ${
                      categories.find((cat) => cat.id === article.category)
                        ?.color || "text-gray-500"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Articles Found */}
        {articles.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-lg`}
            >
              No articles found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
