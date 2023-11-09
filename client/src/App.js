import React from 'react'
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './components/homepage/Home';
import { Login } from './components/login/Login';
import { NotFound } from './components/404/NotFound';
import { RegisterAdmin } from './components/Register/RegisterAdmin';
import { AdminDashboard } from './components/dashboard/admin/AdminDashboard';
import { Role } from './components/role/Role';
import { AdminMarks } from '../src/components/marks/admin/AdminMarks';
import { ParentDashboard } from './components/dashboard/parent/ParentDasboard';
import { StudentDashboard } from './components/dashboard/student/StudentDashboard';
import { TeacherDashboard } from './components/dashboard/teacher/TeacherDashboard';
import { PrincipalDashboard } from './components/dashboard/principal/PrincipalDashboard';
import { AdminUsers } from './components/users/admin/AdminUsers';
import { AdminSettings } from './components/settings/admin/AdminSettings';
import { ParentStudentTimetable } from './components/timetable/ParentStudentTimetable/ParentStudentTimetable';
import { Schools } from './components/schools/Schools';
import { AdminClasses } from './components/classes/admin/AdminClasses';
import { AdminTopics } from './components/topics/admin/AdminTopics';
import { AdminGrades } from './components/grades/admin/AdminGrades';
import { RegisterParent } from './components/Register/RegisterParent';
import { RegisterPrincipal } from './components/Register/RegisterPrincipal';
import { RegisterStudent } from './components/Register/RegisterStudent';
import { RegisterTeacher } from './components/Register/RegisterTeacher';
import { StudentMarks } from './components/marks/student/StudentMarks';
import { AdminTimetable } from './components/timetable/AdminTimetable/AdminTimetable';
import { AdminAttendance } from './components/attendance/admin/AdminAttendance';
import { AdminRemarks } from './components/remarks/admin/AdminRemarks';
import { AdminSubjects } from './components/subjects/admin/AdminSubjects';
import { AdminPolls } from './components/polls/admin/AdminPolls';



function App() {
  return (

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* Do zmiany dodać zabezpieczeni ścieżek*/}
          <Route path='/role' element={< Role/>} />
          <Route path="/register-admin" component={<RegisterAdmin />} />
          <Route path="/register-parent" component={<RegisterParent />} />
          <Route path="/register-principal" component={<RegisterPrincipal />} />
          <Route path="/register-student" component={<RegisterStudent />} />
          <Route path="/register-teacher" component={<RegisterTeacher />} />
          <Route path="/grades" element={<AdminMarks />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/principal" element={<PrincipalDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/users-admin" element={<AdminUsers />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/student-timetable" element={<ParentStudentTimetable />} />
          <Route path="/schools" element={<Schools />} />
          <Route path='/admin-classes' element={<AdminClasses />} />
          <Route path='/admin-topics' element={<AdminTopics />} />
          <Route path='/admin-grades' element={<AdminGrades />} />
          <Route path='/student-marks' element={<StudentMarks />} />
          <Route path='/admin-timetable' element={<AdminTimetable />} />
          <Route path='/admin-attendance' element={<AdminAttendance />} />
          <Route path='/admin-remarks' element={<AdminRemarks />}/>
          <Route path='/admin-subjects' element={<AdminSubjects />} />
          <Route path='/admin-polls' element={<AdminPolls />} />
         
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;