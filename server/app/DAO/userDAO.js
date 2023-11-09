const pool = require('../../db'); 

// Pobranie użytkownika po adresie e-mail lub nazwie
// userDAO.js
async function getUserByEmail(emailOrName) {
  const query = 'SELECT * FROM gradebook.users WHERE email = $1';
  const values = [emailOrName];
  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    console.log('getUserByEmail - User:', user);
    return user;
  } catch (error) {
    console.error('getUserByEmail - Error:', error);
    throw error;
  }
}


// Tworzenie nowego użytkownika
async function createNewUser(userData) {
  const query = 'INSERT INTO gradebook.users (email, password, role, active, status, first_name, second_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [
    userData.email,
    userData.password, // Przechowujesz hasło w bazie danych
    userData.role,
    userData.active,
    userData.status,
    userData.first_name,
    userData.second_name,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Autoryzacja użytkownika na podstawie hasła
async function authorize(email, password) {
  const query = 'SELECT * FROM gradebook.users WHERE email = $1 AND password = $2';
  const values = [email, password];
  const result = await pool.query(query, values);
  if (result.rows.length > 0) {
    // Użytkownik autoryzowany
    return result.rows[0];
  }
  // Użytkownik nieautoryzowany
  return null;
}

// Aktualizacja informacji o użytkowniku
async function updateUser(userId, userData) {
  const query = 'UPDATE gradebook.users SET email = $1, role = $2, active = $3, status = $4, first_name = $5, second_name = $6 WHERE user_id = $7 RETURNING *';
  const values = [
    userData.email,
    userData.role,
    userData.active,
    userData.status,
    userData.first_name,
    userData.second_name,
    userId,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Usunięcie użytkownika
async function deleteUser(userId) {
  const query = 'DELETE FROM gradebook.users WHERE user_id = $1';
  const values = [userId];
  await pool.query(query, values);
}

module.exports = {
  getUserByEmail,
  createNewUser,
  authorize,
  updateUser,
  deleteUser,
};
