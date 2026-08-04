import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nevigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        nevigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <Input
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button text="Login" />
      </div>
    </form>
  );
};

export default Login;
