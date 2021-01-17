import express from 'express';
import * as yup from 'yup';
import mysql from 'mysql';

import {
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_URL_REDIRECT_TABLE,
} from '../config/database';

const router = express.Router({ mergeParams: true });

const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .lowercase()
    .matches(/[\w\-]/i),
});

router.get(
  '/:alias',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const alias = req.params.alias;
      await schema.validate({
        alias,
      });

      const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DATABASE,
      });

      connection.connect();

      await connection.query(
        `SELECT original FROM ${DB_URL_REDIRECT_TABLE} WHERE alias = ${mysql.escape(
          alias
        )};`,
        (error, result) => {
          if (error) throw new Error('Error during sql');
          if (result.length == 1) {
            res.json({
              success: true,
              url: result[0].original,
            });
          } else {
            throw new Error('No alias found');
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

export = router;
