import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import NavbarSection from "./components/NavbarSection/NavbarSection";

import Home from "./pages/homePages/Home";
import RequestBlood from "./pages/user/RequestBlood";
import BecomeDonor from "./pages/donor/BecomeDonor";
import Contact from "./pages/homePages/Contact";
import About from "./pages/homePages/About";
import NotFound from "./pages/NotFound";
import BloodBanks from "./pages/bloodbank/BloodBanks";
import Community from "./pages/homePages/Community";
import Auth from "./pages/Auth";
import MatchedDonors from "./pages/user/MatchedDonors";
import CheckStatus from "./pages/user/CheckStatus";
import SearchBlood from "./pages/homePages/SearchBlood";
import DonorLogin from "./pages/donor/DonorLogin";
import ForgetPassword from "./pages/donor/ForgetPassword";
import DonorProfile from "./pages/donor/DonorProfile";
import DonorStatus from "./pages/donor/DonorStatus";

import ProtectedRoute from "./pages/donor/ProtectedRoute";
import BloodBankLogin from "./pages/bloodbank/BloodbankLogin";
import BloodbankForgetPassword from "./pages/bloodbank/ForgetPassword";
import BloodbankLogout from "./pages/bloodbank/LogoutBloodbank";
import BloodbankProfile from "./pages/bloodbank/BloodbankProfile";
import BloodbankStatus from "./pages/bloodbank/BloodbankStatus";

export default function App() {
  return (
    <>
      <NavbarSection />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/donor-login"
          element={
            Cookies.get("donorToken") ? (
              <Navigate to="/donor-profile" replace />
            ) : (
              <DonorLogin />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/become-donor" element={<BecomeDonor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/community" element={<Community />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/matched-donors" element={<MatchedDonors />} />
        <Route path="/check-status" element={<CheckStatus />} />
        <Route path="/search-blood" element={<SearchBlood />} />

        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/donor-forget-password" element={<ForgetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/donor-profile"
          element={
            <ProtectedRoute>
              <DonorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor-status"
          element={
            <ProtectedRoute>
              <DonorStatus />
            </ProtectedRoute>
          }
        />

        <Route path="/blood-banks" element={<BloodBanks />} />
        <Route path="/bloodbank-login" element={<BloodBankLogin />} />
        <Route
          path="/bloodbank-forget-password"
          element={<BloodbankForgetPassword />}
        />
        <Route path="/bloodbank-logout" element={<BloodbankLogout />} />
        <Route path="/bloodbank-profile" element={<BloodbankProfile />} />
        <Route path="/bloodbank-status" element={<BloodbankStatus />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
