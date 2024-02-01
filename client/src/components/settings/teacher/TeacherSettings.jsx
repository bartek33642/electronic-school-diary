import React, { useEffect, useState } from "react";
import "../admin/AdminSettings";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import packageJson from "../../../../package.json";
import { backendServer } from "../../../config";

export function TeacherSettings() {
  const [selectedTab, setSelectedTab] = useState("UserData");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState([]);
  const version = packageJson.version;
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditClick = () => {
    setEditMode(true);
    setFirstName(userData.length > 0 ? userData[0].first_name : "");
    setLastName(userData.length > 0 ? userData[0].second_name : "");
  };

  const handleSaveClick = async () => {
    try {
      const userId = userData.length > 0 ? userData[0].user_id : "";
      const response = await fetch(`${backendServer}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          second_name: lastName,
        }),
      });

      if (!response.ok) {
        setError("Błąd podczas zapisywania danych użytkownika.");
        return;
      }

      setEditMode(false);
      setUserData([
        { ...userData[0], first_name: firstName, second_name: lastName },
      ]);
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas zapisywania danych użytkownika.");
    }
  };

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
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();

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
              const settingsQuery = `${backendServer}/users/${userId}`;
              const settingsResult = await fetch(settingsQuery);
              const settingsData = await settingsResult.json();

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
      <TeacherMenu />
      <div className="settings-top">
        <button
          className={`tablink ${selectedTab === "UserData" ? "active" : ""}`}
          onClick={() => handleTabClick("UserData")}
        >
          Dane użytkownika
        </button>
        <button
          className={`tablink ${selectedTab === "About" ? "active" : ""}`}
          onClick={() => handleTabClick("About")}
        >
          O aplikacji
        </button>

        <div id="UserData" className="tabcontent">
          <h3>Dane użytkownika</h3>
          <p>Adres e-mail: {userData.length > 0 ? userData[0].email : ""}</p>
          {userData.length > 0 &&
            (userData[0].status === "student" ||
              userData[0].status === "parent") && (
              <p>
                Adres:{" "}
                {settings.length > 0 ? (
                  <>
                    {settings[0].street} {settings[0].building_number}
                    {settings[0].apartment_number &&
                      ` / ${settings[0].apartment_number} `}
                    {settings[0].town}
                  </>
                ) : (
                  ""
                )}
              </p>
            )}

          {editMode ? (
            <>
              <label>Imię:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <label>Nazwisko:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <button onClick={handleSaveClick}>Zapisz</button>
            </>
          ) : (
            <>
              <p>Imię: {userData.length > 0 ? userData[0].first_name : ""}</p>
              <p>
                Nazwisko: {userData.length > 0 ? userData[0].second_name : ""}
              </p>
              <button onClick={handleEditClick}>Edytuj</button>
            </>
          )}
        </div>

        <div id="About" className="tabcontent">
          <h3>O aplikacji</h3>
          <p>Aplikacja elektroniczny dziennik dla szkół.</p>
          <p>Wersja aplikacji: {version}</p>
        </div>
      </div>
    </div>
  );
}
