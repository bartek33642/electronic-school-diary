import React, { useState, useEffect } from "react";
import "./TeacherSubjects.css";
import { DataGrid } from "@mui/x-data-grid";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import { backendServer } from "../../../config";

export function TeacherSubjects() {
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
              const schoolId = userData[0].school_id;

              const subjectsQuery = `${backendServer}/subjects-all-classes-teacher/${schoolId}`;
              const subjectsResult = await fetch(subjectsQuery);
              const subjectsData = await subjectsResult.json();

              if (subjectsResult.ok) {
                setSubjects(subjectsData);
              } else {
                setError("Błąd pobierania danych z tematami.");
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
    { field: "subject_id", headerName: "ID", width: 100 },
    { field: "subject_name", headerName: "Nazwa przedmiotu", width: 160 },
    { field: "class_name", headerName: "Nazwa klasy", width: 130 },
  ];

  const rows = subjects.map((subject) => ({
    subject_id: subject.subject_id,
    subject_name: subject.subject_name,
    class_name: subject.class_name,
  }));

  return (
    <div className="teacher-subjects-container">
      <TeacherMenu />
      <div className="teacher-subjects-elements">
        <h2>Przedmioty</h2>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.subject_id}
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
