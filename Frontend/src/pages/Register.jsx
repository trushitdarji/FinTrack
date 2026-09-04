// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// import Button from "../components/Button";
// import Input from "../components/Input";
// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     // Frontend validation
//     if (!name.trim()) {
//       setError("Name is required");
//       return;
//     }

//     if (name.trim().length < 3) {
//       setError("Name must be at least 3 characters");
//       return;
//     }

//     if (!email.trim()) {
//       setError("Email is required");
//       return;
//     }

//     if (!password) {
//       setError("Password is required");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       if (response.data.success) {
//         alert("Registration Successful");
//         navigate("/login");
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);

//       setError(
//         err.response?.data?.message || "Registration failed. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>

//       {error && <p className="form-error">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="Enter name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <Input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <Input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           text={loading ? "Registering..." : "Register"}
//           disabled={loading}
//         />
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  UserRoundPlus,
  UserRound,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  HelpCircle,
  X,
} from "lucide-react";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const navigate = useNavigate();

  // =========================
  // REGISTER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Frontend validation

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        alert("Registration Successful");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* =========================================
          HEADER
      ========================================= */}

      <header className="register-header">
        <div className="register-logo">FinTrack</div>

        <div className="register-support">
          <span>Need help?</span>

          <button
            type="button"
            className="register-support-link"
            onClick={() => setSupportOpen(true)}
          >
            Support
          </button>

          <button
            type="button"
            className="register-support-icon"
            onClick={() => setSupportOpen(true)}
            aria-label="Support"
          >
            <HelpCircle size={24} />
          </button>
        </div>
      </header>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="register-main">
        <div className="register-card">
          {/* TOP BLUE LINE */}

          <div className="register-card-top-line"></div>

          {/* REGISTER ICON */}

          <div className="register-icon-box">
            <UserRoundPlus size={28} />
          </div>

          {/* TITLE */}

          <div className="register-title-section">
            <h1>Create an Account</h1>

            <p>Enter your details to register your account</p>
          </div>

          {/* =====================================
              FORM
          ===================================== */}

          <form onSubmit={handleSubmit}>
            {/* ERROR */}

            {error && <div className="register-error">{error}</div>}

            {/* FULL NAME */}

            <div className="register-form-group">
              <label htmlFor="name">FULL NAME</label>

              <div className="register-input-wrapper">
                <UserRound className="register-input-icon" size={21} />

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="register-form-group">
              <label htmlFor="email">EMAIL ADDRESS</label>

              <div className="register-input-wrapper">
                <Mail className="register-input-icon" size={21} />

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

            <div className="register-form-group">
              <label htmlFor="password">PASSWORD</label>

              <div className="register-input-wrapper">
                <KeyRound className="register-input-icon" size={21} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </div>
            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              <span>{loading ? "Registering..." : "Register"}</span>

              {!loading && <ArrowRight size={22} />}
            </button>
          </form>

          {/* DIVIDER */}

          <div className="register-divider"></div>

          {/* LOGIN */}

          <div className="login-section">
            <span>Already have an account?</span>

            <button
              type="button"
              className="login-link"
              onClick={() => navigate("/login")}
            >
              Login now
            </button>
          </div>
        </div>
      </main>

      {/* =========================================
          SUPPORT POPUP
      ========================================= */}

      {supportOpen && (
        <div
          className="register-support-overlay"
          onClick={() => setSupportOpen(false)}
        >
          <div
            className="register-support-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="register-support-close"
              onClick={() => setSupportOpen(false)}
              aria-label="Close"
            >
              <X size={21} />
            </button>

            <div className="register-support-modal-icon">
              <HelpCircle size={28} />
            </div>

            <h2>Need Help?</h2>

            <p>
              If you're facing any issue with your account, send us an email and
              we'll help you.
            </p>

            <div className="register-support-email">
              trushitdarji55@gmail.com
            </div>

            <div className="register-support-actions">
              <button
                type="button"
                className="register-support-cancel"
                onClick={() => setSupportOpen(false)}
              >
                Close
              </button>

              <a
                className="register-support-send"
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

export default Register;
