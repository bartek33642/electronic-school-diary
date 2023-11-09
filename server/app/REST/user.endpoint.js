import pool from "../../db";
const express = require('express');
const app = express();

const userEndpoint = (app) => {

  app.get('/users', async (req, res) => {
    try {
      const userQuery = 'SELECT user_id, email, password, role, active, status, first_name, second_name FROM gradebook.users';
      const { rows } = await pool.query(userQuery);
      res.send(rows);
      // console.log("Users okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/users-count', async (req, res) => {
    try {
      const usercountQuery = 'SELECT COUNT(*) FROM gradebook.users';
      const { rows } = await pool.query(usercountQuery);
      const userCount = parseInt(rows[0].count);
      res.send({ userCount });

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
  
    try {
      const userRoleQuery = 'SELECT role FROM gradebook.users WHERE user_id = $1';
      const { rows } = await pool.query(userRoleQuery, [userId]);
      const userRole = rows[0].role;
  
      let deleteQueries = [];
      switch (userRole) {
        case 1: // Admin
          deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
          break;
        case 2: // Dyrektor
          deleteQueries.push('DELETE FROM gradebook.principal WHERE user_id = $1');
          deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
          break;
        case 3: // Nauczyciel
          deleteQueries.push('DELETE FROM gradebook.teachers WHERE user_id = $1');
          deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
          break;
        case 4: // Uczeń
          deleteQueries.push('DELETE FROM gradebook.students WHERE user_id = $1');
          deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
          break;
        case 5: // Rodzic
          deleteQueries.push('DELETE FROM gradebook.parents WHERE user_id = $1');
          deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
          break;
        default:
          deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
      }
  
      for (const query of deleteQueries) {
        await pool.query(query, [userId]);
      }
  
      console.log('Usunięto użytkownika z bazy danych');
      res.status(204).end();
    } catch (error) {
      console.error('Błąd usuwania użytkownika:', error);
      res.status(500).json({ error: 'Błąd usuwania użytkownika' });
    }

  });

}

export default userEndpoint;
