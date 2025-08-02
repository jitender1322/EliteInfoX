import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";
import { useArticle } from "../hooks/useApiData";
import { getImageUrl } from "../utils/imageUtils";
import { renderFormattedContent } from "../utils/contentRenderer.jsx";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { article, loading, error } = useArticle(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/articles")}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate("/articles")}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Articles
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {article.category}
              </span>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <FiClock className="h-4 w-4" />
                <span className="text-sm">{article.readTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <FiCalendar className="h-4 w-4" />
                <span className="text-sm">{article.date}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {article.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Article Image */}
          <div className="mb-8">
            <img
              src={getImageUrl(article.image)}
              alt={article.title}
              className="w-full aspect-[16/9] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-soft">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {article.content ? (
                  <div className="prose prose-lg max-w-none">
                    {renderFormattedContent(article.content)}
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed">
                    This is a comprehensive article about{" "}
                    {article.title.toLowerCase()}. The content provides detailed
                    insights and analysis on this important topic.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 dark:text-gray-400">
                  Published on {article.date}
                </span>
              </div>
              <button
                onClick={() => navigate("/articles")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Articles
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;
