import mysql from 'mysql';

import {
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_URL_REDIRECT_TABLE,
} from './database';

function setupDatabase() {
  console.log('start database set up');
  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
  });

  connection.connect();
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};`, (error) => {
    if (error) throw error;
  });
  connection.query(`USE ${DB_DATABASE};`, (error) => {
    if (error) throw error;
  });
  connection.query(
    `CREATE TABLE IF NOT EXISTS ${DB_URL_REDIRECT_TABLE} (
      id INT NOT NULL AUTO_INCREMENT,
      original TEXT NOT NULL,
      alias TEXT NOT NULL,
      createdOn DATETIME NOT NULL,
      PRIMARY KEY(id),
      UNIQUE(alias)
  );`,
    (error) => {
      if (error) throw error;
    }
  );
  connection.end();
  console.log('end database set up');
}
export = setupDatabase;
