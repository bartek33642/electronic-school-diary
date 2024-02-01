import React, { useState, useEffect } from "react";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import "./TeacherTimetable.css";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { backendServer } from "../../../config";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const date = `${year}-${month}-${day}`;
const currentDate = date;

export function TeacherTimetable() {
  const [userData, setUserData] = useState([]);
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          setUserData(userData);

          if (result.ok && userData.length > 0) {
            const studentId = userData[0].student_id;
            const classId = userData[0].class_id;
            const schoolId = userData[0].school_id;
            const teacherId = userData[0].teacher_id;
            const teacherQuery = `${backendServer}/teacher-timetable/${schoolId}/${teacherId}`;
            const result2 = await fetch(teacherQuery);
            const studentParentData = await result2.json();

            if (result2.ok && studentParentData.length > 0) {
              const timetableQuery = `${backendServer}/timetable/${studentParentData[0].school_id}/${studentParentData[0].class_id}`;
              const timetableResult = await fetch(timetableQuery);
              const timetableData = await timetableResult.json();

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
      const {
        start_time,
        end_time,
        subject_name,
        is_recurring,
        end_recurring_date,
      } = entry;
      const startDate = new Date(start_time);
      const endDate = new Date(end_time);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const offset = startDate.getTimezoneOffset();
      const startDateWithOffset = new Date(
        startDate.getTime() - offset * 60 * 1000
      );
      const endDateWithOffset = new Date(
        endDate.getTime() - offset * 60 * 1000
      );
      const schedulerEntry = {
        startDate: startDateWithOffset.toISOString().slice(0, 16),
        endDate: endDateWithOffset.toISOString().slice(0, 16),
        title: subject_name,
      };

      if (is_recurring) {
        const endRecurringDate = new Date(end_recurring_date);
        const untilDate = new Date(endRecurringDate.getTime() + 86400000);
        const untilDateString = untilDate
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");
        schedulerEntry.rRule = `FREQ=WEEKLY;UNTIL=${untilDateString}`;
      }

      return schedulerEntry;
    });
  };

  const schedulerData = convertToSchedulerData(timetableData);

  return (
    <div className="teacher-timetable-container">
      <TeacherMenu />
      <div className="teacher-timetable-elements">
        <h3>Plan zajęć: </h3>
        <Paper>
          {schedulerData.length > 0 ? (
            <Scheduler data={schedulerData}>
              <ViewState currentDate={currentDate} />
              <WeekView startDayHour={7} endDayHour={16} />
              <Appointments />
            </Scheduler>
          ) : (
            <p>Brak danych</p>
          )}
        </Paper>
      </div>
    </div>
  );
}
