// import React, { useEffect, useState } from "react";
// import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
// import "./TeacherAttendance.css";
// import { backendServer } from "../../../config";
// import Checkbox from "@mui/material/Checkbox";


// export function TeacherAttendance() {
//   const [userData, setUserData] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState([]);

//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedLessonNumber, setSelectedLessonNumber] = useState("");
//   const [selectedStudentId, setSelectedStudentId] = useState("");

//   const [studentsAttendance, setStudentsAttendance] = useState([]);


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");

//         if (userEmail) {
//           const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//           const result = await fetch(userQuery);
//           const userData = await result.json();
//           console.log("userData: ", userData);

//           if (result.ok) {
//             setUserData(userData);
//           }
//         }
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const generateLessonNumbers = () => {
//     const lessonNumbers = [];

//     for (let i = 1; i <= 14; i++) {
//       lessonNumbers.push(
//         <option
//           key={i}
//           className="teacher-attendance-lesson-number-option"
//           value={i}
//         >
//           {i}
//         </option>
//       );
//     }

//     return lessonNumbers;
//   };

//   const fetchData = async () => {
//     try {
//       if (selectedClass && selectedDate && selectedLessonNumber) {
//         const classId = selectedClass;

//         const attendanceData = await fetch(
//           `${backendServer}/attendance-all-for-class/${selectedClass}/${selectedLessonNumber}`
//         );
//         const attendance = await attendanceData.json();
//         setAttendance(attendance);
//       } else {
//         console.error("Wszystkie pola formularza muszą być uzupełnione.");
//       }
//     } catch (error) {
//       console.error("Błąd pobierania danych:", error);
//     }
//   };

//   useEffect(() => {
//     if (userData.length > 0) {
//       const schoolId = userData[0].school_id;
//       console.log("schoolId: ", schoolId);
//       fetch(`${backendServer}/classes/${schoolId}`)
//         .then((response) => response.json())
//         .then((data) => setClasses(data))
//         .catch((error) => console.error("Błąd pobierania klas:", error));
//     }
//   }, [userData]);

//   const handleSelectChange = async (event) => {
//     const { name, value } = event.target;

//     switch (name) {
//       case "class":
//         setSelectedClass(value);
//         try {
//           if (selectedClass && selectedLessonNumber) {
//             const studentsData = await fetch(
//               `${backendServer}/attendance-all-for-class/${selectedClass}/${selectedLessonNumber}`
//             );
//             const students = await studentsData.json();
//             setStudentsAttendance(students);
//             console.log(`students:`, students);
//           }
//         } catch (error) {
//           console.error("Błąd pobierania uczniów:", error);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const handleAttendanceChange = (studentId) => {
//     const studentAttendance = attendance.find((a) => a.student_id === studentId);

//     if (studentAttendance) {
//       const updatedAttendance = attendance.filter((a) => a.student_id !== studentId);
//       setAttendance(updatedAttendance);
//     } else {
//       setAttendance([...attendance, { student_id: studentId }]);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [selectedClass, selectedDate, selectedLessonNumber]);

//   return (
//   <div className="teacher-attendance-container">
//     <TeacherMenu />
//     <div className="teacher-attendance-elements">
//       <h2>Obecność</h2>
//       Wybierz klasę:{" "}
//       <select
//         name="class"
//         id="teacher-marks-class"
//         onChange={handleSelectChange}
//       >
//         <option className="teacher-marks-class-option">Wybierz klasę</option>
//         {classes.map((cls) => (
//           <option
//             className="teacher-marks-class-option"
//             key={cls.class_id}
//             value={cls.class_id}
//           >
//             {cls.class_name}
//           </option>
//         ))}
//       </select>

//       Data: <input type="date" name="date" id="id" ></input>

//       Wybierz numer lekcji:{" "}
//       <select
//         name="lessonNumber"
//         id="teacher-attendance-lesson-number"
//         onChange={(e) => setSelectedLessonNumber(e.target.value)}
//       >
//         <option className="teacher-attendance-lesson-number-option">
//           Wybierz numer lekcji
//         </option>
//         {generateLessonNumbers()}
//       </select>

//       {studentsAttendance.length > 0 && (
//         <div>
//           <table className="teacher-attendance-table">
//             <thead>
//               <tr className="teacher-attendance-table-th">
//                 <th>Uczeń</th>
//                 <th>Obecność</th>
//               </tr>
//             </thead>
//             <tbody>
//               {studentsAttendance.map((student, studentIndex) => (
//                 <tr key={studentIndex}>
//                   <td>{`${student.first_name} ${student.second_name}`}</td>
//                   <td>
//                     <Checkbox
//                       checked={attendance.some((a) => a.student_id === student.student_id)}
//                       onChange={() => handleAttendanceChange(student.student_id)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import "./TeacherAttendance.css";
import { backendServer } from "../../../config";
import Checkbox from "@mui/material/Checkbox";

export function TeacherAttendance() {
  const [userData, setUserData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLessonNumber, setSelectedLessonNumber] = useState("");

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
        const classId = selectedClass;

        const attendanceData = await fetch(
          `${backendServer}/attendance-all-for-class/${selectedClass}/${selectedLessonNumber}`
        );
        const attendance = await attendanceData.json();
        setAttendance(attendance);
      } 
      // else {
      //   console.error("Wszystkie pola formularza muszą być uzupełnione.");
      // }
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

    switch (name) {
      case "class":
        setSelectedClass(value);
        break;
      case "date":
        setSelectedDate(value);
        break;
      case "lessonNumber":
        setSelectedLessonNumber(value);
        break;
      default:
        break;
    }
  };

  const handleAttendanceChange = (studentId) => {
    const studentAttendance = attendance.find((a) => a.student_id === studentId);

    if (studentAttendance) {
      const updatedAttendance = attendance.filter((a) => a.student_id !== studentId);
      setAttendance(updatedAttendance);
    } else {
      setAttendance([...attendance, { student_id: studentId }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClass, selectedDate, selectedLessonNumber]);

//   return (
//     <div className="teacher-attendance-container">
//       <TeacherMenu />
//       <div className="teacher-attendance-elements">
//         <h2>Obecność</h2>
//         Wybierz klasę:{" "}
//         <select
//           name="class"
//           id="teacher-marks-class"
//           onChange={handleSelectChange}
//         >
//           <option className="teacher-marks-class-option">Wybierz klasę</option>
//           {classes.map((cls) => (
//             <option
//               className="teacher-marks-class-option"
//               key={cls.class_id}
//               value={cls.class_id}
//             >
//               {cls.class_name}
//             </option>
//           ))}
//         </select>

//         Data: <input type="date" name="date" id="id" onChange={(e) => setSelectedDate(e.target.value)}></input>


//         Wybierz numer lekcji:{" "}
//         <select
//           name="lessonNumber"
//           id="teacher-attendance-lesson-number"
//           onChange={handleSelectChange}
//         >
//           <option className="teacher-attendance-lesson-number-option">
//             Wybierz numer lekcji
//           </option>
//           {generateLessonNumbers()}
//         </select>

//         {studentsAttendance.length > 0 && (
//           <div>
//             <table className="teacher-attendance-table">
//               <thead>
//                 <tr className="teacher-attendance-table-th">
//                   <th>Uczeń</th>
//                   <th>Obecność</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {studentsAttendance.map((student, studentIndex) => (
//                   <tr key={studentIndex}>
//                     <td>{`${student.first_name} ${student.second_name}`}</td>
//                     <td>
//                       <Checkbox
//                         checked={attendance.some((a) => a.student_id === student.student_id)}
//                         onChange={() => handleAttendanceChange(student.student_id)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// ... (reszta kodu)

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

      {studentsAttendance.length > 0 && (
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
                  <td>
                    <Checkbox
                      checked={attendance.some(
                        (a) => a.student_id === student.student_id
                      )}
                      onChange={() =>
                        handleAttendanceChange(student.student_id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Jeżeli dane nie są dostępne, wyświetl informację */}
      {studentsAttendance.length === 0 && (
        <p>Wybierz klasę, datę i numer lekcji, aby wyświetlić obecność.</p>
      )}
    </div>
  </div>
);


      }