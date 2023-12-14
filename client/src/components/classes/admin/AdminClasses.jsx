// import React, { useState, useEffect } from "react";
// import { AdminMenu } from "../../menu/admin/AdminMenu";
// import './AdminClasses.css';
// import { ClassModal } from "../classesModal/ClassModal";

// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';

// import { DataGrid } from '@mui/x-data-grid';


// export function AdminClasses() {
//     const [open1, setOpen1] = useState(false);
//     const [schoolData, setSchoolData] = useState([]); // Stan na dane szkół
//     const [open2, setOpen2] = useState(false);
//     const [classData, setClassData] = useState([]);


//     useEffect(() => {
//         // Tutaj wykonaj zapytanie HTTP GET na serwer, aby pobrać dane o szkołach
//         fetch('/schools')
//           .then(response => response.json())
//           .then(data => {
//             setSchoolData(data); // Ustaw dane w stanie
//           })
//           .catch(error => {
//             console.error(error);
//           });
//     }, []);

//     useEffect(() => {
//         // Tutaj wykonaj zapytanie HTTP GET na serwer, aby pobrać dane o szkołach
//         fetch('/classes')
//           .then(response => response.json())
//           .then(data => {
//             setClassData(data); // Ustaw dane w stanie
//           })
//           .catch(error => {
//             console.error(error);
//           });
//     }, []);

//     const handleOpen1 = () => {
//         setOpen1(true);
//     };
//     const handleClose1 = () => {
//         setOpen1(false);
//     };

//     const handleOpen2 = () => {
//         setOpen2(true);
//     };
//     const handleClose2 = () => {
//         setOpen2(false);
//     };

//     const style = {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: '60%',
//         bgcolor: "background.paper",
//         border: "2px solid #000",
//         boxShadow: 24,
//         pt: 2,
//         px: 4,
//         pb: 3,
//       };

//       const handleUpdateClasses = () => {
//         // Tutaj wykonaj zapytanie HTTP GET na serwer, aby pobrać najnowsze dane o klasach
//         fetch('/classes')
//           .then(response => response.json())
//           .then(data => {
//             setClassData(data); // Ustaw najnowsze dane w stanie
//           })
//           .catch(error => {
//             console.error(error);
//           });
//       };

      
//       const handleDeleteClass = (classId) => {
//         if (window.confirm('Czy na pewno chcesz usunąć tę klasę?')) {
//           // Wysyłamy żądanie DELETE do serwera
//           console.log('Usuwanie szkoły o class_id:', classId);

//           fetch(`http://localhost:3001/classes/${classId}`, {
//             method: 'DELETE',
//           })
//             .then(response => {
//               if (response.status === 204) {

//                 fetch('http://localhost:3001/classes')
//                   .then(response => response.json())
//                   .then(data => {
//                     setClassData(data);
//                   })
//                   .catch(error => {
//                     console.error(error);
//                   });
//               } else {
//                 // Obsłuż błąd usuwania klasy
//                 console.error('Błąd usuwania klasy');
//               }
//             })
//             .catch(error => {
//               console.error(error);
//             });
//         }
//       };

//       const columns = [
//         { field: 'subjectId', headerName: 'ID', width: 100 },
//         { field: 'subject_name', headerName: 'Przedmiot', width: 180 },
//         { field: 'school_name', headerName: 'Nazwa szkoły', width: 220 },
//         { field: 'class_name', headerName: 'Nazwa klasy', width: 110 },
//         { field: 'actions', headerName: ' - ', width: 180,
//         renderCell: (params) => (
//             <button
//               type="button"
//               onClick={() => handleDeleteSubject(params.row.subjectId)}
//             >
//               Usuń
//             </button>
//           ), },
    
//       ];
    
//       const rows = subjectData.map(subject => ({
//         subjectId: subject.subject_id,
//         subject_name: subject.subject_name,
//         school_name: subject.school_name + ' ' + subject.town,
//         class_name: subject.class_name,
//         actions: (
//             <button
//               type="button"
//               onClick={() => handleDeleteSubject(subject.subject_id)}
//             >
//               Usuń
//             </button>),
    
//       }));

