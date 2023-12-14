// import React, { useState, useEffect } from "react";
// import { TeacherMenu } from '../../menu/teacher/TeacherMenu';
// import './TeacherMarks.css';
// import { backendServer } from '../../../config';

// export function TeacherMarks() {
//     const [userData, setUserData] = useState([]);
//     const [schools, setSchools] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [error, setError] = useState([]);
//     const [isDataFilled, setIsDataFilled] = useState(false);
//     const [selectedClass, setSelectedClass] = useState("");
//     const [selectedSubject, setSelectedSubject] = useState("");
//     const [selectedStudent, setSelectedStudent] = useState("");
//     const [gradeValue, setGradeValue] = useState("");
//     const [weight, setWeight] = useState("");
//     const [description, setDescription] = useState("");

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userEmail = localStorage.getItem("userEmail");

//                 if (userEmail) {
//                     const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//                     const result = await fetch(userQuery);
//                     const userData = await result.json();
//                     console.log("userData: ", userData);
//                     setUserData(userData);
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         if (userData.length > 0) {
//             const schoolId = userData[0].school_id;
//             console.log("schoolId: ", schoolId);
//             fetch(`${backendServer}/classes/${schoolId}`)
//                 .then(response => response.json())
//                 .then(data => setClasses(data))
//                 .catch(error => console.error('Błąd pobierania klas:', error));
//         }
//     }, [userData]);

//     const handleSelectChange = async (event) => {
//         const { name, value } = event.target;

//         // Aktualizuj stan w zależności od zmienionego selecta
//         switch (name) {
//             case "class":
//                 setSelectedClass();
//                 // Pobierz przedmioty dla wybranej klasy
//                 try {
//                     const classId = classes;
//                     console.log("classId ", classId)
//                     const subjectsData = await fetch(`${backendServer}/subjects/class/${classId}`);
//                     const subjects = await subjectsData.json();
//                     setSubjects(subjects);
//                 } catch (error) {
//                     console.error('Błąd pobierania przedmiotów:', error);
//                 }
//                 break;
//             case "subject":
//                 setSelectedSubject(value);
//                 // Pobierz uczniów dla wybranej klasy i przedmiotu
//                 try {
//                     const studentsData = await fetch(`${backendServer}/students/${selectedClass}/${value}`);
//                     const students = await studentsData.json();
//                     setStudents(students);
//                 } catch (error) {
//                     console.error('Błąd pobierania uczniów:', error);
//                 }
//                 break;
//             case "student":
//                 setSelectedStudent(value);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleSaveMarks = () => {
//         // Wyślij żądanie do serwera w celu dodania oceny
//         fetch(`${backendServer}/add-marks`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 student_id: selectedStudent,
//                 subject_id: selectedSubject,
//                 grade_value: gradeValue,
//                 weight: weight,
//                 description: description,
//                 teacher_id: userData[0].teacher_id,
//                 date: new Date().toISOString(),
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data.message);
//                 // Zaktualizuj stan, jeśli potrzebujesz
//             })
//             .catch(error => console.error('Błąd dodawania oceny:', error));
//     };

//     return(
//     <div className="teacher-marks-container">
//         <TeacherMenu />

//         <div className="teacher-marks-elements">
//         <h3>Oceny</h3>

//         <div className="teacher-marks-form">

//             Wybierz klasę:
//             <select name="" id="teacher-marks-class" onChange={handleSelectChange}>
//                 <option className="teacher-marks-class-option">Wybierz klasę</option>
//                 {classes.map(cls => (
//                             <option className="teacher-marks-class-option" key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
//                         ))}
//             </select>

//             Wybierz przedmiot:
//             <select name="" id="teacher-marks-subject">
//                 <option className="teacher-marks-subject-option">Wybierz przedmiot</option>
//                 <option className="teacher-marks-subject-option">{}</option>
//             </select>


