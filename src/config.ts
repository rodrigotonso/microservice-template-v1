/**
 * @packageDocumentation
 * @hidden
 * Loads configuration from environment.
 * TODO: You should read all this file to see if it's according to your needs.
 * For example, you might need to delete SQL or Mongo options.
 * Depending in which database you use, you will have to install the drivers for sequelize: https://sequelize.org/master/manual/getting-started.html
 */

import path from 'path';

/**
 * Gets the environment variable or returns it's default.
 */
const getFromEnvOrError = function getFromEnvOrError(
  variable: string,
  defaultValue: string | undefined = undefined,
  preserveOriginal = false,
): string {
  const value = process.env[variable];
  if (typeof value !== 'undefined') {
    if (!preserveOriginal) {
      delete process.env[variable];
    }
    return value;
  }
  if (typeof defaultValue !== 'undefined') {
    return defaultValue;
  }
  throw new Error(`Environment variable "${variable}" is not defined.`);
};

const dirName = __dirname.split(path.sep).pop();

const CONFIG = {
  /**
   * Node environment.
   */
  NODE_ENV: getFromEnvOrError('NODE_ENV', 'production', true),

  /**
   * Application name.
   */
  APP_NAME: getFromEnvOrError('APP_NAME', dirName),

  /**
   * Application version.
   */
  APP_VERSION: getFromEnvOrError('APP_VERSION', '1.0.0'),

  /**
   * Port the APP listens to.
   */
  PORT: getFromEnvOrError('PORT'),

  /**
   * BASE URL in which the API is located. It's needed for swagger documentation.
   * Vg: '/location/sublocation'.
   */
  API_URL: getFromEnvOrError('API_URL'),

  /**
   * Returns if you must use graphiql.
   */
  API_USE_GRAPHIQL: getFromEnvOrError('API_USE_GRAPHIQL') === '1',

  /**
   * Sets if the log should go to file or not.
   */
  LOGS_IN_FILE: getFromEnvOrError('LOGS_IN_FILE') === '1',

  /**
   * Sets logs level.
   */
  LOGS_LEVEL: getFromEnvOrError('LOGS_LEVEL', 'silly'),

  /**
   * Sets TZ.
   */
  TZ: getFromEnvOrError('TZ'),

  /**
   * Auth information.
   */
  AUTH: {
    /**
     * If it must use JWT.
     */
    USE_JWT: getFromEnvOrError('JWT_USE') === '1',

    /**
     * JWT secret.
     * Only will be used if JWT_USE is true.
     */
    JWT_SECRET: getFromEnvOrError('JWT_SECRET'),

    /**
     * JWT algorithm.
     * Only will be used if JWT_USE is true.
     */
    JWT_ALGORITHM: getFromEnvOrError('JWT_ALGORITHM'),

    /**
     * API KEY.
     * Only will be used if JWT_USE is false.
     */
    API_KEY: getFromEnvOrError('API_KEY'),
  },

  /**
   * SSL configuration.
   */
  SSL: {
    /**
     * Contains if you should use SSL.
     */
    USE: getFromEnvOrError('SSL_MUST_USE') === '1',

    /**
     * Path to the cert file.
     */
    CERT_PATH: getFromEnvOrError('SSL_CERT_PATH', ''),

    /**
     * Path to the key file.
     */
    KEY_PATH: getFromEnvOrError('SSL_KEY_PATH', ''),
  },

  /**
   * Database configuration.
   */
  DB: {
    /**
     * SQL Configuration.
     */
    SQL: {
      /**
       * Database host.
       */
      HOST: getFromEnvOrError('SQL_HOST'),

      /**
       * Database name.
       */
      DATABASE: getFromEnvOrError('SQL_DATABASE'),

      /**
       * Database username.
       */
      USERNAME: getFromEnvOrError('SQL_USERNAME'),

      /**
       * Database password.
       */
      PASSWORD: getFromEnvOrError('SQL_PASSWORD'),

      /**
       * Database dialect for sequelize (postgres, sqlite, sql, mysql...).
       */
      DIALECT: getFromEnvOrError('SQL_DIALECT'),

      /**
       * Storage, if SQLite is used.
       */
      STORAGE: getFromEnvOrError('SQL_STORAGE', ':memory:'),
    },

    /**
     * Mongo configuration.
     */
    MONGO: {
      /**
       * URL for the database.
       */
      URL: getFromEnvOrError('MONGO_URL'),
      /**
       * Database user.
       */
      USER: getFromEnvOrError('MONGO_USER'),

      /**
       * URL for the database.
       */
      PASSWORD: getFromEnvOrError('MONGO_PASSWORD'),
    },

    /**
     * Redis configuration.
     */
    REDIS: {
      /**
       * Url for the redis database.
       */
      URL: getFromEnvOrError('REDIS_URL'),

      /**
       * Prefix to add to redis entries.
       */
      PREFIX: getFromEnvOrError('REDIS_PREFIX', ''),
    },
  },

  /**
   * Others services needed.
   */
  SERVICES: {
    /**
     * Callmebot webservice.
     */
    CALLMEBOT: {
      /**
       * Phone number to send the message to.
       */
      NUMBER: getFromEnvOrError('CALLMEBOT_NUMBER'),

      /**
       * Apikey to send messages to the specified number.
       */
      APIKEY: getFromEnvOrError('CALLMEBOT_APIKEY'),
    },
  },
};

export default CONFIG;
