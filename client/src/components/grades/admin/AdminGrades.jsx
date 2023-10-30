import React from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminGrades.css';

export function AdminGrades() {
    return(
        <div className="admin-grades-container">
            <AdminMenu />
            <div className="admin-grades-elements">
                <h3>
                    Oceny: 
                </h3>
                <div className="buttons-admin-grades">
                    <input type="button" value="Dodaj oceny" />
                    <input type="button" value="Sprawdź oceny" />
                </div>
            </div>
        </div>
    );
}