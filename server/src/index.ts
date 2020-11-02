// Require
const express = require('express');
require('dotenv').config();

// Init
const app = express();

// Port
const port = process.env.PORT || 5000;

// define a route handler for the default home page
app.get('/', (req: any, res: any) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
