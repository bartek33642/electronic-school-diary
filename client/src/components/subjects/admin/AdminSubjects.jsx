import React, { useState, useEffect } from "react";
import './AdminSubjects.css';
import { AdminMenu } from '../../menu/admin/AdminMenu';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function AdminSubjects() {
    const [open, setOpen] = useState(false);

    const [subjectData, setSubjectData] = useState([]); 
    // console.log(subjectData);

    const handleDeleteSubject = (subjectId) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten przedmiot?')) {
            // Wysyłamy żądanie DELETE do serwera
            console.log('Usuwanie przedmiotu o subject_id:', subjectId);
  
            fetch(`http://localhost:3001/subject/${subjectId}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (response.status === 204) {
  
                  fetch('http://localhost:3001/subjects')
                    .then(response => response.json())
                    .then(data => {
                      setSubjectData(data);
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
    

    useEffect(() => {
        fetch('/subjects-all')
            .then(response => response.json())
            .then(data => {
                setSubjectData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      

    return(
        <div className="admin-subjects-container">
            <AdminMenu />
            <div className="admin-subjects-elements">
                <h3>
                    Przedmioty: 
                </h3>

                <div className="admin-subjects-buttons">
                    <input type="button" value="Dodaj przedmioty" />
                    <input type="button" value="Przeglądaj przedmioty" onClick={handleOpen} />
                    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }} className='modal-content'>
                <h2>Przedmoty:</h2>

                <table>
                    <thead>
                    <tr>
                        <th className="schools-table-th">Nazwa przedmiotu</th>
                        <th className="schools-table-th">Nazwa szkoły</th>
                        <th className="schools-table-th">Nazwa klasy</th>
                        <th className="schools-table-th"> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjectData.map((subject) => (
                        <tr key={subject.subject_id}>
                            <td className="schools-table-td">{subject.subject_name}</td>
                            <td className="schools-table-td">{subject.school_name} {subject.town}</td>
                            <td className="schools-table-td">{subject.class_name}</td>
                            <td className="schools-table-td">
                                {/* <button type="button" value="">Edytuj</button> */}
                                <button type="button" value="" onClick={() => handleDeleteSubject(subject.subject_id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>

                <Button onClick={handleClose}>Zamknij</Button>
                </Box>
                </Modal>
                </div>

            </div>
        </div>
    );
}