import { StudentMenu } from '../../menu/student/StudentMenu';
import './StudentMarks.css'
import React from 'react'

export function StudentMarks() {

        return (
            <div className='student-marks-conatiner'>
                <StudentMenu />
                <div className="student-marks-elements">
                    <h3>Oceny: </h3>

                    <table className='student-marks-table'>
                        <tr className="student-marks-tr">
                            <th className="student-marks-th">Przedmiot</th>
                            <th className="student-marks-th">Ocena</th>
                            <th className="student-marks-th">Średnia arytmetyczna</th>
                            <th className="student-marks-th">Średnia ważona</th>
                            <th className="student-marks-th">Ocena przewidywana</th>
                            <th className="student-marks-th">Ocena końcowa</th>
                        </tr>
                        <tr className="student-marks-tr">
                            <td className="student-marks-td">Język polski</td>
                            <td className="student-marks-td">4, 3, 5</td>
                            <td className="student-marks-td">4.0</td>
                            <td className="student-marks-td">3.8</td>
                            <td className="student-marks-td">4</td>
                            <td className="student-marks-td"></td>
                        </tr>
                        <tr className="student-marks-tr">
                            <td className="student-marks-td">Język angielski</td>
                            <td className="student-marks-td">4, 4</td>
                            <td className="student-marks-td">4.0</td>
                            <td className="student-marks-td">4.0</td>
                            <td className="student-marks-td">4</td>
                            <td className="student-marks-td"></td>
                        </tr>
                        <tr className="student-marks-tr">
                            <td className="student-marks-td">Matematyka</td>
                            <td className="student-marks-td">3, 4</td>
                            <td className="student-marks-td">3.5</td>
                            <td className="student-marks-td">3.6</td>
                            <td className="student-marks-td">4</td>
                            <td className="student-marks-td"></td>
                        </tr>
                        
                        <tr className="student-marks-tr">
                            <td className="student-marks-td">Przyroda</td>
                            <td className="student-marks-td">5, 5</td>
                            <td className="student-marks-td">5.0</td>
                            <td className="student-marks-td">5.0</td>
                            <td className="student-marks-td">5</td>
                            <td className="student-marks-td"></td>
                        </tr>
                        
                    </table>

                </div>
            </div>
        );

}
