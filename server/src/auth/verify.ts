import { verify, VerifyOptions } from 'jsonwebtoken';
import jwksClient = require('jwks-rsa');
// Weird ESlint import ordering bug
// eslint-disable-next-line
import config from '../config/config';

// https://login.microsoftonline.com/d72a7172-d5f8-4889-9a85-d7424751592a/oauth2/authorize?client_id=2f4b388c-143a-42b2-b69c-ff8531d58cda&redirect_uri=http://localhost:5000&response_type=id_token&nonce=nush-link
export default async function verifyToken(token: string) {
  // Node has no atob
  const atob = (base64: string) => Buffer.from(base64, 'base64').toString('ascii');
  const { kid } = JSON.parse(atob(token.split('.')[0]));
  const client = jwksClient({
    cache: true,
    jwksUri: 'https://login.microsoftonline.com/common/discovery/keys',
  });
  return new Promise(((resolve, reject) => {
    client.getSigningKey(kid, async (err, key) => {
      if (err) return reject(err);
      try {
        const signingKey = key.getPublicKey();
        const options: VerifyOptions = {
          algorithms: ['RS256'],
          ignoreExpiration: true,
          maxAge: '1 year',
          audience: config.MS_CLIENT_ID,
        };
        const result: any = verify(token, signingKey, options);
        if (result.iss !== 'https://sts.windows.net/d72a7172-d5f8-4889-9a85-d7424751592a/') {
          return reject(new Error('Token issuer invalid'));
        }
        return resolve(result);
      } catch (e) {
        return reject(e);
      }
    });
  }));
}
