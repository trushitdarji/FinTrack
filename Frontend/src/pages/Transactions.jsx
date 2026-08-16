import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await api.get("/transaction");
      if (response.data.success) {
        setTransactions(response.data.transactions);
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

        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction._id !== id),
        );
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction._id}>
          <h3>{transaction.title}</h3>
          <p>₹{transaction.amount}</p>
          <p>{transaction.type}</p>
          <p>{transaction.category}</p>
          <button onClick={() => handleDelete(transaction._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
