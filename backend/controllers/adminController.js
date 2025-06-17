import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../models/db.js";

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin by email
    const [admins] = await pool.execute("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = admins[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    // Set HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Return success response (without sensitive data)
    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        createdAt: admin.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin Dashboard
export const getDashboard = async (req, res) => {
  try {
    // Admin info is already available from auth middleware
    const admin = req.admin;

    // Get dashboard stats
    const [adminStats] = await pool.execute(
      "SELECT COUNT(*) as total_admins FROM admin"
    );
    const [categoryStats] = await pool.execute(
      "SELECT COUNT(*) as total_categories FROM categories"
    );
    const [articleStats] = await pool.execute(
      "SELECT COUNT(*) as total_articles FROM articles"
    );
    const [publishedStats] = await pool.execute(
      'SELECT COUNT(*) as published_articles FROM articles WHERE status = "published"'
    );

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
        stats: {
          totalAdmins: adminStats[0].total_admins,
          totalCategories: categoryStats[0].total_categories,
          totalArticles: articleStats[0].total_articles,
          publishedArticles: publishedStats[0].published_articles,
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin Logout
export const adminLogout = async (req, res) => {
  try {
    // Clear the HTTP-only cookie
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get current admin profile
export const getProfile = async (req, res) => {
  try {
    const admin = req.admin;

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===== CATEGORIES MANAGEMENT =====

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      "SELECT * FROM categories ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single category
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [categories] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: categories[0],
    });
  } catch (error) {
    console.error("Get category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { id, name, description, icon, color, bgColor, slug } = req.body;

    if (!id || !name || !slug) {
      return res.status(400).json({
        success: false,
        message: "ID, name and slug are required",
      });
    }

    // Check if category ID already exists
    const [existing] = await pool.execute(
      "SELECT id FROM categories WHERE id = ?",
      [id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Category with this ID already exists",
      });
    }

    // Check if slug already exists
    const [slugExists] = await pool.execute(
      "SELECT id FROM categories WHERE slug = ?",
      [slug]
    );
    if (slugExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO categories (id, name, description, icon, color, bgColor, slug) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, name, description, icon, color, bgColor, slug]
    );

    const [newCategory] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory[0],
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, bgColor, slug } = req.body;

    // Check if category exists
    const [existing] = await pool.execute(
      "SELECT id FROM categories WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if slug already exists (excluding current category)
    if (slug) {
      const [slugExists] = await pool.execute(
        "SELECT id FROM categories WHERE slug = ? AND id != ?",
        [slug, id]
      );
      if (slugExists.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Category with this slug already exists",
        });
      }
    }

    await pool.execute(
      "UPDATE categories SET name = ?, description = ?, icon = ?, color = ?, bgColor = ?, slug = ? WHERE id = ?",
      [name, description, icon, color, bgColor, slug, id]
    );

    const [updatedCategory] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory[0],
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const [existing] = await pool.execute(
      "SELECT id FROM categories WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has articles
    const [articles] = await pool.execute(
      "SELECT id FROM articles WHERE category = ?",
      [id]
    );
    if (articles.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with existing articles",
      });
    }

    await pool.execute("DELETE FROM categories WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===== ARTICLES MANAGEMENT =====

// Get all articles
export const getArticles = async (req, res) => {
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
    console.error("Get articles error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single article
export const getArticle = async (req, res) => {
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
    console.error("Get article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create article
export const createArticle = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      image,
      readTime,
      date,
      status,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Check if category exists if category is provided
    if (category) {
      const [categoryExists] = await pool.execute(
        "SELECT id FROM categories WHERE id = ?",
        [category]
      );
      if (categoryExists.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const [result] = await pool.execute(
      "INSERT INTO articles (title, description, content, category, image, readTime, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        content,
        category,
        image,
        readTime,
        date,
        status || "published",
      ]
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

// Update article
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      content,
      category,
      image,
      readTime,
      date,
      status,
    } = req.body;

    // Check if article exists
    const [existing] = await pool.execute(
      "SELECT id FROM articles WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // Check if category exists if category is provided
    if (category) {
      const [categoryExists] = await pool.execute(
        "SELECT id FROM categories WHERE id = ?",
        [category]
      );
      if (categoryExists.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    await pool.execute(
      "UPDATE articles SET title = ?, description = ?, content = ?, category = ?, image = ?, readTime = ?, date = ?, status = ? WHERE id = ?",
      [title, description, content, category, image, readTime, date, status, id]
    );

    const [updatedArticle] = await pool.execute(
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
      data: updatedArticle[0],
    });
  } catch (error) {
    console.error("Update article error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete article
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if article exists
    const [existing] = await pool.execute(
      "SELECT id FROM articles WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

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
