const pool = require('../../db');

const userDAO = {
  // Function to create a new user and return the user_id
  registerUser: async (email, password, role, active, status, first_name, second_name) => {
    try {
      const query = 'INSERT INTO gradebook.users (e-mail, password, role, active, status, first_name, second_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id';
      const values = [email, password, role, active, status, first_name, second_name];

      const result = await pool.query(query, values);
      return result.rows[0].user_id;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      const query = 'SELECT user_id, password FROM gradebook.users WHERE e-mail = $1';
      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
        // Nie znaleziono użytkownika o podanym e-mailu
        return null;
      }

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Hasło jest poprawne, możesz zwrócić dane użytkownika lub jego ID.
        return user.user_id;
      } else {
        // Hasło jest niepoprawne
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

};

module.exports = userDAO;
