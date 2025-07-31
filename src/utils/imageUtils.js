const BACKEND_URL = "https://eliteinfox-1.onrender.com";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${BACKEND_URL}${imagePath}`;
};
