// import React, { useState, useEffect } from "react";
// import './AdminMarks.css';
// import { AdminMenu } from "../../menu/admin/AdminMenu";
// import Modal from '@mui/material/Modal';
// import Button from "@mui/material/Button";
// import Box from '@mui/material/Box';

// export function AdminMarks(){
//     const [open, setOpen] = useState(false);
//     const [schools, setSchools] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [teachers, setTeachers] = useState([]);

//     const [selectedSchool, setSelectedSchool] = useState("");
//     const [selectedClass, setSelectedClass] = useState("");
//     const [selectedStudent, setSelectedStudent] = useState("");
//     const [selectedTeacher, setSelectedTeacher] = useState("");

//     const [gradeData, setGradeData] = useState({
//         grade: "",
//         type: "",
//         weight: "",
//         comment: ""
//     });

//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setGradeData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };


//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         pt: 2,
//         px: 4,
//         pb: 3,
//     };

//     useEffect(() => {
//         // Pobierz listę szkół
//         fetch('/schools')
//             .then(response => response.json())
//             .then(data => setSchools(data))
//             .catch(error => console.error('Błąd pobierania szkół:', error));
//     }, []);

//     const handleSchoolChange = (event) => {
//         const schoolId = event.target.value;

//         // Pobierz listę klas w danej szkole
//         fetch(`/classes/${schoolId}`)
//             .then(response => response.json())
//             .then(data => setClasses(data))
//             .catch(error => console.error('Błąd pobierania klas:', error));

//         // Pobierz listę uczniów w danej szkole
//         fetch(`/students/${schoolId}`)
//             .then(response => response.json())
//             .then(data => setStudents(data))
//             .catch(error => console.error('Błąd pobierania uczniów:', error));

//         // Pobierz listę nauczycieli w danej szkole
//         fetch(`/teachers/${schoolId}`)
//             .then(response => response.json())
//             .then(data => setTeachers(data))
//             .catch(error => console.error('Błąd pobierania nauczycieli:', error));

//         setSelectedSchool(schoolId);
//     };

//     const handleClassChange = (event) => {
//         setSelectedClass(event.target.value);
//     };

//     const handleStudentChange = (event) => {
//         setSelectedStudent(event.target.value);
//     };

//     const handleTeacherChange = (event) => {
//         setSelectedTeacher(event.target.value);
//     };

//     const handleSearch = () => {
//         // Tutaj możesz użyć selectedSchool, selectedClass, selectedStudent, selectedTeacher do wyszukiwania
//         // ...

//         handleOpen(); // Otwórz modal
//     };

//     const handleSaveGrade = () => {
//         // Tutaj możesz wysłać dane oceny na serwer
//         // Dostęp do danych oceny znajduje się w gradeData

//         handleClose(); // Zamknij modal po dodaniu oceny
//     };

//     return(
//         <>
        
//         <div className="marks-container">
//             <AdminMenu />
            
         
//             <div className="admin-marks-elements">
//                     <h2 className="admin-marks-header">Oceny</h2>
//                     <form>
//                         <p className="marks-title">Szkoła</p>
//                         <select value={selectedSchool} onChange={handleSchoolChange} className="marks-selection">
//                             <option value="-" disabled>Wybierz szkołę</option>
//                             {schools.map(school => (
//                                 <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
//                             ))}
//                         </select>

//                         <p className="marks-title">Klasa</p>
//                         <select value={selectedClass} onChange={handleClassChange} className="marks-selection">
//                             <option value="-" disabled>Wybierz klasę</option>
//                             {classes.map(classItem => (
//                                 <option key={classItem.class_id} value={classItem.class_id}>{classItem.class_name}</option>
//                             ))}
//                         </select>

//                         <p className="marks-title">Uczeń</p>
//                         <select value={selectedStudent} onChange={handleStudentChange} className="marks-selection">
//                             <option value="-" disabled>Wybierz ucznia</option>
//                             {students.map(student => (
//                                 <option key={student.student_id} value={student.student_id}>{`${student.first_name} ${student.second_name}`}</option>
//                             ))}
//                         </select>

