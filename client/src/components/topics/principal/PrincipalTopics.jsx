import React, { useState, useEffect } from "react";
import './PrincipalTopics.css';
import { DataGrid } from '@mui/x-data-grid';
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import { backendServer } from "../../../config";

export function PrincipalTopics() {
  const [userData, setUserData] = useState([]);
  const [topics, setTopics] = useState([]);
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
              const topicsQuery = `${backendServer}/topics-all-classes/${schoolId}`;
              const topicsResult = await fetch(topicsQuery);
              console.log("topicsResult: ",topicsResult)
              const topicsData = await topicsResult.json();
              console.log("topicsData: ", topicsData)
              
              if (topicsResult.ok) {
                setTopics(topicsData);
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
    // { field: 'topicId', headerName: 'ID', width: 100, hide: true, renderHeader: () => null},
    
    { field: 'date', headerName: 'Data', width: 100},
    { field: 'class', headerName: 'Klasa', width: 100},
    { field: 'subject', headerName: 'Przedmiot', width: 130 },
    { field: 'topic', headerName: 'Temat', width: 130 },
    { field: 'description', headerName: 'Opis tematu', width: 250},
    { field: 'teacher', headerName: 'Nauczyciel', width: 130},

  ];


  // let formatDate = topics.date.toISOString().substring(0, 10);
  // console.log(formatDate);

  const rows = topics.map(topic => ({
    // topicId: topic.topic_id,
    date: new Date(topic.date).toLocaleDateString(),
    class: topic.class_name,
    subject: topic.subject_name,
    topic: topic.topic_text,
    description: topic.description,
    teacher: topic.first_name + ' ' + topic.second_name,

  }));

  return (
    <div className="principal-topics-container">
      <PrincipalMenu />
      <div className="principal-topics-elements">
        <h2>Tematy</h2>
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
