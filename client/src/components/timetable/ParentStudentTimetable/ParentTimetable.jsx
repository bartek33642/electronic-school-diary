// import React from "react";
// import {DayPilotScheduler} from "daypilot-pro-react";
// import './ParentStudentTimetable.css';

// export function ParenttudentTimetable() {
//     return(

//         <div className="parent-student-timetable-container">
//             <DayPilotScheduler 
//             locale={'pl-pl'}
//             startDate={'2023-01-01'}
//             days={31}
//             scale={"Day"}
//             timeHeaders={ [{groupBy: "Day"}] }
//             resources={
//                 [
//                     {
//                       "name": "Group 1",
//                       "id": "G1",
//                       "expanded": true,
//                       "children": [
//                         {
//                           "name": "Resource 1",
//                           "id": "R1"
//                         },
//                         {
//                           "name": "Resource 2",
//                           "id": "R2"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "Group 2",
//                       "id": "G2",
//                       "expanded": true,
//                       "children": [
//                         {
//                           "name": "Resource 3",
//                           "id": "R3"
//                         },
//                         {
//                           "name": "Resource 4",
//                           "id": "R4"
//                         }
//                       ]
//                     }
//                   ]
//             }
//             events={[
//                 {
//                   "id": 2,
//                   "resource": "R1",
//                   "start": "2023-10-12T00:00:00",
//                   "end": "2023-10-16T00:00:00",
//                   "text": "Event 2"
//                 },
//                 {
//                   "start": "2023-10-03T00:00:00",
//                   "end": "2023-10-07T00:00:00",
//                   "id": "8af1a86d-82ec-49a6-e2b7-89e43948b942",
//                   "resource": "R1",
//                   "text": "Event 1"
//                 },
//                 {
//                   "start": "2023-10-02T00:00:00",
//                   "end": "2023-10-06T00:00:00",
//                   "id": "00e324ac-9013-cb80-a8a2-40c202de4513",
//                   "resource": "R2",
//                   "text": "Event 3"
//                 }
//               ]}
//             />
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import './ParentStudentTimetable.css';
// import Paper from '@mui/material/Paper';
// import { backendServer } from "../../../config";

// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   WeekView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';
// import { StudentMenu } from "../../menu/student/StudentMenu";

// const today = new Date();
// const year = today.getFullYear();
// const month = String(today.getMonth() + 1).padStart(2, '0');
// const day = String(today.getDate()).padStart(2, '0');
// const date = `${year}-${month}-${day}`;
// const currentDate = date;
// const schedulerData = [
//   { startDate: '2023-10-24T08:00', endDate: '2023-10-24T08:45', title: 'Język polski', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-24T08:55', endDate: '2023-10-24T09:40', title: 'Język polski', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-25T08:55', endDate: '2023-10-25T09:40', title: 'Matematyka', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-25T09:45', endDate: '2023-10-25T10:30', title: 'W-F', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-25T10:45', endDate: '2023-10-25T11:30', title: 'W-F', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-26T09:45', endDate: '2023-10-26T10:30', title: 'Przyroda', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-26T10:45', endDate: '2023-10-26T11:30', title: 'Muzyka', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-27T08:55', endDate: '2023-10-27T09:40', title: 'Wychowanie do życia w rodzinie', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-27T09:45', endDate: '2023-10-27T10:30', title: 'Przyroda', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
//   { startDate: '2023-10-27T10:45', endDate: '2023-10-27T11:30', title: 'Muzyka', rRule: 'FREQ=WEEKLY;UNTIL=20240228' },
// ];

// console.log("schedulerData: ", schedulerData);

// export function StudentTimetable(){

//     const [userData, setUserData] = useState([]);
//     const [timetableData, setTimetableData] = useState([]);


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");

//         if (userEmail) {
//           const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//           const result = await fetch(userQuery);
//           const userData = await result.json();
//           console.log("userData: ", userData);

//           if (result.ok && userData.length > 0) {
//             const studentId = userData[0].student_id;
//             const classId = userData[0].class_id;
//             const timetableQuery = `${backendServer}/timetable/${userData[0].school_id}/${classId}`;
//             const timetableResult = await fetch(timetableQuery);
//             const timetableData = await timetableResult.json();
//             console.log("Timetable data: ", timetableData);
//             setTimetableData(timetableData);

//           }
//         } 
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserData();
//   }, [])

//   return(
//     <div className="partent-student-timetable-container">
//     <StudentMenu />
//     <div className="parent-student-timetable-view">
//       <h3>Plan zajęć: </h3>
//     <Paper>
//     <Scheduler
//       data={schedulerData}
//     >
//       <ViewState
//         currentDate={currentDate}
//       />
//       <WeekView
//         startDayHour={7}
//         endDayHour={16}
//       />
//       <Appointments />
//     </Scheduler>
//   </Paper>
 
//   </div>
//   </div>
//   );
// }

// ----------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import './ParentStudentTimetable.css';
// import Paper from '@mui/material/Paper';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   WeekView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';
// import { StudentMenu } from '../../menu/student/StudentMenu';
// import { backendServer } from '../../../config';

// const today = new Date();
// const year = today.getFullYear();
// const month = String(today.getMonth() + 1).padStart(2, '0');
// const day = String(today.getDate()).padStart(2, '0');
// const date = `${year}-${month}-${day}`;
// const currentDate = date;

// export function StudentTimetable() {
//   const [userData, setUserData] = useState([]);
//   const [timetableData, setTimetableData] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userEmail = localStorage.getItem('userEmail');

