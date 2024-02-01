import React, { useState, useEffect } from "react";
import "./AdminTimetable.css";
import { AdminMenu } from "../../menu/admin/AdminMenu";
import { backendServer } from "../../../config";

export function AdminTimetable() {
  const [userData, setUserData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLessonNumber, setSelectedLessonNumber] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
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
    fetchSchoolData();
  }, [userData]);

  useEffect(() => {
    const fetchClassesForSchool = async (schoolId) => {
      try {
        const classQuery = `${backendServer}/classes/${schoolId}`;
        const result = await fetch(classQuery);
        const classData = await result.json();

        if (result.ok) {
          setClassData(classData);
        }
      } catch (error) {
        console.error("Błąd pobierania klas:", error.message);
      }
    };

    fetchClassesForSchool(selectedSchool);
  }, [selectedSchool]);

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
      school_id: selectedSchool,
    };

    try {
      const response = await fetch(`${backendServer}/add-timetable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Timetable entry added successfully");
      } else {
        console.error("Failed to add timetable entry");
      }
    } catch (error) {
      console.error("Error adding timetable entry:", error);
    }
  };

  return (
    <div className="admin-timetable-container">
      <AdminMenu />
      <div className="admin-timetable-elements">
        <h3>Plan zajęć:</h3>

        <div className="admin-timetable-buttons">
          <input type="button" value="Przeglądaj plany zajęć" />
        </div>

        <div className="principal-timetable-form">
          <h3>Dodaj plan zajęć</h3>
          Szkoła:{" "}
          <select
            name="class_id"
            id=""
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option>Wybierz szkołę</option>

            {schoolData.map((schoolItem) => (
              <option key={schoolItem.school_id} value={schoolItem.school_id}>
                {schoolItem.school_name}
              </option>
            ))}
          </select>
          Klasa:{" "}
          <select
            name="class_id"
            id=""
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>Wybierz klasę</option>
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
            <option>Wybierz przedmiot</option>

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
            <option>Wybierz nauczyciela</option>

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
