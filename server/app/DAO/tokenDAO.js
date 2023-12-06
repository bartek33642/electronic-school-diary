// tokenDAO.js
// const config = require('../config'); 
const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';
import config from '../config';
const momentWrapper = require('../service/momentWrapper');
const applicationException = require('../service/applicationException');

function createToken(payload) {
  if (!config.JwtSecret) {
    throw new Error('Secret key is missing');
  }

  const token = jwt.sign(payload, config.JwtSecret, { expiresIn: '1h' });
  console.log("token: ", token);
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

const storedTokens = [];  // Przykład: zakładam, że tokeny są przechowywane w tej tablicy

// function remove(token) {
//   // Sprawdź, czy token istnieje w przechowywaniu
//   // const tokenIndex = storedTokens.indexOf(token);
//   const tokenIndex = storedTokens.findIndex(t => t === token);


//   if (tokenIndex !== -1) {
//     // Jeśli token istnieje, usuń go z przechowywania
//     storedTokens.splice(tokenIndex, 1);
//     console.log("Token removed:", token);
//   } else {
//     console.log("Token not found:", token);
//   }
// }

function remove(token) {
  try {
    // Weryfikacja tokenu
    const decodedToken = jwt.verify(token, config.JwtSecret);

    // Sprawdź, czy token istnieje w przechowywaniu
    const tokenIndex = storedTokens.findIndex(t => t.user_id === decodedToken.user_id);

    if (tokenIndex !== -1) {
      // Jeśli token istnieje, usuń go z przechowywania
      storedTokens.splice(tokenIndex, 1);
      console.log("Token removed:", token);

      // Po usunięciu tokenu, utwórz nowy token i zwróć go
      const newToken = createToken({ user_id: decodedToken.user_id, email: decodedToken.email });
      console.log("New token created:", newToken);
      storedTokens.push({ user_id: decodedToken.user_id, token: newToken });

      return newToken;
    } else {
      console.log("Token not found:", token);
      throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
    }
  } catch (error) {
    console.error('Błąd wylogowania:', error);
    // Odpowiedź błędem
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Błąd z wylogowaniem');
  }
}

module.exports = {
  createToken,
  verifyToken,
  generateToken,
  remove
};
