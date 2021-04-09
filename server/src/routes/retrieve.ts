import express from 'express';
import * as yup from 'yup';
import mysql from 'mysql';
import { connection, DB_URL_REDIRECT_TABLE } from '../config/database';

const router = express.Router({ mergeParams: true });

const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .lowercase()
    .matches(/[\w-]/i),
});

router.get(
  '/:alias',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { alias } = req.params;
      await schema.validate({
        alias,
      });

      await connection.query(
        `SELECT original FROM ${DB_URL_REDIRECT_TABLE} WHERE alias = ${mysql.escape(
          alias,
        )};`,
        (error, result) => {
          if (error) next(new Error(`Error during sql: ${error.message}`));
          if (result.length === 1) {
            res.json({
              success: true,
              url: result[0].original,
            });
          } else {
            next(new Error('No alias found'));
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },
);

export = router;
