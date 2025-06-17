-- EliteInfoX Database Setup
-- Run this SQL to create the database and all tables

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS eliteinfox;
USE eliteinfox;

-- Drop existing tables (if they exist) to ensure clean setup
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS admin;

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table (updated to match frontend)
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  bgColor VARCHAR(50),
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create articles table (updated to match frontend)
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content LONGTEXT,
  category VARCHAR(255),
  image VARCHAR(500),
  readTime VARCHAR(50),
  date VARCHAR(50),
  status ENUM('draft', 'published') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert default categories
INSERT INTO categories (id, name, description, icon, color, bgColor, slug) VALUES
('technology', 'Technology', 'Learn about the newest tech trends and innovations.', 'FiCpu', 'text-purple-600', 'bg-purple-100', 'technology'),
('travel', 'Travel', 'Get tips and inspiration for your next adventure.', 'FiGlobe', 'text-blue-600', 'bg-blue-100', 'travel'),
('fitness', 'Fitness', 'Discover ways to stay fit and healthy.', 'FiActivity', 'text-green-600', 'bg-green-100', 'fitness'),
('politics', 'Politics', 'Stay updated with the latest political developments.', 'FiTrendingUp', 'text-red-600', 'bg-red-100', 'politics')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Show table structure
DESCRIBE admin;
DESCRIBE categories;
DESCRIBE articles;

-- Show any existing data
SELECT id, email, role, created_at FROM admin;
SELECT id, name, slug, created_at FROM categories;
SELECT id, title, category, status, created_at FROM articles; 