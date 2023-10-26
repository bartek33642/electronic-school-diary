import React from "react";
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

import './ParentStudentTimetable.css';
import Paper from '@mui/material/Paper';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { StudentMenu } from "../../menu/student/StudentMenu";
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;
const currentDate = date;
const schedulerData = [
  { startDate: '2023-10-25T08:55', endDate: '2023-10-25T09:40', title: 'Matematyka' },
  { startDate: '2023-10-25T09:45', endDate: '2023-10-25T10:30', title: 'W-F' },
  { startDate: '2023-10-25T10:45', endDate: '2023-10-25T11:30', title: 'W-F' },
  { startDate: '2023-10-26T09:45', endDate: '2023-10-26T10:30', title: 'Przyroda' },
  { startDate: '2023-10-26T10:45', endDate: '2023-10-26T11:30', title: 'Muzyka' },
];

export function ParentStudentTimetable(){
  return(
    <div className="partent-student-timetable-container">
    <StudentMenu />
    <div className="parent-student-timetable-view">
    <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <WeekView
        startDayHour={7}
        endDayHour={16}
      />
      <Appointments />
    </Scheduler>
  </Paper>
  </div>
  </div>
  );
}