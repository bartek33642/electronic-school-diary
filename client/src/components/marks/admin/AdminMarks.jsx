import React, { useState, useEffect } from "react";
import './AdminMarks.css';
import { AdminMenu } from "../../menu/admin/AdminMenu";
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { backendServer } from "../../../config";
import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";

export function AdminMarks() {
  const [open, setOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentGrades, setStudentGrades] = useState({});
  const [gradeData, setGradeData] = useState([
    {
      grade_value: "",
      date: "",
      weight: "",
      comment: ""
    }
  ]);

  const resetGradeData = () => {
    setGradeData([
      {
        grade_value: "",
        date: "",
        weight: "",
        comment: ""
      }
    ]);
  };

  const handleOpen = (studentId) => {
    resetGradeData();
    setSelectedStudents([studentId]);
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
    fetch(`${backendServer}/schools`)
      .then(response => response.json())
      .then(data => {
        console.log("Schools data:", data);
        setSchools(data);
      })
      .catch(error => console.error('Błąd pobierania szkół:', error));
  }, []);

  const handleSchoolChange = (event) => {
    const schoolId = event.target.value;
    setSelectedSchool(schoolId);

    fetch(`${backendServer}/classes/${schoolId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Classes data:", data);
        setClasses(data);
      })
      .catch(error => console.error('Błąd pobierania klas:', error));

    fetch(`${backendServer}/teachers/${schoolId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Teachers data:", data);
        setTeachers(data);
      })
      .catch(error => console.error('Błąd pobierania nauczycieli:', error));
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);

    fetch(`${backendServer}/subjects/class/${selectedClass}`)
      .then(response => response.json())
      .then(data => {
        console.log("Subjects data:", data);
        setSubjects(data);
      })
      .catch(error => console.error('Błąd pobierania przedmiotów:', error));

    fetch(`${backendServer}/students-from-class/${selectedClass}`)
      .then(response => response.json())
      .then(data => {
        console.log("Students data:", data);
        setStudents(data);
      })
      .catch(error => console.error('Błąd pobierania uczniów:', error));
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
  
    if (selectedClass) {
      fetch(`${backendServer}/marks-students/${selectedClass}/${selectedSubject}`)
        .then(response => response.json())
        .then(data => {
          console.log("Marks data:", data);
  
          const updatedStudentGrades = {};
          data.forEach(grade => {
            const studentId = grade.student_id;
  
            if (!updatedStudentGrades[studentId]) {
              updatedStudentGrades[studentId] = [];
            }
  
            updatedStudentGrades[studentId].push(grade);
          });
  
          setStudentGrades(updatedStudentGrades);
        })
        .catch(error => console.error('Błąd pobierania ocen:', error));
    } else {
      console.error('Selected class is not defined');

    }
  };
  
  const handleStudentChange = (event) => {
    const selectedStudentId = event.target.value;
    setSelectedStudents([selectedStudentId]); 
  };
  

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleSaveGrade = () => {
    if (!selectedSchool || !selectedClass || !selectedTeacher || !selectedSubject || !selectedStudents.length) {
      console.error("Validation failed. Please fill in all the required fields.");
      return;
    }
  
    // Display data before sending
    console.log("Data to send:", {
      school_id: selectedSchool,
      class_id: selectedClass,
      teacher_id: selectedTeacher,
      subject_id: selectedSubject,
      student_id: selectedStudents,
      grade_value: gradeData[0].grade_value,
      weight: gradeData[0].weight,
      description: gradeData[0].description,
      date: gradeData[0].date,
    });
  
    const dataToSend = {
      school_id: selectedSchool,
      class_id: selectedClass,
      teacher_id: selectedTeacher,
      subject_id: selectedSubject,
      student_id: selectedStudents,
      grade_value: gradeData[0].grade_value,
      weight: gradeData[0].weight,
      description: gradeData[0].description,
      date: gradeData[0].date,
    };
  
    fetch(`${backendServer}/add-marks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Grade saved successfully", data);
      })
      .catch(error => {
        console.error('Error saving grade:', error);
      });
  
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
          </form>

          <table className="marks-table">
            <thead>
              <tr>
                <th className="header-table">Uczeń</th>
                <th className="header-table">Oceny</th>
                <th className="header-table">Średnia arytmetyczna</th>
                <th className="header-table">Średnia ważona</th>
                <th className="header-table">Przewidywana ocena końcowa</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, studentIndex) => (
                <tr key={studentIndex}>
                  <td>{`${student.first_name} ${student.second_name}`}</td>
                  <td className="admin-td-table-marks">
                    {studentGrades[student.student_id]?.map((grade, index) => (
                      <div key={index}>
                       <button className="admin-bttn-marks"> {grade.grade_value}{" "}</button>
   
                      </div>
                      
                    ))}
                    <button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpen(student.student_id)}
                      className="admin-marks-button"
                    >
                      +
                    </button>
                  </td>

<td>
  {studentGrades[student.student_id] &&
    calculateAritmeticAverage(
      studentGrades[student.student_id].map((mark) => parseFloat(mark.grade_value))
    ).toFixed(2)}
</td>

<td>
  {studentGrades[student.student_id] &&
    (() => {
      const grades = studentGrades[student.student_id].map((mark) => parseFloat(mark.grade_value));
      const weights = studentGrades[student.student_id].map((mark) => parseInt(mark.weight));

      const weightedAverage = calculateWeightedAverage(grades, weights).toFixed(2);

      console.log("Weighted Average for student", student.student_id, ":", weightedAverage);

      return weightedAverage;
    })()}
</td>
<td>
  {studentGrades &&
    studentGrades[student.student_id] &&
    (() => {
      const grades = studentGrades[student.student_id].map((mark) => parseFloat(mark.grade_value));
      const weights = studentGrades[student.student_id].map((mark) => parseInt(mark.weight));

      const expectedGradeValue = expectedGrades(
        calculateWeightedAverage(grades, weights).toFixed(2)
      );

      console.log("Expected Grade for student", student.student_id, ":", expectedGradeValue);

      return expectedGradeValue;
    })()}
</td>

            </tr>
              ))}
              
            </tbody>
          </table>


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
                name="grade_value"
                id="grade_value"
                min="0.01"
                max="6.0"
                step="0.01"
                value={gradeData.grade_value}
                onChange={handleInputChange}
              />
              <br />
              Data:{" "}
              <input
                type="date"
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
