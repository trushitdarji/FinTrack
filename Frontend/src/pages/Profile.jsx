import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, UserRound, LogOut, SlidersHorizontal } from "lucide-react";

import api from "../api/axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

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

  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout");

      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>

        <button onClick={getProfile}>Try Again</button>
      </div>
    );
  }

  return (
    <div className={darkMode ? "profile-page dark" : "profile-page"}>
      <div className="profile-header">
        <div className="avatar-wrapper">
          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User",
              )}&background=f4b8c8&color=222&size=256`
            }
            alt="Profile"
            className="profile-avatar"
          />
        </div>
      </div>

      <div className="profile-container">
        <div className="user-info">
          <h1>{user?.name || "User"}</h1>

          <div className="info-row">
            <span className="info-label">Email</span>

            <span className="info-value">{user?.email || "No email"}</span>
          </div>

          <div className="info-row">
            <span className="info-label">User ID</span>

            <span className="info-value">{user?._id || "N/A"}</span>
          </div>
        </div>

        <div className="profile-menu">
          <div className="menu-item dark-mode-item">
            <div className="menu-left">
              <Moon size={25} strokeWidth={1.8} />

              <span>Dark mode</span>
            </div>

            <button
              type="button"
              className={darkMode ? "toggle active" : "toggle"}
              onClick={() => setDarkMode(!darkMode)}
            >
              <span></span>
            </button>
          </div>

          <button
            type="button"
            className="menu-item"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
          >
            <div className="menu-left">
              <SlidersHorizontal size={24} strokeWidth={1.8} />

              <span>Change Password</span>
            </div>
          </button>

          <button
            type="button"
            className="menu-item logout"
            onClick={handleLogout}
          >
            <div className="menu-left">
              <LogOut size={24} strokeWidth={1.8} />

              <span>Log out</span>
            </div>
          </button>
        </div>

        {showPasswordSection && (
          <div className="password-section">
            <h2>Change Password</h2>

            {passwordMessage && (
              <p className="password-message">{passwordMessage}</p>
            )}

            <form onSubmit={handleChangePassword} className="password-form">
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

              <button
                type="submit"
                disabled={passwordLoading}
                className="change-password-btn"
              >
                {passwordLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
