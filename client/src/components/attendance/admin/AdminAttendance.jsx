import React from "react";
import './AdminAttendance.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import { backendServer } from "../../../config";

export function AdminAttendance() {
    return(
        <div className="admin-attendance-container">
            <AdminMenu />

            <div className="admin-attendance-elements">
                <h3>Frekewncja</h3>

                <div className="admin-attendance-buttons">
                    <input type="button" value="Dodaj frekwencję" />
                    <input type="button" value="Wyświetl frekwencję" />
                </div>
            </div>
        </div>
    );
}