import React from "react";
import { motion } from "framer-motion";

const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  const CardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="absolute top-4 left-4">
          <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
      </div>
    </div>
  );

  const ArticleSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"
          />
        ))}
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return <CardSkeleton />;
      case "article":
        return <ArticleSkeleton />;
      case "category":
        return <CategorySkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
