import mysql from 'mysql';

import { DBHOST, DBUSER, DBDATABASE, DBURLREDIRECTTABLE } from './database';

function setupDatabase() {
  console.log('start database set up');
  const connection = mysql.createConnection({
    host: DBHOST,
    user: DBUSER,
  });

  connection.connect();
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DBDATABASE};`, (error) => {
    if (error) throw error;
  });
  connection.query(`USE ${DBDATABASE};`, (error) => {
    if (error) throw error;
  });
  connection.query(
    `CREATE TABLE IF NOT EXISTS ${DBURLREDIRECTTABLE} (
      id INT NOT NULL AUTO_INCREMENT,
      original TEXT NOT NULL,
      alias TEXT NOT NULL,
      createdOn DATETIME NOT NULL,
      PRIMARY KEY(id)
  );`,
    (error) => {
      if (error) throw error;
    }
  );
  connection.end();
  console.log('end database set up');
}
export = setupDatabase;
