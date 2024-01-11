import React from "react";
import './AdminPolls.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';
import { backendServer } from "../../../config";
import  PageUnderConstruction  from "../../../images/page_under_construction.png" 

export function AdminPolls() {
    return(
        <div className="admin-polls-container">
            <AdminMenu />
            <div className="admin-polls-elements">
                <h2>
                    Ankiety: 
                </h2>

                {/* <div className="admin-polls-buttons">
                    <input type="button" value="Dodaj ankietę" />
                    <input type="button" value="Przeglądaj ankiety" />
                </div> */}
                
                <div className="admin-polls-info">
                <p className="admin-polls-info-header">

                    <b>Ta funkcja nie jest jeszcze dostępna</b>

                </p>
                <p>Przepraszam za niedogodności, ta funkcja jest jeszcze w budowie. </p>
                <p>Proszę o cierpliwość i zapraszam do odwiedzenia tej karty ponownie wkrótce.</p> 
                <p>Dziękuję!</p>

                <img className="admin-polls-under-construcion" src={PageUnderConstruction} alt="page under construction" />

                </div>
            </div>
        </div>
    );
}