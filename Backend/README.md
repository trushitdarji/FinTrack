# FinTrack

# 💰 FinTrack Backend API

A production-ready RESTful Backend API for an Expense Tracker application built with **Node.js, Express.js, MongoDB, and JWT Authentication**.

This project allows users to securely manage their personal finances by creating, updating, deleting, searching, filtering, sorting, and analyzing their transactions.

---

# 🚀 Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using Bcrypt
* Protected Routes
* Get Current User
* Change Password

---

## 💳 Transaction Management

* Create Transaction
* Fetch All Transactions
* Update Transaction
* Delete Transaction

---

## 📄 Pagination

Supports pagination using query parameters.

Example:

```
GET /api/transaction?page=1&limit=10
```

---

## 🔍 Search

Search transactions by title using MongoDB Regular Expressions.

Example:

```
GET /api/transaction?search=food
```

---

## 🔃 Sorting

Sort transactions by creation date.

Ascending:

```
GET /api/transaction?sort=asc
```

Descending:

```
GET /api/transaction?sort=desc
```

---

## 🎯 Filtering

Filter transactions by:

* Type
* Category

Example:

```
GET /api/transaction?type=income

GET /api/transaction?category=Food
```

You can also combine filters.

Example:

```
GET /api/transaction?page=1&limit=5&sort=desc&type=income&category=Other
```

---

# 📊 Dashboard APIs

## Dashboard Summary

Returns:

* Total Income
* Total Expense
* Current Balance
* Total Transactions

---

## Recent Transactions

Returns latest 5 transactions.

---

## Dashboard Statistics

Uses MongoDB Aggregation Pipeline.

Returns:

* Total Income
* Total Expense
* Current Balance

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Cookie Parser
* dotenv
* Zod Validation

---

# 📁 Folder Structure

```
src/
│
├── config/
│
├── controllers/
│
├── middlewares/
│
├── models/
│
├── routes/
│
├── validators/
│
├── utils/
│
├── app.js
│
└── server.js
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| POST   | /api/auth/register        | Register User    |
| POST   | /api/auth/login           | Login User       |
| GET    | /api/auth/me              | Get Current User |
| PUT    | /api/auth/change-password | Change Password  |

---

## Transactions

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | /api/transaction  | Create Transaction |
| GET    | /api/transaction  | Get Transactions   |
| PUT    | /api/transaction/ | Update Transaction |
| DELETE | /api/transaction/ | Delete Transaction |

---

## Dashboard

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/dashboard/summary | Dashboard Summary    |
| GET    | /api/dashboard/recent  | Recent Transactions  |
| GET    | /api/dashboard/stats   | Dashboard Statistics |

---

# 🔐 Authentication

Protected routes require a valid JWT token.

Authorization Header

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the project root.

```
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key
```

---

# ▶️ Installation

Clone the repository

```
git clone <repository-url>
```

Move into project

```
cd fintrack-backend
```

Install dependencies

```
npm install
```

Create `.env`

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run development server

```
npm run dev
```

---

# 📦 Dependencies

* express
* mongoose
* bcrypt
* jsonwebtoken
* cookie-parser
* dotenv
* zod
* cors
* nodemon

---

# 🧪 Testing

The API has been manually tested using:

* Postman
* Thunder Client

---

# 📚 Concepts Implemented

* REST API Design
* MVC Architecture
* Authentication & Authorization
* JWT
* Password Hashing
* CRUD Operations
* MongoDB Queries
* Pagination
* Search using Regular Expressions
* Sorting
* Filtering
* MongoDB Aggregation Pipeline
* Error Handling Middleware
* Request Validation
* Protected Routes
* Environment Variables

---

# 🚧 Upcoming Features

* React Frontend
* Full Stack Deployment
* API Documentation
* CSV Export
* Monthly Analytics
* Charts & Reports

---

# 👨‍💻 Author

**Trushit Darji**

Backend Developer | MERN Stack Learner | Building Real-World Projects

GitHub: https://github.com/your-github-trushitdarji

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.