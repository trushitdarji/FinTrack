import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

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

  useEffect(() => {
    getDashboardSummary();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {summary && (
        <>
          <h2>Total Income: ₹{summary.income}</h2>
          <h2>Total Expense: ₹{summary.expense}</h2>
          <h2>Current Balance: ₹{summary.balance}</h2>
          <h2>Total Transactions: {summary.totalTransactionLen}</h2>
        </>
      )}
    </div>
  );
};

export default Dashboard;