//                         <p className="marks-title">Nauczyciel</p>
//                         <select value={selectedTeacher} onChange={handleTeacherChange} className="marks-selection">
//                             <option value="-" disabled>Wybierz nauczyciela</option>
//                             {teachers.map(teacher => (
//                                 <option key={teacher.teacher_id} value={teacher.teacher_id}>{`${teacher.first_name} ${teacher.second_name}`}</option>
//                             ))}
//                         </select>

//                         <input type="button" value="Wyszukaj" className="admin-marks-saveBtn" onClick={handleSearch} />
//                     </form>

//                     <table className="marks-table">
//                     <tr >
//                     <th className="header-table">
//                         Przedmiot
//                     </th>
//                     <th className="header-table">
//                         Oceny
//                     </th>
//                     <th className="header-table">
//                         Średnia
//                     </th>
//                     <th className="header-table">
//                         Średnia ważona
//                     </th>
//                     </tr>
//                     <tr>
//                         <td>Język polski</td>
//                         <td><input type="button" value="+" onClick={handleOpen} className="admin-marks-button"/>
                        
//                             <Modal
//                                 open={open}
//                                 onClose={handleClose}
//                                 aria-labelledby="parent-modal-title"
//                                 aria-describedby="parent-modal-description"
//                                 >
//                                     <Box sx={{ ...style, width: 200 }}>
//                                         <h2>Ocena</h2>
//                                         Ocena: <input type="number" name="grade" id="grade" min="0.01" max="6.0" value={gradeData.grade}
//                                                 onChange={handleInputChange}/><br />
//                                         Typ: <input type="text" name='type' value={gradeData.type}
//                                                 onChange={handleInputChange}></input>
//                                         Waga: <input type="number" name="weight" id="" value={gradeData.weight}
//                                                 onChange={handleInputChange}/>
//                                         Komentarz: <input type="text" name="comment" id=""  value={gradeData.comment}
//                                                 onChange={handleInputChange}/>
                                        
//                                         <Button onClick={handleClose}>Zamknij</Button>
//                                     </Box>
//                             </Modal>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td>Matematyka</td>
//                         <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
//                     </tr>
//                     <tr>
//                         <td>Język angielski</td>
//                         <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
//                     </tr>
//                     <tr>
//                         <td>W-F</td>
//                         <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
//                     </tr>
//                     <tr>
//                         <td>Przyroda</td>
//                         <td><td><input type="button" value="+" className="admin-marks-button"/></td></td>
//                     </tr>

//                 </table>
                
//                 <input type="button" value="Zapisz" onClick={handleSaveGrade} className='admin-marks-saveBtn' id='admin-button-save'/>
//                 </div>

//         </div>
//         </>
//     );
// }


// import React, { useState, useEffect } from "react";
// import './AdminMarks.css';
// import { AdminMenu } from "../../menu/admin/AdminMenu";
// import Modal from '@mui/material/Modal';
// import Button from "@mui/material/Button";
// import Box from '@mui/material/Box';
// import { backendServer } from "../../../config";

// export function AdminMarks(){
//     const [open, setOpen] = useState(false);
//     const [schools, setSchools] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [subjects, setSubjects] = useState([]); 

//     const [selectedSchool, setSelectedSchool] = useState("");
//     const [selectedClass, setSelectedClass] = useState("");
//     const [selectedStudent, setSelectedStudent] = useState("");
//     const [selectedTeacher, setSelectedTeacher] = useState("");
//     const [selectedSubject, setSelectedSubject] = useState(""); 

//     const [gradeData, setGradeData] = useState({
//         grade: "",
//         type: "",
//         weight: "",
//         comment: ""
//     });

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setGradeData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         pt: 2,
//         px: 4,
//         pb: 3,
//     };

//     useEffect(() => {
//         // Pobierz listę szkół
//         fetch(`${backendServer}/schools`)
//             .then(response => response.json())
//             .then(data => setSchools(data))
//             .catch(error => console.error('Błąd pobierania szkół:', error));
//     }, []);

