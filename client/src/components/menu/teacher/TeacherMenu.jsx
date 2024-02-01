import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherMenu.css";
import {
  FiHome,
  FiBookOpen,
  FiCalendar,
  FiClipboard,
  FiSettings,
  FiPower,
  FiUserPlus,
  FiUserMinus,
  FiLayers,
  FiGrid,
  FiCheckSquare,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export function TeacherMenu() {
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
          <li className="menu-li">
            {" "}
            <FiHome className="Fi" />{" "}
            <Link to="/role" className="LinkBtn">
              <span className="nav-item">Strona główna</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiGrid className="Fi" />
            <Link to="/teacher-classes" className="LinkBtn">
              {" "}
              <span className="nav-item">Klasy</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiBookOpen className="Fi" />
            <Link to="/teacher-marks" className="LinkBtn">
              {" "}
              <span className="nav-item">Oceny</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiCalendar className="Fi" />
            <Link to="/teacher-timetable" className="LinkBtn">
              {" "}
              <span className="nav-item">Plan zajęć</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiClipboard className="Fi" />
            <Link to="/teacher-topics" className="LinkBtn">
              {" "}
              <span className="nav-item">Tematy</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiUserPlus className="Fi" />
            <Link to="/teacher-attendance" className="LinkBtn">
              {" "}
              <span className="nav-item">Frekwencja</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiUserMinus className="Fi" />
            <Link to="/teacher-remarks" className="LinkBtn">
              {" "}
              <span className="nav-item"> Uwagi </span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiLayers className="Fi" />
            <Link to="/teacher-subjects" className="LinkBtn">
              {" "}
              <span className="nav-item"> Przedmioty</span>
            </Link>
          </li>
          <li className="menu-li">
            {" "}
            <FiSettings className="Fi" />{" "}
            <Link to="/teacher-settings" className="LinkBtn">
              <span className="nav-item"> Ustawienia</span>
            </Link>
          </li>
          {/* <li className="menu-li twoMenuBtns"> <FiPower className="Fi" /><Link to='/' className="LinkBtn LinkBtn2">  <span className="nav-item"> Wyloguj</span></Link></li> */}
          <li className="menu-li twoMenuBtns">
            <FiPower className="Fi" />
            <Link
              to="/"
              className="LinkBtn LinkBtn2"
              onClick={(event) => {
                event.preventDefault();
                setLoggedOut(true);
              }}
            >
              <span className="nav-item">Wyloguj</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
