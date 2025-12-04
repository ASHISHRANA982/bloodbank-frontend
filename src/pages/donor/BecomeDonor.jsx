// src/pages/BecomeDonor.jsx
import React, { useState } from "react";
import api from "../../services/api";
import "./BecomeDonor.css";

export default function BecomeDonor() {
  const [form, setForm] = useState({
    name: "",
    phone_no: "",
    aadharNo: "",
    bloodGroup: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    lastDonateDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setServerMessage(null);
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone_no))
      return "Phone number must be a valid 10-digit Indian number (starts 6-9)";
    if (!/^[2-9][0-9]{11}$/.test(form.aadharNo))
      return "Aadhar number must be a valid 12-digit number (no leading 0/1)";
    if (!/^(A|B|AB|O)[+-]$/.test(form.bloodGroup))
      return "Invalid blood group (use A+, A-, B+, B-, AB+, AB-, O+, O-)";
    if (!form.address.trim()) return "Address is required";
    if (!form.dateOfBirth) return "Date of birth is required";
    if (!/^(Male|Female|Other)$/.test(form.gender))
      return "Select valid gender";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "Valid email is required";
    if (!form.lastDonateDate) return "Last donate date is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(null);

    const err = validateForm();
    if (err) {
      setServerMessage(err);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone_no: form.phone_no.trim(),
      aadharNo: form.aadharNo.trim(),
      bloodGroup: form.bloodGroup.trim(),
      address: form.address.trim(),
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      email: form.email.trim(),
      lastDonateDate: form.lastDonateDate,
    };

    try {
      setLoading(true);
      const res = await api.post("/donor/register", payload);
      setServerMessage("Registration Successful!");
      setForm({
        name: "",
        phone_no: "",
        aadharNo: "",
        bloodGroup: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        lastDonateDate: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        const msg =
          typeof data === "string"
            ? data
            : data.message || JSON.stringify(data);
        setServerMessage("Registration Failed: " + msg);
      } else {
        setServerMessage("Registration Failed! Server not reachable.");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="become-wrapper">
      <div className="become-frame">
        <div className="become-flex">

          {/* LEFT SIDE PROFESSIONAL DONOR RESPONSIBILITY TEXT */}
          <aside className="become-left">
            <h2 className="left-title">Why Becoming a Donor Matters</h2>

            <p className="left-quote">
              “Your one donation can save up to three lives.
              Becoming a donor is not just an act of giving — 
              it is a commitment to humanity.”
            </p>

            <div className="left-points">
              <p>✔ A single healthy donor can save <strong>3 lives</strong></p>
              <p>✔ You help accident & emergency patients</p>
              <p>✔ Supports surgeries & cancer treatments</p>
              <p>✔ Builds a safer community for everyone</p>
              <p>✔ Inspires others to save lives too</p>
            </div>

            <p className="left-footer">— Donate with kindness and pride.</p>
          </aside>

          {/* RIGHT SIDE FORM */}
          <section className="become-right">

            {/* FIXED HEADER */}
            <div className="form-header">
              <h2 className="donor-title">Donor Registration</h2>
            </div>

            {/* SCROLLABLE FORM */}
            <div className="form-scroll">
              {serverMessage && (
                <div
                  className={
                    serverMessage.startsWith("Registration Successful")
                      ? "donor-success"
                      : "donor-error"
                  }
                >
                  {serverMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="donor-form">

                <div className="row">
                  <label>Name :</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name..."
                  />
                </div>

                <div className="row two">
                  <div>
                    <label>DOB :</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Gender :</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <label>Address :</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="area,dist,state"
                  />
                </div>

                <div className="row two">
                  <div>
                    <label>Phone :</label>
                    <input
                      type="text"
                      name="phone_no"
                      value={form.phone_no}
                      onChange={handleChange}
                      placeholder="+91 xxxxx-xxxxx"
                    />
                  </div>

                  <div>
                    <label>Email :</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div className="row">
                  <label>Aadhar Number :</label>
                  <input
                    type="text"
                    name="aadharNo"
                    value={form.aadharNo}
                    onChange={handleChange}
                    placeholder="xxxx-xxxx-xxxx"
                  />
                </div>

                <div className="row two">
                  <div>
                    <label>Blood Group :</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}
                      placeholder="ex: A+"
                    />
                  </div>

                  <div>
                    <label>Last Donate Date :</label>
                    <input
                      type="date"
                      name="lastDonateDate"
                      value={form.lastDonateDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  className="donor-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>

                <div className="login-link">
                  <span>Already have an account? </span>
                  <a href="/donor-login">Login here</a>
                </div>

              </form>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
