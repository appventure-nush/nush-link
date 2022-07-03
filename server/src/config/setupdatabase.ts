import config from './config';
import connection from './database';

async function setupDatabase() {
  console.log('start database set up');
  await connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.DB_URL_REDIRECT_TABLE} (
      id SERIAL,
      original TEXT NOT NULL,
      alias varchar(255) NOT NULL,
      creator_name varchar(255) NOT NULL,
      creator_email varchar(255) NOT NULL,
      created_on TIMESTAMP NOT NULL,
      PRIMARY KEY(id),
      UNIQUE(alias)
  );`);
  await connection.query(
    `CREATE TABLE IF NOT EXISTS authorized_students (
      student_email varchar(255) NOT NULL,
      authorizer_email varchar(255) NOT NULL,
      reason TEXT NOT NULL,
      created_on TIMESTAMP NOT NULL,
      PRIMARY KEY(student_email)
  );`);
  console.log('end database set up');
}

export = setupDatabase;
