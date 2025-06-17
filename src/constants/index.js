// Site Information
export const SITE_INFO = {
  name: "EliteInfoX",
  title: "EliteInfoX - Premium Information Hub",
  description:
    "Your gateway to premium insights and expert analysis across various domains",
  url: "https://eliteinfox.com",
  logo: "/images/logo.png",
  defaultImage: "/images/og-image.jpg",
  twitterHandle: "@eliteinfox",
};

// Navigation
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Articles", path: "/articles" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// Social Media Links
export const SOCIAL_LINKS = [
  { name: "GitHub", icon: "FiGithub", url: "https://github.com" },
  { name: "Twitter", icon: "FiTwitter", url: "https://twitter.com" },
  { name: "LinkedIn", icon: "FiLinkedin", url: "https://linkedin.com" },
  { name: "Instagram", icon: "FiInstagram", url: "https://instagram.com" },
];

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ],
  resources: [
    { name: "Resources", path: "/resources" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

// API Endpoints
export const API_ENDPOINTS = {
  articles: "/api/articles",
  categories: "/api/categories",
  auth: "/api/auth",
  uploads: "/api/uploads",
};

// Theme Colors
export const THEME_COLORS = {
  primary: {
    light: "#3B82F6",
    dark: "#60A5FA",
  },
  secondary: {
    light: "#6366F1",
    dark: "#818CF8",
  },
  background: {
    light: "#F9FAFB",
    dark: "#111827",
  },
  text: {
    light: "#1F2937",
    dark: "#F9FAFB",
  },
};

// Animation Durations
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Error Messages
export const ERROR_MESSAGES = {
  general: "Something went wrong. Please try again later.",
  notFound: "The requested resource was not found.",
  unauthorized: "You are not authorized to perform this action.",
  validation: "Please check your input and try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  created: "Successfully created!",
  updated: "Successfully updated!",
  deleted: "Successfully deleted!",
  saved: "Successfully saved!",
};
