import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);

  const getDashboardSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");

      if (response.data.success) {
        setSummary(response.data.summary);
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

  useEffect(() => {
    getDashboardSummary();
    getRecentTransactions();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Income: ₹{summary.income}</h2>
      <h2>Expense: ₹{summary.expense}</h2>
      <h2>Balance: ₹{summary.balance}</h2>
      <h2>Total Transactions: {summary.totalTransactionLen}</h2>

      <hr />

      <h2>Recent Transactions</h2>

      {recentTransactions.map((transaction) => (
        <div key={transaction._id}>
          <p>Title: {transaction.title}</p>
          <p>Amount: ₹{transaction.amount}</p>
          <p>Type: {transaction.type}</p>
          <p>Category: {transaction.category}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
