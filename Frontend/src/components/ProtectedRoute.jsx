import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "./Navbar";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUser = async () => {
    try {
      const response = await api.get("/auth/me");

      if (response.data.success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
