import React, { useState, useEffect } from "react";
import "./ParentMarks.css";
import { ParentMenu } from "../../menu/parent/ParentMenu";
import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";
import { backendServer } from "../../../config";

export function ParentMarks() {
  const [userData, setUserData] = useState([]);
  const [schoolClassSubjectData, setSchoolClassSubjectData] = useState([]);
  const [userMarksData, setUserMarksData] = useState([]);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();

          if (result.ok && userData.length > 0) {
            const studentId = userData[0].student_id;
            const userMarksQuery = `${backendServer}/marks/${studentId}`;
            const userMarksResult = await fetch(userMarksQuery);
            const userMarksData = await userMarksResult.json();

            if (userMarksResult.ok) {
              const classId =
                userMarksData.length > 0 ? userMarksData[0].class_id : null;

              if (classId) {
                const schoolClassSubjectQuery = `${backendServer}/subjects/class/${classId}`;
                const result2 = await fetch(schoolClassSubjectQuery);
                const schoolClassSubjectData = await result2.json();

                if (result2.ok) {
                  setUserData(userData);
                  setSchoolClassSubjectData(schoolClassSubjectData);
                  setUserMarksData(userMarksData);

                  const tableData = prepareTableData(
                    userMarksData,
                    schoolClassSubjectData
                  );

                  setMarks(tableData);
                } else {
                  setError("Błąd pobierania danych przedmiotu.");
                }
              } else {
                setError("Brak przypisanej klasy dla tego ucznia.");
              }
            } else {
              setError("Błąd pobierania danych użytkownika.");
            }
          } else {
            setError("Błąd pobierania danych użytkownika: brak danych.");
          }
        } else {
          setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
        }
      } catch (error) {
        console.error(error);
        setError("Wystąpił błąd podczas pobierania danych użytkownika.");
      }
    };

    fetchUserData();
  }, []);

  const prepareTableData = (userMarksData, schoolClassSubjectData) => {
    const tableData = [];

    schoolClassSubjectData.forEach((subject) => {
      const matchingMarks = userMarksData.filter(
        (mark) => mark.subject_id === subject.subject_id
      );

      let DataOfWeightMarks = [];
      let DataOfDescriptionMarks = [];
      let DataOfDescriptionTeacher = [];

      if (matchingMarks.length > 0) {
        const grades = matchingMarks.map((mark) =>
          parseFloat(mark.grade_value)
        );
        const aritmeticAverage = calculateAritmeticAverage(grades);
        const weights = matchingMarks.map((mark) => parseInt(mark.weight));
        const weightedAverage = calculateWeightedAverage(grades, weights);
        const expectedGrade = expectedGrades(weightedAverage);

        DataOfWeightMarks = matchingMarks.map((mark) => mark.weight);
        DataOfDescriptionMarks = matchingMarks.map((mark) => mark.description);
        DataOfDescriptionTeacher = matchingMarks.map(
          (mark) => mark.first_name + " " + mark.second_name
        );

        tableData.push({
          subject: subject.subject_name,
          grade: grades,
          gradeDescription:
            matchingMarks.length > 0 ? matchingMarks[0].grade_description : "",
          aritmeticAverage: aritmeticAverage.toFixed(2),
          weightedAverage: weightedAverage.toFixed(2),
          expectedGrade: expectedGrade,
          finalGrade:
            matchingMarks.length > 0 ? matchingMarks[0].finalGrade : "",
          DataOfWeightMarks: DataOfWeightMarks,
          DataOfDescriptionMarks: DataOfDescriptionMarks,
          DataOfDescriptionTeacher: DataOfDescriptionTeacher,
        });
      } else {
        tableData.push({
          subject: subject.subject_name,
          grade: "",
          gradeDescription: "",
          aritmeticAverage: "",
          weightedAverage: "",
          expectedGrade: "",
          finalGrade: "",
          DataOfWeightMarks: [],
          DataOfDescriptionMarks: [],
          DataOfDescriptionTeacher: [],
        });
      }
    });

    return tableData;
  };

  return (
    <div className="student-marks-conatiner">
      <ParentMenu />
      <div className="student-marks-elements">
        <h3>Oceny: </h3>
        <div>
          <table className="student-marks-table">
            <thead>
              <tr>
                <th>Przedmiot</th>
                <th>Oceny</th>
                <th>Średnia arytmetyczna</th>
                <th>Średnia ważona</th>
                <th>Ocena końcowa</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((row, index) => (
                <tr key={index}>
                  <td>{row.subject}</td>
                  <td className="student-marks-td-grades">
                    {Array.isArray(row.grade) ? (
                      <div className="tooltip">
                        {row.grade.map((singleGrade, idx) => (
                          <div key={idx} className="grade-container">
                            <button className="bttn-student-marks">
                              {singleGrade}
                              <div className="tooltiptext">
                                <span>Waga: {row.DataOfWeightMarks[idx]}</span>
                                <span>
                                  Opis: {row.DataOfDescriptionMarks[idx]}
                                </span>
                                <span>
                                  Nauczyciel:{" "}
                                  {row.DataOfDescriptionTeacher[idx]}
                                </span>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="tooltip">
                        <button className="bttn-student-marks">
                          {row.grade}
                          <div className="tooltiptext">
                            <span>Waga: {row.DataOfWeightMarks[0]}</span>
                            <span>Opis: {row.DataOfDescriptionMarks[0]}</span>
                            <span>
                              Nauczyciel: {row.DataOfDescriptionTeacher[0]}
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </td>

                  <td>{row.aritmeticAverage}</td>
                  <td>{row.weightedAverage}</td>
                  <td>{row.expectedGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
