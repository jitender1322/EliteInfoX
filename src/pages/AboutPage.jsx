import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AboutPage = () => {
  const { darkMode } = useTheme();

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  return (
    <div className="min-h-screen px-4 py-16 transition-colors duration-200 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">About EliteInfoX</h1>

        {[
          "EliteInfoX is your go-to platform for short, crisp, and informative articles. We believe in simplifying information so that anyone can read and enjoy without getting bored or confused.",
          "Whether you're into tech, politics, fitness, or just want to travel the world through words — we've got something for you.",
          "Our mission is to deliver value-packed content in an easy-to-digest format that respects your time and keeps you engaged.",
        ].map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={paragraphVariants}
            className="mb-4 text-lg"
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutPage;
