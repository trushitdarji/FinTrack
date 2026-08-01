import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <Button text="Register" />
    </div>
  );
};

export default Register;
