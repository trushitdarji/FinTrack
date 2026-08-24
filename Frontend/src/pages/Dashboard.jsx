import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({});

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

  useEffect(() => {
    getDashboardSummary();
    getRecentTransactions();
    getDashboardStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <Card title="Total Income" value={`₹${summary.income || 0}`} />

        <Card title="Total Expense" value={`₹${summary.expense || 0}`} />

        <Card title="Current Balance" value={`₹${summary.balance || 0}`} />

        <Card
          title="Total Transactions"
          value={summary.totalTransactionLen || 0}
        />
      </div>

      <hr />

      <RecentTransactions transactions={recentTransactions} />

      <div>
        <h2>Financial Overview</h2>

        <div>
          <h3>Income</h3>
          <p>₹{stats.totalIncome || 0}</p>
        </div>

        <div>
          <h3>Expense</h3>
          <p>₹{stats.totalExpense || 0}</p>
        </div>

        <div>
          <h3>Balance</h3>
          <p>₹{stats.currBalance || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
