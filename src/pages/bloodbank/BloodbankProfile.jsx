import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBloodBankProfile } from "../../api-redux/bloodbankRedux/bloodBankProfileSlice";
import LogoutBloodbank from "./LogoutBloodbank";
import BloodbankStatus from "./BloodbankStatus";
import Stock from "./Stock";
import Facility from "./Facility";
import "./bloodbankDashboard.css";

import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { GiTestTubes } from "react-icons/gi";
import { MdMedicalServices } from "react-icons/md";

const BloodBankProfile = () => {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState("profile");

  const { profileLoading, profileData, profileError } = useSelector(
    (state) => state.bloodBankProfile
  );

  useEffect(() => {
    dispatch(getBloodBankProfile());
  }, [dispatch]);

  return (
    <div className="dashboard-container">

      {/* === FIXED SIDEBAR TOGGLE BUTTON (NO RED BOX ISSUE) === */}
      <div
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "⮜" : "⮞"}
      </div>

      {/* =========== SIDEBAR =========== */}
      <div className={sidebarOpen ? "dashboard-sidebar open" : "dashboard-sidebar"}>

        <div className="sidebar-header">
          <span className="sidebar-title">Blood Bank</span>
        </div>

        <div
          className={`sidebar-link ${currentSection === "profile" ? "active" : ""}`}
          onClick={() => setCurrentSection("profile")}
        >
          <span className="icon"><FiUser /></span> Profile
        </div>

        <div
          className={`sidebar-link ${currentSection === "status" ? "active" : ""}`}
          onClick={() => setCurrentSection("status")}
        >
          <span className="icon"><TbReportAnalytics /></span> Status
        </div>

        <div
          className={`sidebar-link ${currentSection === "stock" ? "active" : ""}`}
          onClick={() => setCurrentSection("stock")}
        >
          <span className="icon"><GiTestTubes /></span> Stock
        </div>

        <div
          className={`sidebar-link ${currentSection === "facilities" ? "active" : ""}`}
          onClick={() => setCurrentSection("facilities")}
        >
          <span className="icon"><MdMedicalServices /></span> Facilities
        </div>

        {/* === Logout Button === */}
        <div className="sidebar-logout">
          <LogoutBloodbank />
        </div>

      </div>

      {/* =========== MAIN CONTENT =========== */}
      <div className="dashboard-content">
        <h1 className="text-2xl font-bold mb-4">Blood Bank Profile</h1>

        {profileLoading && <p style={{ color: "blue" }}>Loading...</p>}
        {profileError && <p style={{ color: "red" }}>{profileError}</p>}

        {/* ===== PROFILE SECTION ===== */}
        {currentSection === "profile" && (
          <div className="bb-section-card">
            <h2>Profile Details</h2>

            {!profileData ? (
              <p>No profile data found</p>
            ) : (
              <>
                <p><strong>Name:</strong> {profileData.bloodBankName}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Phone:</strong> {profileData.phoneNo}</p>
                <p><strong>Licence No:</strong> {profileData.licenceNo}</p>
                <p><strong>Address:</strong> {profileData.address}</p>
              </>
            )}
          </div>
        )}

        {/* ===== STATUS SECTION ===== */}
        {currentSection === "status" && (
          <div className="bb-section-card">
            <h2>Status</h2>
            <BloodbankStatus />
          </div>
        )}

        {/* ===== STOCK SECTION ===== */}
        {currentSection === "stock" && (
          <div className="bb-section-card">
            <h2>Blood Stock</h2>
            <Stock bloodbankId={profileData?.id} />
          </div>
        )}

        {/* ===== FACILITIES SECTION ===== */}
        {currentSection === "facilities" && (
          <div className="bb-section-card" style={{ marginBottom: "40px" }}>
            <h2>Facilities</h2>
            <Facility />
          </div>
        )}

      </div>
    </div>
  );
};

export default BloodBankProfile;
