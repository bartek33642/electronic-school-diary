import React, { useState, useEffect } from "react";
import "./AdminRemarks.css";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import { AdminModalRemarks } from "./AdminModalRemarks/AdminModalRemarks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { backendServer } from "../../../config";

export function AdminRemarks() {
  const [userData, setUserData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [classData, setClassData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    school_id: ""
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
            const schoolId = selectedSchool

            // Pobierz uwagi dla danej szkoły
            const remarksQuery = `${backendServer}/remarks-all-school/${schoolId}`;
            const remarksResult = await fetch(remarksQuery);
            console.log("remarksResult: ", remarksResult);
            const remarksData = await remarksResult.json();
            console.log("remarksData: ", remarksData);

            if (remarksResult.ok) {
              setRemarks(remarksData);
            } else {
              setError("Błąd pobierania danych z uwagami.");
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
    // Call the fetchUserData function
    fetchUserData();
  }, []);

  const getIsPosstive = (is_possitive) => (is_possitive ? "Tak" : "Nie");

  const fetchStudentsForClass = async (selectedClass) => {
    try {
      const studentsData = await fetch(
        `${backendServer}/students-from-class/${selectedClass}`
      );
      const students = await studentsData.json();
      console.log("Students for class:", students);
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
        //   const schoolId = userData[0].school_id;
          const schoolId = selectedSchool;
          const teachersQuery = `${backendServer}/all-teachers/${schoolId}`;
          const result = await fetch(teachersQuery);
          const teachersData = await result.json();
          console.log("teachersData", teachersData);

          if (result.ok) {
            setTeachers(teachersData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTeachers();
  }, [userData, selectedSchool]);

  const fetchSchoolData = async () => {
    try {
      if (userData.length > 0) {
        const schoolQuery = `${backendServer}/schools`;
        const result = await fetch(schoolQuery);
        const schoolData = await result.json();

        if (result.ok) {
          setSchoolData(schoolData);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, [userData, selectedSchool]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        if (userData.length > 0) {
          const schoolId = selectedSchool

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
      // Upewnij się, że są dane użytkownika
      if (userData.length > 0) {
        // Użyj formData do wysłania zapytania POST w celu dodania nowej uwagi
        const addRemarkQuery = `${backendServer}/add-remarks`;
  
        const postData = {
          remark_text: formData.remark_text,
          is_possitive: formData.is_possitive,
          date: formData.date,
          student_id: selectedStudentId,
          teacher_id: formData.teacher_id,
          school_id: selectedSchool,
        };
  
        console.log("Dane wysyłane w zapytaniu:", postData);
  
        const addRemarkResult = await fetch(addRemarkQuery, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
  
        if (addRemarkResult.ok) {
          // Odśwież listę uwag po pomyślnym dodaniu
          fetchUserData();
          handleClose(); // Zamknij modal po dodaniu uwagi
          setSuccessMessage("Pomyślnie dodano uwagę");
  
          // Clear the form data
          setFormData({
            date: "",
            student_id: "",
            remark_text: "",
            is_possitive: false,
            teacher_id: "",
            school_id: selectedSchool,
          });
        } else {
          setError("Błąd dodawania uwagi.");
          setErrorMessage("Uwaga nie została dodana");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas dodawania uwagi.");
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
      case "school_id":
        setSelectedSchool(value);
        break;
      case "class_id":
        setSelectedClass(value);
        // Po zmianie klasy pobierz uczniów dla wybranej klasy
        fetchStudentsForClass(value);
        // Zresetuj również wybranego ucznia po zmianie klasy
        setSelectedStudentId("");
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-remarks-container">
      <AdminMenu />
      <div className="admin-remarks-elements">
        <h3>Uwagi:</h3>

        <div className="admin-remarks-buttons">
          <input
            type="button"
            value="Przeglądaj uwagi"
            onClick={handleOpen}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style }} className="modal-content">
              <h2>Uwagi:</h2>

              <AdminModalRemarks />
              <Button onClick={handleClose}>Zamknij</Button>
            </Box>
          </Modal>

          <h3>Dodaj uwagę</h3>

          <div className="admin-remarks-form">
            Wybierz szkołę:
            <select
              name="school_id"
              id="admin-remark-school"
              onChange={handleSelectChange}
              value={selectedSchool}
            >
              <option value="admin-remark-school-option">
                Wybierz szkołę
              </option>
              {schoolData.map((school) => (
                <option
                  key={school.school_id}
                  value={school.school_id}
                >
                  {school.school_name}
                </option>
              ))}
            </select>

            Wybierz klasę:
            <select
              name="class_id"
              id="admin-remark-class"
              onChange={handleSelectChange}
              value={selectedClass}
            >
              <option value="admin-remark-class-option">
                Wybierz klasę
              </option>
              {classData.map((classItem) => (
                <option
                  key={classItem.class_id}
                  value={classItem.class_id}
                >
                  {classItem.class_name}
                </option>
              ))}
            </select>

            Wybierz ucznia:
            <select
              name="student_id"
              onChange={(e) => setSelectedStudentId(e.target.value)}
              value={selectedStudentId}
              id="admin-remark-student"
            >
              <option value="admin-remark-student-option">
                Wybierz ucznia
              </option>
              {filteredStudents.map((student) => (
                <option
                  key={student.student_id}
                  value={student.student_id}
                >
                  {`${student.first_name} ${student.second_name}`}
                </option>
              ))}
            </select>

            Wybierz nauczyciela:
            <select
              name="teacher_id"
              id="admin-remark-teacher"
              onChange={handleChange}
              value={formData.teacher_id}
            >
              <option value="admin-remark-teacher-option">
                Wybierz nauczyciela
              </option>
              {teachers.map((teacher) => (
                <option
                  key={teacher.teacher_id}
                  value={teacher.teacher_id}
                >
                  {`${teacher.first_name} ${teacher.second_name}`}
                </option>
              ))}
            </select>

            Treść uwagi:
            <textarea
              name="remark_text"
              onChange={handleChange}
              value={formData.remark_text}
              cols="30"
              rows="10"
            ></textarea>

            Czy pozytywna:
            <input
              type="checkbox"
              name="is_possitive"
              onChange={handleChange}
              checked={formData.is_possitive}
              className="admin-remarks-checkbox"
            />

            Data :{" "}
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
            />
            <br />
            <button type="button" onClick={handleAddRemark}>
              Dodaj uwagę
            </button>
          </div>
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