//     const handleSchoolChange = (event) => {
//         const schoolId = event.target.value;
//         const selectedClass = event.target.value;
        
//         // Pobierz listę klas w danej szkole
//         fetch(`${backendServer}/classes/${schoolId}`)
//             .then(response => response.json())
//             .then(data => setClasses(data))
//             .catch(error => console.error('Błąd pobierania klas:', error));
    
//         // Pobierz listę uczniów w danej szkole
//         fetch(`${backendServer}/students/${schoolId}/${selectedClass}`)
//             .then(response => response.json())
//             .then(data => setStudents(data))
//             .catch(error => console.error('Błąd pobierania uczniów:', error));
//         // Pobierz listę nauczycieli w danej szkole
//         fetch(`${backendServer}/teachers/${schoolId}`)
//             .then(response => response.json())
//             .then(data => setTeachers(data))
//             .catch(error => console.error('Błąd pobierania nauczycieli:', error));
        
//         // Poczekaj na zakończenie pobierania szkoły przed ustawieniem selectedSchool
//         // i pobraniem listy przedmiotów
//         console.log('przed pobraniem listy przedmiotów schoolId', schoolId);
//         Promise.all([
//             fetch(`${backendServer}/subjects/class/${selectedClass}`)
//                 .then(response => response.json())
//                 .then(data => setSubjects(data))
//                 .catch(error => console.error('Błąd pobierania przedmiotów:', error)),
//             setSelectedSchool(selectedClass)
//         ]);
        
//     };

//     const handleClassChange = (event) => {

//       const selectedClass = event.target.value;
//         console.log("handleClassChange selectedSchool", selectedSchool);
//         // Pobierz listę uczniów w danej klasie
//         fetch(`${backendServer}/students/${selectedSchool}/${selectedClass}`)
//             .then(response => response.json())
//             .then(data => setStudents(data))
//             .catch(error => console.error('Błąd pobierania uczniów:', error));
    
//         // Pobierz listę przedmiotów w danej klasie
//         fetch(`${backendServer}/subjects/${selectedClass}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Pobrane przedmioty:', data);
//                 setSubjects(data);
//             })
//             .catch(error => console.error('Błąd pobierania przedmiotów:', error));
//             console.log("ClassId: ", selectedClass);
//         setSelectedClass(selectedClass);
        
//     };
    
//     const handleStudentChange = (event) => {
//         setSelectedStudent(event.target.value);
//     };

//     const handleTeacherChange = (event) => {
//         setSelectedTeacher(event.target.value);
//     };

//     const handleSubjectChange = (event) => { // Dodane
//         setSelectedSubject(event.target.value);
//     };

//     const fetchGrades = (studentId, subjectId) => {
//         // Wysyłaj zapytanie do serwera, aby pobrać oceny dla danego ucznia i przedmiotu
//         fetch(`${backendServer}/marks/${studentId}/${subjectId}`)
//             .then(response => response.json())
//             .then(data => {
//                 // Tutaj możesz przetworzyć pobrane oceny i zaktualizować stan lub cokolwiek innego
//                 console.log("Pobrane oceny:", data);
//             })
//             .catch(error => console.error('Błąd pobierania ocen:', error));
//     };

//     const handleSearch = () => {
//       if (!selectedStudent || !selectedSubject || !gradeData.grade || !gradeData.type || !gradeData.weight) {
//           console.error('Wprowadź wszystkie wymagane informacje.');
//           return;
//       }
  
//       const requestData = {
//           student_id: selectedStudent,
//           subject_id: selectedSubject,
//           grade_value: gradeData.grade,
//           weight: gradeData.weight,
//           description: gradeData.comment,
//           teacher_id: selectedTeacher,
//           date: new Date().toISOString()
//       };
  
