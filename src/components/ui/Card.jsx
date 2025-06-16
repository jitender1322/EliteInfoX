import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  onClick,
  darkMode,
  hover = true,
  padding = true,
  shadow = true,
  border = true,
}) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        ${padding ? "p-6" : ""}
        ${shadow ? "shadow-lg" : ""}
        ${border ? "border border-gray-200 dark:border-gray-700" : ""}
        rounded-xl
        ${darkMode ? "bg-gray-800" : "bg-white"}
        ${onClick ? "cursor-pointer" : ""}
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "", darkMode }) => (
  <h3
    className={`text-xl font-semibold ${
      darkMode ? "text-white" : "text-gray-900"
    } ${className}`}
  >
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "", darkMode }) => (
  <p
    className={`text-base ${
      darkMode ? "text-gray-300" : "text-gray-600"
    } ${className}`}
  >
    {children}
  </p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div
    className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
  >
    {children}
  </div>
);

export default Card;
