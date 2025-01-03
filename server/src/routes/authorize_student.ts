import express from 'express';
import * as yup from 'yup';
import connection from '../config/database';
import config from '../config/config';
import filter from '../util/filter';
import {AuthenticatedRequest} from "../auth/authenticatedrequest";
import {isStudentAuthorized} from "../auth/middleware";

const router = express.Router({mergeParams: true});

const schema = yup.object({
  student_email: yup.string().email().max(255, "Email too long").required(),
  reason: yup.string().required()
});

router.post(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;

      if (!authReq.can_authorize_students) {
        throw new Error("You are not allowed to authorize students.");
      }

      const data = await schema.validate(req.body, { strict: true });
      if (!data) {
        throw new Error("Validation error");
      }

      if(await isStudentAuthorized(data.student_email)){
        throw new Error("Student already authorized");
      }

      const result = await connection.query(
        `INSERT INTO authorized_students (student_email, authorizer_email, reason, created_on)
         values ($1, $2, $3, CURRENT_TIMESTAMP)`,
        [data.student_email, authReq.email, data.reason]);
      if (result.rowCount === 1) {
        return res.json({
          success: true
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;

      if (!authReq.can_authorize_students) {
        throw new Error("You are not allowed to authorize students.");
      }

      const result = await connection.query(`SELECT *
                                             FROM authorized_students`);
      return res.json({
        success: true,
        students: result.rows.map(row => ({
          studentEmail: row.student_email,
          reason: row.reason,
          createdOn: row.created_on,
        }))
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/delete/:email',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const email = authReq.email;
      const {email: studentEmail} = authReq.params;
      const results = await connection.query(
        `DELETE FROM authorized_students WHERE student_email = $1 AND authorizer_email = $2`
        , [studentEmail, email]);
      if (results.rowCount > 0) {
        return res.json({
          success: true,
        });
      }
      return res.json({
        success: false,
        message: 'No authorized student with that email exists',
      });
    } catch (error) {
      next(error);
    }
  },
);

export = router;
