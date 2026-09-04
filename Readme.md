# 💰 FinTrack

### Personal Finance & Expense Tracking Application

FinTrack is a full-stack personal finance management application that helps users securely track their income and expenses, analyze their financial activity, and manage transactions from a responsive web interface.

Built using the MERN stack, FinTrack demonstrates real-world implementation of authentication, authorization, REST APIs, MongoDB operations, transaction management, filtering, searching, pagination, dashboard analytics, password management, and secure password recovery.

---

## ✨ Features

### 🔐 Authentication & Security

- User registration and login
- JWT-based authentication
- HTTP cookie-based session handling
- Protected routes
- Secure password hashing with bcrypt
- Change password
- Forgot password functionality
- Password reset through email
- Cryptographically generated reset tokens
- Hashed reset tokens stored in database
- 15-minute reset-token expiration
- Forgot-password rate limiting
- Generic password-reset response to avoid revealing whether an account exists

### 💰 Transaction Management

- Add income and expense transactions
- Edit transactions
- Delete transactions
- View individual transaction details
- User-specific transaction access
- Transaction categories
- Transaction notes
- Transaction date management

### 🔎 Transaction Search & Filtering

- Search transactions by title
- Filter by income/expense
- Filter by category
- Filter by date range
- Combine multiple filters
- Sort transactions
- Paginated transaction results

### 📊 Dashboard

- Total income
- Total expenses
- Current balance
- Total transaction count
- Recent transactions
- Transaction summaries
- Financial health visualization
- Animated financial health indicator

### 👤 Profile

- View user profile
- Change password
- Logout
- Responsive profile interface

### 📱 Responsive UI

- Desktop-friendly interface
- Mobile-responsive layouts
- Mobile navigation menu
- Responsive transaction cards
- Responsive authentication pages
- Responsive dashboard

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Lucide React
- CSS
- Tailwind CSS tooling

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod
- Nodemailer
- express-rate-limit
- cookie-parser
- CORS
- dotenv

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                             Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express REST     │
                    │        API          │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
           Controllers      Middleware      Validation
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘

                    Password Recovery
                           │
                           ▼
                       Nodemailer
                           │
                           ▼
                         Email
```

---

## 📁 Project Structure

```text
FinTrack/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validation/
│   │   └── app.js
│   │
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

### Clone the repository

```bash
git clone https://github.com/trushitdarji/FinTrack.git
cd FinTrack
```

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

### Frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔑 Authentication Flow

FinTrack uses JWT authentication with HTTP cookies.

```text
Register / Login
       ↓
JWT generated
       ↓
JWT stored in cookie
       ↓
Protected request
       ↓
Authentication middleware
       ↓
JWT verification
       ↓
User loaded from MongoDB
       ↓
Request allowed
```

### Password Recovery

```text
Forgot Password
       ↓
Email submitted
       ↓
Rate limiter
       ↓
Random reset token generated
       ↓
Token hashed and stored in MongoDB
       ↓
Reset link sent through email
       ↓
User opens reset link
       ↓
Token verified + expiry checked
       ↓
New password hashed
       ↓
Password updated
       ↓
Reset token removed
```

---

## 📡 API Overview

### Authentication

| Method | Endpoint                          | Description            |
| ------ | --------------------------------- | ---------------------- |
| POST   | `/api/auth/register`              | Register user          |
| POST   | `/api/auth/login`                 | Login                  |
| POST   | `/api/auth/logout`                | Logout                 |
| GET    | `/api/auth/me`                    | Get current user       |
| POST   | `/api/auth/change-password`       | Change password        |
| POST   | `/api/auth/forgot-password`       | Request password reset |
| POST   | `/api/auth/reset-password/:token` | Reset password         |

### Transactions

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/transaction`         | Create transaction  |
| GET    | `/api/transaction`         | Get transactions    |
| GET    | `/api/transaction/:id`     | Get transaction     |
| PUT    | `/api/transaction/:id`     | Update transaction  |
| DELETE | `/api/transaction/:id`     | Delete transaction  |
| GET    | `/api/transaction/summary` | Transaction summary |

### Dashboard

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| GET    | `/api/dashboard/summary` | Dashboard financial summary |
| GET    | `/api/dashboard/recent`  | Latest 5 transactions       |
| GET    | `/api/dashboard/stats`   | Dashboard statistics        |

---

## 🔐 Security

FinTrack implements several security mechanisms:

- JWT authentication
- HTTP cookie-based authentication
- bcrypt password hashing
- Protected API routes
- User ownership checks for transactions
- Hashed password reset tokens
- Expiring password reset tokens
- Password reset token invalidation after successful reset
- Forgot-password rate limiting
- Environment-based configuration
- Request validation using Zod

---

## 🧪 Testing

Backend APIs have been manually tested using API testing tools such as Postman.

Important flows tested:

- Registration
- Login
- Logout
- Protected routes
- Transaction CRUD
- Search
- Filtering
- Sorting
- Pagination
- Dashboard statistics
- Change password
- Forgot password
- Email reset link
- Password reset
- Expired/invalid reset token handling

---

## 🚧 Future Improvements

Potential future improvements include:

- Production deployment
- Automated unit and integration tests
- API documentation with Swagger/OpenAPI
- Advanced analytics and reports
- Transaction export
- Improved email service for production
- Stronger production cookie configuration
- CORS configuration through environment variables
- Application monitoring and logging

---

## 👨‍💻 Author

**Trushit Darji**

MERN Stack Developer | Full-Stack Developer

GitHub: `trushitdarji`

---

## ⭐ Support

If you find FinTrack useful or interesting, consider giving the repository a ⭐.
