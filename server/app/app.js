import config from "./config";
const express = require('express');
const pool = require('../db');
const app = express();
const cors = require("cors");

app.use(cors())

app.get("/", (req, res) => {
    console.log("start");
    res.send("Hello, Server was started")
});

// //test
app.get('/roles', async (req, res) => {
    try {
      const query = 'SELECT * FROM gradebook.roles';
      const { rows } = await pool.query(query);
      res.send(rows);
      console.log("Roles okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// test
app.get('/users', async (req, res) => {
    try {
      const query = 'SELECT * FROM gradebook.users';
      const { rows } = await pool.query(query);
      res.send(rows);
      console.log("Users okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(config.port, () => {console.log(`Server started on port ${config.port}`)})