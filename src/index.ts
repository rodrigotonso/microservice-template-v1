/**
 * @packageDocumentation
 * @hidden
 * Starts the server listening to a port.
 */

import fs from 'fs';
import http from 'http';
import https from 'https';

import CONSTANTS from './constants';
import CONFIG from './config';
import app from './app';
import { logger, LABELS } from './utils/logger';

let server;

if (CONFIG.SSL.USE) {
  const credentials = {
    key: fs.readFileSync(CONFIG.SSL.KEY_PATH, 'utf8'),
    cert: fs.readFileSync(CONFIG.SSL.CERT_PATH, 'utf8'),
  };
  server = https.createServer(credentials, app);
} else {
  logger.warn(
    'Please, remember that running without SSL is not completelly secure...',
    LABELS.INFO.APP_PROCESS,
  );
  server = http.createServer(app);
}

server.timeout = CONSTANTS.SECURITY.SERVER.TIMEOUT;
server.listen(CONFIG.PORT);
logger.info(`${CONFIG.APP_NAME} listening on port ${CONFIG.PORT}...`, LABELS.INFO.APP_PROCESS);
