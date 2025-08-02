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
import { v4 as uuidv4 } from "uuid"; // Make sure this is installed

export const createCategory = async (req, res) => {  
  try {
    const { name, description, icon, color, bgColor } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Optional: trim name
    const trimmedName = name.trim();

    // Check if category with the same name exists
    const [existing] = await pool.execute(
      "SELECT id FROM categories WHERE name = ?",
      [trimmedName]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Category with name '${trimmedName}' already exists`,
      });
    }

    // Generate unique ID
    const id = uuidv4();

    // Insert new category
    const [result] = await pool.execute(
      "INSERT INTO categories (id, name, description, icon, color, bgColor) VALUES (?, ?, ?, ?, ?, ?)",
      [id, trimmedName, description, icon, color, bgColor]
    );

    // Fetch the newly created category
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
    const { name, description, icon, color, bgColor } = req.body;

    // Check required field
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const trimmedName = name.trim();

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

    // Check if the new name already exists in another category
    const [nameConflict] = await pool.execute(
      "SELECT id FROM categories WHERE name = ? AND id != ?",
      [trimmedName, id]
    );

    if (nameConflict.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Another category with the name '${trimmedName}' already exists`,
      });
    }

    // Update the category
    await pool.execute(
      `
      UPDATE categories 
      SET name = ?, description = ?, icon = ?, color = ?, bgColor = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [trimmedName, description, icon, color, bgColor, id]
    );

    // Get updated data
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
