import jwt from "jsonwebtoken";
import config from "../config";

const parentMiddleware = (req, res, next) => {

    if (req.user.role === 'parent') {
        next(); // Jeśli użytkownik jest rodzicem, pozwól mu przejść dalej.
      } else {
        res.status(403).send('Access denied.'); // W przeciwnym razie zakaz dostępu.
      }

};

export default parentMiddleware;