// import jwt from 'jsonwebtoken';
// import config from '../config';

// const authMiddleware = (req, res, next) => {
//   let token = req.headers['x-auth-token'] || req.headers['authorization'];
//   if (token && token.startsWith('Bearer ')) {
//     token = token.slice(7, token.length);
//   }
//   if (!token) return res.status(401).send('Access denied. No token provided.');

//   try {
//     req.user = jwt.verify(token, config.JwtSecret);
//     next();
//   }
//   catch (ex) {
//     res.status(400).send('Invalid token.');
//   }
// };

// export default authMiddleware;

const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided.' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed: Invalid token.' });
    }

    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
