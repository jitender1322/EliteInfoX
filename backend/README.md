# EliteInfoX Backend

A secure admin login system built with Node.js, Express, MySQL, and JWT authentication.

## 🚀 Features

- **Secure Admin Authentication** with JWT tokens
- **HTTP-only Cookie** for enhanced security
- **MySQL Database** with connection pooling
- **Role-based Access Control**
- **Automatic Database Initialization**
- **CORS Configuration** for frontend integration
- **Categories Management** (CRUD operations)
- **Articles Management** (CRUD operations)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=eliteinfox
   JWT_SECRET=your_super_secret_jwt_key_here
   ADMIN_EMAIL=admin@eliteinfox.com
   ADMIN_PASSWORD=admin123
   ```

4. **Set up MySQL Database:**

   - Create database: `eliteinfox`
   - Or run the provided SQL: `mysql -u root -p < setup.sql`

5. **Start the server:**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📊 Database Schema

### Admin Table

```sql
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Categories Table

```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  bg_color VARCHAR(50),
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Articles Table

```sql
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content LONGTEXT,
  category_id INT,
  image_url VARCHAR(500),
  read_time VARCHAR(50),
  status ENUM('draft', 'published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

## 🔐 API Endpoints

### Authentication

#### POST `/api/admin/login`

Admin login endpoint.

**Request Body:**

```json
{
  "email": "admin@eliteinfox.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": 1,
    "email": "admin@eliteinfox.com",
    "role": "super_admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/admin/logout`

Admin logout endpoint (requires authentication).

**Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Protected Routes

#### GET `/api/admin/dashboard`

Get dashboard data (requires authentication).

**Response:**

```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@eliteinfox.com",
      "role": "super_admin"
    },
    "stats": {
      "totalAdmins": 1,
      "totalCategories": 4,
      "totalArticles": 6,
      "publishedArticles": 3
    },
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET `/api/admin/profile`

Get current admin profile (requires authentication).

**Response:**

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "admin": {
    "id": 1,
    "email": "admin@eliteinfox.com",
    "role": "super_admin"
  }
}
```

### Categories Management

#### GET `/api/admin/categories`

Get all categories (requires authentication).

#### GET `/api/admin/categories/:id`

Get single category (requires authentication).

#### POST `/api/admin/categories`

Create new category (requires authentication).

**Request Body:**

```json
{
  "name": "New Category",
  "description": "Category description",
  "icon": "FiIcon",
  "color": "text-blue-600",
  "bg_color": "bg-blue-100",
  "slug": "new-category"
}
```

#### PUT `/api/admin/categories/:id`

Update category (requires authentication).

#### DELETE `/api/admin/categories/:id`

Delete category (requires authentication).

### Articles Management

#### GET `/api/admin/articles`

Get all articles (requires authentication).

#### GET `/api/admin/articles/:id`

Get single article (requires authentication).

#### POST `/api/admin/articles`

Create new article (requires authentication).

**Request Body:**

```json
{
  "title": "Article Title",
  "description": "Article description",
  "content": "Full article content...",
  "category_id": 1,
  "image_url": "https://example.com/image.jpg",
  "read_time": "5 min read",
  "status": "draft"
}
```

#### PUT `/api/admin/articles/:id`

Update article (requires authentication).

#### DELETE `/api/admin/articles/:id`

Delete article (requires authentication).

## 🔒 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Hashing** using bcryptjs
- **CORS Protection** with specific origin
- **Input Validation** and sanitization
- **Role-based Access Control**
- **Automatic Token Expiration**

## 🏗️ Project Structure

```
backend/
├── index.js                 # Main server file
├── package.json            # Dependencies and scripts
├── env.example             # Environment variables template
├── setup.sql              # Database setup script
├── models/
│   └── db.js              # Database connection and initialization
├── controllers/
│   └── adminController.js  # Admin business logic
├── middlewares/
│   └── authMiddleware.js   # JWT authentication middleware
└── routes/
    └── adminRoutes.js      # Admin API routes
```

## 🚀 Running the Application

1. **Start the backend:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Access the API:**

   - Admin API: `http://localhost:5000/api/admin`

3. **Default Admin Credentials:**
   - Email: `admin@eliteinfox.com`
   - Password: `admin123`

## 🔧 Configuration

### Environment Variables

| Variable         | Description            | Default                 |
| ---------------- | ---------------------- | ----------------------- |
| `PORT`           | Server port            | `5000`                  |
| `DB_HOST`        | MySQL host             | `localhost`             |
| `DB_USER`        | MySQL username         | `root`                  |
| `DB_PASSWORD`    | MySQL password         | -                       |
| `DB_NAME`        | Database name          | `eliteinfox`            |
| `JWT_SECRET`     | JWT signing secret     | -                       |
| `ADMIN_EMAIL`    | Default admin email    | `admin@eliteinfox.com`  |
| `ADMIN_PASSWORD` | Default admin password | `admin123`              |
| `FRONTEND_URL`   | Frontend URL for CORS  | `http://localhost:5173` |

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed:**

   - Check MySQL service is running
   - Verify database credentials in `.env`
   - Ensure database `eliteinfox` exists

2. **JWT Token Issues:**

   - Verify `JWT_SECRET` is set in `.env`
   - Check token expiration settings

3. **CORS Errors:**
   - Verify `FRONTEND_URL` in `.env`
   - Check frontend is running on correct port

## 📝 License

ISC License
