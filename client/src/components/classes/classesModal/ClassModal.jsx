import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ClassModal.css';

export function ClassModal(props){
  const { open1, handleClose1, schoolData, updateClasses } = props; 
  const [className, setClassName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("-");

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


    const handleSaveClass = () => {
      if (selectedSchool === "-" || className === "") {
        return;
      }
    
      // Pobierz identyfikator wybranej szkoły
      const selectedSchoolId = selectedSchool;

      // Wyślij dane do serwera, aby dodać klasę do bazy danych
      fetch('http://localhost:3001/add-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          class_name: className,
          school_id: selectedSchoolId,
        }),
      })
      .then(response => {
        if (response.status === 201) {
          // Dodano klasę pomyślnie
          // Tutaj możesz wykonać aktualizację stanu lub innych działań, które są potrzebne
          updateClasses(); // Ta funkcja powinna być przekazana z wyższego poziomu komponentu
          handleClose1(); // Zamknij modal
        } else {
          // Obsłuż błąd dodawania klasy
          console.error('Błąd dodawania klasy');
        }
      })
      .catch(error => {
        console.error(error);
      });
     };



    return (
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        id="2"
      >
        <Box sx={{ ...style }} className="modal-content">
          <h2 id="child-modal-title">Dodaj klasę </h2>
          <div className="class-modal-text">
            <p className="users-title">Szkoła</p>
          </div>
          <div className="class-modal-inputs">
            {schoolData && schoolData.length > 0 ? (
              <select
                name=""
                id=""
                className="input-select-class-modal"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="-" selected disabled>
                  Wybierz szkołę
                </option>
                {schoolData.map((school) => (
                  <option value={school.school_id} key={school.school_id}>
                    {school.school_name} {school.town}
                  </option>
                ))}
              </select>
            ) : (
              <p>Brak dostępnych szkół.</p>
            )}
          </div>
          <br />
          <div className="class-modal-text">Nazwa klasy:</div>
          <div className="class-modal-inputs">
            <input
              type="text"
              name="nazwa klasy"
              id=""
              className="input-select-class-modal"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>

          <br />
          <input
            type="submit"
            value="Zapisz"
            className="class-modal-button-save"
            onClick={handleSaveClass}
          />

          <br />
          <Button onClick={handleClose1}>Zamknij</Button>
        </Box>
      </Modal>
    );
}