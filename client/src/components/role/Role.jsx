import React from "react";
import "./Role.css";
import { Link } from "react-router-dom";

export function Role() {
    return(
        <div className="role-container">
            <Link to="/admin">
                <button className="btnBoxRole">
                <div className="boxRole">
                    <span className="roleName">
                        Administrator
                    </span>
                    <span className="userName">
                        Jan Kowalski
                    </span>
                </div>
                </button>
            </Link>

            <Link to="/student">
                <button className="btnBoxRole">
                <div className="boxRole">
                    <span className="roleName">
                        Uczeń
                    </span>
                    <span className="userName">
                        Julian Kowalski
                    </span>
                </div>
                </button>
            </Link>

            <Link to="/parent">
                <button className="btnBoxRole">
                <div className="boxRole">
                    <span className="roleName">
                        Rodzic
                    </span>
                    <span className="userName">
                        uczeń: Julian Kowalski
                    </span>
                </div>
                </button>
            </Link>

        </div>
    );
}