import jwt from 'jsonwebtoken';
import config from '../config';
const pool = require('../../db');
const express = require('express');
const router = express.Router();

const admin = (req, res, next) => {

    // let token = req.headers['x-access-token'] || req.headers['authorization'];
    // if (token.startsWith('Bearer ')) {
    //   token = token.slice(7, token.length);
    // }
    // if (!token) return res.status(401).send('Access denied. No token provided.');
  
    // try {
    //   req.user = jwt.verify(token, config.JwtSecret);
    //   if (!req.user.isAdmin) {
    //     return res.status(403).send('Access denied.');
    //   }
    //   next();
    // }
    // catch (ex) {
    //   res.status(400).send('Invalid token.');
    // }
  


//Rejestracja admina
  router.post('/REST/register-admin', async(req, res, next) => {
    const {email, password, role, active, first_name, second_name } = req.body;

    try{
      const adminRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name) VALUES($1, $2, 1, $3, $4, $5, $6)', [email, password, role, active, 'admin', first_name, second_name]);

      console.log(adminRegister);
      res.status(201).json({ message: 'Admin zarejestrowany pomyślnie.' });
    }catch (error) {
      res.status(500).json({ error: 'Błąd rejestracji' });
    }
  })
};
export default admin;