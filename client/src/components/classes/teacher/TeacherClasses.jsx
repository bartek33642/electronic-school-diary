import React, { useState, useEffect } from "react";
import "./TeacherClasses.css";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../config";

export function TeacherClasses() {
  const [userData, setUserData] = useState([]);
  const [classes, setClasses] = useState([]);
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
              const classesTeacherQuery = `${backendServer}/teacher-classes/${schoolId}`;
              const classesTeacherResult = await fetch(classesTeacherQuery);
              const classesTeacher = await classesTeacherResult.json();

              if (classesTeacherResult.ok) {
                const uniqueClassesTeacherIds = Array.from(
                  new Set(classesTeacher.map((classes) => classes.school_id))
                );
                const uniqueClassTeacher = classesTeacher.filter((classes) =>
                  uniqueClassesTeacherIds.includes(classes.school_id)
                );
                setClasses(uniqueClassTeacher);
              } else {
                setError(
                  "Błąd pobierania danych z danymi klas - dla roli nauczyciela."
                );
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
    { field: "classId", headerName: "ID", width: 100 },
    { field: "class_name", headerName: "Nazwa klasy", width: 130 },
  ];

  const rows = classes.map((classes) => ({
    classId: classes.class_id,
    class_name: classes.class_name,
  }));

  return (
    <div className="teacher-classes-container">
      <TeacherMenu />

      <div className="teacher-classes-elements">
        <h2>Klasy</h2>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.classId}
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
