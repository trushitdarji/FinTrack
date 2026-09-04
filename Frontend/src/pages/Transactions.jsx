// import React from "react";
// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import FinancialOverview from "../components/FinancialOverview";

// const Transactions = () => {
//   const navigate = useNavigate();
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("");
//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(8);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [appliedFromDate, setAppliedFromDate] = useState("");
//   const [appliedToDate, setAppliedToDate] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const [summary, setSummary] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//     incomePercentage: 0,
//     expensePercentage: 0,
//     totalTransactions: 0,
//   });

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, type, category, sort, appliedFromDate, appliedToDate]);

//   useEffect(() => {
//     getTransactions();
//     getTransactionSummary();
//   }, [
//     search,
//     type,
//     category,
//     sort,
//     currentPage,
//     limit,
//     appliedFromDate,
//     appliedToDate,
//   ]);

//   const getTransactions = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/transaction", {
//         params: {
//           search,
//           type,
//           category,
//           sort,
//           page: currentPage,
//           limit,
//           from: appliedFromDate,
//           to: appliedToDate,
//         },
//       });

//       if (response.data.success) {
//         setTransactions(response.data.transactions);
//         setTotalPages(response.data.totalPages);
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);

//       setError(
//         err.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       );

//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const getTransactionSummary = async () => {
//     if (!appliedFromDate || !appliedToDate) {
//       setSummary({
//         totalIncome: 0,
//         totalExpense: 0,
//         balance: 0,
//         incomePercentage: 0,
//         expensePercentage: 0,
//         totalTransactions: 0,
//       });

//       return;
//     }

//     try {
//       const response = await api.get("/transaction/summary", {
//         params: {
//           from: appliedFromDate,
//           to: appliedToDate,
//         },
//       });

//       console.log("SUMMARY:", response.data);

//       if (response.data.success) {
//         setSummary(response.data.summary);
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this transaction?",
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       const response = await api.delete(`/transaction/${id}`);

//       if (response.data.success) {
//         alert("Transaction Deleted Successfully");

//         if (transactions.length === 1 && currentPage > 1) {
//           setCurrentPage((prev) => prev - 1);
//         } else {
//           getTransactions();
//         }
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };
//   return (
//     <div>
//       <hr />

//       <input
//         type="text"
//         placeholder="Search transaction..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//       />

//       <select
//         value={type}
//         onChange={(e) => {
//           setType(e.target.value);
//           setCurrentPage(1);
//         }}
//       >
//         <option value="">All Types</option>
//         <option value="income">Income</option>
//         <option value="expense">Expense</option>
//       </select>

//       <select
//         value={category}
//         onChange={(e) => {
//           setCategory(e.target.value);
//           setCurrentPage(1);
//         }}
//       >
//         <option value="">All Categories</option>
//         <option value="Food">Food</option>
//         <option value="Salary">Salary</option>
//         <option value="Travel">Travel</option>
//         <option value="Shopping">Shopping</option>
//         <option value="Bills">Bills</option>
//         <option value="Entertainment">Entertainment</option>
//         <option value="Health">Health</option>
//         <option value="Education">Education</option>
//         <option value="Other">Other</option>
//       </select>

//       <select
//         value={sort}
//         onChange={(e) => {
//           setSort(e.target.value);
//           setCurrentPage(1);
//         }}
//       >
//         <option value="desc">Newest First</option>
//         <option value="asc">Oldest First</option>
//       </select>

//       <div className="date-filter">
//         <div>
//           <label>From</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>To</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>
//       </div>

//       <button
//         onClick={() => {
//           if (!fromDate || !toDate) {
//             alert("Please select both From and To dates");
//             return;
//           }

//           if (fromDate > toDate) {
//             alert("From date cannot be after To date");
//             return;
//           }

//           setCurrentPage(1);
//           setAppliedFromDate(fromDate);
//           setAppliedToDate(toDate);
//         }}
//       >
//         Apply Date Filter
//       </button>

//       {loading ? (
//         <p>Loading transactions...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : transactions.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <div className="transaction-grid">
//           {transactions.map((transaction) => (
//             <div className="transaction-card" key={transaction._id}>
//               <h3>{transaction.title}</h3>

//               <p className={transaction.type}>₹{transaction.amount}</p>

//               <p>{transaction.type}</p>
//               <p>{transaction.category}</p>

//               <button
//                 onClick={() => navigate(`/transaction/edit/${transaction._id}`)}
//               >
//                 Edit
//               </button>

//               <button onClick={() => handleDelete(transaction._id)}>
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <div>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Previous
//         </button>

