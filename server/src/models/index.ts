import { Sequelize } from 'sequelize';

import {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  HOST,
  DB_DIALECT,
} from '../config/database';

import UrlredirectModel from '../models/urlredirect';

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: HOST,
  dialect: DB_DIALECT,
});

const Urlredirect = UrlredirectModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

export default {
  Urlredirect,
};
