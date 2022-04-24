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
import mongoSample from './handlers/mongo';
import sequelizeSample from './handlers/sequelize';

const api = express.Router();

const { MONGO, SEQUELIZE } = ROUTES.API;

/**
 * Testing.
 */
if (CONFIG.AUTH.USE_JWT) {
  api.use(auth.stopRequestsWithoutAnyRoles([ROLES.TESTING]));
}
api.get(ROUTES.API.TESTING, (req: Request, res: Response): boolean => {
  noop(req);
  return apiUtils.sendResponse(res, true);
});

/**
 * Mongo sample.
 */
if (CONFIG.AUTH.USE_JWT) {
  api.use(auth.stopRequestsWithoutAnyRoles([ROLES.MONGO]));
}
api.get(MONGO.ALL_SAMPLES, mongoSample.getAll);
api.get(MONGO.COUNT, mongoSample.count);
api.get(MONGO.COUNT_OTHER_INFO, mongoSample.countOtherInfo);
api.post(MONGO.SAMPLE, mongoSample.add);
api.delete(MONGO.DELETE_ONE, mongoSample.delete);
api.delete(MONGO.ALL_SAMPLES, mongoSample.empty);

/**
 * Sequelize sample.
 */
if (CONFIG.AUTH.USE_JWT) {
  api.use(auth.stopRequestsWithoutAnyRoles([ROLES.SEQUELIZE]));
}
api.get(SEQUELIZE.ALL_SAMPLES, sequelizeSample.getAll);
api.get(SEQUELIZE.COUNT, sequelizeSample.count);
api.get(SEQUELIZE.COUNT_OTHER_INFO, sequelizeSample.countOtherInfo);
api.post(SEQUELIZE.SAMPLE, sequelizeSample.add);
api.delete(SEQUELIZE.DELETE_ONE, sequelizeSample.delete);
api.delete(SEQUELIZE.ALL_SAMPLES, sequelizeSample.empty);

/**
 * Error handling.
 */
api.all('*', apiUtils.sendMethodNotFound);
api.use(apiUtils.handleError);

export default api;
