/**
 * @packageDocumentation
 * @module API/Routes
 * API routes for every API.
 */

import { noop } from 'lodash';
import express, { Request, Response } from 'express';

import auth from './auth';
import CONFIG from '~/config';
import ROLES from '~/constants/roles';
import apiUtils from './apiUtils';
import ROUTES from '~/constants/routes';

const api = express.Router();

/**
 * Testing.
 * NOTE: Do NOT delete this route, because it's used to test.
 */
if (CONFIG.AUTH.USE_JWT) {
  api.use(auth.stopRequestsWithoutAnyRoles([ROLES.TESTING]));
}
api.get(ROUTES.API.TESTING, (req: Request, res: Response): boolean => {
  noop(req);
  return apiUtils.sendResponse(res, true);
});

/**
 * Service methods here...
 */

api.all('/some-method', (req: Request, res: Response) => {
  noop(req);
  return apiUtils.sendResponse(res, 'Add some method here...', 200);
});

/**
 * Error handling.
 */
api.all('*', apiUtils.sendMethodNotFound);
api.use(apiUtils.handleError);

export default api;