//       // Fetch subjects based on the selected school and class
//       fetch(`${backendServer}/subjects/class/${selectedClass}`)
//           .then(response => response.json())
//           .then(subjectsData => {
//               setSubjects(subjectsData);
              
//               // Fetch grades after setting subjects
//               fetchGrades(selectedStudent, selectedSubject);
//           })
//           .catch(error => console.error('Błąd pobierania przedmiotów:', error));
  
//       // Poniżej dodaj fragment kodu do wysyłania oceny na serwer
//       fetch(`${backendServer}/add-marks`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData),
//       })
//           .then(response => response.json())
//           .then(data => {
//               console.log('Ocena dodana pomyślnie:', data);
//               // Dodaj dowolną dodatkową logikę po dodaniu oceny, jeśli to konieczne
//           })
//           .catch(error => console.error('Błąd dodawania oceny:', error));
  
//       handleOpen(); // Otwórz modal
//   };

    
//     const handleSaveGrade = () => {
//         // Tutaj możesz wysłać dane oceny na serwer
//         // Dostęp do danych oceny znajduje się w gradeData

//         handleClose(); // Zamknij modal po dodaniu oceny
//     };


//     return (
//       <>
//         <div className="marks-container">
//           <AdminMenu />

//           <div className="admin-marks-elements">
//             <h2 className="admin-marks-header">Oceny</h2>
//             <form>
//               <p className="marks-title">Szkoła</p>
//               <select
//                 value={selectedSchool}
//                 onChange={handleSchoolChange}
//                 className="marks-selection"
//               >
//                 <option value="-">Wybierz szkołę</option>
//                 {schools.map((school) => (
//                   <option key={school.school_id} value={school.school_id}>
//                     {school.school_name}
//                   </option>
//                 ))}
//               </select>

//               <p className="marks-title">Klasa</p>
//               <select
//                 value={selectedClass}
//                 onChange={handleClassChange}
//                 className="marks-selection"
//               >
//                 <option value="-">Wybierz klasę</option>
//                 {classes.map((classItem) => (
//                   <option key={classItem.class_id} value={classItem.class_id}>
//                     {classItem.class_name}
//                   </option>
//                 ))}
//               </select>

//               <p className="marks-title">Uczeń</p>
//               <select
//                 value={selectedStudent}
//                 onChange={handleStudentChange}
//                 className="marks-selection"
//               >
//                 <option value="-">Wybierz ucznia</option>
//                 {students.map((student) => (
//                   <option
//                     key={student.student_id}
//                     value={student.student_id}
//                   >{`${student.first_name} ${student.second_name}`}</option>
//                 ))}
//               </select>

//               <p className="marks-title">Nauczyciel</p>
//               <select
//                 value={selectedTeacher}
//                 onChange={handleTeacherChange}
//                 className="marks-selection"
//               >
//                 <option value="-">Wybierz nauczyciela</option>
//                 {teachers.map((teacher) => (
//                   <option
//                     key={teacher.teacher_id}
//                     value={teacher.teacher_id}
//                   >{`${teacher.first_name} ${teacher.second_name}`}</option>
//                 ))}
//               </select>

//               <p className="marks-title">Przedmiot</p>
//               <select
//                 value={selectedSubject}
//                 onChange={handleSubjectChange}
//                 className="marks-selection"
//               >
//                 <option value="-">Wybierz przedmiot</option>
//                 {subjects.map((subject) => (
//                   <option key={subject.subject_id} value={subject.subject_id}>
//                     {subject.subject_name}
//                   </option>
//                 ))}
//               </select><br />

//               <input
//                 type="button"
//                 value="Wyszukaj"
//                 className="admin-marks-saveBtn"
//                 onClick={handleSearch}
//               />
//             </form>

//             <table className="marks-table">
//               <tr>
//                 <th className="header-table">Przedmiot</th>
//                 <th className="header-table">Oceny</th>
//                 <th className="header-table">Średnia</th>
//                 <th className="header-table">Średnia ważona</th>
//               </tr>
//               <tr>
//                 <td>{subjects.subject_name}</td>
//                 <td>
//                   <input
//                     type="button"
//                     value="+"
//                     onClick={handleOpen}
//                     className="admin-marks-button"
//                   />

