// import config from "./config";
// const express = require('express');
// const pool = require('../db');
// const cors = require("cors");
// const app = express();
// const bodyParser = require('body-parser');
// import routes from "./REST/routes";

// const port = process.env.NODE_ENV === 'test' ? 3002 : 3001;

// app.use(cors({
//   origin: '*',
// }));

// app.options('*', cors()); 
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "2048kb" }));

// app.get("/", (req, res) => {
//     console.log("start");
//     res.send("Hello, Server was started")
// });

// routes(app);


// app.get('/*', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`)
// })


const express = require('express');
const pool = require('../db');
const cors = require("cors");
const bodyParser = require('body-parser');
import routes from "./REST/routes";

const port = process.env.NODE_ENV === 'test' ? 3002 : 3001;

const createApp = () => {
  const app = express();

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

  app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}

export default createApp;
