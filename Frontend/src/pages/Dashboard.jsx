// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import Card from "../components/Card";
// import RecentTransactions from "../components/RecentTransactions";
// import FinancialOverview from "../components/FinancialOverview";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [summary, setSummary] = useState({});
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const getDashboardSummary = async () => {
//     try {
//       const response = await api.get("/dashboard/summary");

//       if (response.data.success) {
//         setSummary(response.data.summary);
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//       setError(err.response?.data?.message || "Failed to load dashboard.");
//     }
//   };

//   const getDashboardStats = async () => {
//     try {
//       const response = await api.get("/dashboard/stats");

//       if (response.data.success) {
//         setStats(response.data.summery);
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };

//   const getRecentTransactions = async () => {
//     try {
//       const response = await api.get("/dashboard/recent");

//       if (response.data.success) {
//         setRecentTransactions(response.data.recentTransaction);
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await api.post("/auth/logout");

//       if (response.data.success) {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         await Promise.all([
//           getDashboardSummary(),
//           getRecentTransactions(),
//           getDashboardStats(),
//         ]);
//       } catch (err) {
//         setError("Failed to load dashboard.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);

//   if (loading) {
//     return <p>Loading dashboard...</p>;
//   }

//   if (error) {
//     return (
//       <div>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Try Again</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <div className="dashboard-cards">
//         <Card title="Total Income" value={`₹${summary.income || 0}`} />

//         <Card title="Total Expense" value={`₹${summary.expense || 0}`} />

//         <Card title="Current Balance" value={`₹${summary.balance || 0}`} />

//         <Card
//           title="Total Transactions"
//           value={summary.totalTransactionLen || 0}
//         />
//       </div>

//       <hr />

//       <RecentTransactions transactions={recentTransactions} />
//       <hr />
//       <FinancialOverview stats={stats} />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ReceiptText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Bell,
  CircleUserRound,
  ShoppingCart,
  WalletCards,
  House,
  Coffee,
  Pencil,
  CalendarDays,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

