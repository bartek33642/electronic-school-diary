// import React, {useState, useEffect} from "react";
// import './ParentMarks.css';
// import { ParentMenu } from "../../menu/parent/ParentMenu";
// import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
// import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
// import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";

// export function ParentMarks() {

//     const [userData, setUserData] = useState([]);
//     const [schoolClassSubjectData, setSchoolClassSubjectData] = useState([]);
//     const [userMarksData, setUserMarksData] = useState([]);
//     const [marks, setMarks] = useState([]);
//     const [error, setError] = useState(null);
//     const [selectedGradeIndex, setSelectedGradeIndex] = useState(null);
  
//     let DataOfWeightMarks = [];
//     let DataOfDescriptionMarks = [];
//     useEffect(() => {
//       const fetchUserData = async () => {
//         try {
//           const userEmail = localStorage.getItem("userEmail");
  
//           if (userEmail) {
//             const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
//             const result = await fetch(userQuery);
//             const userData = await result.json();
//             console.log("userData: ", userData);
  
//             if (result.ok && userData.length > 0) {
//               const studentId = userData[0].student_id;
  
//               // Pobierz tematy dla danego studenta i klasy
//               const userMarksQuery = `http://localhost:3001/marks/${studentId}`;
//               const userMarksResult = await fetch(userMarksQuery);
//               const userMarksData = await userMarksResult.json();
//               console.log("userMarksData: ", userMarksData);
  
//               if (userMarksResult.ok && userMarksData.length > 0) {
//                 const classId = userMarksData[0].class_id;
  
//                 const schoolClassSubjectQuery = `http://localhost:3001/subjects/class/${classId}`;
//                 const result2 = await fetch(schoolClassSubjectQuery);
//                 const schoolClassSubjectData = await result2.json();
//                 console.log("schoolClassSubjectData: ", schoolClassSubjectData);
  
//                 if (result2.ok) {
//                   setUserData(userData);
//                   setSchoolClassSubjectData(schoolClassSubjectData);
//                   setUserMarksData(userMarksData);
  
//                   // Przygotuj dane do tabeli
//                   const tableData = prepareTableData(userMarksData, schoolClassSubjectData);
  
//                   setMarks(tableData);
//                 } else {
//                   setError("Błąd pobierania danych przedmiotu.");
//                 }
//               } else {
//                 setError("Błąd pobierania danych użytkownika.");
//               }
//             } else {
//               setError("Błąd pobierania danych użytkownika: brak danych.");
//             }
//           } else {
//             setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
//           }
//         } catch (error) {
//           console.error(error);
//           setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//         }
//       };
  
//       fetchUserData();
//     }, []);
  
//     // Przygotuj dane do tabeli
//     const prepareTableData = (userMarksData, schoolClassSubjectData, weight) => {
//       const tableData = [];
    
//       schoolClassSubjectData.forEach((subject) => {
//         const matchingMarks = userMarksData.filter((mark) => mark.subject_id === subject.subject_id);
//             // Reset arrays for each subject
//       DataOfWeightMarks = [];
//       DataOfDescriptionMarks = [];
    
//         if (matchingMarks.length > 0) {
//           const grades = matchingMarks.map((mark) => parseInt(mark.grade_value, 10));
//           const aritmeticAverage = calculateAritmeticAverage(grades);
//           const weights = matchingMarks.map((mark) => parseInt(mark.weight));
//           const weightedAverage = calculateWeightedAverage(grades, weights);
//           console.log("weightedAverage ", weightedAverage);
    
//           const expectedGrade = expectedGrades(weightedAverage);
    
//   // Assign values to the variables defined in the outer scope
//   DataOfWeightMarks = matchingMarks.map(mark => mark.weight);
//   DataOfDescriptionMarks = matchingMarks.map(mark => mark.description);
    
//          // Assign values to the variables defined in the outer scope
//         DataOfWeightMarks = matchingMarks.map(mark => mark.weight);
//         DataOfDescriptionMarks = matchingMarks.map(mark => mark.description);
  
//         tableData.push({
//           subject: subject.subject_name,
//           grade: grades,
//           gradeDescription: matchingMarks[0].grade_description,
//           aritmeticAverage: aritmeticAverage.toFixed(2),
//           weightedAverage: weightedAverage.toFixed(2),
//           expectedGrade: expectedGrade,
//           finalGrade: matchingMarks[0].finalGrade,
//           DataOfWeightMarks: DataOfWeightMarks,
//           DataOfDescriptionMarks: DataOfDescriptionMarks,
//         });
//       } else {
//         tableData.push({
//           subject: subject.subject_name,
//           grade: "",
//           gradeDescription: "",
//           aritmeticAverage: "",
//           weightedAverage: "",
//           expectedGrade: "",
//           finalGrade: "",
//           DataOfWeightMarks: [],
//           DataOfDescriptionMarks: [],
//         });
//       }
//     });
//     return tableData;
// };

//     return(
//         <div className="parent-marks-container">
//             <ParentMenu />
//             <div className="parent-marks-elements">
//                 <h2>Oceny</h2>

//                 <div>
//           <table className="student-marks-table">
//             <thead>
//               <tr>
//                 <th>Przedmiot</th>
//                 <th>Oceny</th>
//                 <th>Średnia arytmetyczna</th>
//                 <th>Średnia ważona</th>
//                 <th>Przewidywana ocena</th>
//                 <th>Ocena końcowa</th>
//               </tr>
//             </thead>
//             <tbody>
//                {marks.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.subject}</td>
//                   <td>
//   {Array.isArray(row.grade) ? (
//     <div className="tooltip">
//       {row.grade.map((singleGrade, idx) => (
        
