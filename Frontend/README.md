# FinTrack — Frontend

FinTrack is a modern and responsive personal finance management application that helps users manage their income, expenses, and overall financial activity.

This repository contains the frontend of the FinTrack application, built with React and Vite.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- User Logout
- Protected Routes
- Get Current User
- Change Password
- Forgot Password
- Reset Password

### 💰 Transaction Management

- Add new transactions
- Edit existing transactions
- Delete transactions
- View transaction details
- Income and Expense tracking
- Transaction categories
- Transaction notes
- Transaction dates

### 🔎 Search, Filter & Sort

- Search transactions by title
- Filter by transaction type
- Filter by category
- Filter by date range
- Sort transactions
- Pagination

### 📊 Dashboard

- Total Income
- Total Expenses
- Current Balance
- Total Transactions
- Recent Transactions
- Financial Overview
- Financial Health visualization

### 👤 Profile

- View user profile
- Change password
- Logout

### 📱 Responsive Design

FinTrack provides a responsive interface for:

- Desktop
- Tablet
- Mobile devices

The mobile interface includes a responsive navigation menu and optimized transaction/dashboard layouts.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Lucide React
- CSS
- Tailwind CSS / Tailwind Vite tooling

### Backend

The frontend communicates with the FinTrack REST API built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📂 Project Structure

```text
Frontend/
├── public/
├── src/
│   ├── api/
│   │
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── FinancialOverview.jsx
│   │   ├── Input.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RecentTransactions.jsx
│   │
│   ├── pages/
│   │   ├── AddTransaction.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditTransaction.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Transactions.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```
