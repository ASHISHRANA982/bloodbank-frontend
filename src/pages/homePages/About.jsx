import React, { useEffect, useRef } from "react";
import "./About.css";
import { gsap } from "gsap";

export default function About() {
  const rootRef = useRef();

 useEffect(() => {
  const timeout = setTimeout(() => {
    gsap.from(".ab-animate", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, 150); // delay to allow text + fonts to render

  return () => clearTimeout(timeout);
}, []);



  return (
    <main className="ab-container" ref={rootRef}>
      {/* HERO SECTION */}
      <section className="ab-hero">
        <h1 className="ab-title ab-animate">About Kartavya</h1>
        <p className="ab-subtitle ab-animate">
          A small act of kindness today can save a precious life tomorrow.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section className="ab-section ab-animate">
        <h2 className="ab-heading">Our Mission</h2>
        <p className="ab-text">
          Kartavya is built with a powerful purpose — to create a seamless bridge
          between those in urgent need of blood and the heroes willing to donate.
          We aim to save lives by providing fast, reliable, and transparent blood
          support across communities.
        </p>
      </section>

      {/* WHY DONATE SECTION */}
      <section className="ab-section ab-cards">
        <h2 className="ab-heading ab-animate">Why Donate Blood?</h2>
        <p>Donating blood is one of the simplest and most powerful ways to save a life.
Every drop you give becomes hope for someone fighting an illness, recovering from an accident, or waiting for a lifesaving surgery. Many people will never meet the person who saved them — but your single act of kindness can be the reason someone gets a second chance. Blood cannot be made in laboratories; it can only come from generous donors. When you donate, you do not just give blood — you give strength, time, and love to someone’s family. Your small step today can create a lifetime of happiness for someone else.
</p>
        <div className="ab-card-grid">
          <div className="ab-card ab-animate">
            <h3>Save Lives</h3>
            <p>Your one donation can help up to **three** people in need.</p>
          </div>

          <div className="ab-card ab-animate">
            <h3>Be Someone’s Hero</h3>
            <p>A simple act can bring hope to families during tough times.</p>
          </div>

          <div className="ab-card ab-animate">
            <h3>Improve Community</h3>
            <p>Strong blood support builds a healthier and safer society.</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="ab-stats-section ab-animate">
        <div className="ab-stats-card">
          <h2 className="ab-stat-number">1000+</h2>
          <p className="ab-stat-label">Lives Impacted</p>
        </div>

        <div className="ab-stats-card">
          <h2 className="ab-stat-number">500+</h2>
          <p className="ab-stat-label">Active Donors</p>
        </div>

        <div className="ab-stats-card">
          <h2 className="ab-stat-number">200+</h2>
          <p className="ab-stat-label">Blood Banks Connected</p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="ab-final-section ab-animate">
        <h2>Join the Mission</h2>
        <p>
          You can save lives today—donate blood or help someone in need.  
          Be a part of Kartavya’s life-changing movement.
        </p>

        <a href="/become-donor" className="ab-btn">
          Become a Donor
        </a>
      </section>
    </main>
  );
}
