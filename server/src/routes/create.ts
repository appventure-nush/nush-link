import express from 'express';
import * as yup from 'yup';
import uniqid from 'uniqid';
import mysql from 'mysql';

import {
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_URL_REDIRECT_TABLE,
} from '../config/database';

const router = express.Router();

const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  original: yup.string().trim().url().required(),
});

router.post(
  '/create',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      var { alias, original } = req.query;
      await schema.validate({
        alias,
        original,
      });

      if (!alias) {
        alias = uniqid();
      }

      alias = alias.toString().toLowerCase();

      const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DATABASE,
      });

      connection.connect();

      await connection.query(
        `INSERT INTO ${DB_URL_REDIRECT_TABLE} (original, alias, createdOn) VALUES (${mysql.escape(
          original
        )}, ${mysql.escape(alias)}, CURRENT_TIMESTAMP);`,
        (error, result) => {
          if (error) throw new Error('Error during sql');
          if (result) {
            res.json({
              success: true,
              original,
              alias,
            });
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

export = router;
