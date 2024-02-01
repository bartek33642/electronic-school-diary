const jwt = require('jsonwebtoken');
import config from '../config';
const momentWrapper = require('../service/momentWrapper');
const applicationException = require('../service/applicationException');

function createToken(payload) {
  if (!config.JwtSecret) {
    throw new Error('Secret key is missing');
  }

  const token = jwt.sign(payload, config.JwtSecret, { expiresIn: '1h' });
  return token;
}

function verifyToken(token) {
  try {
    if (!config.JwtSecret) {
      throw new Error('Secret key is missing');
    }

    const payload = jwt.verify(token, config.JwtSecret);
    return payload;
  } catch (error) {
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Invalid token');
  }
}

function generateToken(payload) {
  if (!config.JwtSecret) {
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Secret key is missing');
  }
  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: '1h' });
  return token;
}

const storedTokens = []; 

function remove(token) {
  try {
    const decodedToken = jwt.verify(token, config.JwtSecret);
    const tokenIndex = storedTokens.findIndex(t => t.user_id === decodedToken.user_id);

    if (tokenIndex !== -1) {
      storedTokens.splice(tokenIndex, 1);

      const newToken = createToken({ user_id: decodedToken.user_id, email: decodedToken.email });
      storedTokens.push({ user_id: decodedToken.user_id, token: newToken });

      return newToken;
    } else {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
    }
  } catch (error) {
    console.error('Błąd wylogowania:', error);
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Błąd z wylogowaniem');
  }
}

module.exports = {
  createToken,
  verifyToken,
  generateToken,
  remove
};
