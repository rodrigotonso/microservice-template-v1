/**
 * @packageDocumentation
 * @hidden
 * Import and connect the required DBs in start().
 * Also, close that database in end().
 */

import express from 'express';

import CONFIG from './config';
import { logger, LABELS } from './utils/logger';
import api from './api';

// TODO: You should take out the databases you don't need.
// import mongo from './model/db/mongoose';
// import sequelize from './model/db/sequelize';
// import redis from './model/db/redis';

const app = express();

const start = async function start(): Promise<boolean> {
  try {
    // TODO: You should need initialize services you will use in this app.

    app.set('trust-proxy', true);
    app.use(api);
    app.emit('started');
    logger.info('App started...', LABELS.INFO.APP_PROCESS);
  } catch (error) {
    logger.error(error, LABELS.ERROR.STARTING, { error });
    throw error;
  }
  return true;
};

const end = async function end(): Promise<boolean> {
  try {
    // TODO: You should take out the databases you don't need.
  } catch (error) {
    logger.error(error, LABELS.ERROR.EXITING, { error });
  }

  logger.info(`Exiting ${CONFIG.APP_NAME}...`, LABELS.INFO.APP_PROCESS);
  return true;
};

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection.', LABELS.ERROR.PROCESS_ON, { reason, promise });
  throw new Error('Unhandled rejection');
});
process.on('uncaughtException', (error) => {
  logger.error(error.message, LABELS.ERROR.PROCESS_ON, { error });
  throw error;
});
process.on('exit', end);
start();

export default app;
