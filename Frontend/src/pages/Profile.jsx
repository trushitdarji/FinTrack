// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Moon, UserRound, LogOut, SlidersHorizontal } from "lucide-react";

// import api from "../api/axios";
// import "./Profile.css";

// const Profile = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [passwordMessage, setPasswordMessage] = useState("");
//   const [passwordLoading, setPasswordLoading] = useState(false);

//   const [darkMode, setDarkMode] = useState(false);
//   const [showPasswordSection, setShowPasswordSection] = useState(false);

//   const getProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/auth/me");

//       if (response.data.success) {
//         setUser(response.data.user);
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);

//       setError(
//         err.response?.data?.message ||
//           "Failed to load profile. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     setPasswordMessage("");

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setPasswordMessage("All password fields are required");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setPasswordMessage("New password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setPasswordMessage("New passwords do not match");
//       return;
//     }

//     try {
//       setPasswordLoading(true);

//       const response = await api.post("/auth/change-password", {
//         currentPassword,
//         newPassword,
//       });

//       if (response.data.success) {
//         setPasswordMessage("Password changed successfully");

//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//       }
//     } catch (err) {
//       setPasswordMessage(
//         err.response?.data?.message || "Failed to change password",
//       );
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await api.post("/auth/logout");

//       if (response.data.success) {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="profile-error">
//         <p>{error}</p>

//         <button onClick={getProfile}>Try Again</button>
//       </div>
//     );
//   }

//   return (
//     <div className={darkMode ? "profile-page dark" : "profile-page"}>
//       <div className="profile-header">
//         <div className="avatar-wrapper">
//           <img
//             src={
//               user?.profileImage ||
//               `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                 user?.name || "User",
//               )}&background=f4b8c8&color=222&size=256`
//             }
//             alt="Profile"
//             className="profile-avatar"
//           />
//         </div>
//       </div>

//       <div className="profile-container">
//         <div className="user-info">
//           <h1>{user?.name || "User"}</h1>

//           <div className="info-row">
//             <span className="info-label">Email</span>

//             <span className="info-value">{user?.email || "No email"}</span>
//           </div>

//           <div className="info-row">
//             <span className="info-label">User ID</span>

//             <span className="info-value">{user?._id || "N/A"}</span>
//           </div>
//         </div>

//         <div className="profile-menu">
//           <div className="menu-item dark-mode-item">
//             <div className="menu-left">
//               <Moon size={25} strokeWidth={1.8} />

//               <span>Dark mode</span>
//             </div>

//             <button
//               type="button"
//               className={darkMode ? "toggle active" : "toggle"}
//               onClick={() => setDarkMode(!darkMode)}
//             >
//               <span></span>
//             </button>
//           </div>

//           <button
//             type="button"
//             className="menu-item"
//             onClick={() => setShowPasswordSection(!showPasswordSection)}
//           >
//             <div className="menu-left">
//               <SlidersHorizontal size={24} strokeWidth={1.8} />

//               <span>Change Password</span>
//             </div>
//           </button>

//           <button
//             type="button"
//             className="menu-item logout"
//             onClick={handleLogout}
//           >
//             <div className="menu-left">
//               <LogOut size={24} strokeWidth={1.8} />

//               <span>Log out</span>
//             </div>
//           </button>
//         </div>

//         {showPasswordSection && (
//           <div className="password-section">
//             <h2>Change Password</h2>

//             {passwordMessage && (
//               <p className="password-message">{passwordMessage}</p>
//             )}

//             <form onSubmit={handleChangePassword} className="password-form">
//               <input
//                 type="password"
//                 placeholder="Current Password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//               />

//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />

//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />

//               <button
//                 type="submit"
//                 disabled={passwordLoading}
//                 className="change-password-btn"
//               >
//                 {passwordLoading ? "Changing..." : "Change Password"}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";

import { Bell, UserCircle, Menu, X } from "lucide-react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  // =====================================================
  // MOBILE MENU STATE
  // =====================================================

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =====================================================
  // USER STATE
  // =====================================================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // PASSWORD STATE
  // =====================================================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // =====================================================
  // GET PROFILE
  // =====================================================

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

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage("");

    // Check empty fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("All password fields are required");
      return;
    }

    // Check password length
    if (newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters");
      return;
    }

    // Check password match
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

        // Clear fields
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

  // =====================================================
  // LOGOUT
  // =====================================================

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

  // =====================================================
  // LOAD PROFILE ON PAGE LOAD
  // =====================================================

  useEffect(() => {
    getProfile();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="profile-loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>

        <button onClick={getProfile}>Try Again</button>
      </div>
    );
  }

  // =====================================================
  // USER NAME / INITIAL
  // =====================================================

  const userName = user?.name || "User";

  const userInitial = userName.charAt(0).toUpperCase();

  // =====================================================
  // NAVIGATION FUNCTIONS
  // =====================================================

  const goToDashboard = () => {
    setMobileMenuOpen(false);
    navigate("/dashboard");
  };

  const goToTransactions = () => {
    setMobileMenuOpen(false);
    navigate("/transaction");
  };

  const goToAddTransaction = () => {
    setMobileMenuOpen(false);
    navigate("/add-transaction");
  };

  const goToProfile = () => {
    setMobileMenuOpen(false);
    navigate("/profile");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="profile-page">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="transaction-header">
        {/* LOGO */}

        <div className="transaction-logo">FinTrack</div>

        {/* DESKTOP NAVIGATION */}

        <nav className="transaction-nav">
          <button className="transaction-nav-link" onClick={goToDashboard}>
            Dashboard
          </button>

          <button className="transaction-nav-link" onClick={goToTransactions}>
            Transactions
          </button>

          <button className="transaction-nav-link" onClick={goToAddTransaction}>
            Add-Transaction
          </button>
        </nav>

        {/* RIGHT SIDE */}

        <div className="transaction-nav-actions">
          {/* Notification */}

          <button
            className="transaction-icon-button notification-button"
            title="Notifications"
          >
            <Bell size={23} />
          </button>

          {/* Profile */}

          <button
            className="transaction-icon-button profile-active-icon"
            title="Profile"
            onClick={goToProfile}
          >
            <UserCircle size={23} />
          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* =================================================
            MOBILE NAVIGATION MENU
        ================================================= */}

        <div
          className={`mobile-navigation ${
            mobileMenuOpen ? "mobile-navigation-open" : ""
          }`}
        >
          <button onClick={goToDashboard}>Dashboard</button>

          <button onClick={goToTransactions}>Transactions</button>

          <button onClick={goToAddTransaction}>Add-Transaction</button>
        </div>
      </header>

      {/* =================================================
          PROFILE CONTENT
      ================================================= */}

      <main className="profile-content">
        {/* =================================================
            USER INFORMATION CARD
        ================================================= */}

        <section className="profile-card user-card">
          {/* AVATAR */}

          <div className="profile-avatar">{userInitial}</div>

          {/* USER NAME */}

          <h1 className="profile-name">{userName}</h1>

          {/* EMAIL */}

          <p className="profile-email">{user?.email || "No email"}</p>

          {/* LOGOUT */}

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>

        {/* =================================================
            UPDATE PASSWORD CARD
        ================================================= */}

        <section className="profile-card password-card">
          <h2>Update Password</h2>

          {/* PASSWORD MESSAGE */}

          {passwordMessage && (
            <p
              className={`password-message ${
                passwordMessage.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }`}
            >
              {passwordMessage}
            </p>
          )}

          <form onSubmit={handleChangePassword} className="password-form">
            {/* CURRENT PASSWORD */}

            <div className="password-form-group">
              <label htmlFor="currentPassword">Current Password</label>

              <input
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            {/* NEW PASSWORD */}

            <div className="password-form-group">
              <label htmlFor="newPassword">New Password</label>

              <input
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="password-form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* UPDATE BUTTON */}

            <div className="password-button-wrapper">
              <button
                type="submit"
                disabled={passwordLoading}
                className="update-password-button"
              >
                {passwordLoading ? "Changing..." : "Update password"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;
