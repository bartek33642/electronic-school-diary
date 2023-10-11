import React from "react";
import './ParentDashboard.css';
import { ParentMenu } from "../../menu/parent/ParentMenu";

export function ParentDashboard(){
    return(
        <>
        <div className="dashboard">
            <ParentMenu />
            <div className="dasboard-content">
                
                <h3>Witaj w panelu Rodzica</h3>
            </div>
        </div>
        </>
    );
}