//             {isDataFilled && (
//             <table className="teacher-marks-table">
//                 <thead>
//                     <th className="teacher-marks-table-th">
//                         Uczeń
//                     </th>
//                     <th className="teacher-marks-table-th">
//                         Oceny
//                     </th>
//                     <th className="teacher-marks-table-th">
//                         Średnia arytmetyczna
//                     </th>
//                     <th className="teacher-marks-table-th">
//                         Średnia ważona
//                     </th>
//                     <th className="teacher-marks-table-th">
//                         Ocena końcowa
//                     </th>
//                 </thead>
//                 <tbody>
//                     <td className="teacher-marks-table-td">
//                     {students.map(student => (
//                             <option key={student.student_id} value={student.student_id}>{`${student.first_name} ${student.second_name}`}</option>
//                         ))}
//                     </td>
//                     <td className="teacher-marks-table-td">
                        
//                     </td>
//                     <td className="teacher-marks-table-td">
                        
//                     </td>
//                     <td className="teacher-marks-table-td">
                        
//                     </td>
//                     <td className="teacher-marks-table-td">
                        
//                     </td>
//                 </tbody>
//             </table>
//             )}
            
//             {/* Wybierz ucznia: 
//             <select name="" id="teacher-marks-student">
//                 <option value="teacher-marks-student-option">Wybierz ucznia</option>
//                 <option value="teacher-marks-student-option">{}</option>
//             </select> */}


// {/* 
//             Ocena:
//             <input type="text" name="" id="" className="teacher-marks-mark"/>

//             Waga:
//             <input type="number" className="teacher-marks-weight" min={0} />

//             Komentarz:
//             <input type="text" className="teacher-marks-comment" /> */}
            

//             {/* <button type="button" onClick={handleSaveMarks}>Dodaj ocenę</button> */}
//         </div>

//         </div>
//     </div>
//     );
// }


//----------------------------------------------------------------


// import React, { useState, useEffect } from "react";
// import { TeacherMenu } from '../../menu/teacher/TeacherMenu';
// import './TeacherMarks.css';
// import { backendServer } from '../../../config';
// import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
// import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
// import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";

// export function TeacherMarks() {
//     const [userData, setUserData] = useState([]);
//     const [schools, setSchools] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [marks, setMarks] = useState([]);
//     const [error, setError] = useState([]);
//     const [isDataFilled, setIsDataFilled] = useState(false);
//     const [selectedClass, setSelectedClass] = useState("");
//     const [selectedSubject, setSelectedSubject] = useState("");
//     const [selectedStudent, setSelectedStudent] = useState("");
//     const [gradeValue, setGradeValue] = useState("");
//     const [weight, setWeight] = useState("");
//     const [description, setDescription] = useState("");

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userEmail = localStorage.getItem("userEmail");

