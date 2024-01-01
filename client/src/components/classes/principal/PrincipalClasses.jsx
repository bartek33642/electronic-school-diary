import React, { useState, useEffect } from "react";
import './PrincipalClasses.css';
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import { DataGrid } from '@mui/x-data-grid';
import { backendServer } from "../../../config";

export function PrincipalClasses(){
    const [userData, setUserData] = useState([]);
    const [classes, setClasses] =  useState([]);
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
                const classesPrincipalQuery = `${backendServer}/principal-classes/${schoolId}`;
                const classesPrincipalResult = await fetch(classesPrincipalQuery);
                const classesPrincipal = await classesPrincipalResult.json();
                console.log("classesPrincipal: ", classesPrincipal);
                  
  
                  if (classesPrincipalResult.ok) {
                    // Usuń duplikaty na podstawie subjectId
                    const uniqueClassesPrincipalIds = Array.from(new Set(classesPrincipal.map(classes => classes.school_id)));
                    const uniqueClassPrincipal = classesPrincipal.filter(classes => uniqueClassesPrincipalIds.includes(classes.school_id));
                    setClasses(uniqueClassPrincipal);
                  
                  } else {
                    setError("Błąd pobierania danych z danymi klas - dla roli dyrektora.");
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
        { field: 'classId', headerName: 'ID', width: 100 },
        { field: 'class_name', headerName: 'Nazwa klasy', width: 130 },
      ];
    
      const rows = classes.map(classes => ({
        classId: classes.class_id,
        class_name: classes.class_name,
      }));


    return(
        <div className="principal-classes-container">
            <PrincipalMenu />

            <div className="principal-classes-elements">
                <h2>Klasy</h2>
            <div>
                <input type="button" value="Dodaj klasę" />
            </div>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.class_name}
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