import React, { useState, useEffect } from "react";
import "./AdminMenu.css";
import { FiHome, FiUser, FiMap, FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers, FiGrid, FiCheckSquare } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function AdminMenu(){
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userEmail = localStorage.getItem("userEmail");
    
            if (userEmail) {
              const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
              const result = await fetch(userQuery);
              const userData = await result.json();
              console.log("userData: ", userData);
              if (result.ok) {
                setUserData(userData);
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

    // const handleLogout = async () => {
    //     try {
    //       let decodedToken = '';
    //       const token = localStorage.getItem('token'); // Fix: use getItem instead of setItem
      
    //       if (token) {
    //         decodedToken = jwtDecode(token);
    //         setUserData(decodedToken);
    //         console.log("Zdekodowany token", decodedToken);
    //       }
    //       console.log("Token", token);
      
    //       const user_id = decodedToken.user_id;
    //       console.log("user_id", user_id);
      
    //       if (user_id) {
    //         const tokenQuery = `http://localhost:3001/logout/${user_id}`;
    //         const result = await fetch(tokenQuery, {
    //             method: 'DELETE',
    //           });            
    //         console.log("result: ", result);
    //         if (result.status === 202) {
    //           console.log('Logout successful');
    //           localStorage.removeItem('token');
    //           Navigate('/');
    //         } else {
    //           console.error('Logout failed', error);
    //         }
    //       } else {
    //         console.error('User_id not found');
    //       }
    //     } catch (error) {
    //       console.error("Error: ", error);
    //     }
    //   }


    const handleLogout = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Token not found');
            return;
          }
      
          const decodedToken = jwtDecode(token);
          const user_id = decodedToken.user_id;

          const tokenQuery = `http://localhost:3001/logout/${user_id}`;
          const result = await fetch(tokenQuery, {
            method: 'DELETE',
          });
      
          if (result.status === 202) {
            console.log('Logout successful');
            localStorage.removeItem('token');
            Navigate('/');
          } else {
            console.error('Logout failed', error);
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      }
      
      

    return (
<div className="navbar">
  <nav className="nav-menu">
     <ul className="menu-ul">
      <p className="welcomeText">Witaj </p>
      <li className="menu-li"> <FiHome className="Fi"/> <Link to='/role' className="LinkBtn"><span className="nav-item">Strona główna</span></Link></li>
      <li className="menu-li"> <FiUser className="Fi" /><Link to='/users-admin' className="LinkBtn"> <span className="nav-item">Użytkownicy</span></Link></li>
      <li className="menu-li"> <FiMap className="Fi" /><Link to='/schools' className="LinkBtn"> <span className="nav-item">Szkoły</span></Link></li>
      <li className="menu-li"> <FiGrid className="Fi" /><Link to='/admin-classes' className="LinkBtn"> <span className="nav-item">Klasy</span></Link></li>
      <li className="menu-li"> <FiBookOpen className="Fi" /><Link to='/admin-grades' className="LinkBtn"> <span className="nav-item">Oceny</span></Link></li>
      <li className="menu-li"> <FiCalendar className="Fi" /><Link to='/admin-timetable' className="LinkBtn">  <span className="nav-item">Plan zajęć</span></Link></li>
      <li className="menu-li"> <FiClipboard className="Fi" /><Link to='/admin-topics' className="LinkBtn"> <span className="nav-item">Tematy</span></Link></li>
      <li className="menu-li"> <FiUserPlus className="Fi" /><Link to='/admin-attendance' className="LinkBtn"> <span className="nav-item">Frekwencja</span></Link></li>
      <li className="menu-li"> <FiUserMinus className="Fi" /><Link to='/admin-remarks' className="LinkBtn">  <span className="nav-item"> Uwagi </span></Link></li>
      <li className="menu-li"> <FiLayers className="Fi" /><Link to='/admin-subjects' className="LinkBtn"> <span className="nav-item"> Przedmioty</span></Link></li>
      <li className="menu-li"> <FiCheckSquare className="Fi" /><Link to='/admin-polls' className="LinkBtn"> <span className="nav-item"> Ankiety</span></Link></li>
      <li className="menu-li"> <FiSettings className="Fi" /> <Link to='/admin-settings' className="LinkBtn"><span className="nav-item"> Ustawienia</span></Link></li>
      <li className="menu-li twoMenuBtns"> <FiPower className="Fi" /><Link to="/" className="LinkBtn LinkBtn2" onClick={handleLogout}>  <span className="nav-item"> Wyloguj</span></Link></li>
     </ul>
     </nav>
    </div>
    );
}
