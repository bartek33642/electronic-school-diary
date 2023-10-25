import React, { useEffect, useState } from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminSettings.css';

export function AdminSettings() {
  const [selectedTab, setSelectedTab] = useState("Password");

  useEffect(() => {
    openPage(selectedTab);
  }, [selectedTab]);

  const openPage = (pageName) => {
    let i;
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(pageName).style.display = "block";
  };

  const handleTabClick = (pageName) => {
    setSelectedTab(pageName);
    openPage(pageName);
  };

  return (
    <div className="settings-container">
      <AdminMenu />
      <div className="settings-top">
        <button className={`tablink ${selectedTab === "Password" ? "active" : ""}`} onClick={() => handleTabClick('Password')}>
          Hasło
        </button>
        <button className={`tablink ${selectedTab === "UserData" ? "active" : ""}`} onClick={() => handleTabClick('UserData')}>
          Dane użytkownika
        </button>
        <button className={`tablink ${selectedTab === "About" ? "active" : ""}`} onClick={() => handleTabClick('About')}>
          O aplikacji
        </button>

        <div id="Password" className="tabcontent">
          <h3>Hasło</h3>
          Nowe hasło: * <input type="text" name="password" id="password" /> <br />
          Powtórz nowe hasło: * <input type="text" name="password" id="password" />

        </div>

        <div id="UserData" className="tabcontent">
          <h3>Dane użytkownika</h3>
          <p>Imię: </p>
          <p>Nazwisko: </p>
          <p>Dane kontaktowe: </p>
          <p>Adres e-mail: </p>
          <p>Numer telefonu: </p>
        </div>

        <div id="About" className="tabcontent">
          <h3>O aplikacji</h3>
          <p>Aplikacja elektroniczny dziennik dla szkoły</p>
          <p>Wersja aplikacji: 1.0.0.</p>
        </div>

      </div>
    </div>
  );
}
