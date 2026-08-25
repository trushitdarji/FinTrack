import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import Button from "../components/Button";
import Input from "../components/Input";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Frontend validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        alert("Registration Successful");
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text={loading ? "Registering..." : "Register"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Register;
