// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp, updateLogin, resetForgotPassword } from "../../api-redux/donorRedux/forgotPasswordSlice";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, message, otpSent } = useSelector((state) => state.forgotPassword);

  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRequestOtp = (e) => {
    e.preventDefault();
    dispatch(requestOtp(aadhar));
  };

  const handleUpdateLogin = (e) => {
    e.preventDefault();
    dispatch(updateLogin({ aadhar, username, password, otp }));
  };

  const handleReset = () => {
    dispatch(resetForgotPassword());
    setAadhar(""); setOtp(""); setUsername(""); setPassword("");
  }

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {!otpSent ? (
        <form onSubmit={handleRequestOtp}>
          <input
            type="text"
            placeholder="Enter Aadhar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleUpdateLogin}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Login"}
          </button>
          <button type="button" onClick={handleReset} disabled={loading}>
            Reset
          </button>
        </form>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