//         <span>
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>

//       <FinancialOverview stats={summary} />
//     </div>
//   );
// };

// export default Transactions;

// import React, { useState } from "react";
// import {
//   Bell,
//   UserCircle,
//   Plus,
//   ArrowDown,
//   ArrowUp,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./Transaction.css";

// const Transaction = () => {
//   const navigate = useNavigate();

//   /*
//    * TEMPORARY DATA
//    * --------------------------------
//    * Jab tum apna backend/API logic connect karoge,
//    * sirf transactions array ko API data se replace karna hai.
//    * UI aur pagination logic same reh sakta hai.
//    */

//   const transactions = [
//     {
//       _id: "1",
//       type: "income",
//       title: "Monthly Salary",
//       category: "Salary",
//       amount: 5000,
//       date: "Oct 24, 2023",
//       description: "October payroll deposit from Tech Corp.",
//     },
//     {
//       _id: "2",
//       type: "expense",
//       title: "Grocery Shopping",
//       category: "Food",
//       amount: 120.5,
//       date: "Oct 23, 2023",
//       description: "Weekly groceries at Whole Foods.",
//     },
//     {
//       _id: "3",
//       type: "expense",
//       title: "Rent Payment",
//       category: "Housing",
//       amount: 1800,
//       date: "Oct 21, 2023",
//       description: "November rent for apartment.",
//     },
//     {
//       _id: "4",
//       type: "expense",
//       title: "Electric Bill",
//       category: "Utilities",
//       amount: 85.2,
//       date: "Oct 20, 2023",
//       description: "Monthly electricity utility bill.",
//     },
//     {
//       _id: "5",
//       type: "income",
//       title: "Freelance Project",
//       category: "Side Hustle",
//       amount: 450,
//       date: "Oct 18, 2023",
//       description: "Website design for local bakery.",
//     },
//     {
//       _id: "6",
//       type: "expense",
//       title: "Dinner Out",
//       category: "Entertainment",
//       amount: 65,
//       date: "Oct 15, 2023",
//       description: "Dinner with friends at Italian restaurant.",
//     },
//     {
//       _id: "7",
//       type: "expense",
//       title: "Internet Bill",
//       category: "Utilities",
//       amount: 70,
//       date: "Oct 12, 2023",
//       description: "Monthly broadband subscription.",
//     },
//     {
//       _id: "8",
//       type: "expense",
//       title: "Gas Station",
//       category: "Transportation",
//       amount: 45.5,
//       date: "Oct 10, 2023",
//       description: "Fuel for the car.",
//     },

//     // Page 2 data
//     {
//       _id: "9",
//       type: "income",
//       title: "Bonus Payment",
//       category: "Salary",
//       amount: 800,
//       date: "Oct 08, 2023",
//       description: "Monthly performance bonus.",
//     },
//     {
//       _id: "10",
//       type: "expense",
//       title: "Movie Tickets",
//       category: "Entertainment",
//       amount: 35,
//       date: "Oct 07, 2023",
//       description: "Weekend movie tickets.",
//     },
//     {
//       _id: "11",
//       type: "expense",
//       title: "Water Bill",
//       category: "Utilities",
//       amount: 40,
//       date: "Oct 05, 2023",
//       description: "Monthly water bill.",
//     },
//     {
//       _id: "12",
//       type: "income",
//       title: "Freelance Work",
//       category: "Side Hustle",
//       amount: 300,
//       date: "Oct 03, 2023",
//       description: "Freelance development project.",
//     },
//   ];

//   const [currentPage, setCurrentPage] = useState(1);

//   /*
//    * Desktop = 8 cards
//    * Mobile = 4 cards
//    *
//    * CSS grid automatically changes the visual layout.
//    * Pagination is handled with 8 here.
//    */

//   const itemsPerPage = 8;

//   const totalPages = Math.ceil(transactions.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentTransactions = transactions.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/transaction/edit/${id}`);
//   };

//   const handleDelete = (id) => {
//     console.log("Delete transaction:", id);

//     // Yahan tum apna existing delete logic/API laga sakte ho.
//   };

//   return (
//     <div className="transaction-page">
//       {/* ================= HEADER ================= */}

//       <header className="transaction-header">
//         <div className="transaction-logo">FinTrack</div>

//         <nav className="transaction-nav">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="transaction-nav-link"
//           >
//             Dashboard
//           </button>

//           <button className="transaction-nav-link active">Transactions</button>

//           <button
//             onClick={() => navigate("/transaction/add")}
//             className="transaction-nav-link"
//           >
//             Add-Transaction
//           </button>
//         </nav>

