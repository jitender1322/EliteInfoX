import { FiGlobe, FiActivity, FiTrendingUp, FiCpu } from "react-icons/fi";

export const categories = [
  {
    id: "travel",
    name: "Travel",
    description: "Get tips and inspiration for your next adventure.",
    icon: <FiGlobe className="h-6 w-6 text-blue-600" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Discover ways to stay fit and healthy.",
    icon: <FiActivity className="h-6 w-6 text-green-600" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "politics",
    name: "Politics",
    description: "Stay updated with the latest political developments.",
    icon: <FiTrendingUp className="h-6 w-6 text-red-600" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Learn about the newest tech trends and innovations.",
    icon: <FiCpu className="h-6 w-6 text-purple-600" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];
