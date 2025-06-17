import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../hooks/useApiData";
import { getImageUrl } from "../utils/imageUtils";

const ArticlesPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // Use API hooks with fallback to local data
  const { articles: apiArticles, loading: articlesLoading } = useArticles();

  return (
    <div className="min-h-screen mt-14 py-8 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Articles
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our complete collection of insightful articles and expert
            perspectives
          </p>
        </motion.div>

        {articlesLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-900 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiClock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                    <button
                      onClick={() => navigate(`/article/${article.id}`)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Read More
                      <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No articles message */}
            {apiArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No Articles Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Check back later for new articles and insights.
                </p>
              </motion.div>
            )}

            {/* Articles count */}
            {apiArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-12"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {apiArticles.length} article
                  {apiArticles.length !== 1 ? "s" : ""}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
