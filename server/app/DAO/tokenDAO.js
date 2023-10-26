import config from "../config";
const pool = require('../../db');

// tokenDAO.js
const jwt = require('jsonwebtoken');

const jwtSecret = 'secret_key';

function generateAccessToken(user) {
  return jwt.sign(user, jwtSecret, { expiresIn: '1h' });
}

module.exports = { generateAccessToken };
