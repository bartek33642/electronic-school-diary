// import business from '../business/business.container';
// import applicationException from '../service/applicationException';
// import login from '../middleware/login';
// import auth from '../middleware/auth';

// const userEndpoint = (router) => {
//     router.post('/api/user/auth', async(request, response, next) => {
//         try {
//             let result = await business(request).getUserManager(request).authenticate(request.body.login, request.body.password);
//             response.status(200).send(result);
//         } catch (error) {
//             applicationException.errorHandler(error, response);
//         }
//     });

//     router.post('/api/user/create', auth, login, async (request, response, next) => {
//         try {
//             let result = await business(request).getUserManager(request).createNewOrUpdate(request.body);
//             response.status(200).send(result);
//         } catch (error) {
//             applicationException.errorHandler(error, response);
//         }
//     });

//     router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
//         try {
//             let result = await business(request).getUserManager(request).removeHashSession(request.body.userId);
//             response.status(200).send(result);
//         } catch (error) {
//             applicationException.errorHandler(error, response);
//         }
//     });

// }
// export default userEndpoint;


import business from '../business/business.container';
import applicationException from '../service/applicationException';
import pool from '../../db'; // Upewnij się, że importujesz obiekt `pool` z odpowiedniego pliku

const userEndpoint = (router) => {
  router.post('/api/user/auth', async (request, response, next) => {
    try {
      let result = await business(request).getUserManager(request).authenticate(request.body.login, request.body.password);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post('/api/user/create', async (request, response, next) => {
    try {
      const userData = {
        email: request.body.email,
        password: request.body.password,
        role: request.body.role,
        active: request.body.active,
        status: 'user', // Ustaw status na 'user' w przypadku rejestracji z tego punktu
        first_name: request.body.first_name,
        second_name: request.body.second_name,
        school_id: request.body.school_id // Dodaj pole school_id jeśli jest dostępne
      };

      let result = await business(request).getUserManager(request).createNewOrUpdate(userData);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete('/api/user/logout/:userId', async (request, response, next) => {
    try {
      // Skorzystaj z parametru `userId` przekazywanego w URL
      const userId = request.params.userId;

      let result = await business(request).getUserManager(request).removeHashSession(userId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default userEndpoint;
