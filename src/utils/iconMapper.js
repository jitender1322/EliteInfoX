import {
  FiGlobe,
  FiActivity,
  FiTrendingUp,
  FiCpu,
  FiCode,
  FiSmartphone,
  FiShield,
  FiCloud,
} from "react-icons/fi";

// Map icon strings to React icon components
export const iconMap = {
  FiGlobe: FiGlobe,
  FiActivity: FiActivity,
  FiTrendingUp: FiTrendingUp,
  FiCpu: FiCpu,
  FiCode: FiCode,
  FiSmartphone: FiSmartphone,
  FiShield: FiShield,
  FiCloud: FiCloud,
};

// Function to get icon component
export const getIconComponent = (iconName) => {
  return iconMap[iconName] || FiGlobe;
};

// Function to process category data for frontend use
export const processCategoryData = (category) => {
  if (!category) return null;

  return {
    ...category,
    icon: getIconComponent(category.icon),
  };
};

// Function to process categories array
export const processCategoriesData = (categories) => {
  if (!Array.isArray(categories)) return [];

  return categories.map((category) => processCategoryData(category));
};
