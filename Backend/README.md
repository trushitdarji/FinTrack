# FinTrack — Backend API

FinTrack Backend is a RESTful API for a personal finance management application.

It handles user authentication, transaction management, dashboard analytics, password management, password recovery through email, and API security.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User Registration
- User Login
- User Logout
- JWT-based authentication
- HTTP cookie-based authentication
- Protected routes
- Get current logged-in user
- Change password

### 🔑 Password Recovery

- Forgot password functionality
- Secure password reset token generation
- Password reset through email
- Reset token expiration
- One-time token invalidation after successful reset
- Generic forgot-password response to prevent email enumeration
- Rate limiting for password reset requests

### 💰 Transaction Management

- Create transactions
- Get transactions
- Get single transaction
- Update transactions
- Delete transactions
- Income and Expense support
- Categories
- Notes
- Transaction date
- Pagination
- Search
- Filtering
- Sorting

### 📊 Dashboard

The backend provides financial summary APIs for:

- Total Income
- Total Expenses
- Current Balance
- Total Transactions
- Recent 5 Transactions
- Income/Expense statistics

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod
- Nodemailer
- Express Rate Limit
- Cookie Parser
- CORS
- dotenv

---

## 📂 Project Structure

```text
Backend/
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controller/
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── auth.rateLimiter.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── model/
│   │   ├── user.model.js
│   │   └── transaction.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── dashboard.route.js
│   │   └── transaction.route.js
│   │
│   ├── utils/
│   │   └── email.service.js
│   │
│   ├── validation/
│   │   ├── auth.validation.js
│   │   └── transaction.validation.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── README.md
```
