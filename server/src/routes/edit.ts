import express from 'express';
import connection from '../config/database';
import config from '../config/config';
import {AuthenticatedRequest} from '../auth/authenticatedrequest';
import resolveRedirect from "../util/resolve-redirect";
import {schema} from "./create";

const router = express.Router();

router.patch(
  '/:id',
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
      const {id: idString} = authReq.params;
      const id = parseInt(idString, 10);
      if (isNaN(id) || id < 0) {
        throw new Error('ID must be a non-negative integer');
      }
      const {alias} = authReq.body;
      let {original} = authReq.body;
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
      original = await resolveRedirect(original, original);

      const out = await connection.query(
        `UPDATE ${config.DB_URL_REDIRECT_TABLE} SET (original, alias) = ($1, $2) WHERE id = $3 AND creator_email = $4;`,
        [original, alias, id, authReq.email]);
      if(out.rowCount === 0) {
        throw new Error(`No redirect with ID ${id} found`);
      }
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

export = router;
