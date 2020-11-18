import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

import databaseConfig from './config/database';
import appConfig from './config/index';

// Initialisation
const app = express();

// Port
const port = appConfig.PORT;

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Good evening');
});

// start the Express server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// test connection with database
const connection = mysql.createConnection({
  host: databaseConfig.DBHOST,
  user: databaseConfig.DBUSER,
  database: databaseConfig.DBDATABASE,
});

connection.connect();

connection.end();
