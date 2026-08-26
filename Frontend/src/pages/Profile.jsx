import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("All password fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setPasswordMessage("Password changed successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setPasswordMessage(
        err.response?.data?.message || "Failed to change password",
      );
    } finally {
      setPasswordLoading(false);
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

      <hr />

      <h2>Change Password</h2>

      <form onSubmit={handleChangePassword}>
        {passwordMessage && <p>{passwordMessage}</p>}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" disabled={passwordLoading}>
          {passwordLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
