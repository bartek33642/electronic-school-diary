import React from "react";
import './PrincipalAttendance.css';
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";

export function PrincipalAttendance() {
    return (
        <div className="principal-attendance-container">
            <PrincipalMenu />
            <div className="principal-attendance-elements">
            <h2>Obecność</h2>
            </div>
        </div>
    );
}