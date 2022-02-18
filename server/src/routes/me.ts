import express from 'express';
import {AuthenticatedRequest} from '../auth/authenticatedrequest';
import connection from "../config/database";
import config from "../config/config";

const router = express.Router();

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;
      res.json({
        name: authReq.username,
        email: authReq.email,
      });
      return;
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/links',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const result = await connection.query(
        `SELECT id, alias, original, created_on FROM ${config.DB_URL_REDIRECT_TABLE}
          WHERE creator_email = $1 ORDER BY created_on DESC ;`,
        [authReq.email]);
      return res.json({
        success: true,
        links: result.rows.map(row => ({
          id: row.id,
          alias: row.alias,
          url: row.original,
          createdOn: row.created_on,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
);

export = router;
