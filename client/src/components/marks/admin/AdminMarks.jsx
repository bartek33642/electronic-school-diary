import React from "react";
import './AdminMarks.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";

export function AdminMarks(){
    return(
        <>
        
        <div className="marks-container">
            <AdminMenu />
            
         
            <div className="admin-marks-elements">
                <h1 className="admin-header">Oceny</h1>
                    <p className="marks-title">Szkoła</p>
                
                    <select name="" id="" className="marks-selection">
                        <option value="-" selected disabled> </option>
                        <option value="1lo">1LO</option>
                        <option value="2lo">2LO</option>
                        <option value="zst">ZST</option>
                        <option value="zsme">ZSME</option>
                    </select>

                    <p className="marks-title">Klasa</p>
                
                    <select name="" id="" className="marks-selection">
                        <option value="-" selected disabled> </option>
                        <option value="4a">4a</option>
                        <option value="2a">2a</option>
                        <option value="1b">1b</option>
                        <option value="3c">3c</option>
                    </select>

                    <p className="marks-title">Uczeń</p>
                
                    <select name="" id="" className="marks-selection">
                        <option value="-" selected disabled> </option>
                        <option value="volvo">Jan Kowalski</option>
                        <option value="saab">Jakub Nowak</option>
                        <option value="mercedes">Zofia Nowacka</option>
                        <option value="audi">Iwona Kosiba</option>
                    </select>

                    <input type="button" value="Wyszukaj" className="admin-marks-saveBtn" id='admin-button-search' />


                    <table className="marks-table">
                    <tr >
                    <th className="header-table">
                        Przedmiot
                    </th>
                    <th className="header-table">
                        Oceny
                    </th>
                    <th className="header-table">
                        Średnia
                    </th>
                    <th className="header-table">
                        Średnia ważona
                    </th>
                    </tr>
                    <tr>
                        <td>Język polski</td>
                        <td>3+ </td>
                    </tr>

                    <tr>
                        <td>Matematyka</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Język angielski</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>W-F</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Przyroda</td>
                        <td>5</td>
                    </tr>

                </table>
                
                <input type="button" value="Zapisz" className='admin-marks-saveBtn' id='admin-button-save'/>
                </div>

        </div>
        </>
    );
}
