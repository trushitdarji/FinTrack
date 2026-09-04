import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  LockKeyhole,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  HelpCircle,
  X,
} from "lucide-react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [supportOpen, setSupportOpen] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!newPassword) {
      setError("New password is required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(`/auth/reset-password/${token}`, {
        newPassword,
      });

      if (response.data.success) {
        setMessage(response.data.message);

        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      {/* HEADER */}
      <header className="reset-header">
        <div className="reset-logo">FinTrack</div>

        <div className="reset-support">
          <span>Need help?</span>

          <button
            type="button"
            className="reset-support-link"
            onClick={() => setSupportOpen(true)}
          >
            Support
          </button>

          <button
            type="button"
            className="reset-support-icon"
            onClick={() => setSupportOpen(true)}
            aria-label="Support"
          >
            <HelpCircle size={24} />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="reset-main">
        <div className="reset-card">
          {/* BLUE TOP LINE */}
          <div className="reset-card-top-line"></div>

          {/* ICON */}
          <div className="reset-lock-box">
            <LockKeyhole size={27} />
          </div>

          {/* TITLE */}
          <div className="reset-title-section">
            <h1>Reset Password</h1>

            <p>Create a new password for your FinTrack account.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleResetPassword}>
            {/* ERROR */}
            {error && <div className="reset-error">{error}</div>}

            {/* SUCCESS */}
            {message && (
              <div className="reset-success">
                {message}
                <br />
                Redirecting to login...
              </div>
            )}

            {/* NEW PASSWORD */}
            <div className="reset-form-group">
              <label htmlFor="newPassword">NEW PASSWORD</label>

              <div className="reset-input-wrapper">
                <KeyRound className="reset-input-icon" size={21} />

                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="reset-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="reset-form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>

              <div className="reset-input-wrapper">
                <KeyRound className="reset-input-icon" size={21} />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="reset-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button type="submit" className="reset-button" disabled={loading}>
              <span>{loading ? "Resetting..." : "Reset Password"}</span>

              {!loading && <ArrowRight size={22} />}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="reset-divider"></div>

          {/* BACK TO LOGIN */}
          <div className="reset-back-section">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="reset-back-link"
            >
              <ArrowLeft size={17} />
              Back to Login
            </button>
          </div>
        </div>

        {/* SECURITY */}
        <div className="reset-security-text">
          <ShieldCheck size={17} />
          <span>Secured with 256-bit encryption</span>
        </div>
      </main>

      {/* SUPPORT POPUP */}
      {supportOpen && (
        <div
          className="reset-support-overlay"
          onClick={() => setSupportOpen(false)}
        >
          <div
            className="reset-support-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="reset-support-close"
              onClick={() => setSupportOpen(false)}
              aria-label="Close"
            >
              <X size={21} />
            </button>

            <div className="reset-support-modal-icon">
              <HelpCircle size={28} />
            </div>

            <h2>Need Help?</h2>

            <p>
              If you're facing any issue with your account, send us an email and
              we'll help you.
            </p>

            <div className="reset-support-email">trushitdarji@gmail.com</div>

            <div className="reset-support-modal-actions">
              <button
                type="button"
                className="reset-support-cancel"
                onClick={() => setSupportOpen(false)}
              >
                Close
              </button>

              <a
                className="reset-support-send"
                href="mailto:trushitdarji@gmail.com?subject=FinTrack%20Support"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