//                   {/* <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="parent-modal-title"
//                     aria-describedby="parent-modal-description"
//                   >
//                     <Box sx={{ ...style, width: 200 }}>
//                       <h2>Ocena</h2>
//                       Ocena:{" "}
//                       <input
//                         type="number"
//                         name="grade"
//                         id="grade"
//                         min="0.01"
//                         max="6.0"
//                         value={gradeData.grade}
//                         onChange={handleInputChange}
//                       />
//                       <br />
//                       Typ:{" "}
//                       <input
//                         type="text"
//                         name="type"
//                         value={gradeData.type}
//                         onChange={handleInputChange}
//                       ></input>
//                       Waga:{" "}
//                       <input
//                         type="number"
//                         name="weight"
//                         id=""
//                         value={gradeData.weight}
//                         onChange={handleInputChange}
//                       />
//                       Komentarz:{" "}
//                       <input
//                         type="text"
//                         name="comment"
//                         id=""
//                         value={gradeData.comment}
//                         onChange={handleInputChange}
//                       />
//                       <Button onClick={handleSaveGrade}>Zapisz</Button>
//                       <Button onClick={handleClose}>Zamknij</Button>
//                     </Box>
//                   </Modal> */}
//                 </td>
//               </tr>

//               {/* Pozostałe wiersze dla innych przedmiotów */}
//             </table>

//             <input
//               type="button"
//               value="Zapisz"
//               onClick={handleSaveGrade}
//               className="admin-marks-saveBtn"
//               id="admin-button-save"
//             />
//           </div>
//         </div>
//       </>
//     );
// }

import React, { useState, useEffect } from "react";
import './AdminMarks.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { backendServer } from "../../../config";
import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";
import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";

