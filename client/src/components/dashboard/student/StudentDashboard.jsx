import React from "react";
import "./StudentDashboard.css";
import { StudentMenu } from "../../menu/student/StudentMenu";
import { CalendarComponent } from "../../calendar/Calendar";
import { CountdownToVacations } from "../../../dependenciesAndRequirements/CountdownToVacations";
import { FiSettings, FiBookOpen, FiClipboard } from "react-icons/fi";
import { Link } from "react-router-dom";

export function StudentDashboard() {
  const date = "2024-06-22";
  const daysUntil = CountdownToVacations(date);

  return (
    <>
      <div className="dashboard">
        <StudentMenu />
        <div className="dasboard-content">
          <h3>Witaj w panelu Ucznia</h3>

          <div className="first-container-elements">
            <div className="letf-first-container">
              <h3>
                Do wakacji pozostało:
                {daysUntil} dni
              </h3>
              <progress
                max={366}
                value={366 - daysUntil}
                className="admin-progress-vacation"
              >
                {daysUntil} dni
              </progress>
            </div>

            <div className="right-fist-container">
              <CalendarComponent />
            </div>
          </div>

          <div className="users-button-components">
            <Link to="/student-marks" className="admin-button-content">
              <div className="admin-content-buttons">
                <div className="admin-button-first">
                  <div className="admin-button-first-left">
                    <h4 className="admin-button-first-left-h4">Twoje oceny</h4>
                  </div>
                  <div className="admin-button-first-right">
                    <FiBookOpen className="admin-box-wide-icon admin-button-icons" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/student-topics" className="admin-button-content">
              <div className="admin-content-buttons">
                <div className="admin-button-first">
                  <div className="admin-button-first-left">
                    <h4 className="admin-button-first-left-h4">Tematy</h4>
                  </div>
                  <div className="admin-button-first-right">
                    <FiClipboard className="admin-box-wide-icon" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/student-settings" className="admin-button-content">
              <div className="admin-content-buttons">
                <div className="admin-button-first">
                  <div className="admin-button-first-left">
                    <h4 className="admin-button-first-left-h4">Ustawienia</h4>
                  </div>
                  <div className="admin-button-first-right">
                    <FiSettings className="admin-box-wide-icon" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
