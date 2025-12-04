import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestOtp,
  updateLogin,
  resetForgotPassword,
} from "../../api-redux/bloodbankRedux/forgetPasswordSlice";

import "./bloodbankForget.css";

const BloodbankForgetPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, message, otpSent } = useSelector(
    (state) => state.bloodBankForget
  );

  const [form, setForm] = useState({
    licenceNo: "",
    otp: "",
    newUsername: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(requestOtp(form.licenceNo));
  };

  const handleUpdateLogin = (e) => {
    e.preventDefault();
    dispatch(updateLogin(form));
  };

  useEffect(() => {
    if (message && !loading && !error && !otpSent) {
      setForm({
        licenceNo: "",
        otp: "",
        newUsername: "",
        newPassword: "",
      });
    }
  }, [message, loading, error, otpSent]);

  return (
    <div className="forget-container">
      <div className="forget-box">

        <h2 className="forget-title">Reset Blood Bank Login</h2>

        {/* SUCCESS */}
        {message && (
          <p className="success-msg">
            {typeof message === "string" ? message : message.message}
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="error-msg">
            {typeof error === "string" ? error : error.message}
          </p>
        )}

        {/* ======== STEP 1: ENTER LICENCE NO ======== */}
        {!otpSent && (
          <form onSubmit={handleSendOtp} className="forget-form">
            <div className="form-group">
              <label>Licence Number</label>
              <input
                type="text"
                name="licenceNo"
                value={form.licenceNo}
                onChange={handleChange}
                placeholder="Enter Licence Number"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* ======== STEP 2: ENTER OTP + NEW CREDENTIALS ======== */}
        {otpSent && (
          <form onSubmit={handleUpdateLogin} className="forget-form">

            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                required
              />
            </div>

            <div className="form-group">
              <label>New Username</label>
              <input
                type="text"
                name="newUsername"
                value={form.newUsername}
                onChange={handleChange}
                placeholder="New Username"
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Updating..." : "Update Login"}
            </button>

            <button
              type="button"
              onClick={() => dispatch(resetForgotPassword())}
              className="reset-btn"
            >
              Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BloodbankForgetPassword;
