import React from 'react'
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { isExpired } from 'react-jwt';

import { Home } from './components/homepage/Home';
import { Login } from './components/login/Login';
import { Contact } from './components/contact/Contact';
import { PrivacyPolicy } from './components/privacy_policy/PrivacyPolicy';
import { NotFound } from './components/404/NotFound';

import { RegisterAdmin } from './components/Register/RegisterAdmin';
import { AdminDashboard } from './components/dashboard/admin/AdminDashboard';
import { Role } from './components/role/Role';
import { ParentDashboard } from './components/dashboard/parent/ParentDasboard';
import { StudentDashboard } from './components/dashboard/student/StudentDashboard';
import { TeacherDashboard } from './components/dashboard/teacher/TeacherDashboard';
import { PrincipalDashboard } from './components/dashboard/principal/PrincipalDashboard';
import { AdminUsers } from './components/users/admin/AdminUsers';
import { AdminSettings } from './components/settings/admin/AdminSettings';
import { ParentTimetable } from './components/timetable/ParentStudentTimetable/ParentTimetable';
import { StudentTimetable } from './components/timetable/ParentStudentTimetable/StudentTimetable';
import { Schools } from './components/schools/Schools';
import { AdminClasses } from './components/classes/admin/AdminClasses';
import { AdminTopics } from './components/topics/admin/AdminTopics';
import { AdminMarks } from '../src/components/marks/admin/AdminMarks';
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
import { StudentAttendance } from './components/attendance/student-parent/StudentAttendance';
import { ParentAttendance } from './components/attendance/student-parent/ParentAttendance';
import { ParentTopics } from './components/topics/student-parent/ParentTopics';
import { StudentTopics } from './components/topics/student-parent/StudentTopics';
import { StudentSubjects } from './components/subjects/student-parent/StudentSubjects';
import { StudentRemarks } from './components/remarks/student-parent/StudentRemarks';
import { ParentRemarks } from './components/remarks/student-parent/ParentRemarks';
import { StudentSettings } from './components/settings/student/StudentSettings';
import { ParentSettings } from './components/settings/parent/ParentSettings';
import { PrincipalSettings } from './components/settings/principal/PrincipalSettings';
import { TeacherSettings } from './components/settings/teacher/TeacherSettings';
import { PrincipalUsers } from './components/users/principal/PrincipalUsers';
import { PrincipalClasses } from './components/classes/principal/PrincipalClasses';
import { PrincipalTopics } from './components/topics/principal/PrincipalTopics';
import { PrincipalRemarks } from './components/remarks/principal/PrincipalRemarks';
import { PrincipalSubjects } from './components/subjects/principal/PrincipalSubjects';
import { ParentSubjects } from './components/subjects/student-parent/ParentSubjects';
import { ParentMarks } from './components/marks/parent/ParentMarks';
import { TeacherRemarks } from './components/remarks/teacher/TeacherRemarks';
import { TeacherClasses } from './components/classes/teacher/TeacherClasses';
import { TeacherTopics } from './components/topics/teacher/TeacherTopics';
import { TeacherSubjects } from './components/subjects/teacher/TeacherSubjects';
import { TeacherTimetable } from './components/timetable/TeacherTimetable/TeacherTimetable';
import { PrincipalMarks } from './components/marks/principal/PrincipalMarks';
import { PrincipalTimetable } from './components/timetable/PrincipalTimetable/PrincipalTimetable';
import { TeacherMarks } from './components/marks/teacher/TeacherMarks';
import { PrincipalAttendance } from './components/attendance/principal/PrincipalAttendance';
import { TeacherAttendance } from './components/attendance/teacher/TeacherAttendance';

import { isLoggedIn } from './dependenciesAndRequirements/isLoggedIn';