//         <div className="transaction-nav-actions">
//           <button className="transaction-icon-button" title="Notifications">
//             <Bell size={23} />
//           </button>

//           <button
//             className="transaction-icon-button"
//             title="Profile"
//             onClick={() => navigate("/profile")}
//           >
//             <UserCircle size={23} />
//           </button>
//         </div>
//       </header>

//       {/* ================= MAIN ================= */}

//       <main className="transaction-main">
//         {/* PAGE TITLE */}

//         <div className="transaction-title-section">
//           <div>
//             <h1>Transactions</h1>

//             <p>Review and manage your financial activity.</p>
//           </div>

//           <button
//             className="new-transaction-button"
//             onClick={() => navigate("/transaction/add")}
//           >
//             <Plus size={22} />
//             <span>New Transaction</span>
//           </button>
//         </div>

//         {/* ================= MOBILE ADD BUTTON ================= */}

//         <button
//           className="mobile-add-transaction"
//           onClick={() => navigate("/transaction/add")}
//         >
//           <Plus size={20} />
//           Add Transaction
//         </button>

//         {/* ================= TRANSACTION GRID ================= */}

//         <div className="transaction-grid">
//           {currentTransactions.map((transaction) => {
//             const isIncome = transaction.type === "income";

//             return (
//               <article className="transaction-card" key={transaction._id}>
//                 {/* TOP */}

//                 <div className="transaction-card-top">
//                   <span
//                     className={
//                       isIncome
//                         ? "transaction-type income"
//                         : "transaction-type expense"
//                     }
//                   >
//                     {isIncome ? <ArrowDown size={17} /> : <ArrowUp size={17} />}

//                     {isIncome ? "Income" : "Expense"}
//                   </span>

//                   <span className="transaction-date">{transaction.date}</span>
//                 </div>

//                 {/* TITLE */}

//                 <h2 className="transaction-card-title">{transaction.title}</h2>

//                 {/* CATEGORY */}

//                 <p className="transaction-category">{transaction.category}</p>

//                 {/* AMOUNT */}

//                 <div
//                   className={
//                     isIncome
//                       ? "transaction-amount income-amount"
//                       : "transaction-amount expense-amount"
//                   }
//                 >
//                   {isIncome ? "+" : "-"}$
//                   {transaction.amount.toLocaleString("en-US", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </div>

//                 {/* DESCRIPTION */}

//                 <p className="transaction-description">
//                   {transaction.description}
//                 </p>

//                 {/* BUTTONS */}

//                 <div className="transaction-card-actions">
//                   <button
//                     className="transaction-edit-button"
//                     onClick={() => handleEdit(transaction._id)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="transaction-delete-button"
//                     onClick={() => handleDelete(transaction._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </article>
//             );
//           })}
//         </div>

//         {/* ================= PAGINATION ================= */}

//         <div className="transaction-pagination">
//           <button
//             className="pagination-button"
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft size={21} />
//             Previous
//           </button>

//           <span className="pagination-info">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             className="pagination-button"
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//           >
//             Next
//             <ChevronRight size={21} />
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Transaction;

