import React from "react";
import "../homepage/Home.css";
import { Footer } from "../footer/Footer";
import firstImage from "../../images/phone.png";

export function Home() {
  return (
    <div className="home-container">
      <div className="first-element">
        <div className="left-first-content">
          <img src={firstImage} alt="lesson" id="imageFirst" />
        </div>
        <div className="right-first-content">
          <h2 className="h2-home-first">E-DZIENNIK</h2>
          <p className="p-home-first">
            Aplikacja webowa elektroniczny dziennik dla szkoły
            <br />
            <a href="/login">
              <button id="btnLogin" onClick={() => window.location.reload()}>
                Zaloguj się
              </button>
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
