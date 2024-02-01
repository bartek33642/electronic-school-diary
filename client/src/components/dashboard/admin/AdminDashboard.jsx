import React, { useState, useEffect } from "react";
import "./AdminDasboard.css";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import { CountdownToVacations } from "../../../dependenciesAndRequirements/CountdownToVacations";
import { FiSun, FiSettings, FiUsers, FiMap } from "react-icons/fi";
import { Link } from "react-router-dom";
import { backendServer } from "../../../config";

export function AdminDashboard() {
  const [userCount, setUserCount] = useState([]);
  const [schoolCount, setSchoolCount] = useState([]);
  const [pollCount, setPollCount] = useState([]);

  const date = "2024-06-22";
  const daysUntil = CountdownToVacations(date);

  useEffect(() => {
    fetch(`${backendServer}/users-count`)
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.userCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${backendServer}/schools-count`)
      .then((response) => response.json())
      .then((data) => {
        setSchoolCount(data.schoolCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${backendServer}/polls-count`)
      .then((response) => response.json())
      .then((data) => {
        setPollCount(data.pollCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="dashboard">
      <AdminMenu />
      <div className="dasboard-content">
        <h3>Witaj w panelu administratora</h3>
        <div className="admin-boxes">
          <div className="admin-box admin-box1">
            <div className="admin-box-header">
              <p className="p-admin-box-header">Ilość użytkowników</p>
            </div>
            <div className="admin-box-data">
              <p className="p-admin-box-data">{userCount}</p>
            </div>
          </div>

          <div className="admin-box admin-box2">
            <div className="admin-box-header">
              <p className="p-admin-box-header">Ilość szkół</p>
            </div>
            <div className="admin-box-data">
              <p className="p-admin-box-data">{schoolCount}</p>
            </div>
          </div>

          <div className="admin-box admin-box3">
            <div className="admin-box-header">
              <p className="p-admin-box-header">Ilość ankiet</p>
            </div>
            <div className="admin-box-data">
              <p className="p-admin-box-data">{pollCount}</p>
            </div>
          </div>
        </div>

        <div className="admin-box-wide">
          <div className="admin-box-wide-left">
            <FiSun className="admin-box-wide-icon" />
          </div>

          <div className="admin-box-wide-right">
            <p className="admin-box-wide-right-p">
              Do wakacji pozostało:
              {daysUntil} dni
            </p>
            <progress
              max={366}
              value={366 - daysUntil}
              className="admin-progress-vacation"
            >
              {daysUntil} dni
            </progress>
          </div>
        </div>

        <div className="admin-content-buttons-all">
          <Link to="/users-admin" className="admin-button-content">
            <div className="admin-content-buttons">
              <div className="admin-button-first">
                <div className="admin-button-first-left">
                  <h4 className="admin-button-first-left-h4">Użytkownicy</h4>
                </div>
                <div className="admin-button-first-right">
                  <FiUsers className="admin-box-wide-icon admin-button-icons" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/schools" className="admin-button-content">
            <div className="admin-content-buttons">
              <div className="admin-button-first">
                <div className="admin-button-first-left">
                  <h4 className="admin-button-first-left-h4">Szkoły</h4>
                </div>
                <div className="admin-button-first-right">
                  <FiMap className="admin-box-wide-icon" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/admin-settings" className="admin-button-content">
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
  );
}
