import * as express from 'express';
import verify from './verify';
import { AuthenticatedRequest } from './authenticatedrequest';
import connection from "../config/database";

export async function isStudentAuthorized(studentEmail: string): Promise<boolean> {
  const result = await connection.query(
    `SELECT 1 FROM authorized_students WHERE student_email = $1;`,
    [studentEmail]);
  return result.rowCount > 0;
}

export default () => async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.can_create_redirect = false;
  req.can_authorize_students = false;

  const { token } = req.cookies;
  const decodedToken = (await verify(token)
    .then((decoded) => decoded).catch(
      (error) => {
        console.log(error);
        res
          .status(401)
          .clearCookie('token')
          .end('Invalid token');
        return null;
      },
    )) as {
    // eslint-disable-next-line camelcase
    unique_name: string
    name: string
  } | null;
  if (decodedToken == null) return;
  req.email = decodedToken.unique_name;
  req.username = decodedToken.name;
  const allowed = ["h1710074", "anhstjyl","anhsevxm", "anhs.chm", "anhsloh", "anhsczm", "anhsipoh", "shawnteo", "anhsaksy", "appventure", "nhs"];
  console.log(req.email);
  if (!req.email.endsWith("@nushigh.edu.sg")){
    req.can_create_redirect = false;
    req.can_authorize_students = false;
  }else if (allowed.some(x => req.email.startsWith(x))){
    req.can_create_redirect = true;
    req.can_authorize_students = true;
  }else if(await isStudentAuthorized(req.email)){
    req.can_create_redirect = true;
    req.can_authorize_students = false;
  }
  next();
};
