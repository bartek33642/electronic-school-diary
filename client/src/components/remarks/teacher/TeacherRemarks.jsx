import React, { useState, useEffect } from "react";
import './TeacherRemarks.css';
import { DataGrid } from '@mui/x-data-grid';
import { TeacherMenu } from '../../menu/teacher/TeacherMenu';
import { backendServer } from '../../../config';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function TeacherRemarks() {

  const [userData, setUserData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [students, setStudents] = useState([]); // Dodane
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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

  const [formData, setFormData] = useState({
    date: "",
    student_id: "",
    remark_text: "",
    is_possitive: false, // Zmiana wartości początkowej
    teacher_id: "", // Usunięte
  });

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
  
            if (userData.length > 0) {
              const schoolId = userData[0].school_id;
  
              const remarksQuery = `${backendServer}/remarks-all-classes/${schoolId}`;
              const remarksResult = await fetch(remarksQuery);
              console.log("remarksResult: ", remarksResult);
              const remarksData = await remarksResult.json();
              console.log("remarksData: ", remarksData);
  
              const studentsQuery = `${backendServer}/students/${schoolId}`;
              const studentsResult = await fetch(studentsQuery);
              const studentsData = await studentsResult.json();
              setStudents(studentsData);
  
              if (remarksResult.ok) {
                setRemarks(remarksData);
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


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddRemark = async () => {
    try {
      // Upewnij się, że są dane użytkownika
      if (userData.length > 0) {
        // Użyj formData do wysłania zapytania POST w celu dodania nowej uwagi
        const addRemarkQuery = `${backendServer}/add-remarks`;

        const postData = {
          remark_text: formData.remark_text,
          is_possitive: formData.is_possitive,
          date: formData.date,
          student_id: formData.student_id,
          teacher_id: userData[0].teacher_id, // Pobierz teacher_id z userData
        };

        const addRemarkResult = await fetch(addRemarkQuery, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (addRemarkResult.ok) {
          // Odśwież listę tematów po pomyślnym dodaniu
          fetchUserData();
          handleClose(); // Zamknij modal po dodaniu tematu
          setSuccessMessage("Pomyślnie dodano uwagę");
        } else {
          setError("Błąd dodawania tematu.");
          setErrorMessage("Uwaga nie została dodana");
        }

      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas dodawania tematu.");
      setErrorMessage("Uwaga nie została dodana");

    }
  };

  const getIsPositive = (is_possitive) => (is_possitive ? 'Tak' : 'Nie');

  const columns = [
    { field: 'remarkId', headerName: 'ID', width: 30 },
    { field: 'student', headerName: 'Uczeń', width: 103 },
    { field: 'class', headerName: 'Klasa', width: 100 },
    { field: 'remark_text', headerName: 'Opis uwagi', width: 180 },
    { field: 'is_possitive', headerName: 'Pozytywna?', width: 130 },
    { field: 'date', headerName: 'Data', width: 100 },
    { field: 'teacher', headerName: 'Nauczyciel', width: 130 },
  ];

  const rows = remarks.map(remark => ({
    remarkId: remark.remark_id,
    student: remark.student_first_name + ' ' + remark.student_second_name,
    class: remark.class_name,
    remark_text: remark.remark_text,
    is_possitive: getIsPositive(remark.is_possitive),
    date: new Date(remark.date).toLocaleDateString(),
    teacher: remark.teacher_first_name + ' ' + remark.teacher_second_name,
  }));

  return (
    <div className="teacher-remarks-container">
      <TeacherMenu />
      <div className="teacher-remarks-elements">
        <h2>Uwagi</h2>
        <button type="button" onClick={handleOpen}>
          Dodaj uwagę
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }} className="modal-content">
            <h2 className="teacher-topics-add-topic">
              Dodaj Uwagę:
            </h2>
            Uwaga - opis:{" "}
            <input
              type="text"
              name="remark_text"
              onChange={handleChange}
              value={formData.remark_text}
            />{" "}
            <br />
            Czy pozytywna? :{" "}
            <input
              type="checkbox"
              name="is_possitive"
              onChange={handleChange}
              checked={formData.is_possitive}
            />{" "}
            <br />
            Opis :{" "}
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
            />{" "}
            <br />
            Uczeń :{" "}
            <select
              name="student_id"
              onChange={handleChange}
              value={formData.student_id}
            >
              <option value="" disabled>Wybierz ucznia</option>
              {students.map(student => (
                <option key={student.student_id} value={student.student_id}>
                  {`${student.first_name} ${student.second_name}`}
                </option>
              ))}
            </select>
            <br />
            <Button onClick={handleAddRemark}>
              Dodaj Uwagę
            </Button>
            <Button onClick={handleClose}>Zamknij</Button>
          </Box>
        </Modal>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.remarkId}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
            // checkboxSelection
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

