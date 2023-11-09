import React from "react";
import './AdminTimetable.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';

export function AdminTimetable() {
    return(
        <div className="admin-timetable-container">
            <AdminMenu />
            <div className="admin-timetable-elements">
                <h3>
                    Plan zajęć: 
                </h3>

                <div className="admin-timetable-buttons">
                    <input type="button" value="Dodaj plan zajęć" />
                    <input type="button" value="Przeglądaj plany zajęć" />
                </div>

            </div>
        </div>
    );
}