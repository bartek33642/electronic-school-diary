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
          <Route path="/admin/" element={<AdminDashboard />} />
          <Route path="/parent/:user_id/:parent_id" element={<ParentDashboard />} />
          <Route path="/student/:user_id/:student_id" element={<StudentDashboard />} />
          <Route path="/principal/:user_id/:principal_id" element={<PrincipalDashboard />} />
          <Route path="/teacher/:user_id/:teacher_id" element={<TeacherDashboard />} />
          <Route path="/users-admin" element={<AdminUsers />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/student-timetable" element={<ParentStudentTimetable />} />
          <Route path="/schools" element={<Schools />} />
          <Route path='/admin-classes' element={<AdminClasses />} />
          <Route path='/admin-topics' element={<AdminTopics />} />
          <Route path='/admin-grades' element={<AdminMarks />} />
          <Route path='/student-marks' element={<StudentMarks />} />
          <Route path='/admin-timetable' element={<AdminTimetable />} />
          <Route path='/admin-attendance' element={<AdminAttendance />} />
          <Route path='/admin-remarks' element={<AdminRemarks />}/>
          <Route path='/admin-subjects' element={<AdminSubjects />} />
          <Route path='/admin-polls' element={<AdminPolls />} />
          <Route path='/student-attendance' element={<StudentAttendance/>}/>
          <Route path='/parent-attendance' element={<ParentAttendance/>}/>
          <Route path='/parent-topics' element={<ParentTopics/>}/>
          <Route path='/student-topics' element={<StudentTopics/>}/>
          <Route path='/student-subjects' element={<StudentSubjects/>}/>
          <Route path='/student-remarks' element={<StudentRemarks />}/>
          <Route path='/parent-remarks' element={<ParentRemarks />}/>
          <Route path='/student-settings' element={<StudentSettings />}/>
          <Route path='/parent-settings' element={<ParentSettings />}/>
          <Route path='/principal-settings' element={<PrincipalSettings />}/>
          <Route path='/teacher-settings' element={<TeacherSettings />}/>
          <Route path='/principal-users' element={<PrincipalUsers />}/>
          <Route path='/principal-classes' element={<PrincipalClasses />}/>
          <Route path='/principal-topics' element={<PrincipalTopics />}/>
          <Route path='/principal-remarks' element={<PrincipalRemarks />}/>
          <Route path='/principal-subjects' element={<PrincipalSubjects />}/>
          <Route path='/parent-subjects' element={<ParentSubjects />}/>
          <Route path='/parent-grades' element={<ParentMarks />}/>
          <Route path='/teacher-remarks' element={<TeacherRemarks />}/>
          <Route path='/teacher-classes' element={<TeacherClasses />} />
          <Route path='/teacher-topics' element={<TeacherTopics />} />
          <Route path='/teacher-subjects' element={<TeacherSubjects />} />

         
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;