export function AdminMarks() {
  const [open, setOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentGrades, setStudentGrades] = useState({});

  const [gradeData, setGradeData] = useState({
    grade: "",
    date: "",
    weight: "",
    comment: ""
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGradeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    // Pobierz listę szkół
    fetch(`${backendServer}/schools`)
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Błąd pobierania szkół:', error));
  }, []);

  const handleSchoolChange = (event) => {
    const schoolId = event.target.value;
    setSelectedSchool(schoolId);

    // Pobierz listę klas w danej szkole
    fetch(`${backendServer}/classes/${schoolId}`)
      .then(response => response.json())
      .then(data => {
        console.log("selected Class ", data);
        setClasses(data)
      })
      .catch(error => console.error('Błąd pobierania klas:', error));

    // Pobierz listę nauczycieli w danej szkole
    fetch(`${backendServer}/teachers/${schoolId}`)
      .then(response => response.json())
      .then(data => setTeachers(data))
      .catch(error => console.error('Błąd pobierania nauczycieli:', error));
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);

    // Pobierz listę przedmiotów w danej klasie
    fetch(`${backendServer}/subjects/class/${selectedClass}`)
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Błąd pobierania przedmiotów:', error));

    // Pobierz listę uczniów w danej klasie
    fetch(`${backendServer}/students-from-class/${selectedClass}`)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Błąd pobierania uczniów:', error));
  };

  const handleStudentChange = (event) => {
    const selectedStudentId = event.target.value;
    setSelectedStudents(prevSelected => {
      const updatedSelectedStudents = [...prevSelected, selectedStudentId];
      return updatedSelectedStudents;
    });
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSaveGrade = () => {
    // Tutaj możesz wysłać dane oceny na serwer
    // Dostęp do danych oceny znajduje się w gradeData
    // Możesz użyć selectedStudents, selectedTeacher, selectedSubject do wysłania danych na serwer

    // Przypisz ocenę do konkretnego ucznia
    const updatedStudentGrades = { ...studentGrades };

    selectedStudents.forEach((studentId) => {
      if (!updatedStudentGrades[studentId]) {
        updatedStudentGrades[studentId] = [];
      }

      updatedStudentGrades[studentId].push(gradeData);
    });

    setStudentGrades(updatedStudentGrades);

    // Zamknij modal po dodaniu oceny
    handleClose();
  };

  return (
    <>
      <div className="marks-container">
        <AdminMenu />

        <div className="admin-marks-elements">
          <h2 className="admin-marks-header">Oceny</h2>
          <form>
            <p className="marks-title">Szkoła</p>
            <select
              value={selectedSchool}
              onChange={handleSchoolChange}
              className="marks-selection"
            >
              <option value="-">Wybierz szkołę</option>
              {schools.map((school) => (
                <option key={school.school_id} value={school.school_id}>
                  {school.school_name}
                </option>
              ))}
            </select>

            <p className="marks-title">Klasa</p>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="marks-selection"
            >
              <option value="-">Wybierz klasę</option>
              {classes.map((classItem) => (
                <option key={classItem.class_id} value={classItem.class_id}>
                  {classItem.class_name}
                </option>
              ))}
            </select>

            <p className="marks-title">Nauczyciel</p>
            <select
              value={selectedTeacher}
              onChange={handleTeacherChange}
              className="marks-selection"
            >
              <option value="-">Wybierz nauczyciela</option>
              {teachers.map((teacher) => (
                <option
                  key={teacher.teacher_id}
                  value={teacher.teacher_id}
                >{`${teacher.first_name} ${teacher.second_name}`}</option>
              ))}
            </select>

            <p className="marks-title">Przedmiot</p>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="marks-selection"
            >
              <option value="-">Wybierz przedmiot</option>
              {subjects.map((subject) => (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {subject.subject_name}
                </option>
              ))}
            </select><br />

            <input
              type="button"
              value="Wyszukaj"
              className="admin-marks-saveBtn"
              onClick={handleSaveGrade}
            />
          </form>

          <table className="marks-table">
            <thead>
              <tr>
                <th className="header-table">Uczeń</th>
                <th className="header-table">Przedmiot</th>
                <th className="header-table">Oceny</th>
                <th className="header-table">Średnia</th>
                <th className="header-table">Średnia ważona</th>
                <th className="header-table">Przewidywana ocena końcowa</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{`${student.first_name} ${student.second_name}`}</td>
                  <td>{selectedSubject}</td>
                  <td>
                    {studentGrades[student.student_id]?.map((grade, index) => (
                      <div key={index}>
                        {grade.grade}{" "}
                        <Button variant="outlined" size="small">
                          Edytuj
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleOpen}
                      className="admin-marks-button"
                    >
                      +
                    </Button>
                  </td>
                  <td>{calculateAritmeticAverage(studentGrades[student.student_id], student.student_id)}</td>
                  <td>{calculateWeightedAverage(studentGrades[student.student_id], student.student_id)}</td>
                  <td>{expectedGrades(studentGrades[student.student_id], student.student_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <input
            type="button"
            value="Zapisz"
            onClick={handleSaveGrade}
            className="admin-marks-saveBtn"
            id="admin-button-save"
          />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style }}>
              <h2>Ocena</h2>
              Ocena:{" "}
              <input
                type="number"
                name="grade"
                id="grade"
                min="0.01"
                max="6.0"
                step="0.01"
                value={gradeData.grade}
                onChange={handleInputChange}
              />
              <br />
              Data:{" "}
              <input type="date"
                name="date"
                id="date"
                value={gradeData.date}
                onChange={handleInputChange}
              />
              <br />
              Waga:{" "}
              <input
                type="number"
                step="0.1"
                name="weight"
                id="weight"
                value={gradeData.weight}
                onChange={handleInputChange}
              />
              <br />
              Komentarz:{" "}
              <input
                type="text"
                name="comment"
                id="comment"
                value={gradeData.comment}
                onChange={handleInputChange}
              />
              <br />
              <Button
                variant="contained"
                onClick={handleSaveGrade}
                id="admin-button-save"
              >
                Zapisz
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

