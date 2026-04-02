import { verify, VerifyOptions } from 'jsonwebtoken';
// Weird ESlint import ordering bug
// eslint-disable-next-line
import config from '../config/config';
import keySet from '../../key.json';

type LocalJwk = {
  kid: string;
  x5c?: string[];
};

const LOCAL_KEYS = (keySet as { keys: LocalJwk[] }).keys;

function getLocalSigningKey(kid: string): string | null {
  const matchingKey = LOCAL_KEYS.find((key) => key.kid === kid);
  if (matchingKey == null) {
    return null;
  }

  const certificate = matchingKey.x5c && matchingKey.x5c[0];
  if (certificate == null) {
    return null;
  }

  return `-----BEGIN CERTIFICATE-----\n${certificate.match(/.{1,64}/g)?.join('\n')}\n-----END CERTIFICATE-----\n`;
}

export default async function verifyToken(token: string) {
  if (!token) {
    throw new Error('Token is required');
  }

  // Node has no atob
  const atob = (base64: string) => Buffer.from(base64, 'base64').toString('ascii');
  const { kid } = JSON.parse(atob(token.split('.')[0]));
  const signingKey = getLocalSigningKey(kid);
  if (!signingKey) {
    throw new Error('No local signing key configured for token');
  }

  const options: VerifyOptions = {
    algorithms: ['RS256'],
    ignoreExpiration: true,
    maxAge: '1 year',
    audience: config.MS_CLIENT_ID,
  };

  const result: any = verify(token, signingKey, options);
  if (result.iss !== 'https://sts.windows.net/d72a7172-d5f8-4889-9a85-d7424751592a/') {
    throw new Error('Token issuer invalid');
  }

  return result;
}
