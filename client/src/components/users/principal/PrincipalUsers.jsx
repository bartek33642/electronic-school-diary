import React, { useState, useEffect } from "react";
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import './PrincipalUsers.css';
import { DataGrid } from '@mui/x-data-grid';

export function PrincipalUsers() {
    const [userData, setUserData] = useState([]);
    const [userPrincipalData, setUserPrincipalData] = useState([]);
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
                const userPrincipalQuery = `http://localhost:3001/principal-users/${schoolId}`;
                const userPrincipalResult = await fetch(userPrincipalQuery);
                const userPrincipal = await userPrincipalResult.json();
                console.log("userPrincipal: ", userPrincipal);
                console.log("userPricncipalData ", userPrincipalData );
  
  
                  if (userPrincipalResult.ok) {
                    // Usuń duplikaty na podstawie subjectId
                    const uniqueUserPrincipalIds = Array.from(new Set(userPrincipal.map(user => user.school_id)));
                    const uniqueUserPrincipal = userPrincipal.filter(user => uniqueUserPrincipalIds.includes(user.school_id));
                  setUserPrincipalData(uniqueUserPrincipal);
                  
                  } else {
                    setError("Błąd pobierania danych z danymi użytkowników - dla roli dyrektora.");
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

    const getStatusName = (status) => {
        switch (status) {
          case 'principal':
            return 'dyrektor';
          case 'student':
            return 'uczeń';
          case 'teacher':
            return 'nauczyciel';
          case 'parent':
            return 'rodzic';
          case 'admin':
            return 'administrator';
          default:
            return status;
        }
      };

      const getIsActive = (active) => (active ? 'Tak' : 'Nie');


    const columns = [
    //   { field: 'userId', headerName: 'ID', width: 80 },
      { field: 'email', headerName: 'E-mail', width: 190 },
      { field: 'active', headerName: 'Aktywny', width: 90 },
      { field: 'name', headerName: 'Imię i Nazwisko', width: 300 },
      { field: 'status', headerName: 'Status', width: 150 },

    ];
  
    const rows = userPrincipalData.map(userPrincipal => ({
        // userId: userPrincipal.user_id,
        email: userPrincipal.email,
        active: getIsActive(userPrincipal.active),
        name: userPrincipal.first_name + ' ' + userPrincipal.second_name,
        status: getStatusName(userPrincipal.status),
      }));


    return(
        <div className="principal-users-container">
            <PrincipalMenu />
            <div className="principal-users-elements">
                <h2>Użytkownicy</h2>
                <div className="admin-users-addButtons">
                <input type="button" className="admin-users-btns" value="Dodaj nauczyciela" />
                <input type="button" className="admin-users-btns" value="Dodaj ucznia" />

                </div>
                <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.name}
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