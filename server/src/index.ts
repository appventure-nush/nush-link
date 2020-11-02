// Require
import express from 'express';

import PORT from './config/index';

// Init
const app = express();

// Port
const port = PORT;

// define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Good evening');
});

// start the Express server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
