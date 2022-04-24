/**
 * @packageDocumentation
 * @module Utils/Logger
 * Control the logs of the app.
 */
/* eslint-disable no-console */

import { cloneDeep } from 'lodash';
import winston from 'winston';
import 'winston-daily-rotate-file';

import CONFIG from '~/config';
import CONSTANTS from '~/constants';

const { combine, prettyPrint, json } = winston.format;

const transports = [];
transports.push(new winston.transports.Console());
if (CONFIG.LOGS_IN_FILE) {
  let fileTransport;
  if (CONSTANTS.LOGS.DAILY_ROTATION)
    fileTransport = new winston.transports.DailyRotateFile({
      filename: CONSTANTS.LOGS.LOGS_FILE.replace(/.log$/, '-%DATE%.log'),
    });
  else
    fileTransport = new winston.transports.File({
      filename: CONSTANTS.LOGS.LOGS_FILE,
    });
  transports.push(fileTransport);
}

enum LogLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  http = 'http',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

const logger = winston.createLogger({
  transports,
  level: CONFIG.LOGS_LEVEL,
  format: combine(json(), prettyPrint()),
  handleExceptions: true,
});

/**
 * Logs the message.
 * @param message Message to be logged.
 * @param level Log level.
 * @param context Info to add to log.
 */
const log = function log(
  message: string,
  level: LogLevels,
  label: string,
  logContext = {},
): boolean {
  const contextCopy = cloneDeep(logContext);
  const meta = { ...contextCopy, app: CONFIG.APP_NAME, appVersion: CONFIG.APP_VERSION };
  const timestamp = new Date();
  logger.log(level, message, { label, timestamp, context: { ...meta } });
  return true;
};

type contextType = Record<string, unknown>;
const logs = {
  /**
   * Logs an error.
   * @param message Message to be sent.
   * @param context Other info.
   */
  error: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.error, label, context),

  /**
   * Logs a awrning.
   * @param message Message to be sent.
   * @param context Other info.
   */
  warn: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.warn, label, context),

  /**
   * Logs info.
   * @param message Message to be sent.
   * @param context Other info.
   */
  info: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.info, label, context),

  /**
   * Logs http.
   * @param message Message to be sent.
   * @param context Other info.
   */
  http: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.http, label, context),

  /**
   * Logs verbosily.
   * @param message Message to be sent.
   * @param context Other info.
   */
  verbose: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.verbose, label, context),

  /**
   * Logs for debug.
   * @param message Message to be sent.
   * @param context Other info.
   */
  debug: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.debug, label, context),

  /**
   * Logs silly.
   * @param message Message to be sent.
   * @param context Other info.
   */
  silly: (message: string, label: string, context?: contextType): boolean =>
    log(message, LogLevels.silly, label, context),

  /**
   * Disables or enables logs.
   * @param disable
   */
  setSilent: (disable = true): boolean => {
    logger.silent = disable;
    return true;
  },
};

const { LABELS } = CONSTANTS.LOGS;
const CONSOLE_METHOD = LABELS.CONSOLE;

console.log = (...args: unknown[]) => logs.info('Console.log', CONSOLE_METHOD, { args });
console.error = (...args: unknown[]) => logs.error('Console.error', CONSOLE_METHOD, { args });
console.debug = (...args: unknown[]) => logs.debug('Console.debug', CONSOLE_METHOD, { args });
console.info = (...args: unknown[]) => logs.info('Console.info', CONSOLE_METHOD, { args });
console.table = (...args: unknown[]) => logs.info('Console.table', CONSOLE_METHOD, { args });
console.warn = (...args: unknown[]) => logs.warn('Console.warn', CONSOLE_METHOD, { args });

export { logs as logger, LABELS };
