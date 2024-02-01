import React, { useState, useEffect } from "react";
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import "./PrincipalRemarks.css";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function PrincipalRemarks() {
  const [userData, setUserData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [classData, setClassData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [formData, setFormData] = useState({
    date: "",
    student_id: "",
    remark_text: "",
    is_possitive: false,
    teacher_id: "",
  });

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

            const remarksQuery = `${backendServer}/remarks-all-classes/${schoolId}`;
            const remarksResult = await fetch(remarksQuery);
            const remarksData = await remarksResult.json();

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

  const getIsPosstive = (is_possitive) => (is_possitive ? "Tak" : "Nie");

  const fetchStudentsForClass = async (classId) => {
    try {
      const studentsData = await fetch(
        `${backendServer}/students-from-class/${classId}`
      );
      const students = await studentsData.json();
      setFilteredStudents(students);
    } catch (error) {
      console.error("Błąd pobierania uczniów:", error);
    }
  };

  useEffect(() => {
    fetchStudentsForClass(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        if (userData.length > 0) {
          const schoolId = userData[0].school_id;

          const teachersQuery = `${backendServer}/all-teachers/${schoolId}`;
          const result = await fetch(teachersQuery);
          const teachersData = await result.json();

          if (result.ok) {
            setTeachers(teachersData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTeachers();
  }, [userData]);

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

  const handleAddRemark = async () => {
    try {
      if (userData.length > 0) {
        const addRemarkQuery = `${backendServer}/add-remarks`;

        const postData = {
          remark_text: formData.remark_text,
          is_possitive: formData.is_possitive,
          date: formData.date,
          student_id: selectedStudentId,
          teacher_id: formData.teacher_id,
        };

        const addRemarkResult = await fetch(addRemarkQuery, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (addRemarkResult.ok) {
          fetchUserData();
          handleClose();
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

  const handleDeleteRemark = async (remarkId) => {
    if (window.confirm("Czy na pewno chcesz usunąć uwagę?")) {
      try {
        const response = await fetch(`${backendServer}/remarks/${remarkId}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          fetchUserData();
        } else {
          console.error("Błąd usuwania uwagi");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSelectChange = async (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "class_id":
        setSelectedClass(value);
        fetchStudentsForClass(value);
        setSelectedStudentId("");
        break;
      default:
        break;
    }
  };

  const columns = [
    { field: "remarkId", headerName: "ID", width: 100 },
    { field: "remark_text", headerName: "Opis uwagi", width: 230 },
    { field: "is_possitive", headerName: "Pozytywna?", width: 130 },
    { field: "date", headerName: "Data", width: 130 },
    { field: "teacher", headerName: "Nauczyciel", width: 130 },
    { field: "student", headerName: "Uczeń", width: 130 },
    {
      field: "action",
      headerName: " - ",
      width: 60,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteRemark(params.row.remarkId)}
        >
          Usuń
        </button>
      ),
    },
  ];

  const rows = remarks.map((remark) => ({
    remarkId: remark.remark_id,
    remark_text: remark.remark_text,
    is_possitive: getIsPosstive(remark.is_possitive),
    date: new Date(remark.date).toLocaleDateString(),
    teacher: remark.teacher_first_name + " " + remark.teacher_second_name,
    student: remark.student_first_name + " " + remark.student_second_name,
    action: (
      <button
        type="button"
        onClick={() => handleDeleteRemark(remark.remark_id)}
      >
        Usuń
      </button>
    ),
  }));

  return (
    <div className="principal-remarks-container">
      <PrincipalMenu />
      <div className="principal-remarks-elements">
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
            <h2 className="teacher-topics-add-topic">Dodaj Uwagę:</h2>
            Nauczyciel :{" "}
            <select
              name="teacher_id"
              onChange={handleChange}
              value={formData.teacher_id}
            >
              <option value="" disabled>
                Wybierz nauczyciela
              </option>
              {teachers.map((teacher) => (
                <option key={teacher.teacher_id} value={teacher.teacher_id}>
                  {`${teacher.first_name} ${teacher.second_name}`}
                </option>
              ))}
            </select>
            <br />
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
            Data :{" "}
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
            />{" "}
            <br />
            Klasa :{" "}
            <select
              name="class_id"
              onChange={handleSelectChange}
              value={selectedClass}
            >
              <option value="" disabled>
                Wybierz klasę
              </option>
              {classData.map((classItem) => (
                <option key={classItem.class_id} value={classItem.class_id}>
                  {classItem.class_name}
                </option>
              ))}
            </select>
            <br />
            Uczeń :{" "}
            <select
              name="student_id"
              onChange={(e) => setSelectedStudentId(e.target.value)}
              value={selectedStudentId}
            >
              <option value="" disabled>
                Wybierz ucznia
              </option>
              {filteredStudents.map((student) => (
                <option key={student.student_id} value={student.student_id}>
                  {`${student.first_name} ${student.second_name}`}
                </option>
              ))}
            </select>
            <br />
            <Button onClick={handleAddRemark}>Dodaj Uwagę</Button>
            <Button onClick={handleClose}>Zamknij</Button>
          </Box>
        </Modal>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.date}
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
