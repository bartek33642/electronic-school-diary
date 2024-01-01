import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentMenu.css";
import { FiHome,  FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

export function StudentMenu(){
  const [loggedOut, setLoggedOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      if (loggedOut) {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    }, [loggedOut, navigate]);

    return (
<div className="navbar">
  <nav className="nav-menu">
     <ul className="menu-ul">
      <p className="welcomeText">Witaj</p>
      <li className="menu-li"> <FiHome className="Fi"/> <Link to='/role' className="LinkBtn"><span className="nav-item">Strona główna</span></Link></li>
      <li className="menu-li"> <FiBookOpen className="Fi" /><Link to='/student-marks' className="LinkBtn"> <span className="nav-item">Oceny</span></Link></li>
      <li className="menu-li"> <FiCalendar className="Fi" /><Link to='/student-timetable' className="LinkBtn">  <span className="nav-item">Plan zajęć</span></Link></li>
      <li className="menu-li"> <FiClipboard className="Fi" /><Link to='/student-topics' className="LinkBtn"> <span className="nav-item">Tematy</span></Link></li>
      <li className="menu-li"> <FiUserPlus className="Fi" /><Link to='/student-attendance' className="LinkBtn"> <span className="nav-item">Frekwencja</span></Link></li>
      <li className="menu-li"> <FiUserMinus className="Fi" /><Link to='/student-remarks' className="LinkBtn">  <span className="nav-item"> Uwagi </span></Link></li>
      <li className="menu-li"> <FiLayers className="Fi" /><Link to='/student-subjects' className="LinkBtn"> <span className="nav-item"> Przedmioty</span></Link></li>
      <li className="menu-li"> <FiSettings className="Fi" /> <Link to='/student-settings' className="LinkBtn"><span className="nav-item"> Ustawienia</span></Link></li>
      <li className="menu-li twoMenuBtns">
        <FiPower className="Fi" />
        <Link to="/" className="LinkBtn LinkBtn2" onClick={(event) => {event.preventDefault(); setLoggedOut(true);}}>
            <span className="nav-item">Wyloguj</span>
        </Link>
      </li> 
      </ul>
     </nav>
    </div>
    );
}
