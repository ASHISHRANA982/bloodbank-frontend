import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginBloodbank } from "../../api-redux/bloodbankRedux/bloodBankLogin";
import { useNavigate, Link } from "react-router-dom";

import "./bloodbankLogin.css"; // <-- IMPORTANT

const BloodBankLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.bloodBankLogin);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginBloodbank(formData));

    if (loginBloodbank.fulfilled.match(resultAction)) {
      navigate("/bloodbank-profile");
    }
  };

  return (
    <div className="login-page-container">

      <form onSubmit={handleSubmit} className="login-box">

        <h2 className="login-title">Blood Bank Login</h2>

        <div className="login-input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <p className="login-error">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="forgot-pass">
  <a href="/bloodbank-forget-password">Forgot Password?</a>
</p>

      </form>
    </div>
  );
};

export default BloodBankLogin;
