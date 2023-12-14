import React from "react";
import './AdminPolls.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';
import { backendServer } from "../../../config";

export function AdminPolls() {
    return(
        <div className="admin-polls-container">
            <AdminMenu />
            <div className="admin-polls-elements">
                <h3>
                    Ankiety: 
                </h3>

                <div className="admin-polls-buttons">
                    <input type="button" value="Dodaj ankietę" />
                    <input type="button" value="Przeglądaj ankiety" />
                </div>

            </div>
        </div>
    );
}