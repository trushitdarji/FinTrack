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

  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction._id}>
          <h3>{transaction.title}</h3>
          <p>₹{transaction.amount}</p>
          <p>{transaction.type}</p>
          <p>{transaction.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
