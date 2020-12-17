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
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.params);
    const alias = req.params.alias;
    try {
      try {
        schema.validate({
          alias,
        });
      } catch (error) {
        res.json({
          success: false,
          message: 'error during yup validation',
        });
      }

      const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DATABASE,
      });

      connection.connect();

      connection.query(
        `SELECT original FROM ${DB_URL_REDIRECT_TABLE} WHERE alias = ${mysql.escape(
          alias
        )};`,
        (error, result) => {
          if (error) {
            res.json({
              success: 'false',
              message: 'error',
            });
          } else {
            if (result.length == 1) {
              res.json({
                success: true,
                url: result[0].original,
              });
            } else {
              res.json({
                success: false,
                error: 'no alias found',
              });
            }
          }
        }
      );
    } catch (error) {
      res.json({
        success: false,
        message: 'there was some issue',
      });
    }
  }
);

export = router;
