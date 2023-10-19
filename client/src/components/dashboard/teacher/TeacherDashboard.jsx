import React from "react";
import './TeacherDashboard.css';
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";

export function TeacherDashboard(){
    return(
        <>
        <div className="dashboard">
            <TeacherMenu />
            <div className="dasboard-content">
                
                <h3>Witaj w panelu Nauczyciela</h3>
            </div>
        </div>
        </>
    );
}