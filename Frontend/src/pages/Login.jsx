// import React from "react";
// import Button from "../components/Button";
// import Input from "../components/Input";
// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const nevigate = useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (!email.trim()) {
//       setError("Email is required");
//       return;
//     }

//     if (!password) {
//       setError("Password is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         nevigate("/dashboard");
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);

//       setError(
//         err.response?.data?.message || "Login failed. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <form onSubmit={handleLogin}>
//       <div>
//         <h1>Login</h1>

//         {error && <p className="form-error">{error}</p>}

//         <Input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />

//         <Input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />

//         <Button text={loading ? "Logging in..." : "Login"} disabled={loading} />
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  X,
} from "lucide-react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* =========================================
          HEADER
      ========================================= */}

      <header className="login-header">
        <div className="login-logo">FinTrack</div>

        <div className="login-support">
          <span>Need help?</span>

          <button
            type="button"
            className="support-link"
            onClick={() => setSupportOpen(true)}
          >
            Support
          </button>

          <button
            type="button"
            className="support-icon"
            onClick={() => setSupportOpen(true)}
            aria-label="Support"
          >
            <HelpCircle size={24} />
          </button>
        </div>
      </header>

      {/* =========================================
          LOGIN AREA
      ========================================= */}

      <main className="login-main">
        <div className="login-card">
          {/* TOP BLUE LINE */}

          <div className="login-card-top-line"></div>

          {/* LOCK ICON */}

          <div className="login-lock-box">
            <LockKeyhole size={27} />
          </div>

          {/* TITLE */}

          <div className="login-title-section">
            <h1>Welcome Back</h1>

            <p>Enter your credentials to access your account</p>
          </div>

          {/* =====================================
              FORM
          ===================================== */}

          <form onSubmit={handleLogin}>
            {/* ERROR */}

            {error && <div className="login-error">{error}</div>}

            {/* EMAIL */}

            <div className="login-form-group">
              <label htmlFor="email">EMAIL ADDRESS</label>

              <div className="login-input-wrapper">
                <Mail className="login-input-icon" size={21} />

                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="login-form-group password-group">
              <div className="password-label-row">
                <label htmlFor="password">PASSWORD</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => {
                    navigate("/forgot-password")
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-input-wrapper">
                <KeyRound className="login-input-icon" size={21} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}

            <button type="submit" className="login-button" disabled={loading}>
              <span>{loading ? "Logging in..." : "Login"}</span>

              {!loading && <ArrowRight size={22} />}
            </button>
          </form>

          {/* DIVIDER */}

          <div className="login-divider"></div>

          {/* REGISTER */}

          <div className="register-section">
            <span>Don't have an account?</span>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="register-link"
            >
              Register now
            </button>
          </div>
        </div>

        {/* SECURITY */}

        <div className="security-text">
          <ShieldCheck size={17} />

          <span>Secured with 256-bit encryption</span>
        </div>
      </main>

      {/* =========================================
          SUPPORT POPUP
      ========================================= */}

      {supportOpen && (
        <div className="support-overlay" onClick={() => setSupportOpen(false)}>
          <div className="support-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="support-close"
              onClick={() => setSupportOpen(false)}
              aria-label="Close"
            >
              <X size={21} />
            </button>

            <div className="support-modal-icon">
              <HelpCircle size={28} />
            </div>

            <h2>Need Help?</h2>

            <p>
              If you're facing any issue with your account or login, send us an
              email and we'll help you.
            </p>

            <div className="support-email">trushitdarji55@gmail.com</div>

            <div className="support-modal-actions">
              <button
                type="button"
                className="support-cancel"
                onClick={() => setSupportOpen(false)}
              >
                Close
              </button>

              <a
                className="support-send"
                href="mailto:trushitdarji55@gmail.com?subject=FinTrack%20Support"
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

export default Login;
