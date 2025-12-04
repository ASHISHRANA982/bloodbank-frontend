import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3 className="footer-title">Kartavya</h3>
          <p>Your contribution can save a life. Join our mission today.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/community">Community</a>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <a href="/request-blood">Request Blood</a>
          <a href="/become-donor">Become Donor</a>
          <a href="/blood-banks">Blood Banks</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@kartavya.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kartavya — All Rights Reserved.</p>
      </div>
    </footer>
  );
}
