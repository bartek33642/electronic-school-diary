import React, { useState, useEffect } from "react";
import './TeacherSubjects.css';
import { DataGrid } from '@mui/x-data-grid';
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";


export function TeacherSubjects(){

    const [userData, setUserData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userEmail = localStorage.getItem("userEmail");
    
            if (userEmail) {
              const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
              const result = await fetch(userQuery);
              const userData = await result.json();
              console.log("userData: ", userData);
              if (result.ok) {
                setUserData(userData);
              
                if (userData.length > 0) {
                  const schoolId = userData[0].school_id;
              
                  // Pobierz tematy dla danego studenta i klasy
                  const subjectsQuery = `http://localhost:3001/subjects-all-classes-teacher/${schoolId}`;
                  const subjectsResult = await fetch(subjectsQuery);
                  console.log("subjectsResult: ",subjectsResult)
                  const subjectsData = await subjectsResult.json();
                  console.log("subjectsData: ", subjectsData)
                  
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
     
        { field: 'subject_name', headerName: 'Nazwa przedmiotu', width: 160},
        { field: 'class_name', headerName: 'Nazwa klasy', width: 130 },

    
      ];
    
    
      const rows = subjects.map(subject => ({
        subject_name: subject.subject_name,
        class_name: subject.class_name,
      }));

    return(
        <div className="teacher-subjects-container">
            <TeacherMenu />
            <div className="teacher-subjects-elements">
                <h2>Przedmioty</h2>

                <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.subject_name}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
            // checkboxSelection
          />
        </div>

            </div>
        </div>
    );
}