function App() {

  return (

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />

            <Route path="/role" element={
                isExpired(localStorage.getItem("token")) ? (
                <Navigate replace to='/login' /> 
                ) : ( <Role/>)
              }/>
            

            <Route path="/register-admin" element={
                isExpired(localStorage.getItem("token")) ? (
                <Navigate replace to='/login' /> 
                ) : ( <RegisterAdmin />)
              }/>
            
            <Route path="/register-parent" element={
                isExpired(localStorage.getItem("token")) ? (
                <Navigate replace to='/login' /> 
                ) : ( <RegisterParent />)
              }/>
            
            <Route path="/register-principal" element={
                isExpired(localStorage.getItem("token")) ? (
                <Navigate replace to='/login' /> 
                ) : ( <RegisterPrincipal />)
              }/>

            <Route path="/register-student" element={
                isExpired(localStorage.getItem("token")) ? (
                <Navigate replace to='/login' /> 
                ) : ( <RegisterStudent />)
              }/>

            <Route path="/register-teacher" element={
                isExpired(localStorage.getItem("token")) ? (
                <Navigate replace to='/login' /> 
                ) : ( <RegisterTeacher />)
              }/>

            <Route path="/admin" element={
              isLoggedIn(1) ? <AdminDashboard /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/parent/:user_id/:parent_id" element={
              isLoggedIn(5) ? <ParentDashboard /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student/:user_id/:student_id" element={
              isLoggedIn(4) ? <StudentDashboard /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal/:user_id/:principal_id" element={
              isLoggedIn(2) ? <PrincipalDashboard /> :  <Navigate replace to='/login' /> 
            }
            />

              <Route path="/teacher/:user_id/:teacher_id" element={
                isLoggedIn(3) ? <TeacherDashboard /> :  <Navigate replace to='/login' /> 
              }
              />

            <Route path="/users-admin" element={
                isLoggedIn(1) ? <AdminUsers /> :  <Navigate replace to='/login' /> 
              }
              />

            <Route path="/admin-settings" element={
              isLoggedIn(1) ? <AdminSettings /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student-timetable" element={
              isLoggedIn(4) ? <StudentTimetable /> :  <Navigate replace to='/login' /> 
            }
            />


            <Route path="/parent-timetable" element={
              isLoggedIn(5) ? <ParentTimetable /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/schools" element={
              isLoggedIn(1) ? <Schools /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/admin-classes" element={
              isLoggedIn(1) ? <AdminClasses /> :  <Navigate replace to='/login' /> 
            }
            />
            
            <Route path="/admin-topics" element={
              isLoggedIn(1) ? <AdminTopics /> :  <Navigate replace to='/login' /> 
            }
            />
                        
            <Route path="/admin-grades" element={
              isLoggedIn(1) ? <AdminMarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student-marks" element={
              isLoggedIn(4) ? <StudentMarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/admin-timetable" element={
              isLoggedIn(1) ? <AdminTimetable /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/admin-attendance" element={
              isLoggedIn(1) ? <AdminAttendance /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/admin-remarks" element={
              isLoggedIn(1) ? <AdminRemarks /> :  <Navigate replace to='/login' /> 
            }
            />
            
            <Route path="/admin-subjects" element={
              isLoggedIn(1) ? <AdminSubjects /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/admin-polls" element={
              isLoggedIn(1) ? <AdminPolls /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student-attendance" element={
              isLoggedIn(4) ? <StudentAttendance /> :  <Navigate replace to='/login' /> 
            }
            />
            
            <Route path="/parent-attendance" element={
              isLoggedIn(5) ? <ParentAttendance /> :  <Navigate replace to='/login' /> 
            }
            />
                       
            <Route path="/parent-topics" element={
              isLoggedIn(5) ? <ParentTopics /> :  <Navigate replace to='/login' /> 
            }
            />
              
            <Route path="/student-topics" element={
              isLoggedIn(4) ? <StudentTopics /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student-subjects" element={
              isLoggedIn(4) ? <StudentSubjects /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student-remarks" element={
              isLoggedIn(4) ? <StudentRemarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/parent-remarks" element={
              isLoggedIn(5) ? <ParentRemarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/student-settings" element={
              isLoggedIn(4) ? <StudentSettings /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/parent-settings" element={
              isLoggedIn(5) ? <ParentSettings /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-settings" element={
              isLoggedIn(2) ? <PrincipalSettings /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-settings" element={
              isLoggedIn(3) ? <TeacherSettings /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-users" element={
              isLoggedIn(2) ? <PrincipalUsers /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-classes" element={
              isLoggedIn(2) ? <PrincipalClasses /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-topics" element={
              isLoggedIn(2) ? <PrincipalTopics /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-remarks" element={
              isLoggedIn(2) ? <PrincipalRemarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-subjects" element={
              isLoggedIn(2) ? <PrincipalSubjects /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/parent-subjects" element={
              isLoggedIn(5) ? <ParentSubjects /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/parent-grades" element={
              isLoggedIn(5) ? <ParentMarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-remarks" element={
              isLoggedIn(3) ? <TeacherRemarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-classes" element={
              isLoggedIn(3) ? <TeacherClasses /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-topics" element={
              isLoggedIn(3) ? <TeacherTopics /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-subjects" element={
              isLoggedIn(3) ? <TeacherSubjects /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-marks" element={
              isLoggedIn(3) ? <TeacherMarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-timetable" element={
              isLoggedIn(3) ? <TeacherTimetable /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-grades" element={
              isLoggedIn(2) ? <PrincipalMarks /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/principal-attendance" element={
              isLoggedIn(2) ? <PrincipalAttendance /> :  <Navigate replace to='/login' /> 
            }
            />

            <Route path="/teacher-attendance" element={
              isLoggedIn(3) ? <TeacherAttendance /> :  <Navigate replace to='/login' /> 
            }
            />

             <Route path="/principal-timetable" element={
              isLoggedIn(2) ? <PrincipalTimetable /> :  <Navigate replace to='/login' /> 
            }
            />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;