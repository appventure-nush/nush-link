import { connection, DB_DATABASE, DB_URL_REDIRECT_TABLE } from './database';

function setupDatabase() {
  console.log('start database set up');

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
      alias varchar(255) NOT NULL,
      createdOn DATETIME NOT NULL,
      PRIMARY KEY(id),
      UNIQUE(alias)
  );`,
    (error) => {
      if (error) throw error;
    },
  );
  console.log('end database set up');
}

export = setupDatabase;
