import pool from "../../db";
const express = require('express');
const app = express();
import { userManager } from '../business/user.manager';


const loginEndpoint = (app) => {
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userManager.authenticate(email, password);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
  }
});

app.delete('/logout/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const { email, password } = req.body;

    const result = await userManager.removeHashSession(user_id);

    res.status(200).json({ message: 'Wylogowano pomyślnie' });
  } catch (error) {
    console.error('Błąd wylogowania:', error);
    res.status(401).json({ error: 'Błąd z wylogowaniem' });
  }
});

}

export default loginEndpoint;
