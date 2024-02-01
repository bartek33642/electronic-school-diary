import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Role.css";
import { ajax } from "rxjs/ajax";
import { backendServer } from "../../config";

const mapStatusToPolish = (status) => {
  switch (status) {
    case 'admin':
      return 'Administrator';
    case 'principal':
      return 'Dyrektor';
    case 'teacher':
      return 'Nauczyciel';
    case 'parent':
      return 'Rodzic';
    case 'student':
      return 'Uczeń';
    default:
      return status;
  }
};

export function Role() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          if (result.ok) {
            const userDataPolish = userData.map(user => ({
              ...user,
              statusPolish: mapStatusToPolish(user.status),
            }));
            
            setUserData(userDataPolish);
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

  console.log("Dane do renderowania:", userData);

  return (
    <div className="role-container">
      {error && <div className="error-message">{error}</div>}

      {userData.map((user) => {
        const dynamicPath =
          user.status === 'parent'
            ? `${user.user_id}/${user.parent_id}`
            : user.status === 'student'
            ? `${user.user_id}/${user.student_id}`
            : user.status === 'principal'
            ? `${user.user_id}/${user.principal_id}`
            : user.status === 'teacher'
            ? `${user.user_id}/${user.teacher_id}`
            : '';

        return (
          <Link to={`/${user.status}/${dynamicPath}`} key={user.user_id}>
            <button className="btnBoxRole">
              <div className="boxRole">
                <span className="roleName">{user.statusPolish}</span>
                <span className="userName">{`${user.first_name} ${user.second_name}`}</span>
              </div>
            </button>
          </Link>
        );
      })}
    </div>
  );
}