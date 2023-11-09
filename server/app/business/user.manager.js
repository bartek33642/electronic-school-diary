// import PasswordDAO from '../DAO/passwordDAO';
// import TokenDAO from '../DAO/tokenDAO';
// import UserDAO from '../DAO/userDAO';
// import crypto from 'crypto';
 
// function create(context) {

//   function hashString(password) {
//     const sha256Hash = crypto.createHash('sha256');
//     sha256Hash.update(password);
//     return sha256Hash.digest('hex');
//   }

//   async function authenticate(name, password) {
//     let userData;
//     const user = await UserDAO.getUserByEmail(name);
//     if (!user) {
//       throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
//     }
//     userData = await user;
//     await PasswordDAO.authorize(user.id, hashString(password));
//     const token = await TokenDAO.create(userData);
//     return getToken(token);
//   }

//   function getToken(token) {
//     return { token: token.value };
//   }

//   async function createNewOrUpdate(userData) {
//     const user = await UserDAO.createNewOrUpdate(userData);
//     if (await userData.password) {
//       return await PasswordDAO.createOrUpdate({ userId: user.id, password: hashString(userData.password) });
//     } else {
//       return user;
//     }
//   }

//   async function removeHashSession(userId) {
//     return await TokenDAO.remove(userId);
//   }

//   return {
//     authenticate: authenticate,
//     createNewOrUpdate: createNewOrUpdate,
//     removeHashSession: removeHashSession
//   };
// }

// export default {
//   create: create
// };


// app/business/user.manager.js
import UserDAO from '../DAO/userDAO';
import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import applicationException from '../service/applicationException';
import bcrypt from 'bcrypt';

function create(context) {
  async function authenticate(email, password) {
    let userData;
    const user = await UserDAO.getUserByEmail(email);

    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }

    userData = user;
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'Invalid password');
    }

    const token = await TokenDAO.createToken(userData); // Poprawiona nazwa funkcji
    return getToken(token);
  }

  function getToken(token) {
    return { token: token.value };
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);

    if (userData.password) {
      await PasswordDAO.createOrUpdate({ userId: user.user_id, password: userData.password });
    }

    return user;
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession
  };
}

export const userManager = create();