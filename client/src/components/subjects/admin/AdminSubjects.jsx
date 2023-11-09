import React from "react";
import './AdminSubjects.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';

export function AdminSubjects() {
    return(
        <div className="admin-subjects-container">
            <AdminMenu />
            <div className="admin-subjects-elements">
                <h3>
                    Przedmioty: 
                </h3>

                <div className="admin-subjects-buttons">
                    <input type="button" value="Dodaj przedmioty" />
                    <input type="button" value="Przeglądaj przedmioty" />
                </div>

            </div>
        </div>
    );
}