import userEndpoint from './user.endpoint';
import adminEndpoint from './admin.endpoint';
import parentEndpoint from './parent.endpoint';
import principalEndpoint from './principal.endpoint';
import studentEndpoint from './student.endpoint';
import teacherEndpoint from './teacher.endpoint';
import schoolEndpoint from './school.endpoint';
import classEndpoint from './class.endpoint';
import pollEndpoint from './poll.endpoint';
import loginEndpoint from './login.endpoint';
import marksEndpoint from './marks.endpoint';
import topicsEndpoint from './topics.endpoint';
import subjectEndpoint from './subject.endpoint';
import attendanceEnpoint from './attendance.endpoint';
import remarksEndpoint from './remarks.endpoint';

const routes = function (app) {
  userEndpoint(app);
  adminEndpoint(app);
  parentEndpoint(app);
  principalEndpoint(app);
  studentEndpoint(app);
  teacherEndpoint(app);
  schoolEndpoint(app);
  classEndpoint(app);
  pollEndpoint(app);
  loginEndpoint(app);
  marksEndpoint(app);
  topicsEndpoint(app);
  subjectEndpoint(app);
  attendanceEnpoint(app);
  remarksEndpoint(app);
};


export default routes;
