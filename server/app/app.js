import config from "./config";
const express = require('express');
const pool = require('../db');
const cors = require("cors");
const jwtMiddleware = require('./middleware/jwtMiddleware');
const app = express();


app.use(cors())

app.get("/", (req, res) => {
    console.log("start");
    res.send("Hello, Server was started")
});

// Add the JWT middleware to secure routes
app.use('/REST/admin', jwtMiddleware); 
app.use('/REST/grade', jwtMiddleware);
app.use('/REST/parent', jwtMiddleware);
app.use('/REST/principal', jwtMiddleware);
app.use('/REST/student', jwtMiddleware);
app.use('/REST/teacher', jwtMiddleware);

// //test
// app.get('/roles', async (req, res) => {
//     try {
//       const query = 'SELECT * FROM gradebook.roles';
//       const { rows } = await pool.query(query);
//       res.send(rows);
//       console.log("Roles okay");

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

// // test
// app.get('/users', async (req, res) => {
//     try {
//       const query = 'SELECT * FROM gradebook.users';
//       const { rows } = await pool.query(query);
//       res.send(rows);
//       console.log("Users okay");

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, () => {console.log(`Server started on port ${config.port}`)})