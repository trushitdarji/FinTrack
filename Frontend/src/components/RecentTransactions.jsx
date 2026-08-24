import React from "react";
import { useNavigate } from "react-router-dom";

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();

  return (
    <div className="recent-transactions">
      <div className="recent-header">
        <h2>Recent Transactions</h2>

        <button onClick={() => navigate("/transaction")}>View All</button>
      </div>

      {transactions.length === 0 ? (
        <p>No recent transactions found.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div className="transaction-row" key={transaction._id}>
              <div>
                <h3>{transaction.title}</h3>
                <p>{transaction.category}</p>
              </div>

              <div>
                <p>₹{transaction.amount}</p>
                <p>{transaction.type}</p>
              </div>

              <div>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>

                <button
                  onClick={() =>
                    navigate(`/transaction/edit/${transaction._id}`)
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
