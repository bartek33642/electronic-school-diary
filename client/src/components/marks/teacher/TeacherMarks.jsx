import React, { useState, useEffect } from "react";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import "./TeacherMarks.css";
import { backendServer } from "../../../config";
import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function TeacherMarks() {
  const [userData, setUserData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState([]);
  const [isDataFilled, setIsDataFilled] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);
    setFormData({
      student_id: "",
      subject_id: "",
      weight: "",
      description: "",
      grade_value: "",
      date: "",
    });
  };

  const [formData, setFormData] = useState({
    student_id: "",
    subject_id: "",
    weight: "",
    description: "",
    grade_value: "",
    date: "",
  });

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          console.log("userData: ", userData);
          setUserData(userData);
        }
      } catch (error) {
        console.error(error);
        setError("Wystąpił błąd podczas pobierania danych użytkownika.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      const schoolId = userData[0].school_id;
      console.log("schoolId: ", schoolId);
      fetch(`${backendServer}/classes/${schoolId}`)
        .then((response) => response.json())
        .then((data) => setClasses(data))
        .catch((error) => console.error("Błąd pobierania klas:", error));
    }
  }, [userData]);

  const handleSelectChange = async (event) => {
    const { name, value } = event.target;

    // Aktualizuj stan w zależności od zmienionego selecta
    switch (name) {
      case "class":
        setSelectedClass(value);
        // Pobierz przedmioty dla wybranej klasy
        try {
          const subjectsData = await fetch(
            `${backendServer}/subjects/class/${value}`
          );
          const subjects = await subjectsData.json();
          setSubjects(subjects);
          console.log(`subjects:`, subjects);
        } catch (error) {
          console.error("Błąd pobierania przedmiotów:", error);
        }
        break;
      case "subject":
        setSelectedSubject(value);
        break;
      default:
        break;
    }
  };

  const fetchData = async () => {
    try {
      if (selectedClass && selectedSubject) {
        const schoolId = userData[0].school_id;
        const classId = selectedClass;
        const subjectId = selectedSubject;

        const studentsData = await fetch(
          `${backendServer}/subjects-all-classes-students/${schoolId}/${classId}/${subjectId}`
        );
        const students = await studentsData.json();
        setStudents(students);

        const marksData = await fetch(
          `${backendServer}/marks-students/${classId}/${subjectId}`
        );
        const marks = await marksData.json();
        setMarks(marks);

        setIsDataFilled(true);
        console.log("Marks: ", marks);
      }
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClass, selectedSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //-----
  // Dodaj nowy stan do przechowywania szczegółów nowej oceny
  const [newGrade, setNewGrade] = useState({
    gradeValue: "",
    weight: "",
    description: "",
  });

  const handleAddMarksResult = (successMessage, errorMessage) => {
    if (successMessage) {
      console.log(successMessage);
      setSuccessMessage(successMessage);
    }
    if (errorMessage) {
      console.error(errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleDeleteGrade = async (gradeId, studentId) => {
    const shouldDelete = window.confirm("Czy na pewno chcesz usunąć ocenę?");
    if (shouldDelete) {
      try {
        const response = await fetch(
          `${backendServer}/grades/${gradeId}/${studentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200) {
          console.log("Ocena została pomyślnie usunięta.");
          setSuccessMessage("Pomyślnie usunięto ocenę");
          fetchData(); // Ponownie pobierz dane po usunięciu oceny
        } else {
          console.error(
            "Błąd podczas usuwania oceny. Odpowiedź serwera:",
            response
          );
          setErrorMessage("Nie udało się usunąć oceny");
        }
      } catch (error) {
        console.error("Błąd podczas usuwania oceny:", error);
        setErrorMessage("Nie udało się usunąć oceny");
      }
    }
  };

  // Funkcja obsługująca kliknięcie w przycisk plusa
  const handleAddGrade = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
    addNewGrade();
  };

  // Funkcja do dodawania nowej oceny
  const addNewGrade = async () => {
    try {
      if (!selectedStudentId) {
        console.error("Błąd dodania oceny: Brak wybranego ucznia.");
        return;
      }

      // Sprawdź, czy są uczniowie
      if (students.length > 0) {
        // Pobierz niezbędne dane
        // const studentId = students[0].student_id;
        const studentId =
          selectedStudentId || (students.length > 0 && students[0].student_id);

        const subjectId = selectedSubject;
        const teacherId = userData[0].teacher_id; // Poprawione pobieranie id nauczyciela
        const date = new Date(); // Możesz dostosować format daty

        console.log("Dodawanie oceny - Dane do wysłania:", {
          student_id: studentId,
          subject_id: subjectId,
          grade_value: formData.grade_value,
          weight: formData.weight,
          description: formData.description,
          teacher_id: teacherId,
          date: formData.date,
        });

        // Wyslij żądanie do serwera, aby dodać nową ocenę
        const response = await fetch(`${backendServer}/add-marks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: studentId,
            subject_id: subjectId,
            grade_value: formData.grade_value,
            weight: formData.weight,
            description: formData.description,
            teacher_id: teacherId,
            date: formData.date,
          }),
        });

        if (response.status === 201) {
          console.log("Ocena dodana pomyślnie.");
          setSuccessMessage("Pomyślnie dodano ocenę");
          setIsModalOpen(false);
          fetchData();
        } else {
          console.error("Błąd dodania oceny. Odpowiedź serwera:", response);
          setErrorMessage("Ocena nie została dodana");
        }
      } else {
        console.error("Błąd dodania oceny: Brak uczniów.");
        setErrorMessage("Ocena nie została dodana");
      }
    } catch (error) {
      console.error("Błąd dodania oceny:", error);
      // Obsłuż błąd, np. wyświetl komunikat użytkownikowi
      setErrorMessage("Ocena nie została dodana");
    }
  };

  //-----

  return (
    <div className="teacher-marks-container">
      <TeacherMenu />

      <div className="teacher-marks-elements">
        <h3>Oceny</h3>

        <div className="teacher-marks-form">
          Wybierz klasę:
          <select
            name="class"
            id="teacher-marks-class"
            onChange={handleSelectChange}
          >
            <option className="teacher-marks-class-option">
              Wybierz klasę
            </option>
            {classes.map((cls) => (
              <option
                className="teacher-marks-class-option"
                key={cls.class_id}
                value={cls.class_id}
              >
                {cls.class_name}
              </option>
            ))}
          </select>
          Wybierz przedmiot:
          <select
            name="subject"
            id="teacher-marks-subject"
            onChange={handleSelectChange}
          >
            <option className="teacher-marks-subject-option">
              Wybierz przedmiot
            </option>
            {subjects.map((subj) => (
              <option
                className="teacher-marks-subject-option"
                key={subj.subject_id}
                value={subj.subject_id}
              >
                {subj.subject_name}
              </option>
            ))}
          </select>
          {isDataFilled && (
            <table className="teacher-marks-table">
              <thead>
                <tr className="teacher-marks-table-th">
                  <th>Uczeń</th>
                  <th>Oceny</th>
                  <th>Średnia arytmetyczna</th>
                  <th>Średnia ważona</th>
                  <th>Przewidywana ocena końcowa</th>
                  {/* <th>Ocena końcowa</th> */}
                </tr>
              </thead>
              <tbody>
                {students.map((student, studentIndex) => (
                  <tr key={studentIndex}>
                    <td>{`${student.first_name} ${student.second_name}`}</td>
                    <td className="teacher-marks-td-grades">
                      <div className="grade-container">
                        <div className="tooltip">
                          {marks
                            .filter(
                              (mark) => mark.student_id === student.student_id
                            )
                            .map((mark) => (
                              <button
                                className="bttn-student-marks"
                                key={mark.grade_id}
                                onClick={() =>
                                  handleDeleteGrade(
                                    mark.grade_id,
                                    student.student_id
                                  )
                                }
                              >
                                {mark.grade_value}
                                <div className="tooltiptext">
                                  <span>Waga: {mark.weight}</span>
                                  <span>Opis: {mark.description}</span>
                                </div>
                              </button>
                            ))}
                        </div>
                        {/* <button onClick={() => handleAddGrade(student.student_id)}>+</button> */}
                        <button
                          onClick={() => {
                            console.log(
                              "Selected student_id:",
                              student.student_id
                            );
                            handleAddGrade(student.student_id);
                          }}
                        >
                          +
                        </button>

                        <Modal
                          open={isModalOpen}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box sx={{ ...style }} className="modal-content">
                            <h2 className="teacher-topics-add-topic">
                              Dodaj Ocenę:
                            </h2>
                            Ocena:{" "}
                            <input
                              type="text"
                              name="grade_value"
                              onChange={handleChange}
                              value={formData.grade_value}
                            />{" "}
                            <br />
                            Waga:{" "}
                            <input
                              type="number"
                              min="0"
                              name="weight"
                              onChange={handleChange}
                              value={formData.weight}
                            />{" "}
                            <br />
                            Opis :{" "}
                            <input
                              type="text"
                              name="description"
                              onChange={handleChange}
                              value={formData.description}
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
                            <Button onClick={() => handleAddGrade()}>
                              Dodaj Ocenę
                            </Button>
                            <Button onClick={handleClose}>Zamknij</Button>
                          </Box>
                        </Modal>
                      </div>
                    </td>
                    <td>
                      {calculateAritmeticAverage(
                        marks
                          .filter(
                            (mark) => mark.student_id === student.student_id
                          )
                          .map((mark) => parseFloat(mark.grade_value))
                      ).toFixed(2)}
                    </td>

                    <td>
                      {marks &&
                        marks[student.student_id] &&
                        marks[student.student_id].length > 0 &&
                        calculateWeightedAverage(
                          marks
                            .filter(
                              (mark) => mark.student_id === student.student_id
                            )
                            .map((mark) => ({
                              grade: parseFloat(mark.grade_value),
                              weight: parseFloat(mark.weight),
                            })) || []
                        ).toFixed(2)}
                    </td>
                    <td>
                      {console.log("marks: ", marks)}
                      {console.log("student_id: ", student.student_id)}
                      {marks &&
                        marks[student.student_id] &&
                        marks[student.student_id].length > 0 && // Dodaj warunek, czy istnieją oceny dla ucznia
                        expectedGrades(
                          calculateWeightedAverage(
                            marks
                              .filter(
                                (mark) => mark.student_id === student.student_id
                              )
                              .map((mark) => parseFloat(mark.grade_value)) || []
                          ).toFixed(2)
                        )}
                    </td>
                    {/* <td>

                      <button type="button" id="finalGrade">+</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
          Pomyślnie dodano ocenę
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
          Ocena nie została dodana
        </Alert>
      </Snackbar>
    </div>
  );
}
