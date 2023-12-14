import React, { useState, useEffect } from "react";
import './TeacherRemarks.css';
import { DataGrid } from '@mui/x-data-grid';
import { TeacherMenu } from '../../menu/teacher/TeacherMenu';
import { backendServer } from '../../../config';

export function TeacherRemarks() {

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
              console.log("userData: ", userData);
              if (result.ok) {
                setUserData(userData);
              
                if (userData.length > 0) {
                  const schoolId = userData[0].school_id;
              
                  // Pobierz tematy dla danego studenta i klasy
                  const remarksQuery = `${backendServer}/remarks-all-classes/${schoolId}`;
                  const remarksResult = await fetch(remarksQuery);
                  console.log("remarksResult: ",remarksResult)
                  const remarksData = await remarksResult.json();
                  console.log("remarksData: ", remarksData)
                  
                  if (remarksResult.ok) {
                    setRemarks(remarksData);
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

      const getIsPosstive = (is_possitive) => (is_possitive ? 'Tak' : 'Nie');
    
      const columns = [
        // { field: 'topicId', headerName: 'ID', width: 100, hide: true, renderHeader: () => null},
        
        { field: 'studentId', headerName: 'Student ID', width: 100},
        { field: 'class', headerName: 'Klasa', width: 100},
        { field: 'remark_text', headerName: 'Opis uwagi', width: 130 },
        { field: 'is_possitive', headerName: 'Pozytywna?', width: 130 },
        { field: 'date', headerName: 'Data', width: 250},
        { field: 'teacher', headerName: 'Nauczyciel', width: 130},
    
      ];
    
    
      // let formatDate = topics.date.toISOString().substring(0, 10);
      // console.log(formatDate);
    
      const rows = remarks.map(remark => ({
        studentId: remark.student_id,
        class: remark.class_name,
        remark_text: remark.remark_text,
        is_possitive: getIsPosstive(remark.is_possitive),
        date: new Date(remark.date).toLocaleDateString(),
        teacher: remark.teacher_first_name + ' ' + remark.teacher_second_name,
    
      }));

    return(
        <div className="teacher-remarks-container">
            <TeacherMenu />
            <div className="teacher-remarks-elements">
                <h2>Uwagi</h2>

                <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.date}
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

