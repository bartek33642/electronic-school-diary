const config = require('../config'); // Upewnij się, że importujesz konfigurację z odpowiedniego pliku
const jwt = require('jsonwebtoken');
const momentWrapper = require('../service/momentWrapper');
const applicationException = require('../service/applicationException');

// Typy tokenów
const tokenTypeEnum = {
  authorization: 'authorization',
};

// Funkcja do generowania tokenów JWT
function generateToken(payload) {
  const token = jwt.sign(payload, config.JwtSecret, { expiresIn: '1h' }); // Ustaw wygaśnięcie na 1 godzinę
  return token;
}

// Funkcja do weryfikacji tokenów JWT
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, config.JwtSecret);
    return payload;
  } catch (error) {
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Invalid token');
  }
}

module.exports = {
  generateToken,
  verifyToken,
  tokenTypeEnum,
};
