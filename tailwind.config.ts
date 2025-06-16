import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // this enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
