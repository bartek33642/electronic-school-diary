import React, { useState } from "react";
import './AdminMarks.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export function AdminMarks(){
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };


      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
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
                        <td><input type="button" value="+" onClick={handleOpen} className="admin-marks-button"/>
                        
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                >
                                    <Box sx={{ ...style, width: 200 }}>
                                        <h2>Ocena</h2>
                                        Ocena: <input type="number" name="grade" id="grade" min="0.01" max="6.0"/><br />
                                        Typ: <input type="text" name='type'></input>
                                        Waga: <input type="number" name="weight" id="" />
                                        Komentarz: <input type="text" name="comment" id="" />
                                        
                                        <Button onClick={handleClose}>Zamknij</Button>
                                    </Box>
                            </Modal>
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
