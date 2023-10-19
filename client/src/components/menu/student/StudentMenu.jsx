import React from "react";
import "./StudentMenu.css";
import { FiHome,  FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

export function StudentMenu(){
  let imie = "Julian";
    return (
<div className="navbar">
  <nav className="nav-menu">
     <ul>
      <p className="welcomeText">Witaj, {imie}</p>
      <li> <FiHome className="Fi"/> <Link to='/role' className="LinkBtn"><span className="nav-item">Strona główna</span></Link></li>
      <li> <FiBookOpen className="Fi" /><Link to='/gradesStudent' className="LinkBtn"> <span className="nav-item">Oceny</span></Link></li>
      <li> <FiCalendar className="Fi" /><Link to='/scheduleStudent' className="LinkBtn">  <span className="nav-item">Plan zajęć</span></Link></li>
      <li> <FiClipboard className="Fi" /><Link to='/topicsStudent' className="LinkBtn"> <span className="nav-item">Tematy</span></Link></li>
      <li> <FiUserPlus className="Fi" /><Link to='/attendanceStudent' className="LinkBtn"> <span className="nav-item">Frekwencja</span></Link></li>
      <li> <FiUserMinus className="Fi" /><Link to='/remarksStudent' className="LinkBtn">  <span className="nav-item"> Uwagi </span></Link></li>
      <li> <FiLayers className="Fi" /><Link to='/subjectsStudent' className="LinkBtn"> <span className="nav-item"> Przedmioty</span></Link></li>
      <li> <FiSettings className="Fi" /> <Link to='/settingsStudent' className="LinkBtn"><span className="nav-item"> Ustawienia</span></Link></li>
      <li className="twoMenuBtns"> <FiPower className="Fi" /><Link to='/' className="LinkBtn LinkBtn2">  <span className="nav-item"> Wyloguj</span></Link></li>
     </ul>
     </nav>
    </div>
    );
}
