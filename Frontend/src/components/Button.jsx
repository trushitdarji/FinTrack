import React from "react";

const Button = ({ text, type = "submit", disabled = false }) => {
  return (
    <button type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
