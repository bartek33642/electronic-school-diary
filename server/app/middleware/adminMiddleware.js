import jwt from "jsonwebtoken";
import config from "../config";

const adminMiddleware = (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden

  if (req.user.role === 'admin') {
    next(); // Jeśli użytkownik jest administratorem, pozwól mu przejść dalej.
  } else {
    res.status(403).send('Access denied.'); // W przeciwnym razie zakaz dostępu.
  }
  

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    req.user = jwt.verify(token, config.JwtSecret);
    if (!req.user.isAdmin) {
      return res.status(403).send('Access denied.');
    }
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

export default adminMiddleware;
