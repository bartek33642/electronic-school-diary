import React, { useState, useEffect } from "react";
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import './PrincipalTimetable.css';
import { backendServer } from "../../../config";
import { PrincipalClassTimetable } from "./ModalViewTimetable/PrincipalClassTimetable";
import { PrincipalTeacherTimetable } from "./ModalViewTimetable/PrincipalTeacherTimetable";

export function PrincipalTimetable() {
    const [userData, setUserData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLessonNumber, setSelectedLessonNumber] = useState("");

    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [selectedClassroom, setSelectedClassroom] = useState("");
    const [selectedSubstitution, setSelectedSubstitution] = useState(false);
    const [selectedCanceled, setSelectedCanceled] = useState(false);
    const [selectedRecurring, setSelectedRecurring] = useState(false);
    const [selectedEndRecurringDate, setSelectedEndRecurringDate] = useState("");

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
        const fetchSubjects = async () => {
            try {
                if (selectedClass) {
                    const subjectsQuery = `${backendServer}/subjects/class/${selectedClass}`;
                    const result = await fetch(subjectsQuery);
                    const subjectsData = await result.json();

                    if (result.ok) {
                        setSubjects(subjectsData);
                    }
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };
        fetchSubjects();
    }, [selectedClass]);

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

    const handleAddToTimetable = async () => {
        const requestBody = {
            day_of_week: selectedDate,
            start_time: selectedStartTime,
            end_time: selectedEndTime,
            classroom: selectedClassroom,
            is_substitution: selectedSubstitution,
            is_canceled: selectedCanceled,
            is_recurring: selectedRecurring,
            class_id: selectedClass,
            subject_id: selectedSubject,
            teacher_id: selectedTeacher,
            lesson_number: selectedLessonNumber,
            end_recurring_date: selectedEndRecurringDate,
            school_id: userData[0].school_id,
        };

        try {
            const response = await fetch(`${backendServer}/add-timetable`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                console.log('Timetable entry added successfully');
                // Handle success (e.g., show a success message, reset form fields, etc.)
            } else {
                console.error('Failed to add timetable entry');
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error adding timetable entry:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="principal-timetable-container">
            <PrincipalMenu />

            <div className="principal-timetable-elements">
                <h2>Plan zajęć</h2>

                <input type="button" value="Sprawdź plan zajęć klasy" /> <br />
                <input type="button" value="Sprawdź plan zajęć nauczyciela" />

                <div className="principal-timetable-form">
                    <h3>Dodaj plan zajęć</h3>

                    Klasa:{" "}
                    <select
                        name="class_id"
                        id=""
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {classData.map((classItem) => (
                            <option key={classItem.class_id} value={classItem.class_id}>
                                {classItem.class_name}
                            </option>
                        ))}
                    </select>

                    Dzień tygodnia:{" "}
                    <select
                        name="day_if_week"
                        id=""
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        <option value="" disabled>
                            Wybierz dzień tygodnia
                        </option>
                        <option value="monday">Poniedziałek</option>
                        <option value="tuesday">Wtorek</option>
                        <option value="wensday">Środa</option>
                        <option value="thursday">Czwartek</option>
                        <option value="friday">Piątek</option>
                    </select>

                    Numer lekcji:{" "}
                    <select
                        name="lesson_number"
                        id=""
                        value={selectedLessonNumber}
                        onChange={(e) => setSelectedLessonNumber(e.target.value)}
                    >
                        <option value="" disabled>
                            Wybierz numer lekcji
                        </option>
                        {generateLessonNumbers()}
                    </select>

                    Przedmiot:{" "}
                    <select
                        name="subject_id_select"
                        id=""
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        {subjects.map((subjectItem) => (
                            <option
                                key={subjectItem.subject_id}
                                value={subjectItem.subject_id}
                            >
                                {subjectItem.subject_name}
                            </option>
                        ))}
                    </select>

                    Nauczyciel:{" "}
                    <select
                        name="teacher_id_select"
                        id=""
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        {teachers.map((teacherItem) => (
                            <option
                                key={teacherItem.teacher_id}
                                value={teacherItem.teacher_id}
                            >
                                {teacherItem.first_name} {teacherItem.second_name}
                            </option>
                        ))}
                    </select>

                    Czas rozpoczęcia lekcji:{" "}
                    <input
                        type="datetime-local"
                        name="start_time"
                        id=""
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                    />
                    Czas zakończenia lekcji:{" "}
                    <input
                        type="datetime-local"
                        name="end_time"
                        id=""
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                    />

                    Numer/nazwa sali:{" "}
                    <input
                        type="text"
                        name="classroom"
                        id=""
                        value={selectedClassroom}
                        onChange={(e) => setSelectedClassroom(e.target.value)}
                    />

                    Czy zajęcia odbywają się cyklicznie?
                    <input
                        type="checkbox"
                        name="is_recurring"
                        id=""
                        checked={selectedRecurring}
                        onChange={(e) => setSelectedRecurring(e.target.checked)}
                    />

                    Do kiedy cyklicznie odbywają się zajęcia?
                    <input
                        type="date"
                        name="end_recurring_date"
                        id=""
                        value={selectedEndRecurringDate}
                        onChange={(e) => setSelectedEndRecurringDate(e.target.value)}
                    />

                    <hr className="principal-timetable-hr" />
                    Czy zajęcia są odwołane?:
                    <input
                        type="checkbox"
                        name="is_canceled"
                        id=""
                        checked={selectedCanceled}
                        onChange={(e) => setSelectedCanceled(e.target.checked)}
                    />

                    Czy jest zastępstwo na zajęciach?:
                    <input
                        type="checkbox"
                        name="is_substitution"
                        id=""
                        checked={selectedSubstitution}
                        onChange={(e) => setSelectedSubstitution(e.target.checked)}
                    />

                    <input
                        type="button"
                        value="Dodaj do planu zajęć"
                        onClick={handleAddToTimetable}
                    />
                </div>
            </div>
        </div>
    );
}

