import React from "react";
import "./PrincipalMenu.css";
import { FiHome, FiUser, FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers, FiGrid, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

export function PrincipalMenu(){
  let imie = "Jan";
    return (
<div className="navbar">
  <nav className="nav-menu">
     <ul className="menu-ul">
      <p className="welcomeText">Witaj, {imie}</p>
      <li className="menu-li"> <FiHome className="Fi"/> <Link to='/role' className="LinkBtn"><span className="nav-item">Strona główna</span></Link></li>
      <li className="menu-li"> <FiUser className="Fi" /><Link to='/principal-users' className="LinkBtn"> <span className="nav-item">Użytkownicy</span></Link></li>
      <li className="menu-li"> <FiGrid className="Fi" /><Link to='/principal-classes' className="LinkBtn"> <span className="nav-item">Klasy</span></Link></li>
      <li className="menu-li"> <FiBookOpen className="Fi" /><Link to='/principal-grades' className="LinkBtn"> <span className="nav-item">Oceny</span></Link></li>
      <li className="menu-li"> <FiCalendar className="Fi" /><Link to='/principal-schedule' className="LinkBtn">  <span className="nav-item">Plan zajęć</span></Link></li>
      <li className="menu-li"> <FiClipboard className="Fi" /><Link to='/principal-topics' className="LinkBtn"> <span className="nav-item">Tematy</span></Link></li>
      <li className="menu-li"> <FiUserPlus className="Fi" /><Link to='/principal-attendance' className="LinkBtn"> <span className="nav-item">Frekwencja</span></Link></li>
      <li className="menu-li"> <FiUserMinus className="Fi" /><Link to='/principal-remarks' className="LinkBtn">  <span className="nav-item"> Uwagi </span></Link></li>
      <li className="menu-li"> <FiLayers className="Fi" /><Link to='/principal-subjects' className="LinkBtn"> <span className="nav-item"> Przedmioty</span></Link></li>
      <li className="menu-li"> <FiCheckSquare className="Fi" /><Link to='/principal-polls' className="LinkBtn"> <span className="nav-item"> Ankiety</span></Link></li>
      <li className="menu-li"> <FiSettings className="Fi" /> <Link to='/principal-settings' className="LinkBtn"><span className="nav-item"> Ustawienia</span></Link></li>
      <li className="menu-li twoMenuBtns"> <FiPower className="Fi" /><Link to='/' className="LinkBtn LinkBtn2">  <span className="nav-item"> Wyloguj</span></Link></li>
     </ul>
     </nav>
    </div>
    );
}
