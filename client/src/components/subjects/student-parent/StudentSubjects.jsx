import React, { useEffect, useState } from "react";
import { StudentMenu } from "../../menu/student/StudentMenu";
import './StudentSubjects.css';
import { DataGrid } from '@mui/x-data-grid';
import { backendServer } from "../../../config";

export function StudentSubjects() {
  const [userData, setUserData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

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

            if (userData.length > 0) {
              const classId = userData[0].class_id;
              const subjectsQuery = `${backendServer}/subjects/class/${classId}`;
              const subjectsResult = await fetch(subjectsQuery);
              const subjectsData = await subjectsResult.json();


                if (subjectsResult.ok) {
                  const uniqueSubjects = Array.from(new Set(subjectsData.map(subject => subject.subject_id)))
                    .map(subjectId => subjectsData.find(subject => subject.subject_id === subjectId));

                  setSubjects(uniqueSubjects);
                } else {
                  setError("Błąd pobierania danych z przedmiotami.");
                }

            } else {
              setError("Błąd pobierania danych użytkownika: brak danych.");
            }
          } else {
            setError("Błąd pobierania danych użytkownika.");
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

  const columns = [
    { field: 'subjectId', headerName: 'ID', width: 100 },
    { field: 'subject_name', headerName: 'Przedmiot', width: 130 },
  ];

  const rows = subjects.map(subject => ({
    subjectId: subject.subject_id,
    subject_name: subject.subject_name,
  }));

  return (
    <div className="student-subjects-container">
      <StudentMenu />
      <div className="student-subjects-elements">
        <h2>Przedmioty: </h2>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.subjectId}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
          />
        </div>
      </div>
    </div>
  );
}
