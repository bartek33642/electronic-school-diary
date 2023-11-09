// tokenDAO.js
const config = require('../config'); 
const jwt = require('jsonwebtoken');
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

module.exports = {
  createToken,
  verifyToken,
  generateToken
};
