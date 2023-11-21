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


import React, { useState, useEffect } from "react";
import './AdminMarks.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export function AdminMarks(){
    const [open, setOpen] = useState(false);
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]); // Dodane

    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedSubject, setSelectedSubject] = useState(""); // Dodane

    const [gradeData, setGradeData] = useState({
        grade: "",
        type: "",
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
        setGradeData(prevData => ({
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
        fetch('/schools')
            .then(response => response.json())
            .then(data => setSchools(data))
            .catch(error => console.error('Błąd pobierania szkół:', error));
    }, []);

    const handleSchoolChange = (event) => {
        const schoolId = event.target.value;

        // Pobierz listę klas w danej szkole
        fetch(`/classes/${schoolId}`)
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Błąd pobierania klas:', error));

        // Pobierz listę uczniów w danej szkole
        fetch(`/students/${schoolId}`)
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Błąd pobierania uczniów:', error));

        // Pobierz listę nauczycieli w danej szkole
        fetch(`/teachers/${schoolId}`)
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Błąd pobierania nauczycieli:', error));

        // Pobierz listę przedmiotów w danej szkole
        fetch(`/subjects/${schoolId}`)
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error('Błąd pobierania przedmiotów:', error));

        setSelectedSchool(schoolId);
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value);
    };

    const handleSubjectChange = (event) => { // Dodane
        setSelectedSubject(event.target.value);
    };

    const fetchGrades = (studentId, subjectId) => {
        // Wysyłaj zapytanie do serwera, aby pobrać oceny dla danego ucznia i przedmiotu
        fetch(`/marks/${studentId}/${subjectId}`)
            .then(response => response.json())
            .then(data => {
                // Tutaj możesz przetworzyć pobrane oceny i zaktualizować stan lub cokolwiek innego
                console.log("Pobrane oceny:", data);
            })
            .catch(error => console.error('Błąd pobierania ocen:', error));
    };

       const handleSearch = () => {
        if (!selectedStudent || !selectedSubject || !gradeData.grade || !gradeData.type || !gradeData.weight) {
            // Dodaj odpowiednią obsługę błędu lub informację dla użytkownika
            console.error('Wprowadź wszystkie wymagane informacje.');
            return;
        }

        const requestData = {
            student_id: selectedStudent,
            subject_id: selectedSubject,
            grade_value: gradeData.grade,
            weight: gradeData.weight,
            description: gradeData.comment,
            teacher_id: selectedTeacher,  // Dodaj odpowiednie ID nauczyciela
            date: new Date().toISOString()  // Dodaj datę oceny, możesz dostosować format daty do własnych potrzeb
        };

        // Tutaj możesz użyć selectedSchool, selectedClass, selectedStudent, selectedTeacher, selectedSubject do wyszukiwania
        fetchGrades(selectedStudent, selectedSubject); // Pobierz oceny dla danego ucznia i przedmiotu
        handleOpen(); // Otwórz modal

        // Poniżej dodaj fragment kodu do wysyłania oceny na serwer
        fetch('/add-marks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Ocena dodana pomyślnie:', data);
                // Dodaj dowolną dodatkową logikę po dodaniu oceny, jeśli to konieczne
            })
            .catch(error => console.error('Błąd dodawania oceny:', error));
    };
    
    const handleSaveGrade = () => {
        // Tutaj możesz wysłać dane oceny na serwer
        // Dostęp do danych oceny znajduje się w gradeData

        handleClose(); // Zamknij modal po dodaniu oceny
    };


    return(
        <>
        
        <div className="marks-container">
            <AdminMenu />
            
         
            <div className="admin-marks-elements">
                    <h2 className="admin-marks-header">Oceny</h2>
                    <form>
                        <p className="marks-title">Szkoła</p>
                        <select value={selectedSchool} onChange={handleSchoolChange} className="marks-selection">
                            <option value="-" >Wybierz szkołę</option>
                            {schools.map(school => (
                                <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                            ))}
                        </select>

                        <p className="marks-title">Klasa</p>
                        <select value={selectedClass} onChange={handleClassChange} className="marks-selection">
                            <option value="-" disabled>Wybierz klasę</option>
                            {classes.map(classItem => (
                                <option key={classItem.class_id} value={classItem.class_id}>{classItem.class_name}</option>
                            ))}
                        </select>

                        <p className="marks-title">Uczeń</p>
                        <select value={selectedStudent} onChange={handleStudentChange} className="marks-selection">
                            <option value="-" disabled>Wybierz ucznia</option>
                            {students.map(student => (
                                <option key={student.student_id} value={student.student_id}>{`${student.first_name} ${student.second_name}`}</option>
                            ))}
                        </select>

                        <p className="marks-title">Nauczyciel</p>
                        <select value={selectedTeacher} onChange={handleTeacherChange} className="marks-selection">
                            <option value="-" disabled>Wybierz nauczyciela</option>
                            {teachers.map(teacher => (
                                <option key={teacher.teacher_id} value={teacher.teacher_id}>{`${teacher.first_name} ${teacher.second_name}`}</option>
                            ))}
                        </select>

                        <p className="marks-title">Przedmiot</p> {/* Dodane */}
                        <select value={selectedSubject} onChange={handleSubjectChange} className="marks-selection">
                            <option value="-" disabled>Wybierz przedmiot</option>
                            {subjects.map(subject => (
                                <option key={subject.subject_id} value={subject.subject_id}>{subject.subject_name}</option>
                            ))}
                        </select>

                        <input type="button" value="Wyszukaj" className="admin-marks-saveBtn" onClick={handleSearch} />
                    </form>

                    <table className="marks-table">
                    <tr >
                    <th className="header-table">
                        Przedmiot
                    </th>
                    <th className="header-table">
                        Oceny
                    </th>
                    <th className="header-table">
                        Średnia
                    </th>
                    <th className="header-table">
                        Średnia ważona
                    </th>
                    </tr>
                    <tr>
                        <td>{subjects.subject_name}</td>
                        <td><input type="button" value="+" onClick={handleOpen} className="admin-marks-button"/>
                        
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                >
                                    <Box sx={{ ...style, width: 200 }}>
                                        <h2>Ocena</h2>
                                        Ocena: <input type="number" name="grade" id="grade" min="0.01" max="6.0" value={gradeData.grade}
                                                onChange={handleInputChange}/><br />
                                        Typ: <input type="text" name='type' value={gradeData.type}
                                                onChange={handleInputChange}></input>
                                        Waga: <input type="number" name="weight" id="" value={gradeData.weight}
                                                onChange={handleInputChange}/>
                                        Komentarz: <input type="text" name="comment" id=""  value={gradeData.comment}
                                                onChange={handleInputChange}/>
                                        <Button onClick={handleSaveGrade}>Zapisz</Button>
                                        <Button onClick={handleClose}>Zamknij</Button>
                                    </Box>
                            </Modal>
                        </td>
                    </tr>

                    {/* Pozostałe wiersze dla innych przedmiotów */}

                </table>
                
                <input type="button" value="Zapisz" onClick={handleSaveGrade} className='admin-marks-saveBtn' id='admin-button-save'/>
                </div>

        </div>
        </>
    );
}
