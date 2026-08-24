import React from "react";

const FinancialOverview = ({ stats }) => {
  const income = stats?.totalIncome || 0;
  const expense = stats?.totalExpense || 0;

  const total = income + expense;

  const incomePercentage = total
    ? (income / total) * 100
    : 0;

  const expensePercentage = total
    ? (expense / total) * 100
    : 0;

  return (
    <div className="financial-overview">
      <h2>Financial Overview</h2>

      <div className="overview-values">
        <div>
          <p>Total Income</p>
          <h3>₹{income}</h3>
        </div>

        <div>
          <p>Total Expense</p>
          <h3>₹{expense}</h3>
        </div>
      </div>

      <div className="financial-bar">
        <div
          className="income-bar"
          style={{ width: `${incomePercentage}%` }}
        ></div>

        <div
          className="expense-bar"
          style={{ width: `${expensePercentage}%` }}
        ></div>
      </div>

      <div className="overview-labels">
        <span>Income {incomePercentage.toFixed(1)}%</span>
        <span>Expense {expensePercentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default FinancialOverview;