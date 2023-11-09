// import userEndpoint from './user.endpoint';
// import adminEndpoint from './admin.endpoint';

// const routes = function (router)
// {
//   userEndpoint(router);
//   adminEndpoint(router);
// };

// export default routes;


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
  loginEndpoint(app)
};


export default routes;
