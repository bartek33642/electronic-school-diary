import pool from '../../db';
const express = require('express');
const app = express();

const attendanceEnpoint = (app) => {

    app.get('/attendance', async (req, res) => {
        try {
          const attendanceQuery = 'SELECT * FROM gradebook.attendance';
          const { rows } = await pool.query(attendanceQuery);
          res.send(rows);
    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });
    
      app.get('/attendance-all', async (req, res) => {
        try {
          const attendanceQuery = `SELECT * FROM gradebook.attendance
                                  NATURAL JOIN gradebook.schools
                                  NATURAL JOIN gradebook.classes
                                  NATURAL JOIN gradebook.users`;
          const { rows } = await pool.query(attendanceQuery);
          res.send(rows);
    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

}
export default attendanceEnpoint;