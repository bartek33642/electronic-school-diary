import React from "react";
import "./AdminMenu.css";
import { FiHome, FiUser, FiMap, FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiUserPlus, FiUserMinus, FiLayers, FiGrid, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
export function AdminMenu(){
  let imie = "Jan";
    return (
<div className="navbar">
  <nav className="nav-menu">
     <ul>
      <p className="welcomeText">Witaj, {imie}</p>
      <li> <FiHome className="Fi"/> <Link to='/role' className="LinkBtn"><span className="nav-item">Strona główna</span></Link></li>
      <li> <FiUser className="Fi" /><Link to='/users-admin' className="LinkBtn"> <span className="nav-item">Użytkownicy</span></Link></li>
      <li> <FiMap className="Fi" /><Link to='/school' className="LinkBtn"> <span className="nav-item">Szkoły</span></Link></li>
      <li> <FiGrid className="Fi" /><Link to='/classes' className="LinkBtn"> <span className="nav-item">Klasy</span></Link></li>
      <li> <FiBookOpen className="Fi" /><Link to='/grades' className="LinkBtn"> <span className="nav-item">Oceny</span></Link></li>
      <li> <FiCalendar className="Fi" /><Link to='/schedule' className="LinkBtn">  <span className="nav-item">Plan zajęć</span></Link></li>
      <li> <FiClipboard className="Fi" /><Link to='/topics' className="LinkBtn"> <span className="nav-item">Tematy</span></Link></li>
      <li> <FiUserPlus className="Fi" /><Link to='/attendance' className="LinkBtn"> <span className="nav-item">Frekwencja</span></Link></li>
      <li> <FiUserMinus className="Fi" /><Link to='/remarks' className="LinkBtn">  <span className="nav-item"> Uwagi </span></Link></li>
      <li> <FiLayers className="Fi" /><Link to='/subjects' className="LinkBtn"> <span className="nav-item"> Przedmioty</span></Link></li>
      <li> <FiCheckSquare className="Fi" /><Link to='/polls' className="LinkBtn"> <span className="nav-item"> Ankiety</span></Link></li>
      <li> <FiSettings className="Fi" /> <Link to='/settings' className="LinkBtn"><span className="nav-item"> Ustawienia</span></Link></li>
      <li className="twoMenuBtns"> <FiPower className="Fi" /><Link to='/' className="LinkBtn LinkBtn2">  <span className="nav-item"> Wyloguj</span></Link></li>
     </ul>
     </nav>
    </div>
    );
}
