import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  HelpCircle,
  X,
} from "lucide-react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        setMessage(response.data.message);
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
    <div className="forgot-page">

      {/* HEADER */}
      <header className="forgot-header">
        <div className="forgot-logo">FinTrack</div>

        <div className="forgot-support">
          <span>Need help?</span>

          <button
            type="button"
            className="forgot-support-link"
            onClick={() => setSupportOpen(true)}
          >
            Support
          </button>

          <button
            type="button"
            className="forgot-support-icon"
            onClick={() => setSupportOpen(true)}
            aria-label="Support"
          >
            <HelpCircle size={24} />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="forgot-main">

        <div className="forgot-card">

          {/* BLUE LINE */}
          <div className="forgot-card-top-line"></div>

          {/* ICON */}
          <div className="forgot-lock-box">
            <LockKeyhole size={27} />
          </div>

          {/* TITLE */}
          <div className="forgot-title-section">
            <h1>Forgot Password?</h1>

            <p>
              Enter your email address and we'll send you a
              password reset link.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleForgotPassword}>

            {/* ERROR */}
            {error && (
              <div className="forgot-error">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div className="forgot-success">
                {message}
              </div>
            )}

            {/* EMAIL */}
            <div className="forgot-form-group">

              <label htmlFor="email">
                EMAIL ADDRESS
              </label>

              <div className="forgot-input-wrapper">

                <Mail
                  className="forgot-input-icon"
                  size={21}
                />

                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="forgot-button"
              disabled={loading}
            >
              <span>
                {loading ? "Sending..." : "Send Reset Link"}
              </span>

              {!loading && <ArrowRight size={22} />}
            </button>

          </form>

          {/* BACK TO LOGIN */}
          <div className="forgot-divider"></div>

          <div className="back-login-section">

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="back-login-link"
            >
              <ArrowLeft size={17} />
              Back to Login
            </button>

          </div>

        </div>

        {/* SECURITY */}
        <div className="forgot-security-text">
          <ShieldCheck size={17} />
          <span>Secured with 256-bit encryption</span>
        </div>

      </main>

      {/* SUPPORT POPUP */}
      {supportOpen && (
        <div
          className="forgot-support-overlay"
          onClick={() => setSupportOpen(false)}
        >
          <div
            className="forgot-support-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="forgot-support-close"
              onClick={() => setSupportOpen(false)}
              aria-label="Close"
            >
              <X size={21} />
            </button>

            <div className="forgot-support-modal-icon">
              <HelpCircle size={28} />
            </div>

            <h2>Need Help?</h2>

            <p>
              If you're facing any issue with your account,
              send us an email and we'll help you.
            </p>

            <div className="forgot-support-email">
              trushitdarji@gmail.com
            </div>

            <div className="forgot-support-modal-actions">

              <button
                type="button"
                className="forgot-support-cancel"
                onClick={() => setSupportOpen(false)}
              >
                Close
              </button>

              <a
                className="forgot-support-send"
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

export default ForgotPassword;