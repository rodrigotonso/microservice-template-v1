/**
 * @packageDocumentation
 * @hidden
 * Contains log labels.
 */
import path from 'path';

const logsFile = path.join('~', '..', 'persisted', 'logs.log');

export default {
  /**
   * Log file path.
   */
  LOGS_FILE: logsFile,

  /**
   * Daily rotation.
   */
  DAILY_ROTATION: true,

  /**
   * Contains labels for logs.
   */
  LABELS: {
    /**
     * Used console... method.
     */
    CONSOLE: 'CONSOLE_METHOD',

    /**
     * Error labels.
     */
    ERROR: {
      /**
       * Error starting the server.
       */
      STARTING: 'ERROR_STARTING',

      /**
       * Error exiting the server.
       */
      EXITING: 'ERROR_EXITING',

      /**
       * Process.on() error.
       */
      PROCESS_ON: 'ERROR_PROCESS_ON',

      /**
       * A
       */
      API_REQUEST: 'ERROR_API_REQUEST',
    },

    /**
     * Info labels.
     */
    INFO: {
      /**
       * Normal app proccesses.
       */
      APP_PROCESS: 'APP_PROCESS',

      /**
       * Express Req IP.
       */
      IP: 'IP',

      /**
       * User action.
       */
      USER_ACTION: 'USER_ACTION',
    },
  },
};
