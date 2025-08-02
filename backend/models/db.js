import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "eliteinfox",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
};

// Initialize database and create tables if they don't exist
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Check if tables exist, don't drop them
    console.log("Checking existing tables...");

    // Create admin table
    const createAdminTable = `
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    // Create categories table (updated to match frontend)
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        color VARCHAR(50),
        bgColor VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    // Create articles table (updated to match frontend)
    const createArticlesTable = `
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
      )
    `;

    await connection.execute(createAdminTable);
    console.log("Admin table created/verified successfully");

    await connection.execute(createCategoriesTable);
    console.log("Categories table created/verified successfully");

    await connection.execute(createArticlesTable);
    console.log("Articles table created/verified successfully");

    // Check if admin exists, if not create one
    const [admins] = await connection.execute("SELECT * FROM admin LIMIT 1");

    if (admins.length === 0) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        12
      );

      const insertAdmin = `
        INSERT INTO admin (email, password, role) 
        VALUES (?, ?, ?)
      `;

      await connection.execute(insertAdmin, [
        process.env.ADMIN_EMAIL || "admin@eliteinfox.com",
        hashedPassword,
        process.env.ADMIN_ROLE || "super_admin",
      ]);

      console.log("Default admin created successfully");
    } else {
      console.log("Admin already exists in database");
    }

    // Check if default categories exist, if not create them
    const [categories] = await connection.execute(
      "SELECT * FROM categories LIMIT 1"
    );

    if (categories.length === 0) {
      const defaultCategories = [
        {
          id: "technology",
          name: "Technology",
          description: "Learn about the newest tech trends and innovations.",
          icon: "FiCpu",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          slug: "technology",
        },
        {
          id: "travel",
          name: "Travel",
          description: "Get tips and inspiration for your next adventure.",
          icon: "FiGlobe",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          slug: "travel",
        },
        {
          id: "fitness",
          name: "Fitness",
          description: "Discover ways to stay fit and healthy.",
          icon: "FiActivity",
          color: "text-green-600",
          bgColor: "bg-green-100",
          slug: "fitness",
        },
        {
          id: "politics",
          name: "Politics",
          description: "Stay updated with the latest political developments.",
          icon: "FiTrendingUp",
          color: "text-red-600",
          bgColor: "bg-red-100",
          slug: "politics",
        },
      ];

      for (const category of defaultCategories) {
        await connection.execute(
          "INSERT INTO categories (id, name, description, icon, color, bgColor, slug) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            category.id,
            category.name,
            category.description,
            category.icon,
            category.color,
            category.bgColor,
            category.slug,
          ]
        );
      }

      console.log("Default categories created successfully");
    } else {
      console.log("Categories already exist in database");
    }

    // Check if sample articles exist, if not create them
    const [articles] = await connection.execute(
      "SELECT * FROM articles LIMIT 1"
    );

    if (articles.length === 0) {
      const sampleArticles = [
        {
          title: "The Future of Artificial Intelligence",
          description:
            "Exploring the latest developments in AI and machine learning, and their impact on various industries.",
          content:
            "This is a comprehensive article about the future of artificial intelligence...",
          category: "technology",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
          readTime: "5 min read",
          date: "2024-03-15",
        },
        {
          title: "Sustainable Travel: A Guide to Eco-Friendly Tourism",
          description:
            "Discover how to make your travels more environmentally conscious and sustainable.",
          content:
            "Learn about eco-friendly travel practices and sustainable tourism...",
          category: "travel",
          image:
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop&crop=center",
          readTime: "4 min read",
          date: "2024-03-14",
        },
        {
          title: "The Science of Fitness: Understanding Your Body",
          description:
            "A comprehensive guide to understanding how your body responds to different types of exercise.",
          content: "Understanding the science behind fitness and exercise...",
          category: "fitness",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop&crop=center",
          readTime: "6 min read",
          date: "2024-03-13",
        },
        {
          title: "Global Politics: Current Trends and Future Outlook",
          description:
            "An analysis of current political trends and their potential impact on global relations.",
          content:
            "Analysis of current global political trends and their implications...",
          category: "politics",
          image:
            "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop&crop=center",
          readTime: "7 min read",
          date: "2024-03-12",
        },
        {
          title: "Blockchain Technology: Beyond Cryptocurrency",
          description:
            "Exploring the various applications of blockchain technology in different sectors.",
          content:
            "Discover how blockchain technology extends beyond cryptocurrency...",
          category: "technology",
          image:
            "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=300&fit=crop&crop=center",
          readTime: "5 min read",
          date: "2024-03-11",
        },
        {
          title: "Hidden Gems: Off-the-Beaten-Path Destinations",
          description:
            "Discover lesser-known travel destinations that offer unique experiences.",
          content:
            "Explore hidden travel destinations that most tourists miss...",
          category: "travel",
          image:
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop&crop=center",
          readTime: "4 min read",
          date: "2024-03-10",
        },
      ];

      for (const article of sampleArticles) {
        await connection.execute(
          "INSERT INTO articles (title, description, content, category, image, readTime, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            article.title,
            article.description,
            article.content,
            article.category,
            article.image,
            article.readTime,
            article.date,
            "published",
          ]
        );
      }

      console.log("Sample articles created successfully");
    } else {
      console.log("Articles already exist in database");
    }

    connection.release();
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    throw error;
  }
};

export { pool, testConnection, initializeDatabase };
