const pool = require('../../db');
const bcrypt = require('bcrypt');

async function createPassword(userId, hashedPassword) {
  const query = 'INSERT INTO gradebook.users (user_id, password) VALUES ($1, $2) RETURNING *';
  const values = [userId, hashedPassword];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function authorize(userId, hashedPassword) {
  const query = 'SELECT password FROM gradebook.users WHERE user_id = $1 AND password = $2';
  const values = [userId, hashedPassword];
  const result = await pool.query(query, values);
  if (result.rows.length > 0) {
    return true;
  }
  return false;
}

async function updatePassword(userId, hashedPassword) {
  const query = 'UPDATE gradebook.users SET password = $1 WHERE user_id = $2';
  const values = [hashedPassword, userId];
  await pool.query(query, values);
}

async function verifyPassword(userId, providedPassword) {
  const query = 'SELECT password FROM gradebook.users WHERE user_id = $1';
  const values = [userId];
  const result = await pool.query(query, values);

  if (result.rows.length > 0) {
    const storedPassword = result.rows[0].password;
    const isPasswordValid = await bcrypt.compare(providedPassword, storedPassword);
    return isPasswordValid;
  }

  return false;
}

module.exports = {
  createPassword,
  authorize,
  updatePassword,
  verifyPassword,
};
