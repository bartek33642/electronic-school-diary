import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";
import { FiHome, FiUser, FiMap, FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers, FiGrid, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";


export function AdminMenu(){
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
