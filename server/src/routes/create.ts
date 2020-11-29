import express from 'express';
import * as yup from 'yup';
import uniqid from 'uniqid';
import mysql from 'mysql';

import {
  DBHOST,
  DBUSER,
  DBDATABASE,
  DBURLREDIRECTTABLE,
} from '../config/database';

const router = express.Router();

const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  original: yup.string().trim().url().required(),
});

const checkDatabase = (
  connection: mysql.Connection,
  alias: String,
  callback: Function
) => {
  connection.query(
    `SELECT * FROM ${DBURLREDIRECTTABLE} WHERE alias=${mysql.escape(alias)};`,
    (error, result) => {
      if (error) callback(error);
      callback(null, result > 0);
    }
  );
};

router.post(
  '/create',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    var { alias, original } = req.body;
    try {
      await schema.validate({
        alias,
        original,
      });

      if (!alias) {
        alias = uniqid();
      }

      alias = alias.toLowerCase();

      // test connection with database
      const connection = mysql.createConnection({
        host: DBHOST,
        user: DBUSER,
        database: DBDATABASE,
      });

      connection.connect();

      checkDatabase(connection, alias, (err: any, result: Boolean) => {
        if (err) throw err;
        if (result) {
          res.json({
            alias,
            original,
            ok: false,
            errors: 'alias exists',
          });
        } else {
        }
      });

      console.log('am I reached?');
    } catch (error) {
      next(error);
    }
  }
);

export = router;
