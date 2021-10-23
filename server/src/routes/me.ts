import express from 'express';
import { AuthenticatedRequest } from '../auth/authenticatedrequest';

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

export = router;
