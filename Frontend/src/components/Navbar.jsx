import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div>
        <h2 onClick={() => navigate("/dashboard")}>💰 FinTrack</h2>
      </div>

      <div className="options">
        <button className="nav-button" onClick={() => navigate("/dashboard")}>Dashboard</button>

        <button className="nav-button" onClick={() => navigate("/transaction")}>Transactions</button>

        <button className="nav-button" onClick={() => navigate("/add-transaction")}>
          Add Transaction
        </button>

        <button className="nav-button" onClick={() => navigate("/profile")}>Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
