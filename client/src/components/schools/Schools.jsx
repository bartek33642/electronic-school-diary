import React from "react";
import { AdminMenu } from "../menu/admin/AdminMenu";
import './Schools.css';

export function Schools() {
    return(
        <div className="schools-container">
            <AdminMenu />
            <div className="schools-elements">
                <h3>Szkoły</h3>
                <div className="buttons-schools">
                <input type="button" value="Dodaj szkołę" />
                
                <input type="button" value="Przeglądaj szkoły" />
                </div>

            </div>
        </div>
    );
}