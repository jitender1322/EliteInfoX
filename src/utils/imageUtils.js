const BACKEND_URL = "http://localhost:5000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${BACKEND_URL}${imagePath}`;
};
