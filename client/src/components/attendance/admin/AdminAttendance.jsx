import React, { useEffect, useState } from "react";
import './AdminAttendance.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import { backendServer } from "../../../config";

export function AdminAttendance() {

  const [userData, setUserData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [teachers, setTeachers] = useState([]); 
  const [schools, setSchools] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLessonNumber, setSelectedLessonNumber] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {

  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (userEmail) {
        const userQuery = `${backendServer}/users-school-student/${userEmail}`;
        const result = await fetch(userQuery);
        const userData = await result.json();

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

const fetchSchools = async () => {
    try {
        const schoolsQuery = `${backendServer}/schools`;  
        const result = await fetch(schoolsQuery);
        const schoolData = await result.json();

        if (result.ok) {
            setSchools(schoolData)
        }
    } catch (error) {
        console.error("Błąd pobierania szkół:", error.message);
    }
};

  

const fetchStudentsForClass = async (classId) => {
  try {
    const studentsData = await fetch(`${backendServer}/students-from-class/${classId}`);
    const students = await studentsData.json();
    setStudents(students);
  } catch (error) {
    console.error("Błąd pobierania uczniów:", error);
  }
};

const fetchAttendanceForStudent = async (studentId, lessonNumber, date) => {
  try {
    const response = await fetch(`${backendServer}/attendance-all-for-class/${studentId}/${lessonNumber}/${date}`);
    const attendanceForStudent = await response.json();
    return attendanceForStudent;
  } catch (error) {
    console.error("Error fetching attendance for student:", error);
    return [];
  }
};

const fetchData = async () => {
  try {
    if (selectedSchool && selectedClass && selectedDate && selectedLessonNumber) {
      await fetchStudentsForClass(selectedClass);
      await fetchAttendanceForStudents();
    } else {
      console.error("Wszystkie pola formularza muszą być uzupełnione.");
    }
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
  }
};

useEffect(() => {
  if (userData.length > 0) {
    const schoolId = selectedSchool;
    fetch(`${backendServer}/classes/${schoolId}`)
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Błąd pobierania klas:", error));
  }
}, [userData]);


useEffect(() => {
  const fetchTeachers = async () => {
      try {
          if (userData.length > 0) {
              const schoolId = selectedSchool;
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
  fetchData();
}, [selectedSchool, selectedClass, selectedDate, selectedLessonNumber, selectedTeacher]);

const handleSelectChange = ({ target: { name, value } }) => {
    switch (name) {
      case "school":
        setSelectedSchool(value);
        break;
      case "class":
        setSelectedClass(value);
        break;
      case "date":
        setSelectedDate(value);
        break;
      case "lessonNumber":
        setSelectedLessonNumber(value);
        fetchAttendanceForStudents(); 
        break;
      case "teacher":
        setSelectedTeacher(value);
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    fetchSchools();
  }, []);
  
  useEffect(() => {
    if (selectedSchool) {
        fetchStudentsForClass(selectedSchool)
      
    }
  }, [selectedSchool]);

const handleAttendanceChange = (studentId, status) => {
  const studentAttendanceIndex = attendance.findIndex((a) => a.student_id === studentId);

  if (studentAttendanceIndex !== -1) {
    const updatedAttendance = [...attendance];
    updatedAttendance[studentAttendanceIndex].status = status;
    setAttendance(updatedAttendance);
  } else {
    setAttendance([...attendance, { student_id: studentId, status: status }]);
  }
};

const saveAttendanceChanges = async (studentId, status) => {
  try {
    const existingAttendance = attendance.find((a) => a.student_id === studentId);
    const endpoint = `${backendServer}/attendance/${studentId}`;

    const attendanceForStudent = await fetchAttendanceForStudent(studentId, selectedLessonNumber, selectedDate);

    if (attendanceForStudent.length > 0) {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          status: status,
          teacher_id: userData[0].teacher_id,
          lesson_number: selectedLessonNumber,
          teacher_id: selectedTeacher
        }),
      });

      console.log("PUT Request Data: ", {
        date: selectedDate,
        status: status,
        teacher_id: userData[0].teacher_id,
        lesson_number: selectedLessonNumber,
        teacher_id: selectedTeacher

      });

      if (response.ok) {
        const updatedAttendance = attendance.map((a) =>
          a.student_id === studentId ? { ...a, status: status } : a
        );
        setAttendance(updatedAttendance);
      } else {
        console.error(`Błąd podczas aktualizacji obecności ucznia ${studentId}.`);
      }
    } else {
      const response = await fetch(`${backendServer}/add-attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: selectedClass,
          date: selectedDate,
          lesson_number: selectedLessonNumber,
          status: status,
          student_id: studentId,
          teacher_id: selectedTeacher

        }),
      });

      if (response.ok) {
        console.log(`Zmiany w obecności ucznia ${studentId} zostały zapisane.`);
        setAttendance([...attendance, { student_id: studentId, status: status }]);
      } else {
        console.error(`Błąd podczas zapisywania obecności ucznia ${studentId}.`);
      }
    }
  } catch (error) {
    console.error(`Błąd podczas zapisywania obecności ucznia ${studentId}:`, error);
  }
};

const fetchAttendanceForStudents = async () => {
  try {
    const newAttendance = await Promise.all(
      students.map(async (student) => {
        const attendanceForStudent = await fetchAttendanceForStudent(student.student_id, selectedLessonNumber, selectedDate);
        return {
          student_id: student.student_id,
          status: attendanceForStudent.length > 0 ? attendanceForStudent[0].status : "present",
        };
      })
    );

    setAttendance(newAttendance);
  } catch (error) {
    console.error("Error fetching attendance for students:", error);
  }
};

    return(
        <div className="admin-attendance-container">
            <AdminMenu />

            <div className="admin-attendance-elements">
                <h3>Frekewncja</h3>

                <div className="admin-attendance-buttons">
                </div>

Wybierz szkołę: {" "}
<select name="school" id="" onChange={handleSelectChange}>
<option className="teacher-marks-class-option">Wybierz szkołę</option>

    {schools.map((school) => (
        <option
        className="teacher-marks-class-option"
        key={school.school_id}
        value={school.school_id}
      >
        {school.school_name}
      </option>
    ))}
</select>

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

Wybierz nauczyciela: {" "}
<select name="teacher" id="" onChange={handleSelectChange}>
  <option className="teacher-marks-class-option">Wybierz nauczyciela</option>
  {teachers.map((teacher) => (
    <option
      className="teacher-marks-class-option"
      key={teacher.teacher_id}
      value={teacher.teacher_id} 
    >
      {`${teacher.first_name} ${teacher.second_name}`}
    </option>
  ))}
</select>

Data:{" "}
<input
  type="date"
  name="date"
  id="id"
  onChange={(e) => setSelectedDate(e.target.value)}
></input>

Wybierz numer lekcji:{" "}
<select
  name="lessonNumber"
  id="teacher-attendance-lesson-number"
  onChange={handleSelectChange}
>
  <option className="teacher-attendance-lesson-number-option">
    Wybierz numer lekcji
  </option>
  {generateLessonNumbers()}
</select>

{students.length > 0 && (
  <div>
    <table className="teacher-attendance-table">
      <tbody>
        {students.map((student, studentIndex) => (
          <tr key={studentIndex}>
            <td>{`${student.first_name} ${student.second_name}`}</td>
            <td>
              <select
                value={attendance.find(
                  (a) => a.student_id === student.student_id
                )?.status || "-"}
                onChange={(e) => {
                  handleAttendanceChange(student.student_id, e.target.value);
                }}
              >
                <option value="-" disabled>
                  -
                </option>
                <option value="present">Obecny</option>
                <option value="absent">Nieobecny</option>
                <option value="delay">Spóźniony</option>
                <option value="excused_absence">Usprawiedliwiona nieobecność</option>
              </select>
            </td>
            <td>
              {attendance.find(a => a.student_id === student.student_id) ? (
                <button
                  onClick={() =>
                    saveAttendanceChanges(
                      student.student_id,
                      attendance.find(a => a.student_id === student.student_id)?.status || "present"
                    )
                  }
                >
                  Zaktualizuj
                </button>
              ) : (
                <button
                  onClick={() =>
                    saveAttendanceChanges(
                      student.student_id,
                      attendance.find(a => a.student_id === student.student_id)?.status || "present"
                    )
                  }
                >
                  Zapisz
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{students.length === 0 && (
  <p>Wybierz klasę, datę i numer lekcji, aby wyświetlić obecność.</p>
)}
            </div>
        </div>
    );
}