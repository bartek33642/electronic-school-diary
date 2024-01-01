import React, { useEffect, useState } from "react";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import "./TeacherAttendance.css";
import { backendServer } from "../../../config";

export function TeacherAttendance() {
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
    
              if (result.ok) {
                setUserData(userData);
              }
            }
        }  catch (error){
            console.error(error.message)        
        }
    }
    fetchUserData();
}, []);  

    
    return (
        <div className="teacher-attendance-container">
            <TeacherMenu />
            <div className="teacher-attendance-elements">
                <h2>
                    Obecność
                </h2>


            </div>
        </div>
    );
}