import React, { useEffect, useState } from "react";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import "./TeacherAttendance.css";
import { backendServer } from "../../../config";

export function TeacherAttendance() {
  const [userData, setUserData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLessonNumber, setSelectedLessonNumber] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentsAttendance, setStudentsAttendance] = useState([]);


  useEffect(() => {
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
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserData();
  }, []);

  const generateLessonNumbers = () => {
    const lessonNumbers = [];

    for (let i = 1; i <= 14; i++) {
      lessonNumbers.push(
        <option
          key={i}
          className="teacher-attendance-lesson-number-option"
          value={i}
        >
          {i}
        </option>
      );
    }

    return lessonNumbers;
  };

  const fetchData = async () => {
    try {
      if (selectedClass && selectedDate && selectedLessonNumber) {
        const schoolId = userData[0].school_id;
        const classId = selectedClass;
  
        // Pobierz uczniów dla wybranej klasy
        const studentsData = await fetch(
          `${backendServer}/students/${schoolId}/${classId}`
        );
        const students = await studentsData.json();
        setStudentsAttendance(students);
  
        // Inne operacje...
      } else {
        console.error("Wszystkie pola formularza muszą być uzupełnione.");
      }
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };
  
  

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

  useEffect(() => {
    fetchData();
  }, [selectedClass, selectedDate, selectedLessonNumber]);
  

  return (
    <div className="teacher-attendance-container">
      <TeacherMenu />
      <div className="teacher-attendance-elements">
        <h2>Obecność</h2>
        Wybierz klasę:{" "}
        <select
          name="class"
          id="teacher-marks-class"
          onChange={handleSelectChange}
        >
          <option className="teacher-marks-class-option">Wybierz klasę</option>
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

        Data: <input type="date" name="date" id="id" ></input>

        Wybierz numer lekcji:{" "}
        <select
          name="lessonNumber"
          id="teacher-attendance-lesson-number"
          onChange={(e) => setSelectedLessonNumber(e.target.value)}
        >
          <option className="teacher-attendance-lesson-number-option">
            Wybierz numer lekcji
          </option>
          {generateLessonNumbers()}
        </select>


        {/* {studentsAttendance.length > 0 && ( */}
  <div>
    <table className="teacher-attendance-table">
      <thead>
        <tr className="teacher-attendance-table-th">
          <th>Uczeń</th>
          <th>Obecność</th>
        </tr>
      </thead>
      <tbody>
        {studentsAttendance.map((student, studentIndex) => (
          <tr key={studentIndex}>
            <td>{`${student.first_name} ${student.second_name}`}</td>
            {/* Dodaj kolumny z obecnością, np. checkboxy */}
            <td>
              {/* Dodaj tutaj odpowiednie pola do zaznaczania obecności */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
{/* )} */}


      </div>
    </div>
  );
}