//         if (userEmail) {
//           const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//           const result = await fetch(userQuery);
//           const userData = await result.json();

//           if (result.ok && userData.length > 0) {
//             const studentId = userData[0].student_id;
//             const classId = userData[0].class_id;
//             const timetableQuery = `${backendServer}/timetable/${userData[0].school_id}/${classId}`;
//             const timetableResult = await fetch(timetableQuery);
//             const timetableData = await timetableResult.json();
//             // console.log('Timetable data: ', timetableData);
//              setTimetableData(timetableData);
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const convertToSchedulerData = (timetableData) => {
//     return timetableData.map((entry) => {
//       const { start_time, end_time, subject_name, is_recurring, end_recurring_date } = entry;
//       const startDate = new Date(start_time);
//       const endDate = new Date(end_time);
//       const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//       const offset = startDate.getTimezoneOffset();
//       const startDateWithOffset = new Date(startDate.getTime() - (offset*60*1000));
//       const endDateWithOffset = new Date(endDate.getTime() - (offset*60*1000));
//       const schedulerEntry = {
//         startDate: startDateWithOffset.toISOString().slice(0,16),
//         endDate: endDateWithOffset.toISOString().slice(0,16),
//         title: subject_name,
//       };

      
//       if (is_recurring) {
//         // Jeśli zajęcia są cykliczne, dodaj regułę do powtarzania
//         const endRecurringDate = new Date(end_recurring_date);
//         const untilDate = new Date(endRecurringDate.getTime() + 86400000); // Adding one day to include the end date
  
//         const untilDateString = untilDate.toISOString().split('T')[0].replace(/-/g, ''); // Get only the date part and remove dashes
  
//         schedulerEntry.rRule = `FREQ=WEEKLY;UNTIL=${untilDateString}`;
//       }

//       return schedulerEntry;
//     });
//   };
  
  

//   const schedulerData = convertToSchedulerData(timetableData);
//   console.log('Scheduler Data: ', schedulerData);


//   return (
//     <div className="partent-student-timetable-container">
//       <StudentMenu />
//       <div className="parent-student-timetable-view">
//         <h3>Plan zajęć: </h3>
//         <Paper>
//           <Scheduler data={schedulerData}>
//             <ViewState currentDate={currentDate} />
//             <WeekView startDayHour={7} endDayHour={16} />
//             <Appointments />
//           </Scheduler>
//         </Paper>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import './ParentStudentTimetable.css';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ParentMenu } from '../../menu/parent/ParentMenu';
import { backendServer } from '../../../config';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;
const currentDate = date;

export function ParentTimetable() {
  const [userData, setUserData] = useState([]);
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          console.log("userData: ", userData);
          setUserData(userData);

          if (result.ok && userData.length > 0) {
            const studentId = userData[0].student_id;
            const classId = userData[0].class_id;
            const studentParentQuery = `${backendServer}/student-parent/${studentId}`;
            const result2 = await fetch(studentParentQuery);
            const studentParentData = await result2.json();
            console.log("studentParentData: ", studentParentData);

            if (result2.ok && studentParentData.length > 0) { // Poprawiona linijka
              const timetableQuery = `${backendServer}/timetable/${studentParentData[0].school_id}/${studentParentData[0].class_id}`;
              const timetableResult = await fetch(timetableQuery);
              const timetableData = await timetableResult.json();
              console.log('Timetable data: ', timetableData);

              // Dodaj ten log, aby sprawdzić, kiedy ustawiane są dane kalendarza
              console.log('Setting scheduler data:', timetableData);
              setTimetableData(timetableData);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);


  const convertToSchedulerData = (timetableData) => {
    return timetableData.map((entry) => {
      const { start_time, end_time, subject_name, is_recurring, end_recurring_date } = entry;
      const startDate = new Date(start_time);
      const endDate = new Date(end_time);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const offset = startDate.getTimezoneOffset();
      const startDateWithOffset = new Date(startDate.getTime() - (offset*60*1000));
      const endDateWithOffset = new Date(endDate.getTime() - (offset*60*1000));
      const schedulerEntry = {
        startDate: startDateWithOffset.toISOString().slice(0,16),
        endDate: endDateWithOffset.toISOString().slice(0,16),
        title: subject_name,
      };

      
      if (is_recurring) {
        // Jeśli zajęcia są cykliczne, dodaj regułę do powtarzania
        const endRecurringDate = new Date(end_recurring_date);
        const untilDate = new Date(endRecurringDate.getTime() + 86400000); 
        const untilDateString = untilDate.toISOString().split('T')[0].replace(/-/g, ''); 
        schedulerEntry.rRule = `FREQ=WEEKLY;UNTIL=${untilDateString}`;
      }

      return schedulerEntry;
    });
  };
  
  
  const schedulerData = convertToSchedulerData(timetableData);
  console.log('Scheduler Data: ', schedulerData);


  return (
    <div className="partent-student-timetable-container">
      <ParentMenu />
      <div className="parent-student-timetable-view">
        <h3>Plan zajęć: </h3>
        <Paper>
          {schedulerData.length > 0 ? (
            <Scheduler data={schedulerData}>
              <ViewState currentDate={currentDate} />
              <WeekView startDayHour={7} endDayHour={16} />
              <Appointments />
            </Scheduler>
          ) : (
            <p>Ładowanie danych kalendarza...</p>
          )}
        </Paper>
      </div>
    </div>
  );
  
}