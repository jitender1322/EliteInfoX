import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiClock, FiCalendar, FiEye } from "react-icons/fi";
import { useArticles } from "../hooks/useApiData";
import { getImageUrl } from "../utils/imageUtils";

const HomePage = () => {
  const navigate = useNavigate();

  // Use API hooks with fallback to local data
  const { articles: apiArticles, loading: articlesLoading } = useArticles();

  // Get featured article (first article) and remaining articles
  const featuredArticle = apiArticles[0];
  const remainingArticles = apiArticles.slice(1, 7); // Show 6 more articles

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

        {/* Modern grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(circle at center, black, transparent 80%)",
            }}
          />
        </div>

        {/* 3D-like floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main 3D card effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/30 dark:to-gray-900/30 rounded-3xl backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-2xl transform rotate-3 scale-110" />

          {/* Accent elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full border border-blue-200/10 dark:border-blue-800/20" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full border border-indigo-200/10 dark:border-indigo-800/20" />

          {/* Decorative lines */}
          <div className="absolute top-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
          <div className="absolute bottom-1/3 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />

          {/* Small accent dots */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-500/40 rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-indigo-500/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-500/40 rounded-full" />
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-8"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Premium Content
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight"
            >
              Discover{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Elite Information
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Your gateway to premium insights and expert analysis across
              various domains
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={() => navigate("/articles")}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Explore Articles
                  <FiArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={() => navigate("/categories")}
                className="group px-10 py-5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center">
                  Browse Categories
                  <div className="ml-3 w-5 h-5 border border-current rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-current rounded-full" />
                  </div>
                </span>
              </button>
            </motion.div>

            {/* Stats section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <div className="text-center group">
                <div className="relative">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {apiArticles.length}+
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-3" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Premium Articles
                </div>
              </div>

              <div className="text-center group">
                <div className="relative">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="w-12 h-0.5 bg-indigo-500 mx-auto mb-3" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Instant Access
                </div>
              </div>

              <div className="text-center group">
                <div className="relative">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="w-12 h-0.5 bg-purple-500 mx-auto mb-3" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Expert Quality
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Scroll to explore
            </div>
            <div className="w-6 h-10 border border-gray-400 dark:border-gray-500 rounded-full flex justify-center relative">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Article
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Dive into our most compelling insights and expert analysis
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                    <img
                      src={getImageUrl(featuredArticle.image)}
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-white/90 text-gray-900 backdrop-blur-sm">
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                        <FiCalendar className="h-4 w-4" />
                        <span className="text-sm">{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                        <FiClock className="h-4 w-4" />
                        <span className="text-sm">
                          {featuredArticle.readTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                      {featuredArticle.description}
                    </p>
                    <button
                      onClick={() => navigate(`/article/${featuredArticle.id}`)}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Read Full Article
                      <FiArrowRight className="ml-3 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our curated collection of insightful articles and expert
              perspectives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesLoading
              ? // Enhanced loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
                  >
                    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                      <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </motion.div>
                ))
              : remainingArticles.map((article, index) => (
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
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-900 backdrop-blur-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
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
                        Read Article
                        <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </motion.div>
                ))}
          </div>

          {/* View All Articles Button */}
          {remainingArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <button
                onClick={() => navigate("/articles")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 font-semibold rounded-2xl hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-200 dark:hover:to-gray-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Articles
                <FiArrowRight className="ml-3 h-5 w-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
