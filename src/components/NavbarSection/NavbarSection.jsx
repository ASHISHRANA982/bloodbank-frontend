import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavbarSection.css";
import { gsap } from "gsap";
import Cookies from "js-cookie";
import { FiSearch } from "react-icons/fi";
import SearchBlood from "../../pages/homePages/SearchBlood.jsx";

export default function NavbarSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const location = useLocation();

  useEffect(() => {
    gsap.from(".navbar", {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    const donorToken = Cookies.get("donorToken");
    const bloodbankToken = Cookies.get("bloodbankToken");

    if (donorToken) setUserType("donor");
    else if (bloodbankToken) setUserType("bloodbank");
    else setUserType(null);
  }, [location.pathname]);

  const profilePath =
    userType === "donor"
      ? "/donor-profile"
      : userType === "bloodbank"
      ? "/bloodbank-profile"
      : "/blood-banks";

  return (
    <nav className="navbar">

      <div className="navbar-inner">
        <Link to="/" className="logo">.kartavya</Link>

        <div className="nav-links">
          <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
          <Link to="/community" className={`nav-item ${location.pathname === "/community" ? "active" : ""}`}>Community</Link>
          <Link to="/contact" className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
          <Link to="/about" className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>About us</Link>

          {userType === "donor" && (
            <>
              <Link to={profilePath} className="nav-item">Profile</Link>
              <Link to="/blood-banks" className="nav-btn">Blood Bank</Link>
            </>
          )}

          {userType === "bloodbank" && (
            <Link to={profilePath} className="nav-item">Profile</Link>
          )}

          {!userType && (
            <Link to="/blood-banks" className="nav-btn">Blood Bank</Link>
          )}
        </div>

        {/* SEARCH ICON */}
        <div className="search-container">
          <FiSearch
            className="search-icon"
            onClick={() => setShowSearchBox(!showSearchBox)}
          />

          {showSearchBox && (
            <div className="search-dropdown-box">
              <SearchBlood />
            </div>
          )}
        </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-item">Home</Link>
          <Link to="/community" className="mobile-item">Community</Link>
          <Link to="/contact" className="mobile-item">Contact</Link>
          <Link to="/about" className="mobile-item">About us</Link>

          {userType === "donor" && (
            <>
              <Link to={profilePath} className="mobile-item">Profile</Link>
              <Link to="/blood-banks" className="mobile-btn">Blood Bank</Link>
            </>
          )}

          {userType === "bloodbank" && (
            <Link to={profilePath} className="mobile-item">Profile</Link>
          )}

          {!userType && (
            <Link to="/blood-banks" className="mobile-btn">Blood Bank</Link>
          )}
        </div>
      )}

    </nav>
  );
}
