import React from "react";
import './PrincipalDashboard.css';
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";

export function PrincipalDashboard(){
    return(
        <>
        <div className="dashboard">
            <PrincipalMenu />
            <div className="dasboard-content">
                
                <h3>Witaj w panelu Dyrektora</h3>
            </div>
        </div>
        </>
    );
}