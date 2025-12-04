import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../api-redux/donorRedux/profileSlice";
import { useLogout } from "../donor/useLogout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DonorStatus from "./DonorStatus";
import "./DonorProfile.css?v=2";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { data, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    const token = Cookies.get("donorToken");
    if (!token) navigate("/donor-login");
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.status === 401) {
      navigate("/donor-login");
    }
  }, [error, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/donor-login");
  };

  if (loading)
  return (
    <div className="cs-page-loader">
      <div className="cs-spinner"></div>
    </div>
  );

  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
  if (!data) return <p>No profile found</p>;

  return (
    <div className="donor-dashboard">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
  <h2 className="sidebar-title">Donor Profile</h2>

  <div className="sidebar-info">

    <div className="info-item">
      <i className="icon fas fa-user"></i>
      <span><strong>Name:</strong> {data.name}</span>
    </div>

    <div className="info-item">
      <i className="icon fas fa-envelope"></i>
      <span><strong>Email:</strong> {data.email}</span>
    </div>

    <div className="info-item">
      <i className="icon fas fa-phone"></i>
      <span><strong>Phone:</strong> {data.phone_no}</span>
    </div>

    <div className="info-item">
      <i className="icon fas fa-tint"></i>
      <span><strong>Blood Group:</strong> {data.bloodGroup}</span>
    </div>

    <div className="info-item">
      <i className="icon fas fa-map-marker-alt"></i>
      <span><strong>Address:</strong> {data.address}</span>
    </div>

    <div className="info-item">
      <i className="icon fas fa-clock"></i>
      <span><strong>Last Donate Date:</strong> {data.lastDonateDate}</span>
    </div>

  </div>

  <button className="sidebar-logout-out" onClick={handleLogout}>
    Logout
  </button>
</aside>


      {/* RIGHT CONTENT AREA */}
      <main className="dashboard-content">
        <div className="status-section">
          <DonorStatus />
        </div>
      </main>
    </div>
  );
};

export default Profile;
