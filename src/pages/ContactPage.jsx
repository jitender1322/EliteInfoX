import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

const ContactPage = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen px-4 py-16 transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
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
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              ) : index === 1 ? (
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              ) : (
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
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
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
