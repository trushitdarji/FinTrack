import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        nevigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h1>Login</h1>

        {error && <p className="form-error">{error}</p>}

        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button text={loading ? "Logging in..." : "Login"} disabled={loading} />
      </div>
    </form>
  );
};

export default Login;
