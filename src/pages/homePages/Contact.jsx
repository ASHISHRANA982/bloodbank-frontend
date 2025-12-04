import React, { useRef, useEffect, useState } from "react";
import "./Contact.css";
import { gsap } from "gsap";

export default function Contact() {
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", { opacity: 0, y: -20, duration: 0.6 });
      gsap.from(".contact-box", { opacity: 0, y: 25, duration: 0.7, delay: 0.1 });
      gsap.from(".contact-field", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.6,
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (form.name.trim() === "" || form.email.trim() === "" || form.message.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 1600);
  };

  return (
    <main className="content-offset contact-wrapper">
      <h2 className="contact-title">Get in Touch</h2>

      <div className="contact-container" ref={boxRef}>
        {/* Contact Form */}
        <form className="contact-box" onSubmit={submit}>
          <h3>Contact Us</h3>

          <div className="contact-field">
            <label>Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handle}
              placeholder="Enter your name"
            />
          </div>

          <div className="contact-field">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handle}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="contact-field">
            <label>Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handle}
              placeholder="Type your message..."
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Send Message
          </button>

          {submitted && (
            <p className="success-text">✔ Message Sent Successfully!</p>
          )}
        </form>
      </div>

      {/* Social Icons */}
      <div className="contact-social">
        <a href="#"><i className="ri-facebook-circle-fill"></i></a>
        <a href="#"><i className="ri-instagram-fill"></i></a>
        <a href="#"><i className="ri-twitter-x-fill"></i></a>
        <a href="#"><i className="ri-mail-fill"></i></a>
      </div>
    </main>
  );
}