//                 if (userEmail) {
//                     const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//                     const result = await fetch(userQuery);
//                     const userData = await result.json();
//                     console.log("userData: ", userData);
//                     setUserData(userData);
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         if (userData.length > 0) {
//             const schoolId = userData[0].school_id;
//             console.log("schoolId: ", schoolId);
//             fetch(`${backendServer}/classes/${schoolId}`)
//                 .then(response => response.json())
//                 .then(data => setClasses(data))
//                 .catch(error => console.error('Błąd pobierania klas:', error));
//         }
//     }, [userData]);

//     const handleSelectChange = async (event) => {
//         const { name, value } = event.target;

//         // Aktualizuj stan w zależności od zmienionego selecta
//         switch (name) {
//             case "class":
//                 setSelectedClass(value);
//                 // Pobierz przedmioty dla wybranej klasy
//                 try {
//                     const subjectsData = await fetch(`${backendServer}/subjects/class/${value}`);
//                     const subjects = await subjectsData.json();
//                     setSubjects(subjects);
//                     console.log(`subjects:`, subjects);
//                 } catch (error) {
//                     console.error('Błąd pobierania przedmiotów:', error);
//                 }
//                 break;
//             case "subject":
//                 setSelectedSubject(value);
//                 // Pobierz uczniów dla wybranej klasy i przedmiotu
//                 try {
//                     const schoolId = userData[0].school_id;
//                     const classId = subjects[0].class_id;
//                     const subjectId = subjects[0].subject_id;
//                     const studentsData = await fetch(`${backendServer}/subjects-all-classes-students/${schoolId}/${classId}/${subjectId}`);
//                     const students = await studentsData.json();
//                     setStudents(students);
//                     console.log("students: ", students);
//                 } catch (error) {
//                     console.error('Błąd pobierania uczniów:', error);
//                 }
//                 break;
//             default:
//                 break;
//         }
//     };

//     useEffect(() => {
//         const fetchMarksData = async () => {
//             try{

//                         const subjectId = subjects[0].subject_id;
//                         const classId = students[0].classId;
    
//                         const marksData = await fetch(`${backendServer}/marks/${classId}/${subjectId}`);
//                         const marks = await marksData.json();
//                         console.log("marks: ", marks);
    
//                         setMarks(marks);
//             }catch (error) {
//                 console.error('Błąd pobierania ocen:', error);
//             }
//         }; fetchMarksData();
//     }, [])

//     return (
//       <div className="teacher-marks-container">
//         <TeacherMenu />

//         <div className="teacher-marks-elements">
//           <h3>Oceny</h3>

//           <div className="teacher-marks-form">
//             Wybierz klasę:
//             <select
//               name="class"
//               id="teacher-marks-class"
//               onChange={handleSelectChange}
//             >
//               <option className="teacher-marks-class-option">
//                 Wybierz klasę
//               </option>
//               {classes.map((cls) => (
//                 <option
//                   className="teacher-marks-class-option"
//                   key={cls.class_id}
//                   value={cls.class_id}
//                 >
//                   {cls.class_name}
//                 </option>
//               ))}
//             </select>
//             Wybierz przedmiot:
//             <select
//               name="subject"
//               id="teacher-marks-subject"
//               onChange={handleSelectChange}
//             >
//               <option className="teacher-marks-subject-option">
//                 Wybierz przedmiot
//               </option>
//               {subjects.map((subj) => (
//                 <option
//                   className="teacher-marks-subject-option"
//                   key={subj.subject_id}
//                   value={subj.subject_id}
//                 >
//                   {subj.subject_name}
//                 </option>
//               ))}
//             </select>
//             {isDataFilled && classes.length > 0 && subjects.length > 0 && students.length > 0 && (
//               <table className="teacher-marks-table">
//                 <thead>
//                   <tr className="teacher-marks-table-th">
//                     <th>Uczeń</th>
//                     <th>Oceny</th>
//                     <th>Średnia arytmetyczna</th>
//                     <th>Średnia ważona</th>
//                     <th>Przewidywana ocena końcowa</th>
//                     <th>Ocena końcowa</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student.student_id}>
//                       <td>{`${student.first_name} ${student.second_name}`}</td>
//                       <td>
//                         {marks[student.student_id] &&
//                           marks[student.student_id].map((mark) => (
//                             <span key={mark.grade_id}>{mark.grade}, </span>
//                           ))}
//                       </td>
//                       <td>
//                         {marks[student.student_id] &&
//                           calculateAritmeticAverage(marks[student.student_id])}
//                       </td>
//                       <td>
//                         {marks[student.student_id] &&
//                           calculateWeightedAverage(
//                             marks[student.student_id],
//                             /* tutaj dodaj tablicę wag */
//                           )}
//                       </td>
//                       <td>
//                         {marks[student.student_id] &&
//                           expectedGrades(
//                             calculateWeightedAverage(
//                               marks[student.student_id],
//                               /* tutaj dodaj tablicę wag */
//                             )
//                           )}
//                       </td>
//                       <td></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     );
// }





//----------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { TeacherMenu } from '../../menu/teacher/TeacherMenu';
import './TeacherMarks.css';
import { backendServer } from '../../../config';
import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";

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
                .then(response => response.json())
                .then(data => setClasses(data))
                .catch(error => console.error('Błąd pobierania klas:', error));
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
                    const subjectsData = await fetch(`${backendServer}/subjects/class/${value}`);
                    const subjects = await subjectsData.json();
                    setSubjects(subjects);
                    console.log(`subjects:`, subjects);
                } catch (error) {
                    console.error('Błąd pobierania przedmiotów:', error);
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
        const fetchData = async () => {
            try {
                if (selectedClass && selectedSubject) {
                    const schoolId = userData[0].school_id;
                    const classId = selectedClass;
                    const subjectId = selectedSubject;
                    
    
                    console.log("classId: ", classId);
                    console.log("subjectId: ", subjectId);
    
                    const studentsData = await fetch(`${backendServer}/subjects-all-classes-students/${schoolId}/${classId}/${subjectId}`);
                    const students = await studentsData.json();
                    setStudents(students);
                    const studentId = students[0].student_id;

                    const marksData = await fetch(`${backendServer}/marks-students/${classId}/${subjectId}`);
                    const marks = await marksData.json();
                    setMarks(marks);
                    console.log("selectedSubject:", selectedSubject);
                    console.log("students:", students);
                    console.log("marks:", marks);
    


                    setIsDataFilled(true);
                }
            } catch (error) {
                console.error('Błąd pobierania danych:', error);
            }
        };
    
        fetchData();
    }, [selectedClass, selectedSubject]);



    //-----
