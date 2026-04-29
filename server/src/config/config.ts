import NodeVault from 'node-vault';
import * as fs from 'fs';
import deasync = require('deasync');

interface Config {
  DB_HOST: string;
  DB_USER: string;
  DB_DATABASE: string;
  DB_URL_REDIRECT_TABLE: string;
  DB_PASSWORD: string;

  PORT: number;
  MS_CLIENT_ID: string;
}

function deasyncPromise<T>(promise: Promise<T>): T | null {
  let result: T | null = null;
  let error = null;
  let done = false;
  promise.then((res) => {
    result = res;
    done = true;
  })
    .catch((err) => {
      error = err;
      done = true;
    });
  while (!done) {
    deasync.runLoopOnce();
  }
  if (error) {
    throw error;
  }
  return result;
}

let config: Config | null = null;

const path = `${__dirname}/../../config.json`;

// First priority: DATABASE_HOST env var (docker-compose style)
if (process.env.DATABASE_HOST) {
  config = {
    DB_HOST: process.env.DATABASE_HOST,
    DB_USER: process.env.DATABASE_USER || 'nushlink_user',
    DB_PASSWORD: process.env.DATABASE_PASSWORD || '',
    DB_DATABASE: process.env.DATABASE_NAME || 'nushlink',
    DB_URL_REDIRECT_TABLE: process.env.DB_URL_REDIRECT_TABLE || 'nush_links',
    PORT: parseInt(process.env.PORT || '5000', 10),
    MS_CLIENT_ID: process.env.MS_CLIENT_ID || '',
  };
}
// Second priority: config.json file (original behavior)
else if (fs.existsSync(path)) {
  const configFile = fs.readFileSync(path, 'utf8');
  config = JSON.parse(configFile) as Config;
}
// Third priority: Vault (original fallback)
else {
  console.log('Config file and env vars missing, loading config from Vault');
  const vaultClient = NodeVault({
    endpoint: 'https://vault.nush.app',
  });
  const token = deasyncPromise(vaultClient.userpassLogin({
    username: 'nush-link',
    password: process.env.VAULT_PASSWORD,
  })).auth.client_token;
  const secretsClient = NodeVault({
    endpoint: 'https://vault.nush.app',
    token,
  });
  config = deasyncPromise(secretsClient.read('apps/data/nush-link')).data.data;
}

if (config == null) {
  throw new Error('Config cannot be null');
}

export default config as Config;
