import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/Button";
import Input from "../components/Input";

const EditTransaction = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
  });

  const getTransaction = async () => {
    try {
      const response = await api.get(`/transaction/${id}`);

      if (response.data.success) {
        const transaction = response.data.transaction;

        setTransaction(transaction);

        setFormData({
          title: transaction.title,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          date: transaction.date.split("T")[0],
        });
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/transaction/${id}`, formData);

      console.log(response.data);

      if (response.data.success) {
        alert("Transaction Updated Successfully");
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getTransaction();
  }, [id]);

  console.log(transaction);

  return (
    <div>
      <h1>Edit Transaction</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter Title"
          onChange={handleChange}
        />

        <Input
          type="number"
          name="amount"
          value={formData.amount}
          placeholder="Enter Amount"
          onChange={handleChange}
        />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
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

        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Button text="Update Transaction" />
      </form>
    </div>
  );
};

export default EditTransaction;
