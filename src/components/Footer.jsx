import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer" aria-label="Site footer">
      <div className="container">
        <p>&copy; 2024 NCNews. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;