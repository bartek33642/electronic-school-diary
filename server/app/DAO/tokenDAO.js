const pool = require('../db');

const tokenDAO = {
  // Function to create a new token in the database
  createToken: async (userId, type, value) => {
    try {
      const query = 'INSERT INTO token (user_id, type, value, create_date) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [userId, type, value, new Date()];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Function to get a token by its value
  getTokenByValue: async (value) => {
    try {
      const query = 'SELECT * FROM token WHERE value = $1';
      const values = [value];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Function to delete a token by its value
  deleteTokenByValue: async (value) => {
    try {
      const query = 'DELETE FROM token WHERE value = $1';
      const values = [value];

      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = tokenDAO;
