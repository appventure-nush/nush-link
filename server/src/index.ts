import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import * as yup from 'yup';
import uniqid from 'uniqid';

import { DBHOST, DBUSER, DBDATABASE } from './config/database';
import { PORT } from './config/app';

// Initialisation
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

// Port
const port = PORT;

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// yup schema to validate creation
const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  original: yup.string().trim().url().required(),
});

// define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Good evening!');
});

// define a route to handle creation
app.post(
  '/create',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    var { alias, original } = req.body;
    try {
      await schema.validate({
        alias,
        original,
      });

      if (!alias) {
        alias = uniqid();
      }

      alias = alias.toLowerCase();

      res.json({
        alias,
        original,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.use(
  (
    // TODO: Change error type
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error.status) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json({
      message: error.message,
      stack: error.stack,
    });
  }
);

// define a route handler for ids
app.get('/:id', (req: express.Request, res: express.Response) => {
  // TODO: redirect to url
  res.send('redirecting to your url');
});

// start the Express server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// test connection with database
// const connection = mysql.createConnection({
//   host: DBHOST,
//   user: DBUSER,
//   database: DBDATABASE,
// });

// connection.connect();

// connection.end();
