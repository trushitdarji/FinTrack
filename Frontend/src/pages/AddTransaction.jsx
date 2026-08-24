import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "Food",
    note: "",
    date: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (formData.title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!formData.type) {
      setError("Please select transaction type");
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (!formData.date) {
      setError("Please select a date");
      return;
    }

    try {
      const response = await api.post("/transaction", formData);

      if (response.data.success) {
        alert("Transaction Added Successfully");
        navigate("/transaction");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message ||
          "Failed to add transaction. Please try again.",
      );
    }
  };
  return (
    <div>
      <h1>Add Transaction</h1>

      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
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
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

        <Input
          type="text"
          name="note"
          value={formData.note}
          placeholder="Enter Note"
          onChange={handleChange}
        />

        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Button text="Add Transaction" />
      </form>
    </div>
  );
};

export default AddTransaction;
