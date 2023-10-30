import React from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminTopics.css';

export function AdminTopics(){
    return(
        <div className="admin-topics-container">
            <AdminMenu />
            <div className="admin-topics-elements">
                <h3>
                    Tematy:
                </h3>
                <div className="buttons-admin-topics">
                <input type="button" value="Sprawdź tematy" />
                <input type="button" value="Dodaj tematy" />
                </div>
            </div>
        </div>
    );
}