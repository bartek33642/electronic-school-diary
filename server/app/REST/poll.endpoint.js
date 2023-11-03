import pool from '../../db';
const express = require('express');
const app = express();

const pollEndpoint = (app) => {

    app.get('/polls', async (req, res) => {
    try {
      const pollQuery = 'SELECT user_id, title, active, created_at, school_id FROM gradebook.poll';
      const { rows } = await pool.query(pollQuery);
      res.send(rows);
    //   console.log("Polls okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/polls-count', async (req, res) => {
    try {
      const pollcountQuery = 'SELECT COUNT(*) FROM gradebook.poll';
      const { rows } = await pool.query(pollcountQuery);
      const pollCount = parseInt(rows[0].count);
      res.send({ pollCount });
    //   console.log("Polls count okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

}

export default pollEndpoint;