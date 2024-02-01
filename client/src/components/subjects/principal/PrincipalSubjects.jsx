import React, { useState, useEffect } from "react";
import "./PrincipalSubjects.css";
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function PrincipalSubjects() {
  const [userData, setUserData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

            const subjectsQuery = `${backendServer}/subjects-all-classes/${schoolId}`;
            const subjectsResult = await fetch(subjectsQuery);
            const subjectsData = await subjectsResult.json();

            if (subjectsResult.ok) {
              setSubjects(subjectsData);
            } else {
              setError("Błąd pobierania danych z tematami.");
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
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        if (userData.length > 0) {
          const schoolId = userData[0].school_id;

          const classQuery = `${backendServer}/classes/${schoolId}`;
          const result = await fetch(classQuery);
          const classData = await result.json();

          if (result.ok) {
            setClassData(classData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchClassData();
  }, [userData]);

  const [formData, setFormData] = useState({
    subject_name: "",
    class_id: "",
    school_id: "",
  });

  const handleAddSubject = async () => {
    try {
      if (userData.length > 0) {
        const addSubjectQuery = `${backendServer}/add-subjects`;

        const postData = {
          subject_name: formData.subject_name,
          school_id: userData[0].school_id,
          class_id: formData.class_id,
        };

        const addSubjectResult = await fetch(addSubjectQuery, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (addSubjectResult.ok) {
          fetchUserData();
          handleClose();
          setSuccessMessage("Pomyślnie dodano przedmiot");
        } else {
          setError("Błąd dodawania przedmiotu.");
          setErrorMessage("Przedmiot nie została dodana");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas dodawania przedmiotu.");
      setErrorMessage("Przedmiot nie został dodana");
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm("Czy na pewno chcesz usunąć przedmiot?")) {
      try {
        const response = await fetch(`${backendServer}/subject/${subjectId}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          fetchUserData();
          setSuccessMessage("Usunięto przedmiot");
        } else {
          console.error("Błąd usuwania przedmiotu");
          setErrorMessage("Błąd usuwania przedmiotu");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "subject_name", headerName: "Nazwa przedmiotu", width: 160 },
    { field: "class_name", headerName: "Nazwa klasy", width: 130 },
    {
      field: "action",
      headerName: " - ",
      width: 60,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteSubject(params.row.id)}
        >
          Usuń
        </button>
      ),
    },
  ];

  const rows = subjects.map((subject) => ({
    id: subject.subject_id,
    subject_name: subject.subject_name,
    class_name: subject.class_name,
    action: (
      <button
        type="button"
        onClick={() => handleDeleteSubject(subject.subject_id)}
      >
        Usuń
      </button>
    ),
  }));

  return (
    <div className="principal-subjects-container">
      <PrincipalMenu />
      <div className="principal-subjects-elements">
        <h2>Przedmioty</h2>

        <button type="button" onClick={handleOpen}>
          Dodaj przedmiot
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }} className="modal-content">
            <div className="principal-form-subject">
              <h2 className="principal-add-subject">Dodaj przedmiot:</h2>
              Wybierz klasę:{" "}
              <select
                name="class_id"
                id=""
                value={formData.class_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    class_id: e.target.value,
                  })
                }
              >
                <option value="">Wybierz klasę</option>
                {classData.map((classItem) => (
                  <option key={classItem.class_id} value={classItem.class_id}>
                    {classItem.class_name}
                  </option>
                ))}
              </select>
              <br />
              Nazwa przedmiotu:{" "}
              <input
                type="text"
                name="subject_name"
                id=""
                value={formData.subject_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject_name: e.target.value,
                  })
                }
              />
              <br />
              <Button onClick={handleAddSubject}>Dodaj przedmiot</Button>
            </div>
            <Button onClick={handleClose}>Zamknij</Button>
          </Box>
        </Modal>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
          />
        </div>
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
          {successMessage}
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
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
