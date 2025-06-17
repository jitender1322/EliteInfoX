import { pool } from "../models/db.js";

// Get all articles (public)
export const getAllArticles = async (req, res) => {
  try {
    const { category } = req.query;

    let query = `
      SELECT a.*, c.name as category_name, c.slug as category_slug 
      FROM articles a 
      LEFT JOIN categories c ON a.category = c.id 
      WHERE a.status = 'published'
    `;

    const params = [];

    if (category) {
      query += " AND a.category = ?";
      params.push(category);
    }

    query += " ORDER BY a.created_at DESC";

    const [articles] = await pool.execute(query, params);

    res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    console.error("Get articles error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single article (public)
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [articles] = await pool.execute(
      `
      SELECT a.*, c.name as category_name, c.slug as category_slug 
      FROM articles a 
      LEFT JOIN categories c ON a.category = c.id 
      WHERE a.id = ? AND a.status = 'published'
    `,
      [id]
    );

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: articles[0],
    });
  } catch (error) {
    console.error("Get article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Get all articles (including drafts)
export const adminGetAllArticles = async (req, res) => {
  try {
    const [articles] = await pool.execute(`
      SELECT a.*, c.name as category_name, c.slug as category_slug 
      FROM articles a 
      LEFT JOIN categories c ON a.category = c.id 
      ORDER BY a.created_at DESC
    `);

    res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    console.error("Admin get articles error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Get single article
export const adminGetArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [articles] = await pool.execute(
      `
      SELECT a.*, c.name as category_name, c.slug as category_slug 
      FROM articles a 
      LEFT JOIN categories c ON a.category = c.id 
      WHERE a.id = ?
    `,
      [id]
    );

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: articles[0],
    });
  } catch (error) {
    console.error("Admin get article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Create article
export const createArticle = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      readTime,
      date,
      status = "published",
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required",
      });
    }

    // Handle image upload
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.execute(
      `
      INSERT INTO articles (title, description, content, category, image, readTime, date, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [title, description, content, category, image, readTime, date, status]
    );

    const [newArticle] = await pool.execute(
      `
      SELECT a.*, c.name as category_name, c.slug as category_slug 
      FROM articles a 
      LEFT JOIN categories c ON a.category = c.id 
      WHERE a.id = ?
    `,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: newArticle[0],
    });
  } catch (error) {
    console.error("Create article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Update article
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, readTime, date, status } =
      req.body;

    // Check if article exists
    const [existingArticles] = await pool.execute(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );

    if (existingArticles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // Handle image upload
    let image = existingArticles[0].image; // Keep existing image by default
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
      // TODO: Delete old image file if it exists
    }

    // Update article
    await pool.execute(
      `
      UPDATE articles 
      SET title = ?, description = ?, content = ?, category = ?, image = ?, readTime = ?, date = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [title, description, content, category, image, readTime, date, status, id]
    );

    // Get updated article
    const [updatedArticles] = await pool.execute(
      `
      SELECT a.*, c.name as category_name, c.slug as category_slug 
      FROM articles a 
      LEFT JOIN categories c ON a.category = c.id 
      WHERE a.id = ?
    `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updatedArticles[0],
    });
  } catch (error) {
    console.error("Update article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Delete article
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if article exists
    const [existingArticles] = await pool.execute(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );

    if (existingArticles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // Delete article
    await pool.execute("DELETE FROM articles WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Delete article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
