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

const routes = function (router) {
  userEndpoint(router);
  adminEndpoint(router);
  parentEndpoint(router);
  principalEndpoint(router);
  studentEndpoint(router);
  teacherEndpoint(router);
};

export default routes;
