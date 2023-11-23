import React from "react";
import { ParentMenu } from "../../menu/parent/ParentMenu";
import './ParentStudentAttendance.css'

export function ParentAttendance() {
    return(
        <>
        <div className="parent-attendance-container">
        <ParentMenu />

        <div className="parent-attendance-elements">
        <h2>Student Attendance</h2>
      
        <table >
<thead>
  <tr>
    <th>Data</th>
    <th>
    <div className="span-lessons-div">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
    <span>10</span>
	<span>11</span>
	<span>12</span>
    </div> 
    </th>
    <th>Podsumowanie</th>
  </tr>
 </thead>

 <tbody>
  <tr>
    <td>Poniedziałek 20-11-2023</td>
    <td>
    <span>O</span>
    <span>O</span>
    <span>O</span>
    <span>O</span>
    <span>O</span>
    <span>O</span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
	<span></span>
	<span></span>
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