const pool = require('../../db'); // Importuj obiekt konfiguracji bazy danych z pliku db.js

// Tworzenie nowego hasła
async function createPassword(userId, hashedPassword) {
  const query = 'INSERT INTO gradebook.users (user_id, password) VALUES ($1, $2) RETURNING *';
  const values = [userId, hashedPassword];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Autoryzacja użytkownika na podstawie hasła
async function authorize(userId, hashedPassword) {
  const query = 'SELECT password FROM gradebook.users WHERE user_id = $1 AND password = $2';
  const values = [userId, hashedPassword];
  const result = await pool.query(query, values);
  if (result.rows.length > 0) {
    // Użytkownik autoryzowany
    return true;
  }
  // Użytkownik nieautoryzowany
  return false;
}

// Aktualizacja hasła użytkownika
async function updatePassword(userId, hashedPassword) {
  const query = 'UPDATE gradebook.users SET password = $1 WHERE user_id = $2';
  const values = [hashedPassword, userId];
  await pool.query(query, values);
}

module.exports = {
  createPassword,
  authorize,
  updatePassword,
};