import React, { useEffect, useState } from "react";
import {
  Bell,
  UserCircle,
  Plus,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Transaction.css";

const Transaction = () => {
  const navigate = useNavigate();

  // ================================
  // ORIGINAL LOGIC - UNCHANGED
  // ================================

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    incomePercentage: 0,
    expensePercentage: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type, category, sort, appliedFromDate, appliedToDate]);

  useEffect(() => {
    getTransactions();
    getTransactionSummary();
  }, [
    search,
    type,
    category,
    sort,
    currentPage,
    limit,
    appliedFromDate,
    appliedToDate,
  ]);

  const getTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/transaction", {
        params: {
          search,
          type,
          category,
          sort,
          page: currentPage,
          limit,
          from: appliedFromDate,
          to: appliedToDate,
        },
      });

      if (response.data.success) {
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );

      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionSummary = async () => {
    if (!appliedFromDate || !appliedToDate) {
      setSummary({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        incomePercentage: 0,
        expensePercentage: 0,
        totalTransactions: 0,
      });

      return;
    }

    try {
      const response = await api.get("/transaction/summary", {
        params: {
          from: appliedFromDate,
          to: appliedToDate,
        },
      });

      console.log("SUMMARY:", response.data);

      if (response.data.success) {
        setSummary(response.data.summary);
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/transaction/${id}`);

      if (response.data.success) {
        alert("Transaction Deleted Successfully");

        if (transactions.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          getTransactions();
        }
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  // ================================
  // EDIT
  // ================================

  const handleEdit = (id) => {
    navigate(`/transaction/edit/${id}`);
  };

  // ================================
  // DATE FILTER
  // ================================

  const handleApplyDateFilter = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }

    if (fromDate > toDate) {
      alert("From date cannot be after To date");
      return;
    }

    setCurrentPage(1);
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
  };

  // ================================
  // RETURN UI
  // ================================

  const formatTransactionDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="transaction-page">
      {/* ================= HEADER ================= */}

      <header className="transaction-header">
        <div className="transaction-logo">FinTrack</div>

        <nav className="transaction-nav">
          <button
            onClick={() => navigate("/dashboard")}
            className="transaction-nav-link"
          >
            Dashboard
          </button>

          <button className="transaction-nav-link active">Transactions</button>

          <button
            onClick={() => navigate("/add-transaction")}
            className="transaction-nav-link"
          >
            Add-Transaction
          </button>
        </nav>

        <div className="transaction-nav-actions">
          <button className="transaction-icon-button" title="Notifications">
            <Bell size={23} />
          </button>

          <button
            className="transaction-icon-button"
            title="Profile"
            onClick={() => navigate("/profile")}
          >
            <UserCircle size={23} />
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="transaction-main">
        {/* ================= TITLE ================= */}

        <div className="transaction-title-section">
          <div>
            <h1>Transactions</h1>

            <p>Review and manage your financial activity.</p>
          </div>

          <button
            className="new-transaction-button"
            onClick={() => navigate("/add-transaction")}
          >
            <Plus size={22} />
            <span>New Transaction</span>
          </button>
        </div>

        {/* ================= MOBILE ADD BUTTON ================= */}

        <button
          className="mobile-add-transaction"
          onClick={() => navigate("/add-transaction")}
        >
          <Plus size={20} />
          Add Transaction
        </button>

        {/* =================================================
            FILTER SECTION
        ================================================= */}

        <div className="transaction-filters">
          {/* SEARCH */}

          <div className="filter-field search-field">
            <label>Search</label>

            <input
              type="text"
              placeholder="Search transaction..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* TYPE */}

          <div className="filter-field">
            <label>Type</label>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* CATEGORY */}

          <div className="filter-field">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Salary">Salary</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* SORT */}

          <div className="filter-field">
            <label>Sort</label>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* FROM DATE */}

          <div className="filter-field">
            <label>From</label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* TO DATE */}

          <div className="filter-field">
            <label>To</label>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* APPLY DATE */}

          <button
            className="apply-filter-button"
            onClick={handleApplyDateFilter}
          >
            Apply Filter
          </button>
        </div>

        {/* ================= TRANSACTIONS ================= */}

        {loading ? (
          <div className="transaction-status">Loading transactions...</div>
        ) : error ? (
          <div className="transaction-status error">{error}</div>
        ) : transactions.length === 0 ? (
          <div className="transaction-status">No transactions found.</div>
        ) : (
          <div className="transaction-grid">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <article className="transaction-card" key={transaction._id}>
                  {/* TOP */}

                  <div className="transaction-card-top">
                    <span
                      className={
                        isIncome
                          ? "transaction-type income"
                          : "transaction-type expense"
                      }
                    >
                      {isIncome ? (
                        <ArrowDown size={17} />
                      ) : (
                        <ArrowUp size={17} />
                      )}

                      {isIncome ? "Income" : "Expense"}
                    </span>

                    <span className="transaction-date">
                      {formatTransactionDate(transaction.date)}
                    </span>
                  </div>

                  {/* TITLE */}

                  <h2 className="transaction-card-title">
                    {transaction.title}
                  </h2>

                  {/* CATEGORY */}

                  <p className="transaction-category">{transaction.category}</p>

                  {/* AMOUNT */}

                  <div
                    className={
                      isIncome
                        ? "transaction-amount income-amount"
                        : "transaction-amount expense-amount"
                    }
                  >
                    {isIncome ? "+" : "-"}$
                    {transaction.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>

                  {/* DESCRIPTION */}

                  <p className="transaction-description">
                    {transaction.description}
                  </p>

                  {/* BUTTONS */}

                  <div className="transaction-card-actions">
                    <button
                      className="transaction-edit-button"
                      onClick={() => handleEdit(transaction._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="transaction-delete-button"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ================= PAGINATION ================= */}

        <div className="transaction-pagination">
          <button
            className="pagination-button"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={21} />
            Previous
          </button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="pagination-button"
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={21} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Transaction;
