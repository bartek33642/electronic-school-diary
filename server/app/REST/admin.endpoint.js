import pool from '../../db';
const bcrypt = require("bcrypt");
const express = require('express');
const app = express();

const adminEndpoint = (app) => {
  app.post('/register-admin', async(req, res) => {
    const { email, password, active, first_name, second_name } = req.body;
    
    try {
      
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const adminRegister = await pool.query(`INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name) VALUES($1, $2, 1, $3, $4, $5, $6) `,
        [email, bcryptPassword, active, 'admin', first_name, second_name]);

      res.status(201).json({ message: 'Admin zarejestrowany pomyślnie.' });
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      res.status(500).json({ error: 'Błąd rejestracji', details: error.message });
    }
  });
};

export default adminEndpoint;

