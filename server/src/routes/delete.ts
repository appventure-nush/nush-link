import express from 'express';
import * as yup from 'yup';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';
import {AuthenticatedRequest} from '../auth/authenticatedrequest';
import resolveRedirect from "../util/resolve-redirect";

const router = express.Router();

router.delete(
  '/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const email = authReq.email;
      const {id: idString} = authReq.params;
      const id = parseInt(idString, 10);
      if (isNaN(id) || id < 0) {
        throw new Error('ID must be a non-negative integer');
      }
      const results = await connection.query(
        `DELETE FROM ${config.DB_URL_REDIRECT_TABLE} WHERE id = $1 AND creator_email = $2`
        , [id, email]);
      if (results.rowCount > 0) {
        return res.json({
          success: true,
        });
      }
      return res.json({
        success: false,
        message: 'No nush.link with that ID exists',
      });
    } catch (error) {
      next(error);
    }
  },
);

export = router;
