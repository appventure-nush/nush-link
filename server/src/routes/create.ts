import express from 'express';
import * as yup from 'yup';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';
import { AuthenticatedRequest } from '../auth/authenticatedrequest';

const router = express.Router();

const schema = yup.object().shape({
  alias: filter.aliasFilter,
  original: yup.string().trim().url().required(),
});

router.post(
  '/check',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;
      let { alias } = authReq.body;
      await filter.aliasFilter.validate(alias);

      alias = alias.toString().toLowerCase();
      await connection.query(
        `SELECT 1 FROM ${config.DB_URL_REDIRECT_TABLE} WHERE alias = ?`,
        [alias],
        (error, result) => {
          if (error) next(new Error(error.sqlMessage));
          if (result) {
            res.json({
              success: true,
              result: result.length > 0,
            });
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;
      let { alias } = authReq.body;
      const { original } = authReq.body;
      await schema.validate({
        alias,
        original,
      });

      alias = alias.toString().toLowerCase();
      await connection.query(
        `INSERT INTO ${config.DB_URL_REDIRECT_TABLE} (original, alias, creatorName, creatorEmail, createdOn)
          VALUES (?,?,?,?, CURRENT_TIMESTAMP);`,
        [original, alias, authReq.username, authReq.email],
        (error, result) => {
          if (error) next(new Error(error.sqlMessage));
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
