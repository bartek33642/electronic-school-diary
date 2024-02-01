import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./UserModal.css";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../config";

export function UserModal(props) {
  const { open2, handleClose2, userData, fetchUserData } = props;

  const [, setUserData] = useState([]);

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

  const handleDeleteUser = (userId) => {
    if (window.confirm("Czy na pewno chcesz usunąć użytkownika?")) {
      fetch(`${backendServer}/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            fetchUserData();
          } else {
            console.error("Błąd usuwania użytkownika");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case "principal":
        return "dyrektor";
      case "student":
        return "uczeń";
      case "teacher":
        return "nauczyciel";
      case "parent":
        return "rodzic";
      case "admin":
        return "administrator";
      default:
        return status;
    }
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 100 },
    { field: "user_name", headerName: "Imię i nazwisko", width: 180 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "email", headerName: "Adres e-mail", width: 220 },
    {
      field: "actions",
      headerName: " - ",
      width: 180,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteUser(params.row.userId)}
        >
          Usuń
        </button>
      ),
    },
  ];

  const rows = userData.map((user) => ({
    userId: user.user_id,
    user_name: user.first_name + " " + user.second_name,
    status: getStatusName(user.status),
    email: user.email,
    actions: (
      <button type="button" onClick={() => handleDeleteUser(user.user_id)}>
        Usuń
      </button>
    ),
  }));
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
        </p>
        <Button onClick={handleClose2}>Zamknij</Button>
      </Box>
    </Modal>
  );
}
