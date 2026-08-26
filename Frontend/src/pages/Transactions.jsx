import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type, category, sort]);

  useEffect(() => {
    getTransactions();
  }, [search, type, category, sort, currentPage, limit]);
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
  return (
    <div> 
      <hr />
      <input
        type="text"
        placeholder="Search transaction..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

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

      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction._id}>
            <h3>{transaction.title}</h3>
            <p>₹{transaction.amount}</p>
            <p>{transaction.type}</p>
            <p>{transaction.category}</p>

            <button
              onClick={() => navigate(`/transaction/edit/${transaction._id}`)}
            >
              Edit
            </button>

            <button onClick={() => handleDelete(transaction._id)}>
              Delete
            </button>
          </div>
        ))
      )}

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
