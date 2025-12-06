import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import "./RequestBlood.css";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Lottie from "lottie-react";
import successAnim from "../../animations/success.json";
import errorAnim from "../../animations/error.json";

export default function RequestBlood() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".rb-field", {
        autoAlpha: 0,
        y: 15,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    phone_no: "",
    blood_group: "",
    address: "",
    age: "",
    email: "",
    gender: "",
    current_location: "",
    blood_unit: 1,
    bloodType: "Whole Blood",
    date: "",
  });

  // UI STATES
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [popupError, setPopupError] = useState("");
  const [loading, setLoading] = useState(false);

  // INPUT HANDLER
  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPopupError("");
  };

  // VALIDATION
  const validate = () => {
    if (!form.name.trim()) return "Name required";
    if (!/^[6-9]\d{9}$/.test(String(form.phone_no || "")))
      return "Valid phone required";
    if (!form.gender) return "Gender required";
    if (!form.blood_group) return "Blood group required";
    if (!form.address.trim()) return "Address required";
    if (!form.current_location.trim()) return "Current location required";
    if (!form.email.trim()) return "Email required";
    if (!form.date) return "Date required";

    // const ageNum = Number(form.age);
    // if (isNaN(ageNum) || ageNum > 1 || ageNum < 90) return "Age must be 1–90";
    const ageNum = Number(form.age);

    if (!ageNum || ageNum < 1 || ageNum > 90) {
      return "Age must be between 1 and 90";
    }



    return null;
  };

  // SUBMIT FORM
  const submit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setPopupError(v);
      return;
    }

    setLoading(true);
    setPopupError("");

    const payload = {
      ...form,
      date: form.date ? form.date + " 00:00:00" : null,
    };

    try {
      const res = await api.post("/user/register", {
        ...payload,
        age: Number(payload.age),
        blood_unit: Number(payload.blood_unit),
      });

      const saved = res?.data;
      setResponseData(saved);

      const requestId = saved?.requestId;
      if (!requestId) {
        throw new Error("Backend did not return requestId");
      }

      Cookies.set("requestId", requestId, { expires: 7 });

      try {
        await api.post("/userProfile/requestForBlood", saved);
      } catch (err) {
        console.error("requestForBlood API failed:", err);
      }

      setPopupSuccess(true);

      // RESET FORM
      setForm({
        name: "",
        phone_no: "",
        blood_group: "",
        address: "",
        age: "",
        email: "",
        gender: "",
        current_location: "",
        blood_unit: 1,
        bloodType: "Whole Blood",
        date: "",
      });
    } catch (err) {
      const serverMsg =
        err?.response?.data &&
        (typeof err.response.data === "string"
          ? err.response.data
          : err.response.data.message || JSON.stringify(err.response.data));

      setPopupError(serverMsg || "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS OK BUTTON → redirect
  const closeSuccess = () => {
    setPopupSuccess(false);
    navigate("/matched-donors");
  };

  // ERROR OK BUTTON
  const closeError = () => {
    setPopupError("");
    const el = cardRef.current?.querySelector('input[name="name"]');
    if (el) el.focus();
  };


  return (
    <main className="content-offset requestblood-new framed-page">
      {/* Outer white framed box */}
      <div className="rb-outer-frame">
        <div className="rb-new-wrapper">
          <div className="rb-left-card">
            <div className="rb-left-img-wrap">
              <img src="/vivekananda.png" className="rb-left-img" />
            </div>

            <div className="rb-left-content">
              <h2>Swami Vivekananda</h2>
              <br></br>
              <blockquote>
                “Even in your weakest hour, know that strength surrounds you.
                Seeking help is not weakness — it is the first step toward
                rising again.” — Swami Vivekananda
              </blockquote>
            </div>
          </div>

          {/* RIGHT: smaller scrollable form container inside the framed white box */}
          <section className="rb-right-card">
            <div className="rb-form-inner">
              {/* FIXED HEADER */}
              <div className="rb-form-header">
                <h1 className="rb-new-title">Request Blood</h1>
              </div>

              {/* SCROLLABLE AREA */}
              <div className="rb-form-scroll" ref={cardRef}>
                <form className="rb-card" ref={cardRef} onSubmit={submit}>

                  {/* INLINE ERROR */}
                  {popupError && <p className="rb-alert error">{popupError}</p>}

                  {/* NAME */}
                  <div className="rb-field">
                    <label>Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* AGE + GENDER */}
                  <div className="rb-grid-2">
                    <div className="rb-field">
                      <label>Age</label>
                      <input
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handle}
                        placeholder="1 - 90"
                      />
                    </div>

                    <div className="rb-field">
                      <label>Gender</label>
                      <select name="gender" value={form.gender} onChange={handle}>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* PHONE + EMAIL */}
                  <div className="rb-grid-2">
                    <div className="rb-field">
                      <label>Phone No</label>
                      <input
                        name="phone_no"
                        value={form.phone_no}
                        onChange={handle}
                        placeholder="10 digit phone"
                        inputMode="numeric"
                      />
                    </div>

                    <div className="rb-field">
                      <label>Email</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handle}
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="rb-field">
                    <label>Address</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handle}
                      placeholder="area, dist, state"
                    />
                  </div>

                  {/* CURRENT LOCATION */}
                  <div className="rb-field">
                    <label>Current Location / Hospital</label>
                    <input
                      name="current_location"
                      value={form.current_location}
                      onChange={handle}
                      placeholder="Pincode, Hospital or current location"
                    />
                  </div>


                  {/* BLOOD GROUP + UNITS */}
                  <div className="rb-grid-2">
                    <div className="rb-field">
                      <label>Blood Group</label>
                      <select
                        name="blood_group"
                        value={form.blood_group}
                        onChange={handle}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>


                    <div className="rb-field">
                      <label>Units Needed</label>
                      <input
                        name="blood_unit"
                        type="number"
                        min="1"
                        value={form.blood_unit}
                        onChange={handle}
                      />
                    </div>
                  </div>

                  {/* BLOOD TYPE */}
                  <div className="rb-field">
                    <label>Blood Type</label>
                    <select name="bloodType" value={form.bloodType} onChange={handle}>
                      <option>Whole Blood</option>
                      <option>Plasma</option>
                      <option>Platelets</option>
                    </select>
                  </div>

                  {/* DATE */}
                  <div className="rb-field">
                    <label>Date</label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handle}
                    />
                  </div>

                  {/* SUBMIT */}
                  <div className="rb-submit-row">
                    <button
  className={`rb-submit rb-submit-medium ${loading ? "loading" : ""}`}
  type="submit"
  disabled={loading}
>
  {loading ? (
    <span className="rb-spinner">
      <span className="rb-dot" /><span className="rb-dot" /><span className="rb-dot" />
    </span>
  ) : (
    "Submit Request"
  )}
</button>

                  </div>
                </form>
              </div>
            </div>

            <p className="rb-below-text">
              We work to connect you with help as quickly as possible.
            </p>
          </section>
        </div >
      </div >

      {/* SUCCESS POPUP */}
      {
        popupSuccess && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-lottie">
                <Lottie animationData={successAnim} loop={false} />
              </div>

              <h2>✔ Request Submitted Successfully</h2>
              <p>Your blood request has been submitted.</p>

              <div className="popup-actions">
                <button className="popup-btn" onClick={closeSuccess}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* ERROR POPUP */}
      {
        popupError && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-lottie">
                <Lottie animationData={errorAnim} loop={true} />
              </div>

              <h2>✖ Submission Error</h2>
              <p>{popupError}</p>

              <div className="popup-actions">
                <button
                  className="popup-btn popup-btn-error"
                  onClick={closeError}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )
      }
    </main >
  );
}
