import React, { useState } from "react";
import { useLogin } from "./useLogin";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./DonorLogin.css";

const DonorLogin = () => {
  const { login, loading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(username, password); // now this waits properly

    const token = Cookies.get("donorToken");
    if (token) {
      navigate("/donor-profile");
    }
  } catch (err) {
    console.log("Login failed:", err);
  }
};

  return (
  <div className="login-wrapper">

    <form onSubmit={handleSubmit} className="login-box">

      <h2 className="login-title">Welcome Back</h2>
      <p className="login-sub">Please enter your details</p>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email address"
        className="login-input"
      />

      <div className="password-row">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />

        <a href="/donor-forget-password" className="forgot-link">
          Forgot password?
        </a>
      </div>

      <button type="submit" disabled={loading} className="login-btn">
        {loading ? (
  <span className="btn-loader">
    <span className="loader-circle"></span>
  </span>
) : (
  "Login"
)}

      </button>

      {error && <p className="login-error">{error}</p>}

      <p className="signup-text">
        Don’t have an account? <a href="/become-donor" className="signup-link">Sign up</a>
      </p>

    </form>
  </div>
);
}
export default DonorLogin;
