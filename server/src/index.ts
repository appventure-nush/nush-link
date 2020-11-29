import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { PORT } from './config/app';
import setupDatabase from './config/setupdatabase';
import create from './routes/create';

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

// define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Good evening!');
});

// define a route to handle creation
app.post('/create', create);

// define a route handler for ids
app.get('/:id', (req: express.Request, res: express.Response) => {
  // TODO: redirect to url
  res.send('redirecting to your url');
});

// Route for error handling
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

// start the Express server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

setupDatabase();
