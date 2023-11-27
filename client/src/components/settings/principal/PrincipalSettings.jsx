import React, { useEffect, useState } from "react";
import '../admin/AdminSettings';
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";

export function PrincipalSettings() {
  const [selectedTab, setSelectedTab] = useState("UserData");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState([]);


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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          console.log("userData: ", userData);

          if (!result.ok) {
            setError("Błąd pobierania danych użytkownika.");
            return;
          }

          if (result.ok) {
            setUserData(userData);

            if (userData.length === 0) {
                setError("Błąd pobierania danych użytkownika: brak danych.");
                return;
              }

            if (userData.length > 0) {
              const userId = userData[0].user_id;
              const settingsQuery = `http://localhost:3001/users/${userId}`;
              const settingsResult = await fetch(settingsQuery);
              const settingsData = await settingsResult.json();
              console.log("settingsData: ", settingsData);

              if (!settingsResult.ok) {
                setError("Błąd pobierania danych z ustawień.");
                return;
              }

              if (settingsResult.ok) {
            
                setSettings(settingsData);
            } else {
                setError("Błąd pobierania danych z ustawień.");
            }
            

            } else {
              setError("Błąd pobierania danych użytkownika: brak danych.");
            }

        } else {
            setError("Błąd pobierania danych użytkownika.");
          }
        } else {
          setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
        }

      } catch (error) {
        console.error(error);
        setError("Wystąpił błąd podczas pobierania danych użytkownika.");
      }
    };
    
    fetchUserData();
}, []);

  return (
    <div className="settings-container">
      <PrincipalMenu />
      <div className="settings-top">
        <button className={`tablink ${selectedTab === "UserData" ? "active" : ""}`} onClick={() => handleTabClick('UserData')}>
          Dane użytkownika
        </button>
        <button className={`tablink ${selectedTab === "About" ? "active" : ""}`} onClick={() => handleTabClick('About')}>
          O aplikacji
        </button>

        <div id="UserData" className="tabcontent">
          <h3>Dane użytkownika</h3>
          <p>Imię: {userData.length > 0 ? userData[0].first_name : ''}</p>
          <p>Nazwisko: {userData.length > 0 ? userData[0].second_name : ''}</p>
          <p>Adres e-mail: {userData.length > 0 ? userData[0].email : ''}</p>
          <p>Numer telefonu: {settings.length > 0 ? settings[0].phone_number : ''}</p>
          {userData.length > 0 && (userData[0].status === 'student' || userData[0].status === 'parent') && (
    <p>
      Adres: {settings.length > 0 ? (
        <>
          {settings[0].street} {settings[0].building_number}
          {settings[0].apartment_number && ` / ${settings[0].apartment_number } `}  
          {settings[0].town}
        </>
      ) : ''}
    </p>
  )}        </div>

        <div id="About" className="tabcontent">
          <h3>O aplikacji</h3>
          <p>Aplikacja elektroniczny dziennik dla szkoły</p>
          <p>Wersja aplikacji: 1.0.0.</p>
        </div>

      </div>
    </div>
  );
}
