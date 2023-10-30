import React from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminClasses.css';

export function AdminClasses() {
    return(
        <div className="adminClasses-container">
            <AdminMenu />
            <div className="adminClasses-elements">
                <h3>Klasy</h3>
                <div className="buttons-adminClasses">
                <input type="button" value="Dodaj klasę" />
                <input type="button" value="Przeglądaj klasy" />
                </div>

            </div>
        </div>
    );
}