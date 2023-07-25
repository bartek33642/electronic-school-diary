import React from "react";
import "./Menu.css";
import { FiHome, FiUser, FiBookOpen, FiCalendar, FiClipboard, FiSettings, FiPower, FiTrello, FiUserPlus, FiUserMinus, FiLayers, FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";
export function Menu(){
  let imie = "Zenon";
    return (
      
<div className="navbar">
     <ul>
      <p className="welcomeText">Witaj, {imie}</p>
      <Link to='/home' className="LinkBtn"><li><FiHome className="Fi"/> Strona główna</li></Link>
      <Link to='/users' className="LinkBtn"><li> <FiUser className="Fi" /> Użytkownicy</li></Link>
      <Link to='/classes' className="LinkBtn"><li> <FiGrid className="Fi" /> Klasy</li></Link>
      <Link to='/grades' className="LinkBtn"><li> <FiBookOpen className="Fi" /> Oceny</li></Link>
      <Link to='/schedule' className="LinkBtn"><li> <FiCalendar className="Fi" /> Plan zajęć</li></Link>
      <Link to='/topics' className="LinkBtn"><li> <FiClipboard className="Fi" /> Tematy</li></Link>
      <Link to='/attendance' className="LinkBtn"><li> <FiUserPlus className="Fi" /> Frekwencja</li></Link>
      <Link to='/remarks' className="LinkBtn"><li> <FiUserMinus className="Fi" /> Uwagi</li></Link>
      <Link to='/polls' className="LinkBtn"><li> <FiTrello className="Fi" /> Ankiety</li></Link>
      <Link to='/subjects' className="LinkBtn"><li> <FiLayers className="Fi" /> Przedmioty</li></Link>
      <Link to='/settings' className="LinkBtn"><li className="twoMenuBtns"><FiSettings className="Fi" /> Ustawienia</li></Link>
      <Link to='/' className="LinkBtn"><li className="twoMenuBtns"><FiPower className="Fi" /> Wyloguj</li></Link>
     </ul>
    </div>
    );
}
