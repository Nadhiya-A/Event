import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import "../styles/Auth.css";
import logo from "../assets/logos/logo.png";
import InputField from "../components/auth/InputField";
import GoogleButton from "../components/auth/GoogleButton";
import Divider from "../components/auth/Divider";

function SignIn({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await onLoginSuccess({
        email,
        password,
      });
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT PANEL */}

<div className="auth-left">
<div className="brand-logo">

  <img
    src={logo}
    alt="EventSphere"
    className="auth-logo"
  />

  <span className="logo-text">
    <span className="logo-event">Event</span>
    <span className="logo-sphere">Sphere</span>
  </span>

</div>

  <div className="auth-left-content">
    <div className="auth-hero-text">

        <h1>Welcome Back!</h1>

        <p>
            Manage events, registrations and
            analytics from one powerful dashboard.
        </p>

    </div>
    <div className="sparkle">✦</div>
     </div>
</div>

        {/* RIGHT PANEL */}

        <div className="auth-right">

          <div className="auth-form">

            <h2>
              Sign In
            </h2>

            <p className="auth-description">
              Sign in to continue to EventSphere.
            </p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <InputField
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <InputField
                label="Password"
                icon={Lock}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="remember-row">

                <label>

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() =>
                      setRememberMe(!rememberMe)
                    }
                  />

                  Remember me

                </label>

                <Link to="#">
                  Forgot Password?
                </Link>

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
                >
                {loading ? "Signing In..." : "Sign In →"}
              </button>

            </form>

            <Divider />

            <GoogleButton
              text="Continue with Google"
            />

            <div className="bottom-link">

              Don't have an account?

              <Link to="/signup">
                Sign Up
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SignIn;