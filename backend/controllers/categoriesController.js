import { pool } from "../models/db.js";

// Get all categories (public)
export const getAllCategories = async (req, res) => {
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

// Get single category (public)
export const getCategoryById = async (req, res) => {
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

// Admin: Get all categories
export const adminGetAllCategories = async (req, res) => {
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
    console.error("Admin get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Get single category
export const adminGetCategoryById = async (req, res) => {
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
    console.error("Admin get category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Create category
export const createCategory = async (req, res) => {
  try {
    const { id, name, description, icon, color, bgColor, slug } = req.body;

    if (!id || !name || !slug) {
      return res.status(400).json({
        success: false,
        message: "ID, name, and slug are required",
      });
    }

    // Check if category with same ID or slug already exists
    const [existingCategories] = await pool.execute(
      "SELECT * FROM categories WHERE id = ? OR slug = ?",
      [id, slug]
    );

    if (existingCategories.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Category with this ID or slug already exists",
      });
    }

    const [result] = await pool.execute(
      `
      INSERT INTO categories (id, name, description, icon, color, bgColor, slug) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
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

// Admin: Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, bgColor, slug } = req.body;

    // Check if category exists
    const [existingCategories] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (existingCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if slug is being changed and if it conflicts with another category
    if (slug && slug !== existingCategories[0].slug) {
      const [slugConflict] = await pool.execute(
        "SELECT * FROM categories WHERE slug = ? AND id != ?",
        [slug, id]
      );

      if (slugConflict.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Category with this slug already exists",
        });
      }
    }

    // Update category
    await pool.execute(
      `
      UPDATE categories 
      SET name = ?, description = ?, icon = ?, color = ?, bgColor = ?, slug = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [name, description, icon, color, bgColor, slug, id]
    );

    // Get updated category
    const [updatedCategories] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategories[0],
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin: Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const [existingCategories] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (existingCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has articles
    const [articles] = await pool.execute(
      "SELECT COUNT(*) as count FROM articles WHERE category = ?",
      [id]
    );

    if (articles[0].count > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category that has articles. Please remove or reassign articles first.",
      });
    }

    // Delete category
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
