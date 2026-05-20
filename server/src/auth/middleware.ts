import * as express from 'express';
import verify from './verify';
import { AuthenticatedRequest } from './authenticatedrequest';
import connection from "../config/database";

export async function isStudentAuthorized(studentEmail: string): Promise<boolean> {
  try {
    const result = await connection.query(
      `SELECT 1 FROM authorized_students WHERE student_email = $1;`,
      [studentEmail]);
    console.log('Student authorization lookup succeeded:', {
      studentEmail,
      rowCount: result.rowCount,
    });
    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.error('Student authorization lookup failed:', {
      studentEmail,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}

function logAuthContext(req: express.Request, details: Record<string, unknown>) {
  console.warn('Auth debug context:', {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    host: req.headers.host,
    origin: req.headers.origin,
    referer: req.headers.referer,
    userAgent: req.headers['user-agent'],
    cookieHeaderPresent: typeof req.headers.cookie === 'string',
    ...details,
  });
}

export default () => async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.can_create_redirect = false;
  req.can_authorize_students = false;

  const { token } = req.cookies;
  if (!token) {
    logAuthContext(req, {
      reason: 'missing-cookie',
    });
    res
      .status(401)
      .clearCookie('token')
      .end('Missing token');
    return;
  }
  const tokenParts = token.split('.');
  const tokenHeader = tokenParts.length > 0 ? tokenParts[0] : null;
  const decodedToken = (await verify(token)
    .then((decoded) => decoded).catch(
      (error) => {
        logAuthContext(req, {
          reason: 'token-verification-failed',
          tokenHeaderPresent: tokenHeader !== null,
          errorName: error instanceof Error ? error.name : undefined,
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
        });
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
  const allowed = ["anhs", "appventure", "nhs", "DWong_15"];
  console.log('Authenticated request:', {
    email: req.email,
    username: req.username,
    path: req.originalUrl,
  });
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
