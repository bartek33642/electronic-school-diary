import React from "react";
import './StudentDashboard.css';
import { StudentMenu } from "../../menu/student/StudentMenu";

export function StudentDashboard(){
    return(
        <>
        <div className="dashboard">
            <StudentMenu />
            <div className="dasboard-content">
                
                <h3>Witaj w panelu Ucznia</h3>
            </div>
        </div>
        </>
    );
}