import express from 'express';
import * as yup from 'yup';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';
import {AuthenticatedRequest} from '../auth/authenticatedrequest';
import resolveRedirect from "../util/resolve-redirect";

export const router = express.Router();

export const schema = yup.object().shape({
  alias: filter.aliasFilter,
  original: yup.string().trim().matches(/^(https?:\/\/)?[a-z0-9-]+\.\w+\/?/).required(),
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
      if(!authReq.can_create_redirect){
        throw new Error("You are not authorized to create redirects");
      }
      const {alias} = authReq.body;
      await filter.aliasFilter.validate(alias);

      const result = await connection.query(
        `SELECT 1 FROM ${config.DB_URL_REDIRECT_TABLE} WHERE alias = $1`,
        [alias]);
      res.json({
        success: true,
        result: result.rowCount > 0,
      });
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
      if(!authReq.can_create_redirect){
        throw new Error("You are not authorized to create redirects");
      }
      const {alias} = authReq.body;
      let {original} = authReq.body;
      await schema.validate({
        alias,
        original,
      }, { strict: true });

      if (!original.startsWith('http')) {
        original = `https://${original}`;
      }
      if (original.startsWith("https://nush.link")) {
        throw new Error(`Cannot redirect to nush.link URL`);
      }
      original = await resolveRedirect(original, original);

      await connection.query(
        `INSERT INTO ${config.DB_URL_REDIRECT_TABLE} (original, alias, creator_name, creator_email, created_on)
          VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);`,
        [original, alias, authReq.username, authReq.email]);
      res.json({
        success: true,
        original,
        alias,
      });
    } catch (error) {
      next(error);
    }
  },
);
