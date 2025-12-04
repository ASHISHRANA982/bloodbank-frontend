import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutBloodbank } from "../../api-redux/bloodbankRedux/bloodBankLogin";

import "./bloodbankLogout.css";   // <-- IMPORTANT for styling

const LogoutBloodbank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error, isLoggedOut } = useSelector(
    (state) => state.bloodBankLogin
  );

  const handleLogout = () => {
    dispatch(logoutBloodbank());
  };

  // Redirect after success
  useEffect(() => {
    if (isLoggedOut) {
      navigate("/bloodbank-login");
    }
  }, [isLoggedOut, navigate]);

  return (
    <div className="logout-container">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="logout-btn"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>

      {message && <p className="logout-success">{message}</p>}
      {error && <p className="logout-error">{error}</p>}
    </div>
  );
};

export default LogoutBloodbank;
