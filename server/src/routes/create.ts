import express from 'express';
import * as yup from 'yup';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';
import {AuthenticatedRequest} from '../auth/authenticatedrequest';
import resolveRedirect from "../util/resolve-redirect";

const router = express.Router();

const schema = yup.object().shape({
  alias: filter.aliasFilter,
  original: yup.string().trim().matches(/^(https?:\/\/)?\w+\.\w+\/?/).required(),
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
      let {alias} = authReq.body;
      await filter.aliasFilter.validate(alias);

      alias = alias.toString().toLowerCase();
      await connection.query(
        `SELECT 1 FROM ${config.DB_URL_REDIRECT_TABLE} WHERE alias = $1`,
        [alias],
        (error, result) => {
          if (error) return next(new Error(error.message));
          if (result) {
            res.json({
              success: true,
              result: result.rowCount > 0,
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
      let {alias, original} = authReq.body;
      await schema.validate({
        alias,
        original,
      });

      if (!original.startsWith('http')) {
        original = `https://${original}`;
      }
      if (original.startsWith("https://nush.link")) {
        throw new Error(`Cannot redirect to nush.link URL`);
      }
      original = await resolveRedirect(original);

      alias = alias.toString().toLowerCase();
      await connection.query(
        `INSERT INTO ${config.DB_URL_REDIRECT_TABLE} (original, alias, creatorName, creatorEmail, createdOn)
          VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);`,
        [original, alias, authReq.username, authReq.email],
        (error, result) => {
          if (error) next(new Error(error.message));
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
