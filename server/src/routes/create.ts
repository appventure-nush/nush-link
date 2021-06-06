import express from 'express';
import * as yup from 'yup';
import uniqid from 'uniqid';
import mysql from 'mysql';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';

const router = express.Router();

const schema = yup.object().shape({
  alias: filter.aliasFilter,
  original: yup.string().trim().url().required(),
});

router.post(
  '/create',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      let { alias } = req.query;
      const { original } = req.query;
      await schema.validate({
        alias,
        original,
      });

      if (!alias) {
        alias = uniqid();
      }

      alias = alias.toString().toLowerCase();
      await connection.query(
        `INSERT INTO ${config.DB_URL_REDIRECT_TABLE} (original, alias, createdOn) VALUES (${mysql.escape(
          original,
        )}, ${mysql.escape(alias)}, CURRENT_TIMESTAMP);`,
        (error, result) => {
          if (error) throw new Error(`Error during sql ${error.message}`);
          if (result) {
            res.json({
              success: true,
              original,
              alias,
            });
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },
);

export = router;
