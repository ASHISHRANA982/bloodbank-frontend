import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./HeroSection.css";
import Footer from "./Footer";



export default function HeroSection() {
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Image fade + slide
      tl.from(".hero-lottie", {
        opacity: 0,
        y: 40,
        duration: 0.8,
      });

      // Heading
      tl.from(".eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // Big text
      tl.from(".big", {
        opacity: 0,
        y: 20,
        duration: 0.5,
      }, "-=0.3");

      // Paragraph
      tl.from(".hero-heading", {
        opacity: 0,
        y: 20,
        duration: 0.6,
      }, "-=0.3");

      // Buttons
      tl.from(".hero-ctas .cta", {
        opacity: 1,    // <--- ensures visible
        y: 15,
        duration: 0.5,
        stagger: 0.15,
      }, "-=0.2");

    }, rootRef);  // <-- FIXED (missing earlier)

    return () => ctx.revert();
  }, []);
  const handleRequestBlood = () => {
  const requestId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("requestId="))
    ?.split("=")[1];

  if (requestId) {
    navigate("/matched-donors");  // redirect to matched donors page
  } else {
    navigate("/request-blood");  // go to request blood form page
  }
};


  return (
    <section className="hero" ref={rootRef}>
      <div className="container hero-inner">

        {/* LEFT SIDE */}
        <div className="hero-left">

          {/* IMAGE */}
          <div className="hero-lottie">
            <img
              src="E:\ashis\FrontendToday\newFrontend\src\assets\hero-image.png"
              alt="Blood Donation"
              className="hero-img"
            />
          </div>

          <div className="hero-lottie-text">
            <p>Your one act of kindness can rewrite someone’s tomorrow.</p>
            <h3>“Save A Life Today”</h3>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">
          <h1 className="eyebrow">Blood Donation</h1>

          <p className="hero-heading">
            <span className="big">At kartavya</span>
            we believe every donor is a hero in someone’s story.
            <br />
            One unit of blood can give strength, comfort, and life to those fighting to survive.
            <br />
            Your decision to donate can rewrite a family’s tomorrow.
          </p>

          <div className="hero-ctas-cta">
            <div className="hero-ctas">
              <button onClick={handleRequestBlood} className="cta cta-red">
                Request Blood
              </button>
              <Link to="/become-donor" className="cta cta-orange">Become Donor</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
<Footer />
