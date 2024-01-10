// import React, { useState, useEffect } from "react";
// import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
// import './PrincipalUsers.css';
// import { DataGrid } from '@mui/x-data-grid';
// import { backendServer } from "../../../config";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";

// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";

// export function PrincipalUsers() {
//     const [userData, setUserData] = useState([]);
//     const [userPrincipalData, setUserPrincipalData] = useState([]);
//     const [error, setError] = useState(null);

//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
  
//     const [isModalOpen, setIsModalOpen] = useState(false);
  
//     const [open, setOpen] = useState(false);

//     const style = {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "60%",
//       bgcolor: "background.paper",
//       border: "2px solid #000",
//       boxShadow: 24,
//       pt: 2,
//       px: 4,
//       pb: 3,
//     };
  
//     useEffect(() => {
//       const fetchUserData = async () => {
//         try {
//           const userEmail = localStorage.getItem("userEmail");
  
//           if (userEmail) {
            
//             const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//             const result = await fetch(userQuery);
//             const userData = await result.json();
//             console.log("userData: ", userData);
  
//             if (result.ok) {
//               setUserData(userData);
  
//               if (userData.length > 0) {
//                 const schoolId = userData[0].school_id;
//                 const userPrincipalQuery = `${backendServer}/principal-users/${schoolId}`;
//                 const userPrincipalResult = await fetch(userPrincipalQuery);
//                 const userPrincipal = await userPrincipalResult.json();
//                 console.log("userPrincipal: ", userPrincipal);
//                 console.log("userPricncipalData ", userPrincipalData );
  
  
//                   if (userPrincipalResult.ok) {
//                     // Usuń duplikaty na podstawie subjectId
//                     const uniqueUserPrincipalIds = Array.from(new Set(userPrincipal.map(user => user.school_id)));
//                     const uniqueUserPrincipal = userPrincipal.filter(user => uniqueUserPrincipalIds.includes(user.school_id));
//                   setUserPrincipalData(uniqueUserPrincipal);
                  
//                   } else {
//                     setError("Błąd pobierania danych z danymi użytkowników - dla roli dyrektora.");
//                   }
  
//               } else {
//                 setError("Błąd pobierania danych użytkownika: brak danych.");
//               }
//             } else {
//               setError("Błąd pobierania danych użytkownika.");
//             }
//           } else {
//             setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
//           }
  
//         } catch (error) {
//           console.error(error);
//           setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//         }
//       };
  
//       fetchUserData();
//     }, []);

//     const getStatusName = (status) => {
//         switch (status) {
//           case 'principal':
//             return 'dyrektor';
//           case 'student':
//             return 'uczeń';
//           case 'teacher':
//             return 'nauczyciel';
//           case 'parent':
//             return 'rodzic';
//           case 'admin':
//             return 'administrator';
//           default:
//             return status;
//         }
//       };

//       const getIsActive = (active) => (active ? 'Tak' : 'Nie');


//     const columns = [
//     //   { field: 'userId', headerName: 'ID', width: 80 },
//       { field: 'email', headerName: 'E-mail', width: 190 },
//       { field: 'active', headerName: 'Aktywny', width: 90 },
//       { field: 'name', headerName: 'Imię i Nazwisko', width: 300 },
//       { field: 'status', headerName: 'Status', width: 150 },

//     ];
  
//     const rows = userPrincipalData.map(userPrincipal => ({
//         // userId: userPrincipal.user_id,
//         email: userPrincipal.email,
//         active: getIsActive(userPrincipal.active),
//         name: userPrincipal.first_name + ' ' + userPrincipal.second_name,
//         status: getStatusName(userPrincipal.status),
//       }));


//     return(
//         <div className="principal-users-container">
//             <PrincipalMenu />
//             <div className="principal-users-elements">
//                 <h2>Użytkownicy</h2>
//                 <div className="admin-users-addButtons">
//                 <input type="button" className="admin-users-btns" value="Dodaj nauczyciela" />
//                 <input type="button" className="admin-users-btns" value="Dodaj ucznia" />

//                 </div>
//                 <div>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             getRowId={(row) => row.name}
//             pageSize={8}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 7 },
//               },
//             }}
//             pageSizeOptions={[7, 10]}
//             // checkboxSelection
//           />
//         </div>


//         <Snackbar
//         open={successMessage !== ""}
//         autoHideDuration={6000}
//         onClose={() => setSuccessMessage("")}
//       >
//         <Alert
//           onClose={() => setSuccessMessage("")}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           Pomyślnie dodano użytkownika
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={errorMessage !== ""}
//         autoHideDuration={6000}
//         onClose={() => setErrorMessage("")}
//       >
//         <Alert
//           onClose={() => setErrorMessage("")}
//           severity="warning"
//           sx={{ width: "100%" }}
//         >
//           Użytkownik nie został dodany
//         </Alert>
//       </Snackbar>

//             </div>
//         </div>
//     );
// }


// PrincipalUsers.jsx
import React, { useState, useEffect } from "react";
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import './PrincipalUsers.css';
import { DataGrid } from '@mui/x-data-grid';
import { backendServer } from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { PrincipalTeacherAdd } from "./principal-users-add/PrincipalTeacherAdd";
import { PrincipalStudentAdd } from "./principal-users-add/PrincipalStudentAdd";
import './principal-users-add/PrincipalUsersAdd.css';

