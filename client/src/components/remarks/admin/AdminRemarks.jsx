import React, {useState, useEffect} from "react";
import './AdminRemarks.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';
import { AdminModalRemarks } from "./AdminModalRemarks/AdminModalRemarks";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function AdminRemarks() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '60%',
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    return(
        <div className="admin-remarks-container">
            <AdminMenu />
            <div className="admin-remarks-elements">
                <h3>
                    Uwagi: 
                </h3>

                <div className="admin-remarks-buttons">
                    {/* <input type="button" value="Dodaj uwagę" /> */}
                    <input type="button" value="Przeglądaj uwagi" onClick={handleOpen}/>
                    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }} className='modal-content'>
                <h2>Uwagi:</h2>

                <AdminModalRemarks />
                <Button onClick={handleClose}>Zamknij</Button>
                </Box>
                </Modal>
                        

                    <h3>Dodaj uwagę</h3>

                    <div className="admin-remarks-form">
                        Wybierz szkołę: 
                        <select name="" id="admin-remark-school">
                            <option value="admin-remark-school-option">Wybierz szkołę</option>
                            <option value="admin-remark-school-option">{}</option>
                        </select>

                        Wybierz klasę:
                        <select name="" id="admin-remark-class">
                            <option value="admin-remark-class-option">Wybierz klasę</option>
                            <option value="admin-remark-class-option">{}</option>
                        </select>
                        
                        Wybierz ucznia: 
                        <select name="" id="admin-remark-student">
                            <option value="admin-remark-student-option">Wybierz ucznia</option>
                            <option value="admin-remark-student-option">{}</option>
                        </select>

                        Wybierz nauczyciela: 
                        <select name="" id="admin-remark-teacher">
                            <option value="admin-remark-teacher-option">Wybierz ucznia</option>
                            <option value="admin-remark-teacher-option">{}</option>
                        </select>

                        Treść uwagi:
                        <textarea name="" id="" cols="30" rows="10"></textarea>

                        Czy pozytywna: 
                        <input type="checkbox" name="" id="" className="admin-remarks-checkbox"/>

                        <button type="button">Dodaj uwagę</button>
                    </div>

                </div>

            </div>
        </div>
    );
}