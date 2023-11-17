import React, { useState }  from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './SchoolModal.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function SchoolModal(props){
    const { open, handleClose  } = props;
  
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

    const [newSchoolData, setNewSchoolData] = useState({
      school_name: "",
      town: "",
      street: "",
      building_number: "",
      apartment_number: "",
      zip_code: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleAddSchool = () => {
      // Wysyłanie żądania POST do serwera
      fetch("/add-school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchoolData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Przetwarzaj odpowiedź od serwera, np. wyświetl komunikat
          console.log(data.message);
          setSnackbarSeverity("success");
          setSnackbarMessage("Szkoła dodana pomyślnie.");
          setSnackbarOpen(true);
          // Wyczyść formularz lub wykonaj inne akcje po dodaniu szkoły
          setNewSchoolData({
            school_name: "",
            town: "",
            street: "",
            building_number: "",
            apartment_number: "",
            zip_code: "",
          });
        })
        .catch((error) => {
          console.error("Błąd podczas dodawania szkoły:", error);
          setSnackbarSeverity("error");
          setSnackbarMessage("Błąd podczas dodawania szkoły.");
          setSnackbarOpen(true);
        });
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
    };

    return(
      <>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }} className='modal-content'>
          
          <h2 id="child-modal-title">Dodaj szkołę </h2>
          <div className="box-modal">
          <div className="modal-text-titles">
          Nazwa szkoły:
          </div>
          <div className="modal-text-inputs">
          <input type="text" name="nazwa_szkoly" id="" className="school-modal-input"  value={newSchoolData.school_name}
                  onChange={(e) =>
                    setNewSchoolData({
                      ...newSchoolData,
                      school_name: e.target.value,
                    })
                  }
                  required />
          </div>
          <br />
          <div className="modal-text-titles">
          Miejscowość: 
          </div>
          <div className="modal-text-inputs">
          <input type="text" name="miejscowosc" id=""  className="school-modal-input" value={newSchoolData.town}
                  onChange={(e) =>
                    setNewSchoolData({ ...newSchoolData, town: e.target.value })
                  } required/>
          </div>
          <br />
          <div className="modal-text-titles">
          Ulica: 
          </div>
          <div className="modal-text-inputs">
          <input type="text" name="ulica" id="" className="school-modal-input" value={newSchoolData.street}
                  onChange={(e) =>
                    setNewSchoolData({ ...newSchoolData, street: e.target.value })
                  } required/>
          </div>
          <br />
          <div className="modal-text-titles">
          Nr budynku: 
          </div>
          <div className="modal-text-inputs">
          <input type="text" name="nr_budynku" id="" className="school-modal-input" value={newSchoolData.building_number}
                  onChange={(e) =>
                    setNewSchoolData({ ...newSchoolData, building_number: e.target.value })
                  } required/>
          </div>
          <br />
          <div className="modal-text-titles">
          Numer lokalu: 
          </div>
          <div className="modal-text-inputs">
          <input type="text" name="nr_lokalu" id="" className="school-modal-input" value={newSchoolData.apartment_number}
                  onChange={(e) =>
                    setNewSchoolData({ ...newSchoolData, apartment_number: e.target.value })
                  }/>
          </div>
          <br />
          <div className="modal-text-titles">
          Kod pocztowy:{" "}
          </div>
          <div className="modal-text-inputs">
          <input
            type="text"
            name="kod_pocztowy"
            placeholder="XX-XXX"
            maxlength="6"
            id=""
            className="school-modal-input"
            value={newSchoolData.zip_code}
                  onChange={(e) =>
                    setNewSchoolData({ ...newSchoolData, zip_code: e.target.value })
                  } 
                  required />
          </div>
          <br />
          <input type="submit" value="Zapisz" className="school-modal-button-save" onClick={handleAddSchool}/>
          <br />
          <Button onClick={handleClose}>Zamknij</Button>
          </div>

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