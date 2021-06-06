import mysql from 'mysql';

import config from './config';

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

connection.connect();

export default connection;
