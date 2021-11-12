import {Client} from "pg";
import config from './config';

const connection = new Client({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

connection.connect();

export default connection;
