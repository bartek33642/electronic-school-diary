import pool from "../../db";
const express = require('express');
const app = express();
import { userManager } from '../business/user.manager';


const loginEndpoint = (app) => {
// Endpoint dla logowania
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tutaj możesz użyć userManager do autentykacji użytkownika
    const token = await userManager.authenticate(email, password);

    // Odpowiedź sukcesem i zwróć token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Błąd logowania:', error);
    // Odpowiedź błędem
    res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
  }
});

app.delete('/logout', async (req, res) => {
  try {
    // Pobierz dane użytkownika z żądania, na przykład email i hasło
    const { email, password } = req.body;

    // Wywołaj funkcję removeHashSession z userManager, aby usunąć sesję użytkownika
    const result = await userManager.removeHashSession(email, password);

    // Odpowiedź sukcesem
    res.status(200).json({ message: 'Wylogowano pomyślnie' });
  } catch (error) {
    console.error('Błąd wylogowania:', error);
    // Odpowiedź błędem
    res.status(401).json({ error: 'Błąd z wylogowaniem' });
  }
});

}

export default loginEndpoint;
