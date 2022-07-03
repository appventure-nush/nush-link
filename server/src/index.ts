import express, {Application, NextFunction} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import path from 'path';
import auth from './auth/middleware';
import setupDatabase from './config/setupdatabase';
import {router as create} from "./routes/create";
import deleteRoute from './routes/delete';
import editRoute from './routes/edit';
import retrieve from './routes/retrieve';
import me from './routes/me';
import login from './routes/auth';
import authorize_student from './routes/authorize_student';
import config from './config/config';
import HttpException from './exceptions/HttpException';

// Initialisation
const app = express();

// Security
app.use(helmet());
app.use(morgan('tiny'));

// Cookies
app.use(cookieParser());

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Authentication required to modify links and get user info
app.use('/api/create', auth() as Application);
app.use('/api/delete', auth() as Application);
app.use('/api/edit', auth() as Application);
app.use('/api/me', auth() as Application);
app.use('/api/authorize_student', auth() as Application);
// define a route to handle creation
app.use('/api/create', create);
app.use('/api/delete', deleteRoute);
app.use('/api/edit', editRoute);

// Route to get data about current user
app.use('/api/me', me);
app.use('/api/auth', login);

app.use('/api/authorize_student', authorize_student);

// define a route handler for ids
app.use('/', retrieve);

// Route for error handling
app.use(
  (
    error: HttpException,
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) => {
    if (error.status) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json({
      success: false,
      message: error.message,
    });
    next();
  },
);

// start the Express server
app.listen(config.PORT, () => {
  console.log(`server is running at http://localhost:${config.PORT}`);
});

setupDatabase();
