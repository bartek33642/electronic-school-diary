import React from "react";
import "../footer/Footer.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="first-element-footer">
          <Link to="/" className="admin-footer-link">
            <p className="first-element-footer-p">Strona główna</p>
          </Link>
          <Link to="/contact" className="admin-footer-link">
            <p className="first-element-footer-p">Kontakt</p>
          </Link>
          <Link to="/privacy-policy" className="admin-footer-link">
            <p className="first-element-footer-p">Polityka prywatności</p>
          </Link>
        </div>

        <div className="second-element-footer">
          <p className="footer">copyright ©2023. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </>
  );
}
