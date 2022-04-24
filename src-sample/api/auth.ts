/**
 * @packageDocumentation
 * @module API/Auth
 * Contains the authentication/authorization configuration and methods.
 */

import { Request, Response, NextFunction, RequestHandler } from 'express';
import expressJWT from 'express-jwt';
import { intersection, noop } from 'lodash';

import CONFIG from '~/config';
import { CodedError } from '~/errors';

type RequestWithUser = Request & {
  user?: Record<string, unknown>;
};

/**
 * Controls the specified algorithm is secure...
 * @param algorithm Algorithm used to sign JWT.
 */
const controlJWTAlgorithm = function controlJWTAlgorithm(algorithm: string): boolean {
  const JWTAlgorithms = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512',
    'none',
  ];

  if (algorithm === 'none') {
    // eslint-disable-next-line no-console
    console.warn(
      'JWT signed without algorithm can be insecure! Make sure you are behind a reverse proxy or using an API KEY!',
    );
  }
  if (!JWTAlgorithms.includes(algorithm)) {
    throw new Error(`The JWT algorithm "${algorithm}" is not valid.`);
  }
  return true;
};

/**
 * Throws an error if the secret (or API KEY) is very short.
 * @param secret Secret KEY or API KEY that will be controlled.
 */
const controlSecretLength = function controlSecretLength(secret: string): boolean {
  const EXPECTED_LENGTH = 60;
  if (secret.length < EXPECTED_LENGTH) {
    throw new Error(`The minimum length for an API KEY or JWT secret is ${EXPECTED_LENGTH}.`);
  }
  return true;
};

/**
 * Contains the JSON Web Token middleware for Express.
 */
export const getJWTHandler = function getJWTHandler(): expressJWT.RequestHandler {
  controlJWTAlgorithm(CONFIG.AUTH.JWT_ALGORITHM);
  controlSecretLength(CONFIG.AUTH.JWT_SECRET);
  return expressJWT({
    secret: CONFIG.AUTH.JWT_SECRET,
    algorithms: [CONFIG.AUTH.JWT_ALGORITHM],
    requestProperty: 'user',
  });
};

/**
 * Request handler. Throws an error if the Request API KEY is invalid.
 * @param req Request from Express.
 * @param res Response from Express.
 * @param next NextFunction from Express.
 */
export const getAPIHandler = function getAPIHandler(): RequestHandler {
  controlSecretLength(CONFIG.AUTH.API_KEY);

  return function controlAPIKey(req: RequestWithUser, res: Response, next: NextFunction): boolean {
    noop(res);
    const header = req.header('X-API-KEY');
    if (!header || header !== CONFIG.AUTH.API_KEY) {
      const error = new CodedError('NOT_AUTHORIZED');
      next(error);
      return false;
    }
    req.user = {};
    next();
    return true;
  };
};

/**
 * Returns if the user has one of the specified roles.
 * @param req Request from Express.
 * @param possibleRoles Roles that the user should have.
 */
export const hasAnyRole = function hasAnyRole(
  req: RequestWithUser,
  possibleRoles: string[],
): boolean {
  if (!CONFIG.AUTH.USE_JWT) {
    // eslint-disable-next-line no-console
    console.warn('The system is using an user role control while the system does not use JWT.');
  }

  const user = req.user || {};
  if (!Array.isArray(user.role)) {
    return false;
  }

  const commonItems = intersection(user.role, possibleRoles);
  return commonItems.length > 0;
};

/**
 * Returns a Request handler that controls the user have one of the specified roles. If doesn't, throw not authorized error.
 * @param possibleRoles Roles that the user should have.
 * @param role Role that the user should have.
 */
export const stopRequestsWithoutAnyRoles = function stopRequestsWithoutAnyRoles(
  possibleRoles: string[],
): RequestHandler {
  return function getRoleRequestHandler(req: Request, res: Response, next: NextFunction): boolean {
    noop(res);
    if (!hasAnyRole(req, possibleRoles)) {
      next(new CodedError('NOT_AUTHORIZED'));
      return false;
    }
    next();
    return true;
  };
};

export default { getJWTHandler, getAPIHandler, hasAnyRole, stopRequestsWithoutAnyRoles };
