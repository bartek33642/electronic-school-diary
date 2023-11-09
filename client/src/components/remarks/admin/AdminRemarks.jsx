import React from "react";
import './AdminRemarks.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';

export function AdminRemarks() {
    return(
        <div className="admin-remarks-container">
            <AdminMenu />
            <div className="admin-remarks-elements">
                <h3>
                    Uwagi: 
                </h3>

                <div className="admin-remarks-buttons">
                    <input type="button" value="Dodaj uwagę" />
                    <input type="button" value="Przeglądaj uwagi" />
                </div>

            </div>
        </div>
    );
}