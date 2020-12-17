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

const router = express.Router({ mergeParams: true });

const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  original: yup.string().trim().url().required(),
});

router.post(
  '/create',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var { alias, original } = req.query;
    try {
      try {
        schema.validate({
          alias,
          original,
        });
      } catch (error) {
        res.json({
          success: false,
          message: 'error during yup validation',
        });
      }

      if (!alias) {
        alias = uniqid();
      }

      alias = alias.toString().toLowerCase();

      const connection = mysql.createConnection({
        host: DBHOST,
        user: DBUSER,
        database: DBDATABASE,
      });

      connection.connect();

      connection.query(
        `INSERT INTO ${DBURLREDIRECTTABLE} (original, alias, createdOn) VALUES (${mysql.escape(
          original
        )}, ${mysql.escape(alias)}, CURRENT_TIMESTAMP);`,
        (error, result) => {
          if (error) {
            res.json({
              success: 'false',
              message: 'error',
            });
          }
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
      res.json({
        success: false,
        message: 'there was some issue',
      });
    }
  }
);

export = router;
