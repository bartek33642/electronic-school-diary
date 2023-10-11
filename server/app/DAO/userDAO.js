const pool = require('../db');

const userDAO = {
  // Function to create a new user and return the user_id
  registerUser: async (email, password, role, active, status, first_name, second_name) => {
    try {
      const query = 'INSERT INTO users (email, password, role, active, status, first_name, second_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id';
      const values = [email, password, role, active, status, first_name, second_name];

      const result = await pool.query(query, values);
      return result.rows[0].user_id;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userDAO;