export function PrincipalUsers() {
  const [userData, setUserData] = useState([]);
  const [userPrincipalData, setUserPrincipalData] = useState([]);
  const [error, setError] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();

          if (result.ok) {
            setUserData(userData);

            if (userData.length > 0) {
              const schoolId = userData[0].school_id;
              const userPrincipalQuery = `${backendServer}/principal-users/${schoolId}`;
              const userPrincipalResult = await fetch(userPrincipalQuery);
              const userPrincipal = await userPrincipalResult.json();

              if (userPrincipalResult.ok) {
                const uniqueUserPrincipalIds = Array.from(new Set(userPrincipal.map(user => user.school_id)));
                const uniqueUserPrincipal = userPrincipal.filter(user => uniqueUserPrincipalIds.includes(user.school_id));
                setUserPrincipalData(uniqueUserPrincipal);
              } else {
                setError("Błąd pobierania danych z danymi użytkowników - dla roli dyrektora.");
              }
            } else {
              setError("Błąd pobierania danych użytkownika: brak danych.");
            }
          } else {
            setError("Błąd pobierania danych użytkownika.");
          }
        } else {
          setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
        }
      } catch (error) {
        console.error(error);
        setError("Wystąpił błąd podczas pobierania danych użytkownika.");
      }
    };

  useEffect(() => {
    fetchUserData();
  }, [userData])

  const columns = [
    { field: 'userId', headerName: 'ID', width: 60 },
    { field: 'email', headerName: 'E-mail', width: 190 },
    { field: 'active', headerName: 'Aktywny', width: 90 },
    { field: 'name', headerName: 'Imię i Nazwisko', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'action',
      headerName: ' - ',
      width: 60,
      renderCell: (params) => {
        // Użyj nawiasów klamrowych dla bloku if
        if (params.row.status === 'dyrektor') {
          return <div></div>;
        } else {
          // W przeciwnym razie zwróć przycisk usuwania
          return (
            <button
              type="button"
              onClick={() => handleDeleteUser(params.row.userId)}
            >
              Usuń
            </button>
          );
        }
      },
    },
  ];
  

  const getStatusName = (status) => {
    switch (status) {
      case 'principal':
        return 'dyrektor';
      case 'student':
        return 'uczeń';
      case 'teacher':
        return 'nauczyciel';
      case 'parent':
        return 'rodzic';
      case 'admin':
        return 'administrator';
      default:
        return status;
    }
  };

  const getIsActive = (active) => (active ? 'Tak' : 'Nie');



  const rows = userPrincipalData.map(userPrincipal => ({
    userId: userPrincipal.user_id,
    email: userPrincipal.email,
    active: getIsActive(userPrincipal.active),
    name: userPrincipal.first_name + ' ' + userPrincipal.second_name,
    status: getStatusName(userPrincipal.status),
  }));

  const handleOpenAddTeacherModal = () => {
    setIsTeacherModalOpen(true);
  };

  const handleCloseAddTeacherModal = () => {
    setIsTeacherModalOpen(false);
  };

  const handleOpenAddStudentModal = () => {
    setIsStudentModalOpen(true);
  };

  const handleCloseAddStudentModal = () => {
    setIsStudentModalOpen(false);
  };

  const handleAddTeacher = () => {
    // Dodaj kod obsługujący dodawanie nauczyciela
    // Pamiętaj o zamykaniu modala, aktualizacji danych itp.
    setIsTeacherModalOpen(false);
    setSuccessMessage('Nauczyciel zarejestrowany pomyślnie');
    setOpen(true);
  };

  const handleAddStudent = () => {
    setIsStudentModalOpen(false);
    setSuccessMessage("Uczeń zarejestrowany pomyślnie");
    setOpen(true);
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Czy na pewno chcesz usunąć użytkownika?')) {
      try {
        const response = await fetch(`${backendServer}/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.status === 204) {
          fetchUserData();
          setSuccessMessage("Usunięto użytkownika");
        } else {
          console.error('Błąd usuwania użytkownika');
          setErrorMessage("Błąd usuwania użytkownika");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  return (
    <div className="principal-users-container">
      <PrincipalMenu />
      <div className="principal-users-elements">
        <h2>Użytkownicy</h2>
        <div className="admin-users-addButtons">
          <button onClick={handleOpenAddTeacherModal} className="admin-users-btns">Dodaj nauczyciela</button>
          <button onClick={handleOpenAddStudentModal} className="admin-users-btns">Dodaj ucznia</button>
        </div>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.userId}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
          />
        </div>
        <Snackbar
          open={successMessage !== ""}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert
            onClose={() => setSuccessMessage("")}
            severity="success"
            sx={{ width: "100%" }}
          >
            Pomyślnie dodano użytkownika
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
        >
          <Alert
            onClose={() => setErrorMessage("")}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Użytkownik nie został dodany
          </Alert>
        </Snackbar>
        <Modal open={isTeacherModalOpen} onClose={handleCloseAddTeacherModal}>
  <Box sx={style}>
    <div className="modal-content">
      <PrincipalTeacherAdd onAddTeacher={handleAddTeacher} />
    </div>
  </Box>
</Modal>

<Modal open={isStudentModalOpen} onClose={handleCloseAddStudentModal} >
  <Box sx={style}>
    <div className="modal-content">
      <PrincipalStudentAdd onRegistrationResult={handleAddStudent} />
    </div>
  </Box>
</Modal>
      </div>
    </div>
  );
}
