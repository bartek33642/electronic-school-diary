import React, { useState, useEffect } from "react";
import { TeacherMenu } from '../../menu/teacher/TeacherMenu';
import './TeacherMarks.css';
import { backendServer } from '../../../config';

export function TeacherMarks() {
    const [userData, setUserData] = useState([]);
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState([]);
    const [isDataFilled, setIsDataFilled] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [gradeValue, setGradeValue] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");

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
                setSelectedClass();
                // Pobierz przedmioty dla wybranej klasy
                try {
                    const classId = classes;
                    console.log("classId ", classId)
                    const subjectsData = await fetch(`${backendServer}/subjects/class/${classId}`);
                    const subjects = await subjectsData.json();
                    setSubjects(subjects);
                } catch (error) {
                    console.error('Błąd pobierania przedmiotów:', error);
                }
                break;
            case "subject":
                setSelectedSubject(value);
                // Pobierz uczniów dla wybranej klasy i przedmiotu
                try {
                    const studentsData = await fetch(`${backendServer}/students/${selectedClass}/${value}`);
                    const students = await studentsData.json();
                    setStudents(students);
                } catch (error) {
                    console.error('Błąd pobierania uczniów:', error);
                }
                break;
            case "student":
                setSelectedStudent(value);
                break;
            default:
                break;
        }
    };

    const handleSaveMarks = () => {
        // Wyślij żądanie do serwera w celu dodania oceny
        fetch(`${backendServer}/add-marks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id: selectedStudent,
                subject_id: selectedSubject,
                grade_value: gradeValue,
                weight: weight,
                description: description,
                teacher_id: userData[0].teacher_id,
                date: new Date().toISOString(),
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Zaktualizuj stan, jeśli potrzebujesz
            })
            .catch(error => console.error('Błąd dodawania oceny:', error));
    };

    return(
    <div className="teacher-marks-container">
        <TeacherMenu />

        <div className="teacher-marks-elements">
        <h3>Oceny</h3>

        <div className="teacher-marks-form">

            Wybierz klasę:
            <select name="" id="teacher-marks-class" onChange={handleSelectChange}>
                <option className="teacher-marks-class-option">Wybierz klasę</option>
                {classes.map(cls => (
                            <option className="teacher-marks-class-option" key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
                        ))}
            </select>

            Wybierz przedmiot:
            <select name="" id="teacher-marks-subject">
                <option className="teacher-marks-subject-option">Wybierz przedmiot</option>
                <option className="teacher-marks-subject-option">{}</option>
            </select>


            {isDataFilled && (
            <table className="teacher-marks-table">
                <thead>
                    <th className="teacher-marks-table-th">
                        Uczeń
                    </th>
                    <th className="teacher-marks-table-th">
                        Oceny
                    </th>
                    <th className="teacher-marks-table-th">
                        Średnia arytmetyczna
                    </th>
                    <th className="teacher-marks-table-th">
                        Średnia ważona
                    </th>
                    <th className="teacher-marks-table-th">
                        Ocena końcowa
                    </th>
                </thead>
                <tbody>
                    <td className="teacher-marks-table-td">
                    {students.map(student => (
                            <option key={student.student_id} value={student.student_id}>{`${student.first_name} ${student.second_name}`}</option>
                        ))}
                    </td>
                    <td className="teacher-marks-table-td">
                        
                    </td>
                    <td className="teacher-marks-table-td">
                        
                    </td>
                    <td className="teacher-marks-table-td">
                        
                    </td>
                    <td className="teacher-marks-table-td">
                        
                    </td>
                </tbody>
            </table>
            )}
            
            {/* Wybierz ucznia: 
            <select name="" id="teacher-marks-student">
                <option value="teacher-marks-student-option">Wybierz ucznia</option>
                <option value="teacher-marks-student-option">{}</option>
            </select> */}


{/* 
            Ocena:
            <input type="text" name="" id="" className="teacher-marks-mark"/>

            Waga:
            <input type="number" className="teacher-marks-weight" min={0} />

            Komentarz:
            <input type="text" className="teacher-marks-comment" /> */}
            

            {/* <button type="button" onClick={handleSaveMarks}>Dodaj ocenę</button> */}
        </div>

        </div>
    </div>
    );
}