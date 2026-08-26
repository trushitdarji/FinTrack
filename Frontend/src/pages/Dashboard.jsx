import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";
import RecentTransactions from "../components/RecentTransactions";
import FinancialOverview from "../components/FinancialOverview";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

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
      <hr />
      <FinancialOverview stats={stats} />
    </div>
  );
};

export default Dashboard;
