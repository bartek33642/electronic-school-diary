import React, {useState, useEffect} from "react";
import { AdminMenu } from "../menu/admin/AdminMenu";
import './Schools.css';
import { SchoolModal } from "./schoolModal/SchoolModal";
import { DataGrid } from '@mui/x-data-grid';

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

      const columns = [
        { field: 'schoolId', headerName: 'ID', width: 100 },
        { field: 'school_name', headerName: 'Nazwa szkoły', width: 130 },
        { field: 'town', headerName: 'Miejscowość', width: 130 },
        { field: 'street', headerName: 'Ulica', width: 130 },
        { field: 'building_number', headerName: 'Nr budynku', width: 130 },
        { field: 'apartment_number', headerName: 'Nr lokalu', width: 130 },
        { field: 'zip_code', headerName: 'Kod pocztowy ', width: 100 },
        { field: 'actions', headerName: ' - ', width: 180,
        renderCell: (params) => (
            <button
              type="button"
              onClick={() => handleDeleteSchool(params.row.schoolId)}
            >
              Usuń
            </button>
          ), },

      ];
    
      const rows = schoolData.map(school => ({
        schoolId: school.school_id,
        school_name: school.school_name,
        town: school.town,
        street: school.street,
        building_number: school.building_number,
        apartment_number: school.apartment_number,
        zip_code: school.zip_code,
        actions: (
            <button
              type="button"
              onClick={() => handleDeleteSchool(school.school_id)}
            >
              Usuń
            </button>),

      }));
      
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

              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.schoolId}
                  pageSize={8}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 7 },
                    },
                  }}
                  pageSizeOptions={[7, 10]}
                />
              </div>

                <Button onClick={handleClose8}>Zamknij</Button>
                </Box>
                </Modal>

                </div>

            </div>
        </div>
    );
}