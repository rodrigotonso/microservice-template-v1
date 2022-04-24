/**
 * @packageDocumentation
 * @hidden
 * Contains the router constants.
 * NOTE: Control interval are quite high (the let too many requests) because it's a microservice. It might receive a lot of requests per sec frmo the same IPs.
 */

export default {
  /**
   * Documentation location.
   */
  DOCS: '/docs',

  /**
   * API routes.
   */
  API: {
    /**
     * Contains mongo routes.
     */
    MONGO: {
      ALL_SAMPLES: '/mongo/samples',
      SAMPLE: '/mongo/sample',
      COUNT: '/mongo/samples/count',
      COUNT_OTHER_INFO: '/mongo/samples/other-info/count',
      DELETE_ONE: '/mongo/sample/:name',
    },

    /**
     * Contains sequelize routes.
     */
    SEQUELIZE: {
      ALL_SAMPLES: '/sequelize/samples',
      SAMPLE: '/sequelize/sample',
      COUNT: '/sequelize/samples/count',
      COUNT_OTHER_INFO: '/sequelize/samples/other-info/count',
      DELETE_ONE: '/sequelize/sample/:name',
    },

    /**
     * Testing URL.
     */
    TESTING: '/testing',
  },
};
