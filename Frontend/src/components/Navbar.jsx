import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();

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

  return (
    <nav>
      <h2 onClick={() => navigate("/dashboard")}>💰 FinTrack</h2>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        <button onClick={() => navigate("/transaction")}>Transactions</button>

        <button onClick={() => navigate("/add-transaction")}>
          Add Transaction
        </button>

        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
