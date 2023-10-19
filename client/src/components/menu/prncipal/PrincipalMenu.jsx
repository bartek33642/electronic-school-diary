import React from "react";
import "./PrincipalMenu.css";
import { FiHome, FiUser, FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers, FiGrid, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

export function PrincipalMenu(){
  let imie = "Jan";
    return (
<div className="navbar">
  <nav className="nav-menu">
     <ul>
      <p className="welcomeText">Witaj, {imie}</p>
      <li> <FiHome className="Fi"/> <Link to='/role' className="LinkBtn"><span className="nav-item">Strona główna</span></Link></li>
      <li> <FiUser className="Fi" /><Link to='/usersPrincipal' className="LinkBtn"> <span className="nav-item">Użytkownicy</span></Link></li>
      <li> <FiGrid className="Fi" /><Link to='/classesPrincipal' className="LinkBtn"> <span className="nav-item">Klasy</span></Link></li>
      <li> <FiBookOpen className="Fi" /><Link to='/gradesPrincipal' className="LinkBtn"> <span className="nav-item">Oceny</span></Link></li>
      <li> <FiCalendar className="Fi" /><Link to='/schedulePrincipal' className="LinkBtn">  <span className="nav-item">Plan zajęć</span></Link></li>
      <li> <FiClipboard className="Fi" /><Link to='/topicsPrincipal' className="LinkBtn"> <span className="nav-item">Tematy</span></Link></li>
      <li> <FiUserPlus className="Fi" /><Link to='/attendancePrincipal' className="LinkBtn"> <span className="nav-item">Frekwencja</span></Link></li>
      <li> <FiUserMinus className="Fi" /><Link to='/remarksPrincipal' className="LinkBtn">  <span className="nav-item"> Uwagi </span></Link></li>
      <li> <FiLayers className="Fi" /><Link to='/subjectsPrincipal' className="LinkBtn"> <span className="nav-item"> Przedmioty</span></Link></li>
      <li> <FiCheckSquare className="Fi" /><Link to='/pollsPrincipal' className="LinkBtn"> <span className="nav-item"> Ankiety</span></Link></li>
      <li> <FiSettings className="Fi" /> <Link to='/settingsPrincipal' className="LinkBtn"><span className="nav-item"> Ustawienia</span></Link></li>
      <li className="twoMenuBtns"> <FiPower className="Fi" /><Link to='/' className="LinkBtn LinkBtn2">  <span className="nav-item"> Wyloguj</span></Link></li>
     </ul>
     </nav>
    </div>
    );
}
