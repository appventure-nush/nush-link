import {Client} from "pg";
import config from './config';

const connection = new Client({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

connection.on('error', (error) => {
  console.error('Postgres client error:', {
    message: error.message,
    name: error.name,
    stack: error.stack,
  });
});

connection.connect();

export default connection;
