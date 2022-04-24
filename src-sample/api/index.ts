/**
 * @packageDocumentation
 * @module API
 * Contains the configuration, documentation and the security of the API.
 */

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import SlowDown from 'express-slow-down';
import { noop } from 'lodash';
import swaggerUI from 'swagger-ui-express';

import auth from './auth';
import CONFIG from '~/config';
import { CODES as ERROR_CODES } from '~/errors';
import CONSTS from '~/constants';
import apiUtils from './apiUtils';
import graphQl from './graphql';
import routes from './routes';
import swaggerDocs from './swagger';

const { ROUTES, SECURITY } = CONSTS;
const router = express.Router();

/**
 * Security settings.
 */
const rateError = () =>
  JSON.stringify({
    success: false,
    errorCode: ERROR_CODES.API_REQUESTS_TOO_OFTEN,
    error: ERROR_CODES.API_REQUESTS_TOO_OFTEN,
  });

const rateLimit = RateLimit({
  windowMs: SECURITY.RATE_LIMIT.WINDOW_MS,
  max: SECURITY.RATE_LIMIT.MAX,
  message: rateError(),
});

const slowDown = SlowDown({
  windowMs: SECURITY.SLOW_DOWN.WINDOW_MS,
  delayAfter: SECURITY.SLOW_DOWN.DELAY_AFTER,
  delayMs: SECURITY.SLOW_DOWN.DELAY_MS,
});

let hsts: false | undefined;
if (!CONFIG.SSL.USE) {
  hsts = false;
}
router.use(helmet({ hsts })); // <- Microservice can run on http!
router.use((req: Request, res: Response, next: NextFunction): boolean => {
  noop(req);
  res.setHeader('Server', 'Server');
  res.setHeader('X-XSS-Protection', '1; mode=block'); // <- Helmet doesn't disable this.
  next();
  return true;
});
router.use(apiUtils.logIP);
router.use(rateLimit);
router.use(slowDown);

/**
 * Documentation.
 */
const swaggerOptions = {
  customSiteTitle: `${CONFIG.APP_NAME} ${CONFIG.APP_VERSION}`,
};
router.use(ROUTES.DOCS, swaggerUI.serve);
router.get(ROUTES.DOCS, swaggerUI.setup(swaggerDocs, swaggerOptions));

/**
 * Authentication settings.
 */
if (CONFIG.AUTH.USE_JWT) {
  router.use(auth.getJWTHandler());
} else {
  router.use(auth.getAPIHandler());
}

/**
 * Entering the API.
 */
const parser = bodyParser.json({ limit: CONSTS.SECURITY.BODY_PARSER.LIMIT });
router.use(parser);

// TODO: Delete this if you won't use graphql.
router.use(ROUTES.API.GRAPHQL, graphQl);

router.use(routes);

/**
 * Error handling.
 */
router.all('*', apiUtils.sendMethodNotFound);
router.use(apiUtils.handleError);

export default router;
