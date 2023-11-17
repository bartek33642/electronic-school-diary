import React, {useState, useEffect} from "react";
import './AdminUsers.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { RegisterAdmin } from "../../Register/RegisterAdmin";
import { RegisterPrincipal } from "../../Register/RegisterPrincipal";
import { RegisterTeacher } from "../../Register/RegisterTeacher";
import { RegisterParent } from "../../Register/RegisterParent";
import { RegisterStudent } from "../../Register/RegisterStudent";
import { UserModal } from "../userModal/UserModal";
import { SchoolModal } from "../../schools/schoolModal/SchoolModal";
import { ClassModal } from "../../classes/classesModal/ClassModal";


export function AdminUsers(){
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);

    const [userData, setUserData] = useState([]);
    const [schoolData, setSchoolData] = useState([]);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

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

    const handleOpen3 = () => {
      setOpen3(true);
    };
    const handleClose3 = () => {
      setOpen3(false);
    };

    const handleOpen4 = () => {
      setOpen4(true);
    };
    const handleClose4 = () => {
      setOpen4(false);
    };

    const handleOpen5 = () => {
      setOpen5(true);
    };
    const handleClose5 = () => {
      setOpen5(false);
    };

    const handleOpen6 = () => {
      setOpen6(true);
    };
    const handleClose6 = () => {
      setOpen6(false);
    };

    const handleOpen7 = () => {
      setOpen7(true);
    };
    const handleClose7 = () => {
      setOpen7(false);
    };

    const fetchData = () => {
      fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    useEffect(() => {
      if (open2) {
        // Wywołaj zapytanie HTTP GET na serwer, aby pobrać użytkowników
        fetch('/users')
          .then(response => response.json())
          .then(data => {
            // Zaktualizuj stan z danymi użytkowników
            setUserData(data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }, [open2]);

    useEffect(() => {
      if (open2) {
        fetchData();
      }
    }, [open2]);
    
    useEffect(() => {
      fetchData();
    }, []);




    useEffect(() => {
      fetch('/schools')
        .then(response => response.json())
        .then(data => {
          setSchoolData(data); 
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

    return (
      <div className="users-admin-container">
        <AdminMenu />

        <div className="admin-users-elements">
          <h2 className="admin-users-header">Użytkownicy</h2>

          <div className="admin-users-addButtons">
            <input
              type="button"
              value="Dodaj szkołę"
              className="admin-users-btns"
              onClick={handleOpen}
            />

           <SchoolModal open={open} handleClose={handleClose} />

            <input
              type="button"
              value="Dodaj klasę "
              className="admin-users-btns"
              onClick={handleOpen1}
            />
            
            <ClassModal open1={open1} handleClose1={handleClose1} schoolData={schoolData}/>

            <input
              type="button"
              value="Przeglądaj użytkowników"
              className="admin-users-btns"
              onClick={handleOpen2}
            />

          <UserModal open2={open2} handleClose2={handleClose2} userData={userData} fetchUserData={fetchData} />

          </div>

          <div className="users-admin-create-accounts">
            <button
              type="button"
              name="button-create-account-admin"
              className="create-accounts-admin-btn"
              onClick={handleOpen3}
            >
              Dodaj administratora
            </button>
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }} className='modal-content'>
                <h2 id="child-modal-title">Dodaj Administratora </h2>
                <RegisterAdmin />

                <Button onClick={handleClose3}>Zamknij</Button>
              </Box>
            </Modal>

            <button
              type="button"
              name="button-create-account-admin"
              className="create-accounts-admin-btn"
              onClick={handleOpen4}
            >
              Dodaj dyrektora
            </button>
            <Modal
              open={open4}
              onClose={handleClose4}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }} className='modal-content'>
                <h2 id="child-modal-title">Dodaj dyrektora </h2>
                <RegisterPrincipal />

                <Button onClick={handleClose4}>Zamknij</Button>
              </Box>
            </Modal>

            <button
              type="button"
              name="button-create-account-admin"
              className="create-accounts-admin-btn"
              onClick={handleOpen5}
            >
              Dodaj nauczyciela
            </button>
            <Modal
              open={open5}
              onClose={handleClose5}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }} className='modal-content'>
                <h2 id="child-modal-title">Dodaj nauczyciela </h2>
                <RegisterTeacher />

                <Button onClick={handleClose5}>Zamknij</Button>
              </Box>
            </Modal>

            <button
              type="button"
              name="button-create-account-admin"
              className="create-accounts-admin-btn"
              onClick={handleOpen6}
            >
              Dodaj rodzica
            </button>
            <Modal
              open={open6}
              onClose={handleClose6}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }} className='modal-content'>
                <h2 id="child-modal-title">Dodaj rodzica </h2>
                <RegisterParent />

                <Button onClick={handleClose6}>Zamknij</Button>
              </Box>
            </Modal>

            <button
              type="button"
              name="button-create-account-admin"
              className="create-accounts-admin-btn"
              onClick={handleOpen7}
            >
              Dodaj ucznia
            </button>
            <Modal
              open={open7}
              onClose={handleClose7}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }} className='modal-content'>
                <h2 id="child-modal-title">Dodaj ucznia </h2>
                <RegisterStudent />

                <Button onClick={handleClose7}>Zamknij</Button>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    );
}