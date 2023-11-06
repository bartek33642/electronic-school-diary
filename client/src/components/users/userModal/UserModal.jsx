import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './UserModal.css';

export function UserModal(props) {
  const { open2, handleClose2, userData} = props;

  const [, setUserData] = useState([]); 

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


  const handleDeleteUser = (userId) => {
    if (window.confirm('Czy na pewno chcesz usunąć użytkownika?')) {
      // Wysyłamy żądanie DELETE do serwera
      console.log('Usuwanie użytkownika o user_id:', userId);

      fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.status === 204) {

            fetch('http://localhost:3001/users')
              .then(response => response.json())
              .then(data => {
                setUserData(data);
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            // Obsłuż błąd usuwania szkoły
            console.error('Błąd usuwania użytkownika');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };


  return (
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box sx={{ ...style }} className="modal-content">
        <h2 id="user-modal-title">Użytkownicy</h2>
        <p>
            <>
            <table className="table-user-modal" >
            <thead>
              <tr className="user-modal-tr">
                <th className="user-modal-th">Imię i nazwisko</th>
                <th className="user-modal-th">Status</th>
                <th className="user-modal-th">E-mail</th>
                <th className="user-modal-th">  </th>
              </tr>
            </thead>
            <tbody>
            {userData.map((user) => (
            <tr className="user-modal-tr" key={user.user_id}>
              <td className="user-modal-td">{user.first_name} {user.second_name}</td>
              <td className="user-modal-td">{user.status}</td>
              <td className="user-modal-td">{user.email}</td>
              <td className="user-modal-td">
                <button type="button">Edytuj</button> 
                <button type='button' onClick={() => handleDeleteUser(user.user_id)}>Usuń</button>
              </td>
            </tr>
            ))}
            </tbody>
            </table>
            </>

        </p>
        <Button onClick={handleClose2}>Zamknij</Button>
      </Box>
    </Modal>
  );
}
