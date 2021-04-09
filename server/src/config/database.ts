import mysql from 'mysql';

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_DATABASE = 'nushlink';
const DB_URL_REDIRECT_TABLE = 'urlredirect';
const DB_PASSWORD = 'root';

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

connection.connect();

export { connection, DB_URL_REDIRECT_TABLE, DB_DATABASE };
