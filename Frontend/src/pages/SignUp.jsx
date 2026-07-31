import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import "../styles/Auth.css";

import InputField from "../components/auth/InputField";
import GoogleButton from "../components/auth/GoogleButton";
import Divider from "../components/auth/Divider";
import logo from "../assets/logos/logo.png";
function SignUp({ onSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (onSignup) {
        await onSignup(formData);
      }
    } catch (err) {
      setError("Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-container">

<div className="auth-left signup-bg">
         
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

        <h1>Create Your Account</h1>

        <p>
            Join EventSphere and start managing
            events like a professional.
        </p>
</div>
<div className="sparkle">✦</div>
    </div>
</div>

        <div className="auth-right">

          <div className="auth-form">

            <h2>Sign Up</h2>

            <p className="auth-description">
              Create your EventSphere account.
            </p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <InputField
                label="Full Name"
                icon={User}
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email Address"
                icon={Mail}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <InputField
                label="Password"
                icon={Lock}
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <InputField
                label="Confirm Password"
                icon={Lock}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </button>

            </form>

            <Divider />

            <GoogleButton
              text="Sign up with Google"
            />

            <div className="bottom-link">
              Already have an account?

              <Link to="/signin">
                Sign In
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SignUp;