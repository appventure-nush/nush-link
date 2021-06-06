import * as express from 'express';
import verify from './verify';
import { AuthenticatedRequest } from './authenticatedrequest';

export default () => async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
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
  next();
};
