import config from "./config";
const express = require('express');
const pool = require('../db');
const cors = require("cors");
// const authMiddleware = require('../app/middleware/authMiddleware');
const app = express();
const bodyParser = require('body-parser');
import routes from "./REST/routes";


app.use(cors({
  origin: '*',
}));

app.options('*', cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2048kb" }));

app.get("/", (req, res) => {
    console.log("start");
    res.send("Hello, Server was started")
});

routes(app);

// login & register
//app.js
// app.use('/REST/login', require('../app/middleware/loginMiddleware'));

// app.post('/REST/register-admin', (req, res) => {
//   require('../app/middleware/adminMiddleware')(req, res);
// });

// const adminMiddleware = require('../app/middleware/adminMiddleware'); 

// app.use('/REST/register-admin', (req, res) => {
//   adminMiddleware(req, res); 
// });
// end login & register


// // Add the JWT middleware to secure routes
// app.use('/admin', authMiddleware); 
// app.use('/grade', authMiddleware);
// app.use('/parent', authMiddleware);
// app.use('/principal', authMiddleware);
// app.use('/student', authMiddleware);
// app.use('/teacher', authMiddleware);

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

// app.use('/REST', require('./REST/routes/adminRoutes'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})