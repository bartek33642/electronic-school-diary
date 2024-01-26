import UserDAO from '../DAO/userDAO';
import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import applicationException from '../service/applicationException';
import bcrypt from 'bcrypt';
import config from '../config';
const jwt = require('jsonwebtoken');

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

    const token = await TokenDAO.createToken(userData); 
    console.log(token);
    return token;
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);

    if (userData.password) {
      await PasswordDAO.createOrUpdate({ userId: user.user_id, password: userData.password });
    }

    return user;
  }

  async function removeHashSession(token) {
    try {
        const decodedToken = jwt.verify(token, config.JwtSecret);
        const result = await TokenDAO.remove(decodedToken.user_id);
        console.log("result server: ", result);

        return { message: 'Wylogowano pomyślnie' };
    } catch (error) {
        console.error('Błąd wylogowania:', error);
        throw applicationException.new(applicationException.UNAUTHORIZED, 'Błąd z wylogowaniem');
    }
}


  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession
  };
}

export const userManager = create();