import React, { useState, useEffect } from "react";
import "./StudentParentRemarks.css";
import { StudentMenu } from "../../menu/student/StudentMenu";
import { DataGrid } from "@mui/x-data-grid";
import { backendServer } from "../../../config";

export function StudentRemarks() {
  const [userData, setUserData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();

          if (!result.ok) {
            setError("Błąd pobierania danych użytkownika.");
            return;
          }

          if (result.ok) {
            setUserData(userData);

            if (userData.length === 0) {
              setError("Błąd pobierania danych użytkownika: brak danych.");
              return;
            }

            if (userData.length > 0) {
              const studentId = userData[0].student_id;
              const remarksQuery = `${backendServer}/remarks/${studentId}`;
              const remarksResult = await fetch(remarksQuery);
              const remarksData = await remarksResult.json();

              if (!remarksResult.ok) {
                setError("Błąd pobierania danych z przedmiotami.");
                return;
              }

              if (remarksResult.ok) {
                const uniqueRemarks = remarksData.filter(
                  (remark, index, self) =>
                    index ===
                    self.findIndex((r) => r.remark_id === remark.remark_id)
                );

                setRemarks(uniqueRemarks);
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
    { field: "remarkId", headerName: "ID", width: 100 },
    { field: "remark_text", headerName: "Opis uwagi", width: 190 },
    {
      field: "is_possitive",
      headerName: "Czy pozytywna",
      width: 100,
      valueGetter: (params) => (params.value ? "Tak" : "Nie"),
    },
    { field: "date", headerName: "Data", width: 120 },
    { field: "teacher", headerName: "Nauczyciel", width: 130 },
  ];

  const rows = remarks.map((remark) => ({
    remarkId: remark?.remark_id || "",
    remark_text: remark?.remark_text || "",
    is_possitive: remark?.is_possitive || "",
    date: new Date(remark?.date).toLocaleDateString() || "",
    teacher: remark?.first_name + " " + remark?.second_name || "",
  }));

  return (
    <div className="student-parent-remarks-container">
      <StudentMenu />
      <div className="student-parent-remarks-elements">
        <h2>Uwagi ucznia</h2>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.remarkId}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