//         <button
//           key={idx}
//           className="bttn-student-marks"
//           onClick={() => setSelectedGradeIndex(idx)}
//         >
//           {singleGrade}
//         </button>
//       ))}
//     </div>
//   ) : (
//     <div className="tooltip">
//       <button
//         onClick={() => setSelectedGradeIndex(0)}
//       >
//         {row.grade}
//       </button>
//     </div>
//   )}
//   {selectedGradeIndex !== null && (
//     <div>
//       <div>Waga: {DataOfWeightMarks[selectedGradeIndex]}</div>
//       <div>Opis: {DataOfDescriptionMarks[selectedGradeIndex]}</div>
//     </div>
//   )}
// </td>

//                   <td>{row.aritmeticAverage}</td>
//                   <td>{row.weightedAverage}</td>
//                   <td>{row.expectedGrade}</td>
//                   <td>{row.finalGrade}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//             </div>
//         </div>
//     );

// }

import React, { useState, useEffect } from "react";
import './ParentMarks.css';
import { ParentMenu } from "../../menu/parent/ParentMenu";
import { calculateAritmeticAverage } from "../../../dependenciesAndRequirements/aritmeticAverage";
import { calculateWeightedAverage } from "../../../dependenciesAndRequirements/weightedAverage";
import { expectedGrades } from "../../../dependenciesAndRequirements/expectedGrade";

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
          const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          console.log("userData: ", userData);

          if (result.ok && userData.length > 0) {
            const studentId = userData[0].student_id;

            const userMarksQuery = `http://localhost:3001/marks/${studentId}`;
            const userMarksResult = await fetch(userMarksQuery);
            const userMarksData = await userMarksResult.json();
            console.log("userMarksData: ", userMarksData);

            if (userMarksResult.ok) {
              const classId = userMarksData.length > 0 ? userMarksData[0].class_id : null;

              if (classId) {
                const schoolClassSubjectQuery = `http://localhost:3001/subjects/class/${classId}`;
                const result2 = await fetch(schoolClassSubjectQuery);
                const schoolClassSubjectData = await result2.json();
                console.log("schoolClassSubjectData: ", schoolClassSubjectData);

                if (result2.ok) {
                  setUserData(userData);
                  setSchoolClassSubjectData(schoolClassSubjectData);
                  setUserMarksData(userMarksData);

                  // Przygotuj dane do tabeli
                  const tableData = prepareTableData(userMarksData, schoolClassSubjectData);

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

  // Przygotuj dane do tabeli
  const prepareTableData = (userMarksData, schoolClassSubjectData) => {
    const tableData = [];

    schoolClassSubjectData.forEach((subject) => {
      const matchingMarks = userMarksData.filter((mark) => mark.subject_id === subject.subject_id);

      // Reset arrays for each subject
      let DataOfWeightMarks = [];
      let DataOfDescriptionMarks = [];

      if (matchingMarks.length > 0) {
        const grades = matchingMarks.map((mark) => parseInt(mark.grade_value, 10));
        const aritmeticAverage = calculateAritmeticAverage(grades);
        const weights = matchingMarks.map((mark) => parseInt(mark.weight));
        const weightedAverage = calculateWeightedAverage(grades, weights);
        console.log("weightedAverage ", weightedAverage);

        const expectedGrade = expectedGrades(weightedAverage);

        // Assign values to the variables defined in the outer scope
        DataOfWeightMarks = matchingMarks.map(mark => mark.weight);
        DataOfDescriptionMarks = matchingMarks.map(mark => mark.description);

        tableData.push({
          subject: subject.subject_name,
          grade: grades,
          gradeDescription: matchingMarks.length > 0 ? matchingMarks[0].grade_description : "",
          aritmeticAverage: aritmeticAverage.toFixed(2),
          weightedAverage: weightedAverage.toFixed(2),
          expectedGrade: expectedGrade,
          finalGrade: matchingMarks.length > 0 ? matchingMarks[0].finalGrade : "",
          DataOfWeightMarks: DataOfWeightMarks,
          DataOfDescriptionMarks: DataOfDescriptionMarks,
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
        });
      }
    });

    return tableData;
  };

  return (
    <div className="parent-marks-container">
      <ParentMenu />
      <div className="parent-marks-elements">
        <h2>Oceny</h2>

        <div>
          <table className="student-marks-table">
            <thead>
              <tr>
                <th>Przedmiot</th>
                <th>Oceny</th>
                <th>Średnia arytmetyczna</th>
                <th>Średnia ważona</th>
                <th>Przewidywana ocena</th>
                <th>Ocena końcowa</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((row, index) => (
                <tr key={index}>
                  <td>{row.subject}</td>
                  <td>
                    {Array.isArray(row.grade) ? (
                      <div className="tooltip">
                        {row.grade.map((singleGrade, idx) => (
                          <button
                            key={idx}
                            className="bttn-student-marks"
                            onClick={() => setSelectedGradeIndex(idx)}
                          >
                            {singleGrade}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="tooltip">
                        <button onClick={() => setSelectedGradeIndex(0)}>{row.grade}</button>
                      </div>
                    )}
                    {selectedGradeIndex !== null && (
                      <div>
                        <div>Waga: {row.DataOfWeightMarks[selectedGradeIndex]}</div>
                        <div>Opis: {row.DataOfDescriptionMarks[selectedGradeIndex]}</div>
                      </div>
                    )}
                  </td>
                  <td>{row.aritmeticAverage}</td>
                  <td>{row.weightedAverage}</td>
                  <td>{row.expectedGrade}</td>
                  <td>{row.finalGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
