import jwt from "jsonwebtoken";
import { pool } from "../models/db.js";

export const authenticateToken = async (req, res, next) => {
  console.log("[AuthMiddleware] Cookies received:", req.cookies);
  try {
    // Get token from HTTP-only cookie
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if admin still exists in database
    const [admins] = await pool.execute(
      "SELECT id, email, role FROM admin WHERE id = ?",
      [decoded.adminId]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Admin not found.",
      });
    }

    // Add admin info to request object
    req.admin = admins[0];
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
