import React from "react";
import './StudentDashboard.css';
import { StudentMenu } from "../../menu/student/StudentMenu";
import { CalendarComponent } from "../../calendar/Calendar";
import { CountdownToVacations } from "../../../dependenciesAndRequirements/CountdownToVacations";


export function StudentDashboard(){

    const date = '2024-06-22';
    const daysUntil = CountdownToVacations(date);

    return(
        <>
        <div className="dashboard">
            <StudentMenu />
            <div className="dasboard-content">
                
                <h3>Witaj w panelu Ucznia</h3>


                <div className="first-container-elements">
                    <div className="letf-first-container">
                    <h3>Do wakacji pozostało: 
                         {daysUntil} dni</h3>
                         <progress max={366} value={366-daysUntil} className="admin-progress-vacation">{daysUntil} dni</progress>
                    </div>

                    <div className="right-fist-container">
                        <CalendarComponent />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}