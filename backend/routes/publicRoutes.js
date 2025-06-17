import express from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/categoriesController.js";
import {
  getAllArticles,
  getArticleById,
} from "../controllers/articlesController.js";

const router = express.Router();

// Public categories routes
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

// Public articles routes
router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);

export default router;
