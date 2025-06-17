# 🚀 EliteInfoX Setup Guide

Welcome to EliteInfoX! This guide will help you set up the complete admin login system.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MySQL Server** (v8.0 or higher)
- **npm** or **yarn**

## 🛠️ Quick Setup

### 1. Database Setup

First, set up your MySQL database:

```sql
-- Create database
CREATE DATABASE eliteinfox;

-- Or use the provided SQL file
mysql -u root -p < backend/setup.sql
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Edit .env file with your database credentials
# (See configuration section below)

# Start the server
npm run dev
```

### 3. Environment Configuration

Edit `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=eliteinfox
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=24h

# Admin Configuration
ADMIN_EMAIL=admin@eliteinfox.com
ADMIN_PASSWORD=admin123
ADMIN_ROLE=super_admin

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 4. Test the API

```bash
# Test manually with curl:
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eliteinfox.com","password":"admin123"}'
```

## 🔐 Default Admin Credentials

- **Email:** `admin@eliteinfox.com`
- **Password:** `admin123`

## 📡 API Endpoints

| Method | Endpoint               | Description    | Auth Required |
| ------ | ---------------------- | -------------- | ------------- |
| POST   | `/api/admin/login`     | Admin login    | No            |
| GET    | `/api/admin/dashboard` | Dashboard data | Yes           |
| GET    | `/api/admin/profile`   | Admin profile  | Yes           |
| POST   | `/api/admin/logout`    | Admin logout   | Yes           |

## 🧪 Testing the API

### Login Example

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eliteinfox.com","password":"admin123"}' \
  -c cookies.txt
```

### Access Protected Route

```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -b cookies.txt
```

## 🔒 Security Features

- ✅ **JWT Authentication** with HTTP-only cookies
- ✅ **Password Hashing** using bcryptjs
- ✅ **CORS Protection** with specific origin
- ✅ **Input Validation** and sanitization
- ✅ **Role-based Access Control**
- ✅ **Automatic Token Expiration**

## 🏗️ Project Structure

```
EliteInfoX/
├── backend/                 # Backend API
│   ├── index.js            # Main server
│   ├── package.json        # Dependencies
│   ├── env.example         # Environment template
│   ├── setup.sql          # Database setup
│   ├── models/
│   │   └── db.js          # Database connection
│   ├── controllers/
│   │   └── adminController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   └── routes/
│       └── adminRoutes.js
├── src/                    # Frontend (existing)
├── package.json           # Frontend dependencies
└── README.md
```

## 🚀 Running the Application

1. **Start Backend:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (if needed):**

   ```bash
   npm run dev
   ```

3. **Access:**
   - Backend API: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

## 🐛 Troubleshooting

### Database Connection Issues

- Check MySQL service is running
- Verify credentials in `.env`
- Ensure database `eliteinfox` exists

### JWT Issues

- Verify `JWT_SECRET` is set in `.env`
- Check token expiration settings

### CORS Issues

- Verify `FRONTEND_URL` in `.env`
- Check frontend is running on correct port

## 📝 Next Steps

1. **Customize Admin Credentials** in `.env`
2. **Add More Routes** as needed
3. **Integrate with Frontend** using the API endpoints
4. **Add Additional Security** measures if required

## 🎉 Success!

Your EliteInfoX admin system is now ready! The backend provides a secure, scalable foundation for your admin authentication needs.

For more details, see the `backend/README.md` file.
