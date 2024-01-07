import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { backendServer } from "../../../config";

export function PrincipalClassModal(props) {
  const { open, handleClose, schoolData, updateClasses } = props;
  const [userData, setUserData] = useState([]);
  const [className, setClassName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("-");
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          console.log("userData: ", userData);

          if (result.ok) {
            setUserData(userData);

          } else {
            setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
          }

        }
      } catch (error) {
        console.error(error);
        setError("Wystąpił błąd podczas pobierania danych użytkownika.");
      }
    };

    fetchUserData();
  }, []);

  const handleSaveClass = (event) => {
    if (className === "") {
      return;
    }

    fetch(`${backendServer}/add-class`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        school_id: userData[0].school_id,
        class_name: className,
      }),
    })
      .then(response => {
        if (response.status === 201) {
          updateClasses(); 
          handleClose();
          setSnackbarSeverity("success");
          setSnackbarMessage("Szkoła dodana pomyślnie.");
          setSnackbarOpen(true);
          setClassName("");
          setSelectedSchool("-");
        } else {
          console.error('Błąd dodawania klasy');
          setSnackbarOpen(true);
          setSnackbarSeverity("error");
          setSnackbarMessage("Błąd podczas dodawania klasy.");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        id="2"
      >
        <Box sx={{ ...style }} className="modal-content">
          <h2 id="child-modal-title">Dodaj klasę </h2>
          <div className="class-modal-text">Nazwa klasy:</div>
          <div className="class-modal-inputs">
            <input
              type="text"
              name="nazwa klasy"
              id=""
              className="input-select-class-modal"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required />
          </div>

          <br />
          <input
            type="submit"
            value="Zapisz"
            className="class-modal-button-save"
            onClick={(e) => handleSaveClass(e)}
          />

          <br />
          <Button onClick={handleClose}>Zamknij</Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
