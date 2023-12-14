import React, { useState, useEffect } from "react";
import './ParentStudentAttendance.css';
import { backendServer } from "../../../config";
import { DataGrid } from "@mui/x-data-grid";
import { ParentMenu } from "../../menu/parent/ParentMenu";

export function ParentAttendance() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          console.log("userData: ", userData);

          if (result.ok && userData.length > 0) {
            const studentId = userData[0].student_id;

            // Pobierz frekwencję dla danego studenta
            const attendanceQuery = `${backendServer}/attendance-all/${studentId}`;
            const attendanceResult = await fetch(attendanceQuery);
            const attendanceData = await attendanceResult.json();
            console.log("Attendance data: ", attendanceData);
            setUserData(attendanceData);
          }
        } 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const groupedData = userData.reduce((acc, attendance) => {
    const dateKey = new Date(attendance.date).toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(attendance);
    return acc;
  }, {});

  const getStatusSymbol = (status) => {
    switch (status) {
      case 'present':
        return 'O';
      case 'absent':
        return 'N';
      case 'excused absence':
        return 'NU';
      case 'delay':
        return 'S';
      default:
        return '';
    }
  };

  const columns = [
    { field: 'date', headerName: 'Data', width: 150 },
    ...Array.from({ length: 14 }, (_, index) => ({
      field: `lesson_${index + 1}`,
      headerName: `Lekcja ${index + 1}`,
      width: 80,
      renderCell: (params) => (
        <div className="span-lessons-span">
          {getStatusSymbol(params.row[`lesson_${index + 1}`])}
        </div>
      ),
    })),
  ];

  const rows = Object.entries(groupedData).map(([date, attendances]) => {
    const row = { date };
    attendances.forEach((attendance) => {
      row[`lesson_${attendance.lesson_number}`] = attendance.status;
    });
    return row;
  });

  return (
    <>
      <div className="student-attendance-container">
        <ParentMenu />
        <div className="student-attendance-elements">
          <h2>Obecność ucznia</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.date}
            pageSize={5}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[7, 10, 30]}
          />
          <div>
            <br />
            Legenda: Obecność: O, Nieobecność: N, Nieobecność usprawiedliwiona: NU, Spóźnienie: S
          </div>
        </div>
      </div>
    </>
  );
}