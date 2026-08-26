import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/me");

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message ||
          "Failed to load profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={getProfile}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>My Profile</h1>

      <p>
        <strong>Name:</strong> {user?.name}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>User ID:</strong> {user?._id}
      </p>
    </div>
  );
};

export default Profile;