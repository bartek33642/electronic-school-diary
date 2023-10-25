import React from "react";
import {DayPilotScheduler} from "daypilot-pro-react";
import './ParentStudentTimetable.css';

export function ParenttudentTimetable() {
    return(

        <div className="parent-student-timetable-container">
            <DayPilotScheduler 
            locale={'pl-pl'}
            startDate={'2023-01-01'}
            days={31}
            scale={"Day"}
            timeHeaders={ [{groupBy: "Day"}] }
            resources={
                [
                    {
                      "name": "Group 1",
                      "id": "G1",
                      "expanded": true,
                      "children": [
                        {
                          "name": "Resource 1",
                          "id": "R1"
                        },
                        {
                          "name": "Resource 2",
                          "id": "R2"
                        }
                      ]
                    },
                    {
                      "name": "Group 2",
                      "id": "G2",
                      "expanded": true,
                      "children": [
                        {
                          "name": "Resource 3",
                          "id": "R3"
                        },
                        {
                          "name": "Resource 4",
                          "id": "R4"
                        }
                      ]
                    }
                  ]
            }
            events={[
                {
                  "id": 2,
                  "resource": "R1",
                  "start": "2023-10-12T00:00:00",
                  "end": "2023-10-16T00:00:00",
                  "text": "Event 2"
                },
                {
                  "start": "2023-10-03T00:00:00",
                  "end": "2023-10-07T00:00:00",
                  "id": "8af1a86d-82ec-49a6-e2b7-89e43948b942",
                  "resource": "R1",
                  "text": "Event 1"
                },
                {
                  "start": "2023-10-02T00:00:00",
                  "end": "2023-10-06T00:00:00",
                  "id": "00e324ac-9013-cb80-a8a2-40c202de4513",
                  "resource": "R2",
                  "text": "Event 3"
                }
              ]}
            />
        </div>
    );
}