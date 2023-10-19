import React from "react";
import './AdminUsers.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";

export function AdminUsers(){
    return(
        
        <div className="users-admin-container">
            <AdminMenu />

            
            <div className="admin-users-elements">
            <h2 className="admin-users-header">Użytkownicy</h2>

                <div className="admin-users-addButtons">
                    <input type="button" value="Dodaj szkołę / Edytuj szkołę" className="admin-users-btns" />
                    <input type="button" value="Dodaj klasę / Edytuj klasę" className="admin-users-btns" />
                    <input type="button" value="Dodaj użytkownika / Edytuj użytkownika" className="admin-users-btns" />


                </div>

                <div className="admin-users-selectUsers">
                <p className="users-title">Szkoła</p>
                    
                    <select name="" id="" className="users-selection">
                        <option value="-" selected disabled> </option>
                        <option value="1lo">1LO</option>
                        <option value="2lo">2LO</option>
                        <option value="zst">ZST</option>
                        <option value="zsme">ZSME</option>
                    </select>


                <p className="users-title">Klasa</p>
                    
                    <select name="" id="" className="users-selection">
                        <option value="-" selected disabled> </option>
                        <option value="4a">4a</option>
                        <option value="2a">2a</option>
                        <option value="1b">1b</option>
                        <option value="3c">3c</option>
                    </select>
                </div>
            </div>

        </div>
    );
}