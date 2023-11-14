import pool from '../../db';
const express = require('express');
const app = express();

const subjectEndpoint = (app) => {

    app.get('/subjects', async (req, res) => {
    try {
      const subjectsQuery = 'SELECT * FROM gradebook.subjects';
      const { rows } = await pool.query(subjectsQuery);
      res.send(rows);

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

}

export default subjectEndpoint;
