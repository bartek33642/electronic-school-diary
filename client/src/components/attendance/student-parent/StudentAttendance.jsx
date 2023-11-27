import React from "react";
import { StudentMenu } from "../../menu/student/StudentMenu";
import './ParentStudentAttendance.css';

export function StudentAttendance() {
    return(
        <>

        <div className="student-attendance-container">
        <StudentMenu />
        
        <div className="student-attendance-elements">
        <h2>Obecność ucznia</h2>
      
        <table >
<thead>
  <tr>
    <th>Data</th>
    <th>
    <p>Nr lekcji</p>
    <div className="span-lessons-div">
    <div className="span-lessons-span">1</div>
    <div className="span-lessons-span">2</div>
    <div className="span-lessons-span">3</div>
    <div className="span-lessons-span">4</div>
    <div className="span-lessons-span">5</div>
    <div className="span-lessons-span">6</div>
    <div className="span-lessons-span">7</div>
    <div className="span-lessons-span">8</div>
    <div className="span-lessons-span">9</div>
    <div className="span-lessons-span">10</div>
	<div className="span-lessons-span">11</div>
	<div className="span-lessons-span">12</div>
    <div className="span-lessons-span">13</div>
	<div className="span-lessons-span">14</div>
    </div>
    </th>
    <th>Podsumowanie</th>
  </tr>
 </thead>

 <tbody>
  <tr>
    <td>Poniedziałek 20-11-2023</td>
    <td>
    <div className="span-lessons-div">
    <div className="span-lessons-span">O</div>
    <div className="span-lessons-span">O</div>
    <div className="span-lessons-span">O</div>
    <div className="span-lessons-span">O</div>
    <div className="span-lessons-span">O</div>
    <div className="span-lessons-span">O</div>
    <div className="span-lessons-span">NUS</div>
    <div className="span-lessons-span"></div>
    <div className="span-lessons-span"></div>
    <div className="span-lessons-span"></div>
	<div className="span-lessons-span"></div>
	<div className="span-lessons-span"></div>
    <div className="span-lessons-span"></div>
	<div className="span-lessons-span"></div>
    </div>
    </td>
    <td></td>
  </tr>

  
  </tbody>
</table> 

</div>
</div>

</>
    );
}