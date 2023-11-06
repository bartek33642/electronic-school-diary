import React, {useState, useEffect} from "react";
import { AdminMenu } from "../menu/admin/AdminMenu";
import './Schools.css';
import { SchoolModal } from "./schoolModal/SchoolModal";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export function Schools(props) {


    const [open, setOpen] = useState(false);

    const [open8, setOpen8] = useState(false);

    const [schoolData, setSchoolsData] = useState([]); 

    useEffect(() => {
        if (open8) {
          fetch('/schools')
            .then(response => response.json())
            .then(data => {
              setSchoolsData(data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }, [open8]);

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const handleOpen8 = () => {
        setOpen8(true);
      };
      const handleClose8 = () => {
        setOpen8(false);
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


      const handleDeleteSchool = (schoolId) => {
        if (window.confirm('Czy na pewno chcesz usunąć tę szkołę?')) {
          // Wysyłamy żądanie DELETE do serwera
          console.log('Usuwanie szkoły o school_id:', schoolId);

          fetch(`http://localhost:3001/schools/${schoolId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.status === 204) {

                fetch('http://localhost:3001/schools')
                  .then(response => response.json())
                  .then(data => {
                    setSchoolsData(data);
                  })
                  .catch(error => {
                    console.error(error);
                  });
              } else {
                // Obsłuż błąd usuwania szkoły
                console.error('Błąd usuwania szkoły');
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      };
      
    return(
        <div className="schools-container">
            <AdminMenu />
            <div className="schools-elements">
                <h3>Szkoły</h3>
                <div className="buttons-schools">
                <input type="button" value="Dodaj szkołę" onClick={handleOpen}/>
                <SchoolModal open={open} handleClose={handleClose} />


                <input type="button" value="Przeglądaj szkoły" onClick={handleOpen8}/>
                <Modal
                open={open8}
                onClose={handleClose8}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }} className='modal-content'>
                <h2>Szkoły:</h2>

                <table>
                    <thead>
                    <tr>
                        <th className="schools-table-th">Nazwa szkoły</th>
                        <th className="schools-table-th">Miejscowość</th>
                        <th className="schools-table-th">Ulica</th>
                        <th className="schools-table-th">Nr budynku</th>
                        <th className="schools-table-th">Nr lokalu</th>
                        <th className="schools-table-th">Kod pocztowy</th>
                        <th className="schools-table-th"> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {schoolData.map((school) => (
                        <tr key={school.school_id}>
                            <td className="schools-table-td">{school.school_name}</td>
                            <td className="schools-table-td">{school.town}</td>
                            <td className="schools-table-td">{school.street}</td>
                            <td className="schools-table-td">{school.building_number}</td>
                            <td className="schools-table-td">{school.apartment_number}</td>
                            <td className="schools-table-td">{school.zip_code}</td>
                            <td className="schools-table-td">
                                <button type="button" value="">Edytuj</button>
                                <button type="button" value="" onClick={() => handleDeleteSchool(school.school_id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>

                <Button onClick={handleClose8}>Zamknij</Button>
                </Box>
                </Modal>

                </div>

            </div>
        </div>
    );
}