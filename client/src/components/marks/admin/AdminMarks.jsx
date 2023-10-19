import React, { useState } from "react";
import './AdminMarks.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import ModalWindow from "../../modalWindow/ModalWindow";

export function AdminMarks(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        console.log(isModalOpen);
    };

    return(
        <>
        
        <div className="marks-container">
            <AdminMenu />
            
         
            <div className="admin-marks-elements">
                <h2 className="admin-marks-header">Oceny</h2>
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
                        <td><input type="button" value="+" onClick={openModal} className="admin-marks-button"/>
                        <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
                            <h2>Wpisz ocenę</h2>
                        </ModalWindow>
                        </td>
                    </tr>

                    <tr>
                        <td>Matematyka</td>
                        <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
                    </tr>
                    <tr>
                        <td>Język angielski</td>
                        <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
                    </tr>
                    <tr>
                        <td>W-F</td>
                        <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
                    </tr>
                    <tr>
                        <td>Przyroda</td>
                        <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
                    </tr>

                </table>
                
                <input type="button" value="Zapisz" className='admin-marks-saveBtn' id='admin-button-save'/>
                </div>

        </div>
        </>
    );
}