import api from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // =====================================
  // ORIGINAL DASHBOARD LOGIC
  // =====================================

  const [summary, setSummary] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // Financial Health Animation
  // UI ONLY
  // =====================================

  const [healthAnimated, setHealthAnimated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHealthAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // =====================================
  // ORIGINAL API LOGIC
  // DO NOT CHANGE
  // =====================================

  const getDashboardSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");

      if (response.data.success) {
        setSummary(response.data.summary);
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(err.response?.data?.message || "Failed to load dashboard.");
    }
  };

  const getDashboardStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");

      if (response.data.success) {
        setStats(response.data.summery);
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const getRecentTransactions = async () => {
    try {
      const response = await api.get("/dashboard/recent");

      if (response.data.success) {
        setRecentTransactions(response.data.recentTransaction);
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout");

      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        await Promise.all([
          getDashboardSummary(),
          getRecentTransactions(),
          getDashboardStats(),
        ]);
      } catch (err) {
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>

        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  // =====================================
  // UI DATA
  // Connected with original API state
  // =====================================

  const totalIncome = Number(summary?.income || 0);
  const totalExpenses = Number(summary?.expense || 0);
  const remainingBalance = Number(summary?.balance || 0);

  const totalTransactions = Number(summary?.totalTransactionLen || 0);

  // =====================================
  // Financial Health
  // =====================================

  const calculatedSavingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const savingsRate = Number(
    stats?.savingsRate ?? stats?.savingRate ?? calculatedSavingsRate,
  );

  const safeSavingsRate = Math.max(0, Math.min(100, savingsRate));

  const expenseRate =
    totalIncome > 0
      ? Math.max(0, Math.min(100, (totalExpenses / totalIncome) * 100))
      : 0;

  // =====================================
  // Currency Formatter
  // Same UI formatting
  // =====================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Math.abs(Number(amount) || 0));
  };

  // =====================================
  // Transaction Icon
  // UI helper only
  // =====================================

  const getTransactionIcon = (transaction) => {
    const text = `${transaction?.description || ""} ${
      transaction?.category || ""
    }`.toLowerCase();

    if (text.includes("grocery")) {
      return <ShoppingCart size={20} />;
    }

    if (text.includes("rent")) {
      return <House size={20} />;
    }

    if (text.includes("coffee")) {
      return <Coffee size={20} />;
    }

    if (text.includes("salary") || text.includes("income")) {
      return <WalletCards size={20} />;
    }

    return <WalletCards size={20} />;
  };

  // =====================================
  // Recent 5 Transactions
  // UI limitation only
  // =====================================

  const displayedTransactions = Array.isArray(recentTransactions)
    ? recentTransactions.slice(0, 5)
    : [];

  return (
    <div className="dashboard-page">
      {/* =================================
          TOP NAVBAR
      ================================== */}

      <header className="dashboard-navbar">
        {/* Logo */}

        <div className="dashboard-logo">FinTrack</div>

        {/* Navigation */}

        <nav className="dashboard-top-nav">
          <a href="/dashboard" className="top-nav-link active">
            Dashboard
          </a>

          {/* IMPORTANT:
              Your route remains /transaction
          */}

          <a href="/transaction" className="top-nav-link">
            Transactions
          </a>

          <a href="/add-transaction" className="top-nav-link">
            Add-Transaction
          </a>
        </nav>

        {/* Right Icons */}

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <div className="dashboard-nav-actions">
          <button className="nav-icon-button" title="Notifications">
            <Bell size={23} />
          </button>

          <button
            className="nav-icon-button"
            title="Profile"
            onClick={() => {
              window.location.href = "/profile";
            }}
          >
            <CircleUserRound size={24} />
          </button>
        </div>
      </header>

      {/* =================================
          MAIN LAYOUT
      ================================== */}

      <div className="dashboard-layout">
        {/* =================================
            SIDEBAR
        ================================== */}

        <aside className="dashboard-sidebar">
          {/* Sidebar Header */}

          <div className="sidebar-brand">
            <h2>FinTrack</h2>

            <p>Modern Corporate Finance</p>
          </div>

          {/* Sidebar Navigation */}

          <div className="sidebar-main-menu">
            <a href="/dashboard" className="sidebar-link active">
              <LayoutDashboard size={22} />

              <span>Dashboard</span>
            </a>

            <a href="/transaction" className="sidebar-link">
              <ReceiptText size={22} />

              <span>Transactions</span>
            </a>

            <a href="/profile" className="sidebar-link">
              <CircleUserRound size={22} />
              <span>Profile</span>
            </a>
          </div>

          {/* Sidebar Bottom */}

          <div className="sidebar-bottom">
            <a href="/add-transaction" className="sidebar-add-button">
              <Plus size={21} />

              <span>Add Transaction</span>
            </a>

            <a href="/help" className="sidebar-bottom-link">
              <HelpCircle size={20} />

              <span>Help</span>
            </a>

            {/* ORIGINAL LOGOUT LOGIC */}

            <button
              className="sidebar-bottom-link logout-button"
              onClick={handleLogout}
            >
              <LogOut size={20} />

              <span>Logout</span>
            </button>
          </div>
        </aside>

        {mobileMenuOpen && (
          <>
            <div
              className="mobile-sidebar-overlay"
              onClick={() => setMobileMenuOpen(false)}
            />

            <aside className="mobile-sidebar">
              <div className="mobile-sidebar-header">
                <h2>FinTrack</h2>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="mobile-sidebar-menu">
                {/* Dashboard */}

                <a
                  href="/dashboard"
                  className="mobile-sidebar-link active"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={21} />

                  <span>Dashboard</span>
                </a>

                {/* Transaction */}

                <a
                  href="/transaction"
                  className="mobile-sidebar-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ReceiptText size={21} />

                  <span>Transactions</span>
                </a>

                {/* Profile */}

                <a
                  href="/profile"
                  className="mobile-sidebar-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CircleUserRound size={21} />

                  <span>Profile</span>
                </a>
              </nav>
            </aside>
          </>
        )}

        {/* =================================
            DASHBOARD CONTENT
        ================================== */}

        <main className="dashboard-content">
          {/* =================================
              PAGE HEADING
          ================================== */}

          <section className="dashboard-heading">
            <h1>Financial Overview</h1>

            <p>Track and analyze your corporate finances.</p>

            <a
              href="/add-transaction"
              className="mobile-add-transaction-button"
            >
              <Plus size={19} />

              <span>Add Transaction</span>
            </a>
          </section>

          {/* =================================
              SUMMARY CARDS
          ================================== */}

          <section className="summary-cards">
            {/* TOTAL INCOME */}

            <div className="summary-card">
              <div className="summary-card-top">
                <span>Total Income</span>

                <div className="income-badge">
                  <TrendingUp size={15} />

                  {totalIncome > 0
                    ? `+${(
                        ((totalIncome - totalExpenses) / totalIncome) *
                        100
                      ).toFixed(1)}%`
                    : "+0%"}
                </div>
              </div>

              <strong className="summary-value">
                {formatCurrency(totalIncome)}
              </strong>
            </div>

            {/* TOTAL EXPENSES */}

            <div className="summary-card">
              <div className="summary-card-top">
                <span>Total Expenses</span>

                <div className="expense-badge">
                  ◉ {expenseRate.toFixed(1)}% of Income
                </div>
              </div>

              <strong className="summary-value">
                {formatCurrency(totalExpenses)}
              </strong>
            </div>

            {/* REMAINING BALANCE */}

            <div className="summary-card balance-card">
              <div className="summary-card-top">
                <span>Remaining Balance</span>
              </div>

              <strong className="summary-value">
                {formatCurrency(remainingBalance)}
              </strong>
            </div>

            {/* TRANSACTIONS */}

            <div className="summary-card">
              <div className="summary-card-top">
                <span>Transactions (This Month)</span>

                <CalendarDays size={20} className="calendar-icon" />
              </div>

              <strong className="summary-value transaction-count">
                {totalTransactions}
              </strong>
            </div>
          </section>

          {/* =================================
              LOWER DASHBOARD
          ================================== */}

          <section className="dashboard-lower-grid">
            {/* =================================
                RECENT TRANSACTIONS
            ================================== */}

            <div className="recent-transactions-card">
              {/* Header */}

              <div className="section-card-header">
                <h2>Recent Transactions</h2>

                {/* IMPORTANT:
                    /transaction route preserved
                */}

                <a href="/transaction">View All</a>
              </div>

              {/* Table Header */}

              <div className="transaction-table-header">
                <span>Description</span>

                <span>Category</span>

                <span>Amount</span>
              </div>

              {/* Transactions */}

              <div className="transaction-list">
                {displayedTransactions.length > 0 ? (
                  displayedTransactions.map((transaction, index) => {
                    const amount = Number(transaction?.amount || 0);

                    const transactionType =
                      transaction?.type ||
                      transaction?.transactionType ||
                      transaction?.kind;

                    const isIncome =
                      transactionType?.toLowerCase() === "income"
                        ? true
                        : transactionType?.toLowerCase() === "expense"
                          ? false
                          : amount > 0;

                    return (
                      <div
                        className="transaction-row"
                        key={transaction?._id || transaction?.id || index}
                      >
                        {/* Description */}

                        <div className="transaction-description">
                          <div className="transaction-icon">
                            {getTransactionIcon(transaction)}
                          </div>

                          <span>
                            {transaction?.description ||
                              transaction?.title ||
                              "Transaction"}
                          </span>
                        </div>

                        {/* Category */}

                        <div className="transaction-category">
                          {transaction?.category ||
                            (isIncome ? "Income" : "Expense")}
                        </div>

                        {/* Amount */}

                        <div className="transaction-amount-container">
                          <span
                            className={
                              isIncome
                                ? "transaction-amount income"
                                : "transaction-amount expense"
                            }
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(amount)}
                          </span>

                          <button
                            className="edit-transaction"
                            type="button"
                            onClick={() =>
                              navigate(`/transaction/edit/${transaction._id}`)
                            }
                          >
                            <Pencil size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-transactions">
                    No recent transactions found.
                  </div>
                )}
              </div>
            </div>

            {/* =================================
                FINANCIAL HEALTH
            ================================== */}

            <div className="financial-health-card">
              <h2>Financial Health</h2>

              {/* Donut Chart */}

              <div className="health-chart">
                <div className="donut-chart">
                  <svg className="financial-health-ring" viewBox="0 0 220 220">
                    {/* RED BACKGROUND */}

                    <circle
                      className="health-ring-background"
                      cx="110"
                      cy="110"
                      r="88"
                    />

                    {/* GREEN ANIMATED RING */}

                    <circle
                      className={`health-ring-progress ${
                        healthAnimated ? "animate" : ""
                      }`}
                      cx="110"
                      cy="110"
                      r="88"
                      style={{
                        "--health-progress":
                          552.92 * (1 - safeSavingsRate / 100),
                      }}
                    />
                  </svg>

                  {/* Center */}

                  <div className="donut-center">
                    <strong>{Math.round(safeSavingsRate)}%</strong>

                    <span>Savings Rate</span>
                  </div>
                </div>
              </div>

              {/* Legend */}

              <div className="health-legend">
                {/* Income */}

                <div className="legend-row">
                  <div className="legend-name">
                    <span className="legend-dot income-dot"></span>

                    <span>Income</span>
                  </div>

                  <strong>{safeSavingsRate.toFixed(1)}%</strong>
                </div>

                {/* Expenses */}

                <div className="legend-row">
                  <div className="legend-name">
                    <span className="legend-dot expense-dot"></span>

                    <span>Expenses</span>
                  </div>

                  <strong>{expenseRate.toFixed(1)}%</strong>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