// Dodaj nowy stan do przechowywania szczegółów nowej oceny
const [newGrade, setNewGrade] = useState({
    gradeValue: "",
    weight: "",
    description: "",
  });
  
  // Funkcja obsługująca kliknięcie w przycisk plusa
  const handleAddGrade = () => {
    // Wyświetl modal lub formularz do wprowadzenia szczegółów nowej oceny
    // Po zatwierdzeniu szczegółów wywołaj funkcję do dodawania oceny
    addNewGrade();
  };
  
  // Funkcja do dodawania nowej oceny
  const addNewGrade = async () => {
    try {
      // Pobierz niezbędne dane
      const studentId = students[0].student_id;
      const subjectId = selectedSubject;
      const teacherId = marks[0].teacher_id;
      const date = new Date(); // Możesz dostosować format daty
  
      // Wyslij żądanie do serwera, aby dodać nową ocenę
      const response = await fetch(`${backendServer}/add-marks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          subject_id: subjectId,
          grade_value: newGrade.gradeValue,
          weight: newGrade.weight,
          description: newGrade.description,
          teacher_id: teacherId,
          date: date,
        }),
      });
  
      if (response.status === 201) {
        console.log("Ocena dodana pomyślnie.");
        // Pobierz ponownie oceny po dodaniu nowej oceny
        // Możesz użyć już istniejącej funkcji fetchData
      } else {
        console.error("Błąd dodania oceny.");
        // Obsłuż błąd, np. wyświetl komunikat użytkownikowi
      }
    } catch (error) {
      console.error("Błąd dodania oceny:", error);
      // Obsłuż błąd, np. wyświetl komunikat użytkownikowi
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
                    <th>Ocena końcowa</th>
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
                              >
                                {mark.grade_value}
                                <div className="tooltiptext">
                                  <span>Waga: {mark.weight}</span>
                                  <span>Opis: {mark.description}</span>
                                </div>
                                
                              </button>
                              
                            ))}</div>
                          <button onClick={handleAddGrade}>+</button>
                        </div>
                      </td>
                      <td>
                        {marks[student.student_id] &&
                          calculateAritmeticAverage(marks[student.student_id])}
                      </td>
                      <td>
                        {marks[student.student_id] &&
                          calculateWeightedAverage(
                            marks[student.student_id]
                            /* tutaj dodaj tablicę wag */
                          )}
                      </td>
                      <td>
                        {marks[student.student_id] &&
                          expectedGrades(
                            marks[student.student_id],
                            console.log(
                              "student.student_id: ",
                              student.student_id
                            )
                          )}
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
}
