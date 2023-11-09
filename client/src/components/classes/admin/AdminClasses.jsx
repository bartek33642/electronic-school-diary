import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminClasses.css';
import { ClassModal } from "../classesModal/ClassModal";

export function AdminClasses() {
    const [open1, setOpen1] = useState(false);
    const [schoolData, setSchoolData] = useState([]); // Stan na dane szkół

    useEffect(() => {
        // Tutaj wykonaj zapytanie HTTP GET na serwer, aby pobrać dane o szkołach
        fetch('/schools')
          .then(response => response.json())
          .then(data => {
            setSchoolData(data); // Ustaw dane w stanie
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    const handleOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    return (
        <div className="adminClasses-container">
            <AdminMenu />
            <div className="adminClasses-elements">
                <h3>Klasy</h3>
                <div className="buttons-adminClasses">
                    <input type="button" value="Dodaj klasę" onClick={handleOpen1} />
                    <ClassModal open1={open1} handleClose1={handleClose1} schoolData={schoolData} updateClasses={() => { }} />
                    <input type="button" value="Przeglądaj klasy" />
                </div>
            </div>
        </div>
    );
}
