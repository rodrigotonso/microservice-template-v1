/**
 * @packageDocumentation
 * @hidden
 * Contains the router constants.
 * NOTE: Control interval are quite high (the let too many requests) because it's a microservice. It might receive a lot of requests per sec frmo the same IPs.
 */

export default {
  /**
   * Constants for bodyparser.
   */
  BODY_PARSER: {
    /**
     * Body size limit for requests.
     */
    LIMIT: '50mb',
  },

  /**
   * Constants for rate limit.
   */
  RATE_LIMIT: {
    /**
     * Interval in ms in which the rate is controlled.
     */
    WINDOW_MS: 1000,

    /**
     * Max count of requests allowed in the windows.
     */
    MAX: 200,
  },

  /**
   * SERVER CONSTANTS.
   */
  SERVER: {
    /**
     * Server connection timeout.
     */
    TIMEOUT: 1000 * 60, // One minute.
  },

  /*
   * Constants for rate slow down.
   */
  SLOW_DOWN: {
    /**
     * Interval in ms in which the rate is controlled.
     */
    WINDOW_MS: 1000,

    /**
     * How many requests will it allow before starting to apply slowdown.
     */
    DELAY_AFTER: 100,

    /**
     * How many miliseconds will it delay each time.
     */
    DELAY_MS: 50,
  },
};
