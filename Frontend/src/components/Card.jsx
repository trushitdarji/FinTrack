import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <p className="dashboard-card-title">{title}</p>
      <h2 className="dashboard-card-value">{value}</h2>
    </div>
  );
};

export default Card;
