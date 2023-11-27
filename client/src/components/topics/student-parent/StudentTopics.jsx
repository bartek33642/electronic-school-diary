// import React, { useState, useEffect } from "react";
// import { StudentMenu } from "../../menu/student/StudentMenu";
// import './StudentParentTopics.css';
// import { DataGrid } from '@mui/x-data-grid';

// export function StudentTopics() {
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//           try {
//             const userEmail = localStorage.getItem("userEmail");
            
//             if (userEmail) {
//               const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
//               const result = await fetch(userQuery);
//               const userData = await result.json();
//               console.log("userData: ", userData);
//               if (result.ok) {
               

//               } else {
//                 setError("Błąd pobierania danych użytkownika.");
//               }
//             } else {
//               setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
//             }
    
//           } catch (error) {
//             console.error(error);
//             setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//           }
//         };
    
//         fetchUserData();
//       }, []);

// const columns = [
//     { field: 'topicId', headerName: 'ID', width: 100 },
//     { field: 'date', headerName: 'Data', width: 100 },
//     { field: 'subject', headerName: 'Przedmiot', width: 130 },
//     { field: 'topic', headerName: 'Temat', width: 130 },
//     { field: 'description', headerName: 'Opis tematu', width: 300},
// ];
  
// const rows = [
//     { topicId: 1, date: '2023-11-20', subject: 'Matematyka', topic: 'Ułamki', description: "Utrwalenie wiedzy o ułamkach" },
//     { topicId: 2, date: '2023-11-20', subject: 'Fizyka', topic: 'Napięcie', description: 'Poznanie działanie napięcia oraz praw' },
//     { topicId: 3, date: '2023-11-20', subject: 'Plastyka', topic: 'Ekspresjonizm ', description: 'Rozpoznanie kierunku artystycznego' },
//     { topicId: 4, date: '2023-11-20', subject: 'Plastyka', topic: 'Ekspresjonizm ', description: 'Rozpoznanie kierunku artystycznego' },
//     { topicId: 5, date: '2023-11-20', subject: 'Plastyka', topic: 'Ekspresjonizm ', description: 'Rozpoznanie kierunku artystycznego' },
//     { topicId: 6, date: '2023-11-20', subject: 'Plastyka', topic: 'Ekspresjonizm ', description: 'Rozpoznanie kierunku artystycznego' },
// ];



//     return (
//         <div className="student-topics-container">
//             <StudentMenu />
//             <div className="student-topics-elements">
//                 <h2>Tematy</h2>
//                 <div>
//                     <DataGrid
//                         rows={rows}
//                         columns={columns}
//                         getRowId={(row) => row.topicId}
//                         pageSize={8}
//                         initialState={{
//                             pagination: {
//                                 paginationModel: { page: 0, pageSize: 7 },
//                             },
//                         }}
//                         pageSizeOptions={[7, 10]}
//                         checkboxSelection
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useState, useEffect } from "react";
// import { StudentMenu } from "../../menu/student/StudentMenu";
// import './StudentParentTopics.css';
// import { DataGrid } from '@mui/x-data-grid';

// export function StudentTopics() {
//   const [userData, setUserData] = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");

//         if (userEmail) {
//           const userQuery = `http://localhost:3001/users-school-student/${userEmail}`;
//           const result = await fetch(userQuery);
//           const userData = await result.json();
//           console.log("userData: ", userData);
//           if (result.ok) {
//             setUserData(userData);
          
//             if (userData.length > 0) {
//               const classId = userData[0].class_id;
          
//               // Pobierz tematy dla danego studenta i klasy
//               const topicsQuery = `http://localhost:3001/topics-all-student/${classId}`;
//               const topicsResult = await fetch(topicsQuery);
//               const topicsData = await topicsResult.json();
          
//               if (topicsResult.ok) {
//                 setTopics(topicsData);
//               } else {
//                 setError("Błąd pobierania danych z tematami.");
//               }
//             } else {
//               setError("Błąd pobierania danych użytkownika: brak danych.");
//             }
//           } else {
//             setError("Błąd pobierania danych użytkownika.");
//           }
//         } else {
//           setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
//         }

//       } catch (error) {
//         console.error(error);
//         setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const columns = [
//     { field: 'topicId', headerName: 'ID', width: 100 },
//     { field: 'date', headerName: 'Data', width: 100 },
//     { field: 'subject', headerName: 'Przedmiot', width: 130 },
//     { field: 'topic', headerName: 'Temat', width: 130 },
//     { field: 'description', headerName: 'Opis tematu', width: 300},
//   ];

//   const rows = topics.map(topic => ({
//     topicId: topic.topic_id,
//     date: topic.date,
//     subject: topic.subject_name,
//     topic: topic.topic_text,
//     description: topic.description,
//   }));

//   return (
//     <div className="student-topics-container">
//       <StudentMenu />
//       <div className="student-topics-elements">
//         <h2>Tematy</h2>
//         <div>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             getRowId={(row) => row.topicId}
//             pageSize={8}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 7 },
//               },
//             }}
//             pageSizeOptions={[7, 10]}
//             checkboxSelection
//           />
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import { StudentMenu } from "../../menu/student/StudentMenu";
import './StudentParentTopics.css';
import { DataGrid } from '@mui/x-data-grid';

export function StudentTopics() {
  const [userData, setUserData] = useState([]);
  const [topics, setTopics] = useState([]);
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
              const classId = userData[0].class_id;
          
              // Pobierz tematy dla danego studenta i klasy
              const topicsQuery = `http://localhost:3001/topics-all-student/${classId}`;
              const topicsResult = await fetch(topicsQuery);
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
    subject: topic.subject_name,
    topic: topic.topic_text,
    description: topic.description,
    teacher: topic.first_name + ' ' + topic.second_name,

  }));

  return (
    <div className="student-topics-container">
      <StudentMenu />
      <div className="student-topics-elements">
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

