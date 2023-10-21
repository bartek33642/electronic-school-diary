import React from "react";
import './AdminUsers.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export function AdminUsers(){
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);


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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
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

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h2 id="child-modal-title">Dodaj szkołę </h2>
                Nazwa szkoły:
                <input type="text" name="nazwa_szkoly" id="" />
                <br />
                Miejscowość: <input type="text" name="miejscowosc" id="" />
                <br />
                Ulica: <input type="text" name="ulica" id="" />
                <br />
                Nr budynku: <input type="text" name="nr_budynku" id="" />
                <br />
                Numer lokalu: <input type="text" name="nr_lokalu" id="" />
                <br />
                Kod pocztowy: <input type="text" name="kod_pocztowy" id="" />
                <br />
                <input type="submit" value="Zapisz" />
                <br />
                <Button onClick={handleClose}>Zamknij</Button>
              </Box>
            </Modal>

            <input
              type="button"
              value="Dodaj klasę "
              className="admin-users-btns"
              onClick={handleOpen1}
            />
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              id="2"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h2 id="child-modal-title">Dodaj klasę </h2>
                <p className="users-title">Szkoła</p>
                <select name="" id="" className="users-selection">
                  <option value="-" selected disabled>
                    {" "}
                  </option>
                  <option value="1lo">1LO</option>
                  <option value="2lo">2LO</option>
                  <option value="zst">ZST</option>
                  <option value="zsme">ZSME</option>
                </select>
                <br />
                Nazwa klasy: <input type="text" name="nazwa klasy" id="" />
                <br />
                <input type="submit" value="Zapisz" />
                <br />
                <Button onClick={handleClose1}>Zamknij</Button>
              </Box>
            </Modal>

            <input
              type="button"
              value="Dodaj użytkownika "
              className="admin-users-btns"
              onClick={handleOpen2}
            />
                        <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h2 id="child-modal-title">Dodaj użytkownika </h2>
                Adres e-mail:
                <input type="text" name="e-mail" id="" />
                <br />
                Hasło: <input type="text" name="haslo" id="" />
                <br />
                Czy aktywny: <input type="checkbox" name="aktywny" id="" />
                <br />
                Status: 
                <select name="" id="" className="users-selection">
                  <option value="-" selected disabled>
                    {" "}
                  </option>
                  <option value="admin">admin</option>
                  <option value="principal">dyrektor</option>
                  <option value="teacher">nauczyciel</option>
                  <option value="parent">rodzic</option>
                  <option value="student">uczeń</option>
                </select>
                <br />
                Imię: <input type="text" name="imie" id="" />
                <br />
                Naziwsko: <input type="text" name="nazwisko" id="" />
                <br />
                <input type="submit" value="Zapisz" />
                <br />
                <Button onClick={handleClose2}>Zamknij</Button>
              </Box>
            </Modal>

            
          </div>

          <div className="admin-users-selectUsers">
            <p className="users-title">Szkoła</p>

            <select name="" id="" className="users-selection">
              <option value="-" selected disabled>
                {" "}
              </option>
              <option value="1lo">1LO</option>
              <option value="2lo">2LO</option>
              <option value="zst">ZST</option>
              <option value="zsme">ZSME</option>
            </select>

            <p className="users-title">Klasa</p>

            <select name="" id="" className="users-selection">
              <option value="-" selected disabled>
                {" "}
              </option>
              <option value="4a">4a</option>
              <option value="2a">2a</option>
              <option value="1b">1b</option>
              <option value="3c">3c</option>
            </select>
          </div>
        </div>
      </div>
    );
}