import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
  adminLogin,
  getDashboard,
  adminLogout,
  getProfile,
  // Categories
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  // Articles
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/adminController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  adminGetAllCategories,
  adminGetCategoryById,
  createCategory as adminCreateCategory,
  updateCategory as adminUpdateCategory,
  deleteCategory as adminDeleteCategory,
} from "../controllers/categoriesController.js";
import {
  adminGetAllArticles,
  adminGetArticleById,
  createArticle as adminCreateArticle,
  updateArticle as adminUpdateArticle,
  deleteArticle as adminDeleteArticle,
} from "../controllers/articlesController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "..", "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads directory:", uploadsDir);
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 5MB.",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
};

// Public routes (no authentication required)
router.post("/login", adminLogin);

// Protected routes (authentication required)
router.get("/dashboard", authenticateToken, getDashboard);
router.get("/profile", authenticateToken, getProfile);
router.post("/logout", authenticateToken, adminLogout);

// Categories management routes
router.get("/categories", authenticateToken, adminGetAllCategories);
router.get("/categories/:id", authenticateToken, adminGetCategoryById);
router.post("/categories", authenticateToken, adminCreateCategory);
router.put("/categories/:id", authenticateToken, adminUpdateCategory);
router.delete("/categories/:id", authenticateToken, adminDeleteCategory);

// Articles management routes
router.get("/articles", authenticateToken, adminGetAllArticles);
router.get("/articles/:id", authenticateToken, adminGetArticleById);
router.post(
  "/articles",
  authenticateToken,
  upload.single("image"),
  handleMulterError,
  adminCreateArticle
);
router.put(
  "/articles/:id",
  authenticateToken,
  upload.single("image"),
  handleMulterError,
  adminUpdateArticle
);
router.delete("/articles/:id", authenticateToken, adminDeleteArticle);

export default router;
