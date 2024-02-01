import React, { useState, useEffect } from "react";
import "./AdminSubjects.css";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { backendServer } from "../../../config";

export function AdminSubjects() {
  const [open, setOpen] = useState(false);
  const [schoolData, setSchoolData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetch(`${backendServer}/schools`)
      .then((response) => response.json())
      .then((data) => {
        setSchoolData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${backendServer}/classes`)
      .then((response) => response.json())
      .then((data) => {
        setClassData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteSubject = (subjectId) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten przedmiot?")) {
      fetch(`${backendServer}/subject/${subjectId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            fetch(`${backendServer}/subjects`)
              .then((response) => response.json())
              .then((data) => {
                setSubjectData(data);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error("Błąd usuwania szkoły");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetch(`${backendServer}/subjects-all`)
      .then((response) => response.json())
      .then((data) => {
        setSubjectData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubjectNameChange = (event) => {
    setNewSubjectName(event.target.value);
  };

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
    setIsSchoolSelected(true);
    setSelectedClass("");
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleAddSubject = () => {
    fetch(`${backendServer}/add-subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject_name: newSubjectName,
        school_id: selectedSchool,
        class_id: selectedClass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjectData([...subjectData, data]);
        setSnackbarSeverity("success");
        setSnackbarMessage("Przedmiot dodany pomyślnie.");
        setSnackbarOpen(true);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Błąd dodawania przedmiotu:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Błąd podczas dodawania przedmiotu.");
        setSnackbarOpen(true);
      });
    setNewSubjectName("");
    setSelectedSchool("");
    setSelectedClass("");
    setIsSchoolSelected(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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

  const columns = [
    { field: "subjectId", headerName: "ID", width: 100 },
    { field: "subject_name", headerName: "Przedmiot", width: 180 },
    { field: "school_name", headerName: "Nazwa szkoły", width: 220 },
    { field: "class_name", headerName: "Nazwa klasy", width: 110 },
    {
      field: "actions",
      headerName: " - ",
      width: 180,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteSubject(params.row.subjectId)}
        >
          Usuń
        </button>
      ),
    },
  ];

  const rows = subjectData.map((subject) => ({
    subjectId: subject.subject_id,
    subject_name: subject.subject_name,
    school_name: subject.school_name + " " + subject.town,
    class_name: subject.class_name,
    actions: (
      <button
        type="button"
        onClick={() => handleDeleteSubject(subject.subject_id)}
      >
        Usuń
      </button>
    ),
  }));

  return (
    <div className="admin-subjects-container">
      <AdminMenu />
      <div className="admin-subjects-elements">
        <h3>Przedmioty:</h3>

        <div className="admin-subjects-buttons">
          <input
            type="button"
            className="admin-subject-buttons"
            value="Przeglądaj przedmioty"
            onClick={handleOpen}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style }} className="modal-content">
              <h2>Przedmoty:</h2>

              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.subjectId}
                  pageSize={8}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 7 },
                    },
                  }}
                  pageSizeOptions={[7, 10]}
                />
              </div>

              <Button onClick={handleClose}>Zamknij</Button>
            </Box>
          </Modal>
        </div>

        <h3>Dodaj przedmioty</h3>
        <div className="admin-subjects-add-subject">
          <select name="school" id="school" onChange={handleSchoolChange}>
            <option value="">Wybierz szkołę</option>
            {schoolData.map((school) => (
              <option key={school.school_id} value={school.school_id}>
                {school.school_name} - {school.town}
              </option>
            ))}
          </select>
          <br />
          <select
            name="class"
            id="class"
            onChange={handleClassChange}
            disabled={!isSchoolSelected}
          >
            <option value="">Wybierz klasę</option>
            {classData
              .filter(
                (classItem) =>
                  classItem.school_id === parseInt(selectedSchool, 10)
              )
              .map((classItem) => (
                <option key={classItem.class_id} value={classItem.class_id}>
                  {classItem.class_name}
                </option>
              ))}
          </select>
          <p>Nazwa przedmiotu: </p>
          <input
            type="text"
            name="subject_name"
            className="admin-form-input-subject-name"
            value={newSubjectName}
            onChange={handleSubjectNameChange}
          />{" "}
          <br />
          <button
            type="button"
            className="admin-subject-button"
            onClick={handleAddSubject}
          >
            Dodaj przedmiot
          </button>
        </div>

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
      </div>
    </div>
  );
}
