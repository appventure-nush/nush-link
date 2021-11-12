import config from './config';
import connection from './database';

function setupDatabase() {
  console.log('start database set up');

  connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.DB_URL_REDIRECT_TABLE} (
      id SERIAL,
      original TEXT NOT NULL,
      alias varchar(255) NOT NULL,
      creatorName varchar(255) NOT NULL,
      creatorEmail varchar(255) NOT NULL,
      createdOn TIMESTAMP NOT NULL,
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