//     return (
//         <div className="adminClasses-container">
//             <AdminMenu />
//             <div className="adminClasses-elements">
//                 <h3>Klasy</h3>
//                 <div className="buttons-adminClasses">
//                     <input type="button" value="Dodaj klasę" onClick={handleOpen1} />
//                     <ClassModal open1={open1} handleClose1={handleClose1} schoolData={schoolData} updateClasses={handleUpdateClasses} />
//                     <input type="button" value="Przeglądaj klasy" onClick={handleOpen2} />
//                     <Modal
//                 open={open2}
//                 onClose={handleClose2}
//                 aria-labelledby="parent-modal-title"
//                 aria-describedby="parent-modal-description"
//             >
//                 <Box sx={{ ...style }} className='modal-content'>
//                 <h2>Klasy:</h2>

//                 <table>
//                     <thead>
//                     <tr>
//                         <th className="class-table-th">Nazwa szkoły</th>
//                         <th className="class-table-th">Miejscowość</th>
//                         <th className="class-table-th">Nazwa klasy</th>
//                         <th className="class-table-th"> </th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {classData.map((classes) => {
//                         const school = schoolData.find((school) => school.school_id === classes.school_id);
//                         if (school) {
//                         return (
//                             <tr key={classes.class_id}>
//                             <td className="class-table-td">{school.school_name}</td>
//                             <td className="class-table-td">{school.town}</td>
//                             <td className="class-table-td">{classes.class_name}</td>
//                             <td className="class-table-td">
//                                 {/* <button type="button" value="">Edytuj</button> */}
//                                 <button type="button" value="" onClick={() => handleDeleteClass(classes.class_id)}>Usuń</button>
//                             </td>
//                             </tr>
//                         );
//                         }
//                         return null;
//                     })}
//                     </tbody>
//                 </table>

//                 <Button onClick={handleClose2}>Zamknij</Button>
//                 </Box>
//                 </Modal>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import './AdminClasses.css';
import { ClassModal } from "../classesModal/ClassModal";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { backendServer } from "../../../config";

export function AdminClasses() {
    const [open1, setOpen1] = useState(false);
    const [schoolData, setSchoolData] = useState([]);
    const [open2, setOpen2] = useState(false);
    const [classData, setClassData] = useState([]);

    useEffect(() => {
        fetch(`${backendServer}/schools`)
          .then(response => response.json())
          .then(data => {
            setSchoolData(data);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    useEffect(() => {
        fetch(`${backendServer}/classes`)
          .then(response => response.json())
          .then(data => {
            setClassData(data);
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

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleUpdateClasses = () => {
        fetch(`${backendServer}/classes`)
          .then(response => response.json())
          .then(data => {
            setClassData(data);
          })
          .catch(error => {
            console.error(error);
          });
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

    const handleDeleteClass = (classId) => {
        if (window.confirm('Czy na pewno chcesz usunąć tę klasę?')) {
          fetch(`${backendServer}/classes/${classId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.status === 204) {
                fetch(`${backendServer}/classes`)
                  .then(response => response.json())
                  .then(data => {
                    setClassData(data);
                  })
                  .catch(error => {
                    console.error(error);
                  });
              } else {
                console.error('Błąd usuwania klasy');
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
    };

    const columns = [
        { field: 'class_id', headerName: 'ID', width: 100 },
        { field: 'class_name', headerName: 'Nazwa klasy', width: 220 },
        { field: 'school_name', headerName: 'Nazwa szkoły', width: 220 },
        { field: 'town', headerName: 'Miejscowość', width: 220 },
        {
            field: 'actions',
            headerName: ' - ',
            width: 150,
            renderCell: (params) => (
                <button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClass(params.row.class_id)}
                >
                    Usuń
                </button>
            ),
        },
    ];

    return (
        <div className="adminClasses-container">
            <AdminMenu />
            <div className="adminClasses-elements">
                <h3>Klasy</h3>
                <div className="buttons-adminClasses">
                    <input type="button" value="Dodaj klasę" onClick={handleOpen1} />
                    <ClassModal open1={open1} handleClose1={handleClose1} schoolData={schoolData} updateClasses={handleUpdateClasses} />
                    <input type="button" value="Przeglądaj klasy" onClick={handleOpen2} />
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style }} className='modal-content'>
                            <h2>Klasy:</h2>
                            <DataGrid
                                rows={classData}
                                columns={columns}
                                getRowId={(row) => row.class_id}
                                pageSize={8}
                                initialState={{
                                  pagination: {
                                    paginationModel: { page: 0, pageSize: 7 },
                                  },
                                }}
                                pageSizeOptions={[7, 10, 15]}

                            />
                            <Button onClick={handleClose2}>Zamknij</Button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

