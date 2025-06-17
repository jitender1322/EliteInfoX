import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

const ContactPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className="min-h-screen mt-14 px-4 py-16 transition-colors duration-200 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <motion.div
        className="max-w-3xl mx-auto"
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
        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold mb-6"
          variants={fadeUp}
          custom={1}
        >
          Contact Us
        </motion.h1>

        {/* Intro Text */}
        <motion.p className="mb-4 text-lg" variants={fadeUp} custom={2}>
          Got questions, feedback, or just want to say hi? We'd love to hear
          from you!
        </motion.p>

        {/* Form */}
        <motion.form className="space-y-4" initial="hidden" animate="visible">
          {[3, 4, 5].map((i, index) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              {index === 0 ? (
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                />
              ) : index === 1 ? (
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                />
              ) : (
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                />
              )}
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.div variants={fadeUp} custom={6}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
